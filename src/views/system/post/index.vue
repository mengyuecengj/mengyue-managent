<template>
  <div class="app-container">
    <MYRow :gutter="20">
      <MYForm :modelValue="queryParams" ref="queryRef" v-show="showSearch" :inline="true" labelWidth="68">
        <MYRow :gutter="16">
          <!-- 角色名称 -->
          <MYCol :span="6">
            <MYForm-item label="岗位编码" prop="postCode">
              <MYInput v-model="queryParams.postCode" placeholder="请输入角色名称" clearable @keyup.enter="handleQuery"
                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
            </MYForm-item>
          </MYCol>

          <!-- 权限字符 -->
          <MYCol :span="6">
            <MYForm-item label="岗位名称" prop="postName">
              <MYInput v-model="queryParams.postName" placeholder="请输入权限字符" clearable @keyup.enter="handleQuery"
                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
            </MYForm-item>
          </MYCol>

          <!-- 状态 -->
          <MYCol :span="7">
            <MYForm-item label="状态" prop="status">
              <MYSelect v-model="queryParams.status" placeholder="角色状态" clearable>
                <MYOption v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </MYSelect>
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
    </MYRow>

    <!-- 操作按钮 -->
    <MYRow :gutter="10" class="mb8" style="margin-top: 10px;">
      <MYCol :span="2">
        <MYButton type="primary" icon="MYPlus" @click="handleAdd" v-hasPermi="['system:post:add']">新增</MYButton>
      </MYCol>
      <MYCol :span="2">
        <MYButton type="success" icon="MYEdit" :disabled="single" @click="() => handleUpdate()"
          v-hasPermi="['system:role:edit']">修改</MYButton>
      </MYCol>
      <MYCol :span="2">
        <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="() => handleDelete()"
          v-hasPermi="['system:role:remove']">删除</MYButton>
      </MYCol>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" />
    </MYRow>

    <!-- 表格数据 -->
    <MYTable v-loading="loading" :data="postList" @selection-change="handleSelectionChange"
      style="width: 100%; min-width: 850px; margin-top: 10px;" headerBackgroundColor="var(--table-header-bg)"
      borderColor="var(--table-border-color)" bodyBackgroundColor="var(--table-body-bg)"
      headerTextColor="var(--general)" bodyTextColor="var(--general)" table-layout="fixed">
      <MYTable-column type="selection" width="60" align="center" />
      <MYTable-column label="岗位编号" align="center" prop="postId" width="100" />
      <MYTable-column label="岗位编码" align="center" prop="postCode" width="120" />
      <MYTable-column label="岗位名称" align="center" prop="postName" width="150" />
      <MYTable-column label="岗位排序" align="center" prop="postSort" width="100" />
      <MYTable-column label="状态" align="center" prop="status" width="100" />
      <template #status="scope">
        <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
      </template>
      <MYTable-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </MYTable-column>
      <MYTable-column label="操作" align="center" prop="operation" width="150" class-name="small-padding fixed-width" />
      <template #operation="scope">
        <MYButton link type="primary" icon="MYEdit" @click="() => handleUpdate(scope.row)"
          v-hasPermi="['system:post:edit']" colorBg="var(--table-body-bg)" colorText="var(--general-text)">修改</MYButton>
        <MYButton link type="primary" icon="MYDelete" @click="() => handleDelete(scope.row)"
          v-hasPermi="['system:post:remove']" colorBg="var(--table-body-bg)" colorText="var(--general-text)">删除
        </MYButton>
      </template>
    </MYTable>

    <!-- 分页 -->
    <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />

    <!-- 新增/修改 对话框 -->
    <MYDialog height="480px" :title="title" v-model="open" width="600px" append-to-body
      backgroundColor="var(--dialog-bg) !important" textColor="var(--general)">
      <MYForm class="dialog_form" ref="postRef" :model="form" :rules="rules" label-width="100px">
        <MYForm-item label="岗位编码" prop="postCode">
          <MYInput v-model="form.postCode" placeholder="请输入岗位编码" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
        </MYForm-item>
        <MYForm-item label="岗位名称" prop="postName">
          <MYInput v-model="form.postName" placeholder="请输入岗位名称" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
        </MYForm-item>
        <MYForm-item label="岗位排序" prop="postSort">
          <MYInputNumber v-model="form.postSort" :min="0" controls-position="right" />
        </MYForm-item>
        <MYForm-item label="状态" prop="status">
          <MYRadio-group v-model="form.status">
            <MYRadio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item label="备注" prop="remark">
          <MYInput v-model="form.remark" type="textarea" placeholder="请输入备注" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
        </MYForm-item>
      </MYForm>
      <template #footer>
        <MYButton type="primary" @click="submitForm">确 定</MYButton>
        <MYButton @click="cancel">取 消</MYButton>
      </template>
    </MYDialog>
  </div>
</template>

<script setup lang="ts">
import {
  listPost,
  addPost,
  delPost,
  getPost,
  updatePost,
} from '@/api/system/post';
import { useDict } from '@/utils/dict';
import { parseTime } from '@/utils/general';
import { DictResult } from '@/types/views/user';
import { Post, ListPostResponse, GetPostResponse } from '@/types/views/post'
import { MYRadioGroup } from 'mengyue-plus';

// ===== 字典 =====
const { sys_normal_disable } = useDict(
  'sys_normal_disable'
) as unknown as DictResult;

// ===== refs & state =====
const queryRef = ref();
const postRef = ref();

const postList = ref<Post[]>([]);
const open = ref(false);
const loading = ref<boolean>(false);
const showSearch = ref<boolean>(true);
const ids = ref<number[]>([]);
const single = ref<boolean>(true);
const multiple = ref<boolean>(true);
const total = ref<number>(0);
const title = ref<string>('');

const data = reactive({
  form: {
    postId: undefined as number | undefined,
    postCode: '' as string,
    postName: '' as string,
    postSort: 0 as number,
    status: '0' as string,
    remark: '' as string | undefined,
  },
  queryParams: {
    pageNum: 1 as number,
    pageSize: 10 as number,
    postCode: undefined as string | undefined,
    postName: undefined as string | undefined,
    status: undefined as string | undefined,
  },
  rules: {
    postCode: [{ required: true, message: '岗位编码不能为空', trigger: 'blur' }],
    postName: [{ required: true, message: '岗位名称不能为空', trigger: 'blur' }],
    postSort: [{ required: true, message: '岗位排序不能为空', trigger: 'blur' }],
  },
});
const { queryParams, form, rules } = toRefs(data);

// unwrapResponse：兼容 AxiosResponse 或直接返回对象
function unwrapResponse<T>(resp: any): T | null {
  let data = resp;
  if (data && typeof data === 'object' && 'data' in data) {
    data = data.data;
  }
  if (data && typeof data === 'object' && 'data' in data) {
    data = data.data;
  }
  return data == null ? null : (data as T);
}

// ===== 查询岗位列表 =====
async function getList(): Promise<void> {
  loading.value = true;
  try {
    // 根据后端API签名，如果需要 JSON.stringify，可改为 JSON.stringify(queryParams.value)
    const params = {
      pageNum: queryParams.value.pageNum,
      pageSize: queryParams.value.pageSize,
      postCode: queryParams.value.postCode,
      postName: queryParams.value.postName,
      status: queryParams.value.status,
    };
    const resp = await listPost(params);
    const dataUnwrapped = unwrapResponse<ListPostResponse>(resp);
    if (dataUnwrapped && Array.isArray(dataUnwrapped.rows)) {
      postList.value = dataUnwrapped.rows;
      total.value =
        typeof dataUnwrapped.total === 'number'
          ? dataUnwrapped.total
          : dataUnwrapped.rows.length;
    } else {
      console.warn('[Post] getList 未解析到 rows:', dataUnwrapped);
      postList.value = [];
      total.value = 0;
      ElMessage.error('获取岗位列表格式异常');
    }
  } catch (err) {
    console.error('[Post] getList 异常', err);
    postList.value = [];
    total.value = 0;
    ElMessage.error('获取岗位列表失败');
  } finally {
    loading.value = false;
  }
}

// ===== 搜索 =====
function handleQuery(): void {
  queryParams.value.pageNum = 1;
  getList();
}

// ===== 重置查询 =====
function resetQuery(): void {
  if (queryRef.value) {
    queryRef.value.resetFields();
  }
  queryParams.value.pageNum = 1;
  queryParams.value.postCode = undefined;
  queryParams.value.postName = undefined;
  queryParams.value.status = undefined;
  getList();
}

// ===== 表格多选变化 =====
function handleSelectionChange(selection: Post[]): void {
  ids.value = selection.map(item => item.postId!).filter(id => id !== undefined) as number[];
  single.value = selection.length !== 1;
  multiple.value = selection.length === 0;
}

// ===== 取消对话框 =====
function cancel(): void {
  open.value = false;
  resetForm();
}

// 重置表单数据
function resetForm(): void {
  form.value = {
    postId: undefined,
    postCode: '',
    postName: '',
    postSort: 0,
    status: '0',
    remark: '',
  };
  if (postRef.value) {
    postRef.value.resetFields();
  }
}

// ===== 新增 =====
function handleAdd(): void {
  resetForm();
  title.value = '添加岗位';
  open.value = true;
}

// ===== 修改 =====
async function handleUpdate(row?: Post): Promise<void> {
  resetForm();
  let postId: number | undefined;
  if (row && row.postId !== undefined) {
    postId = row.postId;
  } else if (ids.value.length === 1) {
    postId = ids.value[0];
  }
  if (postId === undefined) {
    ElMessage.warning('请选择要修改的岗位');
    return;
  }
  try {
    const resp = await getPost({ pageNum: postId });
    const dataUnwrapped = unwrapResponse<GetPostResponse>(resp);
    if (dataUnwrapped) {
      form.value = {
        postId: dataUnwrapped.postId,
        postCode: dataUnwrapped.postCode,
        postName: dataUnwrapped.postName,
        postSort: dataUnwrapped.postSort,
        status: dataUnwrapped.status,
        remark: dataUnwrapped.remark,
      };
      title.value = '修改岗位';
      open.value = true;
    } else {
      ElMessage.error('获取岗位信息失败');
    }
  } catch (err) {
    console.error('[Post] handleUpdate 异常', err);
    ElMessage.error('获取岗位信息异常');
  }
}

// ===== 提交表单 =====
function submitForm(): void {
  if (!postRef.value) {
    ElMessage.error('表单未就绪');
    return;
  }
  postRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const formData: any = {
        postCode: form.value.postCode,
        postName: form.value.postName,
        postSort: form.value.postSort,
        status: form.value.status,
        remark: form.value.remark,
      };
      if (form.value.postId !== undefined) {
        formData.postId = form.value.postId;
      }
      try {
        if (form.value.postId !== undefined) {
          const resp = await updatePost(formData);
          const dataUnwrapped = unwrapResponse<{ msg?: string }>(resp);
          const msg = dataUnwrapped?.msg ?? '修改成功';
          ElMessage.success(msg);
        } else {
          const resp = await addPost(formData);
          const dataUnwrapped = unwrapResponse<{ msg?: string }>(resp);
          const msg = dataUnwrapped?.msg ?? '新增成功';
          ElMessage.success(msg);
        }
        open.value = false;
        getList();
      } catch (err) {
        console.error('[Post] submitForm 异常', err);
        ElMessage.error('保存岗位失败');
      }
    }
  });
}

// ===== 删除 =====
async function handleDelete(row?: Post): Promise<void> {
  let postIds: number[];
  if (row && row.postId !== undefined) {
    postIds = [row.postId];
  } else {
    postIds = ids.value;
  }
  if (postIds.length === 0) {
    ElMessage.warning('请选择要删除的岗位');
    return;
  }
  try {
    await ElMessageBox.confirm(
      `是否确认删除岗位编号为 "${postIds.join(',')}" 的数据？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    const resp = await delPost(postIds.join(','));
    const dataUnwrapped = unwrapResponse<{ msg?: string }>(resp);
    const msg = dataUnwrapped?.msg ?? '删除成功';
    ElMessage.success(msg);
    getList();
  } catch (err) {
    // 如果用户取消确认，err 会被捕获，这里忽略
    if (err !== 'cancel' && err !== 'close') {
      console.error('[Post] handleDelete 异常', err);
      ElMessage.error('删除失败');
    }
  }
}

// ===== 初始化 =====
getList();
</script>
