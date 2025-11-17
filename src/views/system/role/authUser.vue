<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <MYForm :model-value="queryParams" ref="queryRef" v-show="showSearch" :inline="true" labelWidth="68">
      <MYRow>
        <MYCol :span="6" :offset="2">
          <MYForm-item label="用户名称" prop="userName">
            <MYInput placeholder="请输入用户名称" v-model="queryParams.userName" disabled placeholderColor="var(--navbar-text)"
              textColor="var(--navbar-text)" style="width: 200px;" />
          </MYForm-item>
        </MYCol>
        <MYCol :span="6" :offset="2">
          <MYForm-item label="手机号码" prop="phonenumber">
            <MYInput placeholder="请输入手机号码" v-model="queryParams.phonenumber" disabled
              placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" style="width: 200px;" />
          </MYForm-item>
        </MYCol>
        <!-- 搜索按钮 -->
        <MYCol :span="2">
          <MYForm-item>
            <MYButton type="primary" icon="MYSearch" @click="handleQuery">搜索</MYButton>
          </MYForm-item>
        </MYCol>

        <!-- 重置按钮 -->
        <MYCol :span="1">
          <MYForm-item>
            <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">重置</MYButton>
          </MYForm-item>
        </MYCol>
      </MYRow>
    </MYForm>

    <!-- 操作按钮 -->
    <MYRow :gutter="10" class="mb8">
      <MYCol :span="3">
        <MYButton type="primary" icon="MYPlus" @click="openSelectUser" v-hasPermi="['system:role:add']">添加用户
        </MYButton>
      </MYCol>
      <MYCol :span="4">
        <MYButton type="danger" icon="MYCircleClose" :disabled="multiple" @click="cancelAuthUserAll"
          v-hasPermi="['system:role:remove']">批量取消授权</MYButton>
      </MYCol>
      <MYCol :span="3">
        <MYButton type="warning" icon="MYClose" @click="handleClose">关闭</MYButton>
      </MYCol>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </MYRow>

    <!-- 表格数据 -->
    <MYTable v-loading="loading" :data="userList" @selection-change="handleSelectionChange"
      headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
      bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)">
      <MYTable-column type="selection" width="55" align="center" />
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
      <MYTable-column label="操作" align="center" class-name="small-padding fixed-width" prop="operation" />
        <template #operation="scope">
          <MYButton link type="primary" icon="MYCircleClose" colorBg="var(--table-body-bg)"
              colorText="var(--general-text)" @click="() => cancelAuthUser(scope.row)"
            v-hasPermi="['system:role:remove']">取消授权</MYButton>
        </template>
    </MYTable>

    <!-- 分页 -->
    <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />
    <select-user ref="selectRef" :roleId="queryParams.roleId" @ok="handleQuery" />
  </div>
</template>

<script setup lang="ts" name="AuthUser">
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FormInstance } from 'element-plus';
import selectUser from './selectUser.vue';
import { parseTime } from '@/utils/general';
import { allocatedUserList, authUserCancel, authUserCancelAll } from '@/api/system/role';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useDict } from '@/utils/dict';
import { DictResult } from '@/types/views/user';
import { User, QueryParams } from '@/types/views/role'

// useDict 类型假设已调整，返回 { dictLoaded: Ref<boolean>, sys_normal_disable: Ref<DictOption[]> }
const { sys_normal_disable } = useDict('sys_normal_disable') as unknown as DictResult;

// 表单 ref
const queryRef = ref<FormInstance>();
type SelectUserRef = { show: () => void; };
const selectRef = ref<InstanceType<typeof selectUser> & SelectUserRef>();

// 状态
const userList = ref<User[]>([]);
const loading = ref<boolean>(false);
const showSearch = ref<boolean>(true);
const multiple = ref<boolean>(true);
const total = ref<number>(0);
const userIds = ref<number[]>([]);

const route = useRoute();
const router = useRouter();
// 确保 roleId 有值
const roleIdFromRoute = String(route.params.roleId ?? '');
const queryParams = reactive<QueryParams>({
  pageNum: 1,
  pageSize: 10,
  roleId: roleIdFromRoute,
  userName: undefined,
  phonenumber: undefined,
});

// 查询函数
async function getList(): Promise<void> {
  loading.value = true;
  try {
    // 调试打印参数
    // 根据实际 API 签名选择传参方式：
    // 假设 allocatedUserList 接收对象：
    const resp = await allocatedUserList(queryParams);
    // 处理可能的 AxiosResponse 包装：
    let data: any;
    if ((resp as any).data !== undefined) {
      data = (resp as any).data;
    } else {
      data = resp;
    }
    // 如果 data 里再嵌套 data 字段：
    if (data && data.data !== undefined) {
      data = data.data;
    }
    // 现在 data 应该包含 rows 和 total
    if (Array.isArray(data.rows)) {
      userList.value = data.rows;
      total.value = data.total ?? data.rows.length;
    } else {
      console.warn('[getList] data.rows 不是数组', data);
      userList.value = [];
      total.value = 0;
      ElMessage.error('获取用户列表格式异常');
    }
  } catch (error) {
    console.error('[getList] 异常', error);
    userList.value = [];
    total.value = 0;
    ElMessage.error('获取授权用户列表失败');
  } finally {
    loading.value = false;
  }
}

// 返回/关闭
function handleClose(): void {
  router.back();
}

// 搜索
function handleQuery(): void {
  queryParams.pageNum = 1;
  getList();
}

// 重置查询
function resetQuery(): void {
  if (queryRef.value) {
    queryRef.value.resetFields();
  }
  queryParams.pageNum = 1;
  queryParams.userName = undefined;
  queryParams.phonenumber = undefined;
  getList();
}

// 多选框变化
function handleSelectionChange(selection: User[]): void {
  userIds.value = selection.map(item => item.userId);
  multiple.value = selection.length === 0;
}

// 打开选择用户弹窗
function openSelectUser(): void {
  if (selectRef.value && typeof selectRef.value.show === 'function') {
    selectRef.value.show();
  } else {
    console.warn('selectRef 未就绪或无 show 方法');
  }
}

// 取消单个用户授权
function cancelAuthUser(row: User): void {
  ElMessageBox.confirm(`确认要取消该用户 "${row.userName}" 的授权吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await authUserCancel({ userId: row.userId, roleId: queryParams.roleId });
        ElMessage.success('取消授权成功');
        getList();
      } catch (err) {
        console.error('cancelAuthUser 异常', err);
        ElMessage.error('取消授权失败');
      }
    })
    .catch(() => { });
}

// 批量取消授权
function cancelAuthUserAll(): void {
  if (userIds.value.length === 0) {
    ElMessage.warning('请先选择要取消授权的用户');
    return;
  }
  const uIds = userIds.value.join(',');
  ElMessageBox.confirm('确认要批量取消选中用户的授权吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await authUserCancelAll({ roleId: queryParams.roleId, userIds: uIds });
        ElMessage.success('批量取消授权成功');
        userIds.value = [];
        multiple.value = true;
        getList();
      } catch (err) {
        console.error('cancelAuthUserAll 异常', err);
        ElMessage.error('批量取消授权失败');
      }
    })
    .catch(() => { });
}

onMounted(() => {
  getList();
});
</script>
