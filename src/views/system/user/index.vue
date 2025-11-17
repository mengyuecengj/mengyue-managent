<template>
  <div class="app-container">
    <MYRow :gutter="24">
      <!-- 查询表单 -->
      <MYForm :model-value="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="80">
        <MYRow :gutter="16">
          <!-- 用户名称 -->
          <MYCol :span="8">
            <MYForm-item label="用户名称" prop="userName">
              <MYInput
                v-model="queryParams.userName"
                placeholder="请输入用户名称"
                clearable
                @keyup.enter="handleQuery"
                placeholder-color="var(--navbar-text)"
                text-color="var(--navbar-text)"
              />
            </MYForm-item>
          </MYCol>

          <!-- 用户昵称 -->
          <MYCol :span="8">
            <MYForm-item label="用户昵称" prop="nickName">
              <MYInput
                v-model="queryParams.nickName"
                placeholder="请输入用户昵称"
                placeholder-color="var(--navbar-text)"
                clearable
                @keyup.enter="handleQuery"
                text-color="var(--navbar-text)"
              />
            </MYForm-item>
          </MYCol>

          <!-- 手机号码 -->
          <MYCol :span="8">
            <MYForm-item label="手机号码" prop="phonenumber">
              <MYInput
                v-model="queryParams.phonenumber"
                placeholder="请输入手机号码"
                placeholder-color="var(--navbar-text)"
                clearable
                @keyup.enter="handleQuery"
                text-color="var(--navbar-text)"
              />
            </MYForm-item>
          </MYCol>

          <!-- 状态 -->
          <MYCol :span="8">
            <MYForm-item label="状态" prop="status">
              <MYSelect v-model="queryParams.status" placeholder="用户状态" clearable>
                <MYOption v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
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
          <MYCol :span="4">
            <MYForm-item>
              <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">重置</MYButton>
            </MYForm-item>
          </MYCol>
        </MYRow>
      </MYForm>
    </MYRow>

    <!-- 操作按钮 -->
    <MYRow :gutter="16" class="mb8">
      <MYCol :span="3">
        <MYButton type="primary" icon="MYPlus" @click="handleAdd" color-text="#fff">新增</MYButton>
      </MYCol>
      <MYCol :span="3">
        <MYButton type="success" :disabled="!single" @click="handleUpdate">
          <MYEdit size="14px" color="white" /> 修改
        </MYButton>
      </MYCol>
      <MYCol :span="3">
        <MYButton type="danger" :disabled="!single" @click="handleDelete">
          <MYDelete size="14px" color="white" /> 删除
        </MYButton>
      </MYCol>
      <right-toolbar v-model:show-search="showSearch" @query-table="getList" :columns="columns" />
    </MYRow>

    <!-- 表格数据 -->
    <MYTable
      header-background-color="var(--table-header-bg)"
      border-color="var(--table-border-color)"
      body-background-color="var(--table-body-bg)"
      v-loading="loading"
      :data="userList"
      @selection-change="handleSelectionChange"
      header-text-color="var(--general)"
      body-text-color="var(--general)"
      row-key="userId"
      stripe="var(--table-stripe-bg)"
    >
      <MYTable-column type="selection" width="50" align="center" />
      <MYTable-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
      <MYTable-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <MYTable-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" />
      <MYTable-column label="部门" align="center" key="deptName" prop="deptName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
      <MYTable-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120" />
      <MYTable-column label="状态" align="center" prop="status" key="status" v-if="columns[5].visible" />
      <template #status="scope">
        <MYSwitch
          :model-value="scope.row.status === '0'"
          size="small"
          :active-value="true"
          :inactive-value="false"
          @change="(val: boolean) => handleStatusChange(scope.row, val)"
        />
      </template>
      <MYTable-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
        <template #createTime="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </MYTable-column>
      <MYTable-column label="操作" align="center" prop="operation" class-name="small-padding fixed-width" />
      <template #operation="scope">
        <div v-if="scope.row.userId !== 1" class="operation-buttons">
          <MYButton
            size="supersmall"
            link
            type="primary"
            icon="MYEdit"
            color-bg="transparent"
            color-text="var(--general-text)"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:user:edit']"
          >
            修改
          </MYButton>
          <MYButton
            size="supersmall"
            link
            type="primary"
            icon="MYDelete"
            color-bg="transparent"
            color-text="var(--general-text)"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:user:remove']"
          >
            删除
          </MYButton>
          <MYButton
            size="supersmall"
            link
            type="primary"
            icon="MYUnlockAlt"
            color-bg="transparent"
            color-text="var(--general-text)"
            @click="handleResetPwd(scope.row)"
            v-hasPermi="['system:user:resetPwd']"
          >
            重置
          </MYButton>
          <MYButton
            size="supersmall"
            link
            type="primary"
            icon="MYCircleCheck"
            color-bg="transparent"
            color-text="var(--general-text)"
            @click="handleAuthRole(scope.row)"
            v-hasPermi="['system:user:edit']"
          >
            授权
          </MYButton>
        </div>
      </template>
    </MYTable>

    <!-- 分页 -->
    <pagination
      class="pagination-container"
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加/修改用户对话框 -->
    <MYDialog
      :title="title"
      v-model="open"
      width="800px"
      height="600px"
      background-color="var(--dialog-bg) !important"
      text-color="var(--general)"
      :show-close="false"
      append-to-body
    >
      <MYForm class="dialog_form" ref="userRef" :model-value="form" :rules="rules" label-width="80">
        <MYRow>
          <MYCol :span="12">
            <MYForm-item label="用户昵称" prop="nickName">
              <MYInput
                v-model="form.nickName"
                placeholder="请输入用户昵称"
                placeholder-color="var(--navbar-text)"
                maxlength="30"
              />
            </MYForm-item>
          </MYCol>
          <MYCol :span="12">
            <MYForm-item label="归属部门" prop="deptId">
              <MYTree-select
                v-model="form.deptId"
                :data="enabledDeptOptions"
                :props="{ label: 'label', children: 'children', value: 'id' }"
                :multiple="false"
                :filterable="false"
                :showArrow="true"
                :size="'large'"
                :popper-class="'custom-dropdown'"
                background-color="#0f1115"
                height="10px"
              />
            </MYForm-item>
          </MYCol>
        </MYRow>
        <MYRow>
          <MYCol :span="12">
            <MYForm-item label="手机号码" prop="phonenumber">
              <MYInput
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                placeholder-color="var(--navbar-text)"
                maxlength="11"
              />
            </MYForm-item>
          </MYCol>
          <MYCol :span="12">
            <MYForm-item label="邮箱" prop="email">
              <MYInput
                v-model="form.email"
                placeholder="请输入邮箱"
                placeholder-color="var(--navbar-text)"
                maxlength="50"
              />
            </MYForm-item>
          </MYCol>
        </MYRow>
        <MYRow>
          <MYCol :span="12">
            <MYForm-item v-if="!form.userId" label="用户名称" prop="userName">
              <MYInput
                v-model="form.userName"
                placeholder="请输入用户名称"
                placeholder-color="var(--navbar-text)"
                maxlength="30"
              />
            </MYForm-item>
          </MYCol>
          <MYCol :span="12">
            <MYForm-item v-if="!form.userId" label="用户密码" prop="password">
              <MYInput
                v-model="form.password"
                placeholder="请输入用户密码"
                placeholder-color="var(--navbar-text)"
                type="password"
                maxlength="20"
                show-password
              />
            </MYForm-item>
          </MYCol>
        </MYRow>
        <MYRow>
          <MYCol :span="12">
            <MYForm-item label="用户性别" prop="sex" v-if="dictLoaded">
              <MYSelect v-model="form.sex" placeholder="请选择性别" clearable>
                <MYOption v-for="dict in sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value" />
              </MYSelect>
            </MYForm-item>
          </MYCol>
          <MYCol :span="12">
            <MYForm-item label="状态" prop="status">
              <MYRadio-group v-model="form.status">
                <MYRadio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">
                  {{ dict.label }}
                </MYRadio>
              </MYRadio-group>
            </MYForm-item>
          </MYCol>
        </MYRow>
        <MYRow>
          <MYCol :span="12">
            <MYForm-item label="岗位" prop="postIds" v-if="postOptions?.length">
              <MYSelect :v-model="form.postIds.join(',')" multiple placeholder="请选择岗位" @change="handlePostChange">
                <MYOption
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                />
              </MYSelect>
            </MYForm-item>
          </MYCol>
          <MYCol :span="12">
            <MYForm-item label="角色" prop="roleIds" v-if="roleOptions?.length">
              <MYSelect :v-model="form.roleIds.join(',')" multiple placeholder="请选择角色" @change="handleRoleChange">
                <MYOption
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                />
              </MYSelect>
            </MYForm-item>
          </MYCol>
        </MYRow>
        <MYRow>
          <MYCol :span="24">
            <MYForm-item label="备注">
              <MYInput
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
                placeholder-color="var(--navbar-text)"
                :rows="3"
                maxlength="500"
              />
            </MYForm-item>
          </MYCol>
        </MYRow>
      </MYForm>
      <template #footer>
        <div class="dialog-footer">
          <MYRow :gutter="20">
            <MYCol :span="12">
              <MYButton type="primary" @click="submitForm">确定</MYButton>
            </MYCol>
            <MYCol :span="4">
              <MYButton type="info" @click="cancel">取消</MYButton>
            </MYCol>
          </MYRow>
        </div>
      </template>
    </MYDialog>
  </div>
</template>
<script setup name="User" lang="ts">
import modal from '@/plugins/modal'
import { useRouter } from 'vue-router';
import { parseTime } from '@/utils/general';
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  updateUser,
  addUser,
  deptTreeSelect,
} from "@/api/system/user";
import "splitpanes/dist/splitpanes.css";
import { useDict } from '@/utils/dict'
import { User, UserForm, QueryParams, Column, DeptNode, DictResult, Rule, ValidationError } from '@/types/views/user';

const router = useRouter();
const { proxy } = getCurrentInstance() as any;
const { sys_normal_disable, sys_user_sex } = useDict("sys_normal_disable", "sys_user_sex") as unknown as DictResult;

const userList = ref<User[]>([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<number[]>([]);
const single = ref(false);
const multiple = ref(false);
const total = ref(0);
const title = ref("新增用户");
const dateRange = ref<string[]>([]);
const deptName = ref("");
const deptOptions = ref<DeptNode[]>([]);
const enabledDeptOptions = ref<DeptNode[]>();
const initPassword = ref<string | undefined>(undefined);
const postOptions = ref<any[]>([]);
const roleOptions = ref<any[]>([]);
const dictLoaded = ref(false);

// 列显隐信息
const columns = ref<Column[]>([
  { key: 0, label: `用户编号`, visible: true },
  { key: 1, label: `用户名称`, visible: true },
  { key: 2, label: `用户昵称`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true },
  { key: 5, label: `状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true },
]);

// 表单数据 - 直接使用 ref，像 login.vue 一样
const form = ref<UserForm>({
  userId: undefined,
  deptId: undefined,
  userName: undefined,
  nickName: undefined,
  password: undefined,
  phonenumber: undefined,
  email: undefined,
  sex: undefined,
  status: '0',
  remark: undefined,
  postIds: [],
  roleIds: [],
});

const queryParams = ref<QueryParams>({
  pageNum: 1,
  pageSize: 10,
  userName: undefined,
  nickName: undefined,
  phonenumber: undefined,
  deptId: undefined,
  status: "",
});

// 修改密码验证规则，在修改时不验证密码
const rules = computed(() => {
  const baseRules: Record<string, Rule[]> = {
    userName: [
      { required: true, message: "用户名称不能为空", trigger: "blur" },
      { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" },
    ],
    nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    password: [
      { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" },
      { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\ |", trigger: "blur" },
    ],
    email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phonenumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
    deptId: [{ required: true, message: "部门不能为空", trigger: "change" }],
  };

  // 只在新增时验证密码
  if (!form.value.userId) {
    baseRules.password.unshift({ required: true, message: "用户密码不能为空", trigger: "blur" });
  }

  return baseRules;
});
// 组件 Refs
const deptTreeRef = ref();
const queryRef = ref();
const userRef = ref();

// 工具函数
const filterNode = (value: string, data: any): boolean => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

// 监听部门搜索
watch(deptName, (val: string) => {
  if (deptTreeRef.value) {
    deptTreeRef.value.filter(val);
  }
});

// 监听字典加载
watch([sys_normal_disable, sys_user_sex], () => {
  dictLoaded.value = true;
});

// 默认表单数据
const defaultForm = {
  userId: undefined,
  deptId: undefined,
  userName: undefined,
  nickName: undefined,
  password: undefined,
  phonenumber: undefined,
  email: undefined,
  sex: undefined,
  status: "0", // 确保是字符串
  remark: undefined,
  postIds: [],
  roleIds: [],
};

// 重置表单
const reset = async () => {
  Object.assign(form.value, defaultForm);
  await nextTick();
  userRef.value?.resetFields();
};

// 查询用户列表
const getList = () => {
  loading.value = true;
  
  const requestParams = {
    pageNum: queryParams.value.pageNum,
    pageSize: queryParams.value.pageSize,
    userName: queryParams.value.userName || undefined,
    nickName: queryParams.value.nickName || undefined,
    phonenumber: queryParams.value.phonenumber || undefined,
    status: queryParams.value.status || undefined,
    deptId: queryParams.value.deptId || undefined, // 确保包含这个
  };
    
  // 使用 addDateRange
  const finalParams = proxy.addDateRange(requestParams, dateRange.value);
  
  listUser(finalParams).then((response: any) => {
    loading.value = false;
    userList.value = response.rows;
    total.value = response.total;
  });
};

// 查询部门树
const getDeptTree = () => {
  deptTreeSelect().then((response) => {
    deptOptions.value = response.data;
    enabledDeptOptions.value = filterDisabledDept(JSON.parse(JSON.stringify(response.data)));
  });
};

// 过滤禁用部门
const filterDisabledDept = (deptList: DeptNode[]): DeptNode[] => {
  return deptList.filter((dept: DeptNode) => {
    if (dept.disabled) {
      return false;
    }
    if (dept.children && dept.children.length) {
      dept.children = filterDisabledDept(dept.children);
    }
    return true;
  });
};
// 节点点击
const handleNodeClick = (data: DeptNode): void => {
  
  // 确保部门ID正确设置
  if (data && data.id) {
    queryParams.value.deptId = Number(data.id);
  } else {
    queryParams.value.deptId = undefined;
  }
  
  queryParams.value.pageNum = 1;
  handleQuery();
};

// 搜索
const handleQuery = (): void => {
  queryParams.value.pageNum = 1;
  getList();
};

// 重置查询
const resetQuery = (): void => {
  dateRange.value = [];
  
  // 手动重置所有查询参数到初始状态
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    userName: '',
    nickName: '',
    phonenumber: '',
    deptId: undefined,
    status: '',
  };
  
  // 重置搜索输入框
  deptName.value = "";
  
  // 如果有表单引用，仍然调用 resetFields 来清除验证状态
  if (queryRef.value) {
    queryRef.value.resetFields();
  }
  
  handleQuery();
};

// 选择变化
const handleSelectionChange = (selection: User[]): void => {
  ids.value = selection.map((item) => item.userId);
  single.value = selection.length === 1;
  multiple.value = selection.length > 0;
};

// 删除
const handleDelete = (row?: any) => {
  const userIds = row?.userId || ids.value;
  modal.confirm(`是否确认删除用户编号为"${userIds}"的数据项?`).then(() => {
    return delUser(userIds);
  }).then(() => {
    getList();
    modal.msgSuccess('删除成功');
  }).catch(() => { });
};

// 导出
const handleExport = (): void => {
  proxy.download(
    "system/user/export",
    { ...queryParams.value },
    `user_${new Date().getTime()}.xlsx`
  );
};
// 在表格脚本中加强状态变更处理
const handleStatusChange = async (row: User, val: boolean): Promise<void> => {
  const originalStatus = row.status; // 保存原始状态

  try {
    // 立即更新本地状态
    const newStatus = val ? '0' : '1';
    row.status = newStatus;

    const text = val ? "启用" : "停用";
    await modal.confirm(`确认要"${text}"用户"${row.userName}"吗?`);

    await changeUserStatus(row.userId, newStatus);
    modal.msgSuccess(`${text}成功`);

    // 重新获取数据确保一致性
    await getList();

  } catch (error) {
    console.error('状态变更失败:', error);
    // 恢复原始状态
    row.status = originalStatus;
    // 强制重新渲染
    await nextTick();
  }
};

// 授权角色
const handleAuthRole = (row: User): void => {
  const userId = row.userId;
  if (!userId || isNaN(Number(userId))) {
    modal.msgError('用户ID无效');
    return;
  }
  router.push(`/system/user-auth/role/${userId}`);
};

// 重置密码
const handleResetPwd = async (row: User): Promise<void> => {
  try {
    const result = await modal.prompt(
      `请输入"${row.userName}"的新密码`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
        inputValidator: (value: string) => {
          if (/<|>|"|'|\||\\/.test(value)) {
            return "不能包含非法字符：< > \" ' \\ |";
          }
          return true;
        },
      }
    );

    if (result) {
      await resetUserPwd(row.userId, result);
      modal.msgSuccess("密码重置成功");
    }
  } catch (error) {
    // 用户取消操作
  }
};

// 取消
const cancel = (): void => {
  open.value = false;
  reset();
};

// 新增
const handleAdd = (): void => {
  reset();
  title.value = "新增用户";
  getUser(undefined).then((response: any) => {
    postOptions.value = response.posts;
    roleOptions.value = response.roles;
    open.value = true;
    nextTick(() => {
      form.value.password = initPassword.value;
      // 确保状态设置为 "0"（正常）
      form.value.status = "0";
    });
  });
};

// 修改
// 在 handleUpdate 方法中加强数据类型处理
const handleUpdate = (row?: User): void => {
  if (!row && !ids.value.length) {
    modal.msgError("请先选择一个用户");
    return;
  }

  reset();
  const userId = row?.userId || ids.value[0];

  getUser(userId).then((response: any) => {
    const userData = { ...response.data };

    // 修复：确保 sex 字段有值，如果后端没返回就使用默认值
    if (userData.sex === undefined || userData.sex === null) {
      userData.sex = "0"; // 默认值，根据你的字典设置，比如 "0" 表示未知
    } else {
      userData.sex = String(userData.sex);
    }

    if (userData.status !== undefined && userData.status !== null) {
      userData.status = String(userData.status);
    }

    // 确保数组字段存在且是数组
    userData.postIds = Array.isArray(response.postIds) ? response.postIds : [];
    userData.roleIds = Array.isArray(response.roleIds) ? response.roleIds : [];

    // 使用 Object.assign 确保响应式更新
    Object.assign(form.value, userData);

    postOptions.value = response.posts || [];
    roleOptions.value = response.roles || [];
    title.value = "修改用户";
    form.value.password = "";
    open.value = true;

    // 延迟确保数据绑定完成
    nextTick(() => {
      if (userRef.value) {
        userRef.value.clearValidate();
      }
    });
  }).catch(error => {
    console.error('获取用户数据失败:', error);
    modal.msgError('获取用户信息失败');
  });
};

// 添加处理函数
const handlePostChange = (value: any) => {
  if (Array.isArray(value)) {
    form.value.postIds = value;
  }
};

const handleRoleChange = (value: any) => {
  if (Array.isArray(value)) {
    form.value.roleIds = value;
  }
};
const postIdsString = computed({
  get: () => form.value.postIds.join(','),
  set: (value) => {
    if (value) {
      form.value.postIds = value.split(',').filter(Boolean).map(Number);
    } else {
      form.value.postIds = [];
    }
  }
});

const roleIdsString = computed({
  get: () => form.value.roleIds.join(','),
  set: (value) => {
    if (value) {
      form.value.roleIds = value.split(',').filter(Boolean).map(Number);
    } else {
      form.value.roleIds = [];
    }
  }
});


const submitForm = async (): Promise<void> => {
  if (!userRef.value) {
    modal.msgError('表单引用未初始化');
    return;
  }

  try {
    // 验证表单
    await userRef.value.validate();

    // 客户端重复检查
    const currentUserId = form.value.userId;
    
    // 检查用户名重复（新增时检查，修改时排除自己）
    const existUserName = userList.value.find(user => 
      user.userName === form.value.userName && user.userId !== currentUserId
    );
    if (existUserName) {
      modal.msgError(`用户名 "${form.value.userName}" 已存在，请使用其他用户名`);
      return;
    }

    // 检查手机号重复
    if (form.value.phonenumber) {
      const existPhone = userList.value.find(user => 
        user.phonenumber === form.value.phonenumber && user.userId !== currentUserId
      );
      if (existPhone) {
        modal.msgError(`手机号码 "${form.value.phonenumber}" 已存在，请使用其他手机号`);
        return;
      }
    }

    // 检查邮箱重复
    if (form.value.email) {
      const existEmail = userList.value.find(user => 
        user.email === form.value.email && user.userId !== currentUserId
      );
      if (existEmail) {
        modal.msgError(`邮箱 "${form.value.email}" 已存在，请使用其他邮箱`);
        return;
      }
    }

    const submitData = {
      ...form.value,
      // 确保数据类型正确
      sex: form.value.sex ? parseInt(form.value.sex) : undefined,
      status: form.value.status ? parseInt(form.value.status) : 0,
      // 确保岗位和角色是数组
      postIds: Array.isArray(form.value.postIds) ? form.value.postIds : [],
      roleIds: Array.isArray(form.value.roleIds) ? form.value.roleIds : []
    };

    // 修改时如果密码为空，则不提交密码字段
    if (submitData.userId && (!submitData.password || submitData.password.trim() === '')) {
      delete submitData.password;
    }

    if (form.value.userId !== undefined) {
      await updateUser(submitData);
      modal.msgSuccess("修改成功");
    } else {
      await addUser(submitData);
      modal.msgSuccess("新增成功");
    }

    open.value = false;
    await getList();

  } catch (error) {
    console.error('表单提交失败:', error);
  }
};
// 初始化
getDeptTree();
getList();
</script>
