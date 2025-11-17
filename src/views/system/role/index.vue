<template>
  <div class="app-container">
    <MYRow :gutter="20">
      <MYForm :modelValue="queryParams" ref="queryRef" v-show="showSearch" :inline="true" labelWidth="68">
        <MYRow :gutter="16">
          <!-- 角色名称 -->
          <MYCol :span="6">
            <MYForm-item label="角色名称" prop="roleName">
              <MYInput v-model="queryParams.roleName" placeholder="请输入角色名称" clearable @keyup.enter="handleQuery"
                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
            </MYForm-item>
          </MYCol>

          <!-- 权限字符 -->
          <MYCol :span="6">
            <MYForm-item label="权限字符" prop="roleKey">
              <MYInput v-model="queryParams.roleKey" placeholder="请输入权限字符" clearable @keyup.enter="handleQuery"
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
    <MYRow :gutter="10" class="mb8">
      <MYCol :span="2">
        <MYButton type="primary" icon="MYPlus" @click="() => handleAdd()" v-hasPermi="['system:role:add']">新增
        </MYButton>
      </MYCol>
      <MYCol :span="2">
        <!-- 多选情况下禁用，单选情况下点击修改最早选中的 -->
        <MYButton type="success" icon="MYEdit" :disabled="single" @click="() => handleUpdate()"
          v-hasPermi="['system:role:edit']">修改</MYButton>
      </MYCol>
      <MYCol :span="2">
        <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="() => handleDelete()"
          v-hasPermi="['system:role:remove']">删除</MYButton>
      </MYCol>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </MYRow>

    <!-- 表格数据 -->
    <MYTable headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
      bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
      v-loading="loading" :data="roleList" @selection-change="handleSelectionChange" row-key="roleId">
      <MYTable-column type="selection" width="55" align="center" />
      <MYTable-column label="角色编号" prop="roleId" width="120" />
      <MYTable-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
      <MYTable-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
      <MYTable-column label="显示顺序" prop="roleSort" width="100" />
      <MYTable-column label="状态" align="center" width="100" prop="body" />
      <template #body="scope">
        <MYSwitch :modelValue="scope.row.status === '0'" size="small" :active-value="true" :inactive-value="false"
          @change="(val: boolean) => handleStatusChange(scope.row, val ? '0' : '1')" />
      </template>
      <MYTable-column label="创建时间" align="center" prop="createTime">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </MYTable-column>
      <MYTable-column label="操作" align="center" prop="operation" width="150" class-name="small-padding fixed-width" />
      <template #operation="scope">
        <div v-if="scope.row.roleId !== 1" class="operation-buttons">
          <div class="operation-buttons">
            <MYButton size="supersmall" link type="primary" icon="MYEdit" colorBg="transparent"
              colorText="var(--general-text)" @click="() => handleUpdate(scope.row)" v-hasPermi="['system:role:edit']">
              修改</MYButton>
            <MYButton size="supersmall" link type="primary" icon="MYDelete" colorBg="transparent"
              colorText="var(--general-text)" @click="() => handleDelete(scope.row)"
              v-hasPermi="['system:role:remove']">删除</MYButton>
            <MYButton size="supersmall" link type="primary" icon="MYCircleCheck" colorBg="transparent"
              colorText="var(--general-text)" @click="() => handleDataScope(scope.row)"
              v-hasPermi="['system:role:edit']">数据权限</MYButton>
            <MYButton size="supersmall" link type="primary" icon="MYUserAlt" colorBg="transparent"
              colorText="var(--general-text)" @click="() => handleAuthUser(scope.row)"
              v-hasPermi="['system:role:edit']">分配用户</MYButton>
          </div>
        </div>
      </template>
    </MYTable>

    <!-- 分页 -->
    <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />

    <!-- 添加/修改 角色 对话框 -->
    <MYDialog title="新增用户" v-model="open" width="550px" height="630px" backgroundColor="var(--dialog-bg) !important"
      textColor="var(--general)" :show-close="false" append-to-body>
      <MYForm class="dialog_form" ref="roleRef" :modelValue="form" :rules="rules" labelWidth="100">
        <MYForm-item label="角色名称" prop="roleName">
          <MYInput v-model="form.roleName" placeholder="请输入角色名称" clearable @keyup.enter="handleQuery"
            placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
        </MYForm-item>
        <MYForm-item label="权限字符" prop="roleKey">
          <MYInput v-model="form.roleKey" placeholder="请输入权限字符" clearable @keyup.enter="handleQuery"
            placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
        </MYForm-item>
        <MYForm-item label="角色顺序" prop="roleSort">
          <InputNumber v-model="form.roleSort" :min="0" :max="999" width="100px" />
        </MYForm-item>
        <MYForm-item label="状态">
          <MYRadio-group v-model="form.status">
            <MYRadio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">{{ dict.label
            }}</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item label="菜单权限">
          <MYRow :gutter="20" :align="true" class="checkbox-row">
            <MYCol :span="8">
              <label class="checkbox-label">
                <MYCheckbox v-model="menuExpand" :value="true" @change="handleMenuExpand" />
                <span>展开/折叠</span>
              </label>
            </MYCol>
            <MYCol :span="8">
              <label class="checkbox-label">
                <MYCheckbox v-model="menuNodeAll" :value="true" @change="handleMenuNodeAll" />
                <span>全选/全不选</span>
              </label>
            </MYCol>
            <MYCol :span="8">
              <label class="checkbox-label">
                <MYCheckbox v-model="form.menuCheckStrictly" :value="true" @change="handleMenuTreeConnect" />
                <span>父子联动</span>
              </label>
            </MYCol>
          </MYRow>
          <MYTree v-if="treeVisible" ref="menuTreeRef" class="tree-border" :data="menuOptions"
            :props="{ label: 'label', children: 'children', value: 'id' }" :showCheckbox="true" :showArrow="true"
            :checkedKeys="form.menuIds" :checkStrictly="!form.menuCheckStrictly" :defaultExpanded="menuExpand"
            :defaultExpandedKeys="menuExpand ? getAllMenuKeys(menuOptions) : []" @check-change="handleMenuCheckChange"
            node-key="id" empty-text="加载中，请稍候" backgroundColor="#0f1115" />
        </MYForm-item>
        <MYForm-item label="备注">
          <MYInput v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </MYForm-item>
      </MYForm>
      <template #footer>
        <div class="dialog-footer">
          <MYButton style="margin-right: 20px;" type="primary" @click="submitForm">确 定</MYButton>
          <MYButton type="info" @click="cancel">取 消</MYButton>
        </div>
      </template>
    </MYDialog>

    <!-- 分配数据权限 对话框 -->
    <MYDialog :title="title" v-model="openDataScope" width="500px" height="550px" append-to-body
      backgroundColor="var(--dialog-bg) !important" textColor="var(--general)">
      <MYForm class="dialog_form" :model-value="form" label-width="80">
        <MYForm-item label="角色名称">
          <MYInput v-model="form.roleName" placeholder="请输入角色名称" :disabled="true" placeholderColor="var(--navbar-text)"
            textColor="var(--navbar-text)" />
        </MYForm-item>
        <MYForm-item label="权限字符">
          <MYInput v-model="form.roleKey" placeholder="请输入权限字符" :disabled="true" placeholderColor="var(--navbar-text)"
            textColor="var(--navbar-text)" />
        </MYForm-item>
        <MYForm-item label="权限范围">
          <MYSelect v-model="form.dataScope" @change="(val: any) => dataScopeSelectChange(String(val))">
            <MYOption v-for="item in dataScopeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </MYSelect>
        </MYForm-item>
        <MYForm-item label="数据权限" v-show="Number(form.dataScope) === 2">
          <MYRow :gutter="20" :align="true" class="checkbox-row">
            <MYCol :span="8">
              <label class="checkbox-label">
                <MYCheckbox v-model="deptExpand" :value="true" @change="handleDeptExpand" />
                <span>展开/折叠</span>
              </label>
            </MYCol>
            <MYCol :span="8">
              <label class="checkbox-label">
                <MYCheckbox v-model="deptNodeAll" :value="true" @change="handleDeptNodeAll" />
                <span>全选/全不选</span>
              </label>
            </MYCol>
            <MYCol :span="8">
              <label class="checkbox-label">
                <MYCheckbox v-model="form.deptCheckStrictly" :value="true" @change="handleDeptTreeConnect" />
                <span>父子联动</span>
              </label>
            </MYCol>
          </MYRow>
          <MYTree v-if="treeVisible" ref="deptTreeRef" class="tree-border" :data="deptOptions"
            :props="{ label: 'label', children: 'children', value: 'id' }" :showCheckbox="true" :showArrow="true"
            :checkedKeys="form.deptIds" :checkStrictly="!form.deptCheckStrictly" :defaultExpanded="deptExpand"
            :defaultExpandedKeys="deptExpand ? getAllDeptKeys(deptOptions) : []" @check-change="handleDeptCheckChange"
            node-key="id" empty-text="加载中，请稍候" backgroundColor="#0f1115" />
        </MYForm-item>
      </MYForm>
      <template #footer>
        <div class="dialog-footer">
          <MYButton type="primary" @click="submitDataScope">确 定</MYButton>
          <MYButton @click="cancelDataScope">取 消</MYButton>
        </div>
      </template>
    </MYDialog>
  </div>
</template>

<script setup lang="ts">
import { parseTime } from '@/utils/general';
import {
  ComponentInternalInstance,
  getCurrentInstance,
  nextTick,
  ref,
  reactive,
  toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import { AxiosResponse } from 'axios';
import {
  addRole,
  changeRoleStatus,
  dataScope,
  delRole,
  getRole,
  listRole,
  updateRole,
  deptTreeSelect,
} from '@/api/system/role';
import {
  roleMenuTreeselect,
  treeselect as menuTreeselect,
} from '@/api/system/menu';
import { useDict } from '@/utils/dict';
import { DictResult } from '@/types/views/user';
import { Role, GetRoleResponse, MenuTreeSelectResponse, DeptTreeSelectResponse, Proxy } from '@/types/views/role';
import InputNumber from '@/components/InuptNumber/index.vue'
import { Rule } from '@/types/views/user'

interface TreeRef {
  getCheckedKeys(): number[];
  setCheckedKeys(keys: number[]): void;
  setChecked(key: number, checked: boolean, deep: boolean): void;
  setCheckedNodes(nodes: any[]): void;
  store: {
    nodesMap: Record<string | number, { expanded: boolean }>;
  };
}

const router = useRouter();
const { proxy } = getCurrentInstance() as ComponentInternalInstance & {
  proxy: Proxy;
};
const { sys_normal_disable } = useDict(
  'sys_normal_disable'
) as unknown as DictResult;

// 表单 ref
const queryRef = ref();
const roleRef = ref();

const roleList = ref<Role[]>([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<number[]>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref('');
const dateRange = ref<string[]>([]);
const menuOptions = ref<any[]>([]);
const menuExpand = ref(false);
const menuNodeAll = ref(false);
const deptExpand = ref(true);
const deptNodeAll = ref(false);
const deptOptions = ref<any[]>([]);
const openDataScope = ref(false);
const menuTreeRef = ref<TreeRef | null>(null);
const deptTreeRef = ref<TreeRef | null>(null);
const treeVisible = ref(true);

const dataScopeOptions = ref([
  { value: '1', label: '全部数据权限' },
  { value: '2', label: '自定数据权限' },
  { value: '3', label: '本部门数据权限' },
  { value: '4', label: '本部门及以下数据权限' },
  { value: '5', label: '仅本人数据权限' },
]);

const data = reactive({
  form: {
    roleId: undefined as number | undefined,
    roleName: undefined as string | undefined,
    roleKey: undefined as string | undefined,
    roleSort: 0,
    status: '0',
    menuIds: [] as number[],
    deptIds: [] as number[],
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    remark: undefined as string | undefined,
    dataScope: '1',
  },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    roleName: undefined as string | undefined,
    roleKey: undefined as string | undefined,
    status: undefined as string | undefined,
  },
});

// 修改验证规则为同步验证
const rules = ref({
  roleName: [
    { required: true, message: "角色名称不能为空", trigger: "blur" },
  ],
  roleKey: [
    { required: true, message: "权限字符不能为空", trigger: "blur" },
  ],
  roleSort: [
    { required: true, message: "角色顺序不能为空", trigger: "blur" },
  ]
});

const { queryParams, form } = toRefs(data);

async function getList() {
  loading.value = true;
  try {
    const response = await listRole(proxy.addDateRange(queryParams.value, dateRange.value));
    let resData: any = null;
    if (response && (response as any).data != null) {
      resData = (response as any).data;
    } else {
      resData = response;
    }
    if (resData && resData.data != null && typeof resData.data === 'object') {
      resData = resData.data;
    }

    if (!resData) {
      console.warn('[getList] 接口返回 data 为空或 undefined', response);
      roleList.value = [];
      total.value = 0;
      ElMessage.error('获取角色列表：接口返回数据为空');
      return;
    }
    if (!Array.isArray(resData.rows)) {
      console.warn('[getList] 接口返回的 rows 不是数组或不存在', resData);
      roleList.value = [];
      total.value = typeof resData.total === 'number' ? resData.total : 0;
      ElMessage.error('获取角色列表：接口返回格式异常');
      return;
    }
    roleList.value = resData.rows;
    total.value = typeof resData.total === 'number' ? resData.total : resData.rows.length;
  } catch (error) {
    console.error('[getList] 获取角色列表异常:', error);
    ElMessage.error('获取角色列表失败');
    roleList.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

// 搜索
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

// 重置查询
const resetQuery = (): void => {
  dateRange.value = [];

  // 手动重置所有查询参数到初始状态
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    roleName: '',
    roleKey: '',
    status: '',
  };

  // 如果有表单引用，仍然调用 resetFields 来清除验证状态
  if (queryRef.value) {
    queryRef.value.resetFields();
  }

  handleQuery();
};

// 删除
const handleDelete = async (row?: Role) => {
  const roleIds = row ? [row.roleId] : ids.value;
  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${roleIds.length} 个角色吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    await delRole(roleIds.join(','));
    ElMessage.success('删除成功');
    getList();
  } catch {
    ElMessage.info('已取消删除');
  }
};

// 表格多选框选中数据
function handleSelectionChange(selection: Role[]) {
  ids.value = selection.map(item => item.roleId);
  single.value = selection.length !== 1;
  multiple.value = selection.length === 0;
}

// 状态切换
function handleStatusChange(row: Role, newVal: string | boolean | number) {
  const originalStatus = row.status;
  const statusStr = String(newVal);
  const text = statusStr === '0' ? '启用' : '停用';

  row.status = statusStr;
  
  ElMessageBox.confirm(`确认要"${text}" "${row.roleName}" 角色吗?`)
    .then(() => {
      return changeRoleStatus(String(row.roleId), statusStr);
    })
    .then((response) => {
      ElMessage.success(text + '成功');
    })
    .catch((error) => {
      
      row.status = originalStatus;
      
      if (error === 'cancel') {
        ElMessage.info('已取消操作');
      } else {
        ElMessage.error(text + '失败: ' + (error?.message || '未知错误'));
      }
    });
}

// 分配用户
function handleAuthUser(row: Role) {
  router.push(`/system/role-auth/user/${row.roleId}`);
}

// 获取菜单树
function getMenuTreeselect() {
  menuTreeselect().then(response => {
    menuOptions.value = response.data;
  });
}

// 获取所有部门选中 keys
function getDeptAllCheckedKeys(): number[] {
  if (!deptTreeRef.value) return [];
  
  // 尝试使用 getCheckedKeys 方法
  try {
    if (typeof deptTreeRef.value.getCheckedKeys === 'function') {
      const checkedKeys = deptTreeRef.value.getCheckedKeys() as number[];
      return checkedKeys;
    }
  } catch (e) {
    console.warn('getCheckedKeys 方法调用失败:', e);
  }
  
  // 备用方案：直接使用 form.deptIds
  return form.value.deptIds || [];
}

// 在 reset 函数中确保 roleSort 是数字
function reset() {
  if (menuTreeRef.value) {
    menuTreeRef.value.setCheckedKeys([]);
  }
  if (deptTreeRef.value) {
    deptTreeRef.value.setCheckedKeys([]);
  }
  menuExpand.value = false;
  menuNodeAll.value = false;
  deptExpand.value = true;
  deptNodeAll.value = false;
  form.value = {
    roleId: undefined,
    roleName: '',
    roleKey: '',
    roleSort: 0,
    status: '0',
    menuIds: [],
    deptIds: [],
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    remark: '',
    dataScope: '1',
  };
  if (roleRef.value) {
    roleRef.value.resetFields();
  }
}

// 添加角色
function handleAdd() {
  reset();
  getMenuTreeselect();
  open.value = true;
  title.value = '添加角色';
}

// 修改角色
function handleUpdate(row?: Role) {
  reset();
  
  // 修复角色ID获取逻辑
  let roleId: number | undefined;
  if (row) {
    roleId = row.roleId;
  } else if (ids.value.length > 0) {
    roleId = ids.value[0];
  }
  
  if (!roleId) {
    ElMessage.warning('请选择要修改的角色');
    return;
  }
    
  // 获取菜单树 & 角色信息
  const roleMenuPromise = getRoleMenuTreeselect(roleId);
  
  getRole(String(roleId))
    .then((response: AxiosResponse<GetRoleResponse>) => {
      let res = (response as any).data ?? response;
      if (res && res.data) {
        res = res.data;
      }
      
      // 确保表单数据正确设置
      form.value = {
        ...res,
        menuIds: res.menuIds || [],
        roleSort: Number(res.roleSort) || 0, // 确保 roleSort 是数字
      };
      
      open.value = true;
      title.value = '修改角色';
      
      // 等待菜单树
      roleMenuPromise
        .then((res2: AxiosResponse<MenuTreeSelectResponse>) => {
          let data2 = (res2 as any).data ?? res2;
          if (data2 && data2.data) {
            data2 = data2.data;
          }
          menuOptions.value = data2.menus || [];
          const checkedKeys = data2.checkedKeys || [];
          
          nextTick(() => {
            if (menuTreeRef.value) {
              // 直接设置选中的键
              menuTreeRef.value.setCheckedKeys(checkedKeys);
            }
          });
        })
        .catch(err => {
          console.error('getRoleMenuTreeselect 异常', err);
          ElMessage.error('获取角色菜单树失败');
        });
    })
    .catch(err => {
      console.error('getRole 获取失败', err);
      ElMessage.error('获取角色信息失败');
    });
}

// 根据角色ID查询菜单树结构
function getRoleMenuTreeselect(roleId: number) {
  return roleMenuTreeselect(String(roleId));
}

// 查询部门树
function getDeptTree(roleId: number) {
  return deptTreeSelect(String(roleId)).then((response: AxiosResponse<DeptTreeSelectResponse>) => {
    let data = (response as any).data ?? response;
    if (data && data.data) {
      data = data.data;
    }
    deptOptions.value = data.depts || [];
    return response;
  });
}

// 菜单树相关方法
const handleMenuCheckChange = (keys: (string | number)[]) => {
  form.value.menuIds = keys as number[]
}

// 菜单树：展开/折叠
const handleMenuExpand = (val: any) => {
  menuExpand.value = !!val;
  treeVisible.value = false;
  nextTick(() => {
    treeVisible.value = true;
  });
}

// 菜单树：全选/全不选
const handleMenuNodeAll = (val: any) => {
  menuNodeAll.value = !!val
  if (val) {
    // 全选逻辑 - 获取所有菜单ID
    const allKeys = getAllMenuKeys(menuOptions.value)
    form.value.menuIds = allKeys
  } else {
    // 全不选
    form.value.menuIds = []
  }
}

const getAllMenuKeys = (nodes: any[]): number[] => {
  const keys: number[] = []
  const traverse = (nodeList: any[]) => {
    nodeList.forEach(node => {
      if (node.id) {
        keys.push(node.id)
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }
  traverse(nodes)
  return keys
}

// 菜单树：父子联动
const handleMenuTreeConnect = (val: any) => {
  form.value.menuCheckStrictly = !!val
}

// 获取菜单所有选中 keys
const getMenuAllCheckedKeys = (): number[] => {
  return form.value.menuIds || [];
};

// 修改后的 submitForm 方法
const submitForm = async (): Promise<void> => {
  if (!roleRef.value) {
    console.error('roleRef 为空');
    ElMessage.error('表单未就绪');
    return;
  }

  try {
    // 使用 await 等待验证结果
    await roleRef.value.validate();

    // 手动验证 roleSort
    const roleSort = form.value.roleSort;
    if (roleSort === null || roleSort === undefined) {
      ElMessage.error('角色顺序不能为空');
      return;
    }
    if (isNaN(Number(roleSort)) || Number(roleSort) < 0) {
      ElMessage.error('角色顺序必须为大于等于0的数字');
      return;
    }

    // 检查角色名称是否已存在（排除当前编辑的角色）
    const existingRoleByName = roleList.value.find(role =>
      role.roleName === form.value.roleName && role.roleId !== form.value.roleId
    );
    if (existingRoleByName) {
      ElMessage.error(`角色名称 "${form.value.roleName}" 已存在，请使用其他名称`);
      return;
    }

    // 检查权限字符是否已存在（排除当前编辑的角色）
    const existingRoleByKey = roleList.value.find(role =>
      role.roleKey === form.value.roleKey && role.roleId !== form.value.roleId
    );
    if (existingRoleByKey) {
      ElMessage.error(`权限字符 "${form.value.roleKey}" 已存在，请使用其他字符`);
      return;
    }

    const formData = {
      ...form.value,
      menuIds: getMenuAllCheckedKeys(),
    };

    const request = formData.roleId !== undefined
      ? updateRole(JSON.stringify(formData))
      : addRole(JSON.stringify(formData));

    const response = await request;

    ElMessage.success(formData.roleId !== undefined ? '修改成功' : '新增成功');
    open.value = false;
    await getList();

  } catch (error) {
    console.error('表单验证失败或提交失败:', error);

    if (error instanceof Error) {
      // 如果是验证错误
      ElMessage.error('表单验证失败，请检查输入项');
    } else {
      // 如果是API错误
      ElMessage.error('保存角色失败');
    }
  }
};

// 取消对话框
function cancel() {
  open.value = false;
  reset();
}

// 选择数据权限范围
function dataScopeSelectChange(value: string) {
  form.value.dataScope = value;
  if (value !== '2' && deptTreeRef.value) {
    deptTreeRef.value.setCheckedKeys([]);
  }
}

// 分配数据权限
function handleDataScope(row: Role) {
  reset();
  const roleId = row.roleId;
  const deptTreePromise = getDeptTree(roleId);
  getRole(String(roleId))
    .then((response: AxiosResponse<GetRoleResponse>) => {
      let res = (response as any).data ?? response;
      if (res && res.data) {
        res = res.data;
      }
      form.value = {
        ...res,
        deptIds: res.deptIds || [],
      };
      openDataScope.value = true;
      title.value = '分配数据权限';
      deptTreePromise
        .then((res2: AxiosResponse<DeptTreeSelectResponse>) => {
          let data2 = (res2 as any).data ?? res2;
          if (data2 && data2.data) {
            data2 = data2.data;
          }
          // 确保 deptOptions 正确设置
          deptOptions.value = data2.depts || [];
          nextTick(() => {
            if (deptTreeRef.value && typeof deptTreeRef.value.setCheckedKeys === 'function') {
              deptTreeRef.value.setCheckedKeys(data2.checkedKeys || []);
            }
          });
        })
        .catch(err => {
          console.error('getDeptTree 异常', err);
          ElMessage.error('获取部门树失败');
        });
    })
    .catch(err => {
      console.error('getRole 获取失败', err);
      ElMessage.error('获取角色信息失败');
    });
}

// 提交数据权限
function submitDataScope() {
  if (form.value.roleId === undefined) {
    ElMessage.error('角色信息缺失');
    return;
  }
  form.value.deptIds = getDeptAllCheckedKeys();
  
  dataScope(JSON.stringify(form.value))
    .then(() => {
      ElMessage.success('修改成功');
      openDataScope.value = false;
      getList();
    })
    .catch(err => {
      console.error('submitDataScope 异常', err);
      ElMessage.error('保存数据权限失败');
    });
}

// 取消数据权限对话框
function cancelDataScope() {
  openDataScope.value = false;
  reset();
}

// 部门树相关方法
const handleDeptCheckChange = (keys: (string | number)[]) => {
  form.value.deptIds = keys as number[]
}

// 部门树：展开/折叠
const handleDeptExpand = (val: any) => {
  deptExpand.value = !!val;
  treeVisible.value = false;
  nextTick(() => {
    treeVisible.value = true;
  });
}

// 部门树：全选/全不选
const handleDeptNodeAll = (val: any) => {
  deptNodeAll.value = !!val
  if (val) {
    // 全选逻辑 - 获取所有部门ID
    const allKeys = getAllDeptKeys(deptOptions.value)
    form.value.deptIds = allKeys
  } else {
    // 全不选
    form.value.deptIds = []
  }
}

// 获取所有部门 keys
const getAllDeptKeys = (nodes: any[]): number[] => {
  const keys: number[] = []
  const traverse = (nodeList: any[]) => {
    nodeList.forEach(node => {
      if (node.id) {
        keys.push(node.id)
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }
  traverse(nodes)
  return keys
}

// 部门树：父子联动
const handleDeptTreeConnect = (val: any) => {
  form.value.deptCheckStrictly = !!val
}

// 组件初始化
getList();
</script>
