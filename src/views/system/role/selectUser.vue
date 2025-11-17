<template>
  <!-- 授权用户弹框 -->
  <MYDialog title="选择用户" v-model="visible" width="800px" height="650px" top="5vh" append-to-body
    backgroundColor="var(--dialog-bg) !important" textColor="var(--general)">
    <!-- 查询表单 -->
    <!-- <MYForm class="dialog_form" :model="queryParams" ref="queryRef" :inline="true" label-width="80px">
      <MYForm-item label="用户名称" prop="userName">
        <MYInput v-model="queryParams.userName" placeholder="请输入用户名称" clearable style="width: 180px"
          @keyup.enter="handleQuery" />
      </MYForm-item>
      <MYForm-item label="手机号码" prop="phonenumber">
        <MYInput v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable style="width: 180px"
          @keyup.enter="handleQuery" />
      </MYForm-item>
      <MYForm-item>
        <MYButton type="primary" icon="Search" @click="handleQuery">搜索</MYButton>
        <MYButton icon="Refresh" @click="resetQuery">重置</MYButton>
      </MYForm-item>
    </MYForm> -->
    <MYRow :gutter="20">
      <MYForm class="dialog_form" :modelValue="queryParams" ref="queryRef" :inline="true">
        <MYRow :gutter="20">
          <MYCol :span="10">
            <MYForm-item prop="userName" label="用户名称">
              <MYInput v-model="queryParams.userName" placeholder="请输入用户名称" clearable style="width: 200px"
                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
            </MYForm-item>
          </MYCol>

          <MYCol :span="12">
            <MYForm-item prop="status" label="手机号码">
              <MYSelect v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable style="width: 200px">
                <MYOption v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </MYSelect>
            </MYForm-item>
          </MYCol>

          <MYCol :span="4">
            <MYForm-item>
              <MYButton type="primary" icon="MYSearch" @click="handleQuery">
                搜索
              </MYButton>
            </MYForm-item>
          </MYCol>

          <MYCol :span="4">
            <MYForm-item>
              <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">
                重置
              </MYButton>
            </MYForm-item>
          </MYCol>
        </MYRow>
      </MYForm>
    </MYRow>
    <!-- 用户表格和分页 -->
    <MYRow style="margin-top: 10px;">
      <MYTable headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
        bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
        @row-click="clickRow" ref="refTable" :data="userList" @selection-change="handleSelectionChange"
        v-loading="loading" style="width: 100%; height: 300px;" row-key="userId">
        <MYTable-column type="selection" width="55" />
        <MYTable-column label="用户名称" prop="userName" :show-overflow-tooltip="true" />
        <MYTable-column label="用户昵称" prop="nickName" :show-overflow-tooltip="true" />
        <MYTable-column label="邮箱" prop="email" :show-overflow-tooltip="true" />
        <MYTable-column label="手机" prop="phonenumber" :show-overflow-tooltip="true" />
        <MYTable-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
          </template>
        </MYTable-column>
        <MYTable-column label="创建时间" align="center" prop="createTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </MYTable-column>
      </MYTable>
      <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" style="margin-top: 10px; text-align: right;" />
    </MYRow>

    <!-- 底部操作按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <MYButton style="margin-right: 20px;" type="primary" @click="handleSelectUser">确 定</MYButton>
        <MYButton type="info" @click="visible = false">取 消</MYButton>
      </div>
    </template>
  </MYDialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, ElTable } from 'element-plus';
import { unallocatedUserList, authUserSelectAll } from '@/api/system/role';
import { useDict } from '@/utils/dict';
import { parseTime } from '@/utils/general';
import { User, UnallocatedUserListResponse } from '@/types/views/role';

const props = defineProps<{
  roleId: string | number;
}>();

const emit = defineEmits<{
  (e: 'ok'): void;
}>();

// 获取字典
interface DictOption { value: string; label: string; }
interface UseDictResult {
  dictLoaded: { value: boolean };
  sys_normal_disable: { value: DictOption[] };
}
const dictRes = useDict('sys_normal_disable') as unknown as UseDictResult;
const sys_normal_disable = dictRes.sys_normal_disable.value;

// 表单 & 表格 refs
const queryRef = ref<FormInstance>();
const refTable = ref<InstanceType<typeof ElTable> | null>(null);

// 响应式状态
const visible = ref(false);
const loading = ref<boolean>(false);
const userList = ref<User[]>([]);
const total = ref<number>(0);
const userIds = ref<number[]>([]);

const queryParams = reactive<{
  pageNum: number;
  pageSize: number;
  roleId: string | number | undefined;
  userName?: string;
  phonenumber?: string;
}>({
  pageNum: 1,
  pageSize: 10,
  roleId: undefined,
  userName: undefined,
  phonenumber: undefined,
});

function unwrapResponse<T>(resp: any): T | null {
  let data = resp;
  if (data && typeof data === 'object' && 'data' in data) {
    data = data.data;
  }
  return data == null ? null : (data as T);
}

function show(): void {
  queryParams.roleId = props.roleId;
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.userName = undefined;
  queryParams.phonenumber = undefined;
  getList();
  visible.value = true;
}

defineExpose({ show });

// ===== 点击行切换选中 =====
function clickRow(row: User): void {
  if (refTable.value) {
    refTable.value.toggleRowSelection(row);
  }
}

// ===== 多选框选中变化 =====
function handleSelectionChange(selection: User[]): void {
  userIds.value = selection.map(item => item.userId);
}

// ===== 查询列表 =====
async function getList(): Promise<void> {
  loading.value = true;
  try {
    const params = {
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize,
      roleId: queryParams.roleId,
      userName: queryParams.userName,
      phonenumber: queryParams.phonenumber,
    };
    const resp = await unallocatedUserList(params);
    const dataUnwrapped = unwrapResponse<UnallocatedUserListResponse>(resp);
    if (dataUnwrapped && Array.isArray(dataUnwrapped.rows)) {
      userList.value = dataUnwrapped.rows;
      total.value = typeof dataUnwrapped.total === 'number'
        ? dataUnwrapped.total
        : dataUnwrapped.rows.length;
    } else {
      console.warn('[SelectUser] getList 未解析到 rows:', dataUnwrapped);
      userList.value = [];
      total.value = 0;
      ElMessage.error('获取可选用户列表异常');
    }
  } catch (err) {
    console.error('[SelectUser] getList 异常', err);
    userList.value = [];
    total.value = 0;
    ElMessage.error('获取可选用户列表失败');
  } finally {
    loading.value = false;
  }
}

// ===== 搜索 =====
function handleQuery(): void {
  queryParams.pageNum = 1;
  getList();
}

// ===== 重置 =====
function resetQuery(): void {
  if (queryRef.value) {
    queryRef.value.resetFields();
  }
  queryParams.pageNum = 1;
  queryParams.userName = undefined;
  queryParams.phonenumber = undefined;
  getList();
}

// ===== 确定选择用户 =====
async function handleSelectUser(): Promise<void> {
  const roleId = queryParams.roleId;
  const uIds = userIds.value.join(',');
  if (!uIds) {
    ElMessage.warning('请选择要分配的用户');
    return;
  }
  try {
    // 直接传递对象，不要使用 JSON.stringify()
    const resp = await authUserSelectAll({ 
      roleId: roleId as string | number, 
      userIds: uIds 
    });
    
    const dataUnwrapped = unwrapResponse<{ msg?: string }>(resp);
    const msg = dataUnwrapped?.msg ?? '操作成功';
    ElMessage.success(msg);
    visible.value = false;
    emit('ok');
  } catch (err) {
    console.error('[SelectUser] handleSelectUser 异常', err);
    ElMessage.error('分配用户失败');
  }
}
</script>
