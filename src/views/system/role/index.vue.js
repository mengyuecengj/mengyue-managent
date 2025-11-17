import { parseTime } from '@/utils/general';
import { getCurrentInstance, nextTick, ref, reactive, toRefs, } from 'vue';
import { useRouter } from 'vue-router';
import { addRole, changeRoleStatus, dataScope, delRole, getRole, listRole, updateRole, deptTreeSelect, } from '@/api/system/role';
import { roleMenuTreeselect, treeselect as menuTreeselect, } from '@/api/system/menu';
import { useDict } from '@/utils/dict';
import InputNumber from '@/components/InuptNumber/index.vue';
const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = useDict('sys_normal_disable');
// 表单 ref
const queryRef = ref();
const roleRef = ref();
const roleList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref('');
const dateRange = ref([]);
const menuOptions = ref([]);
const menuExpand = ref(false);
const menuNodeAll = ref(false);
const deptExpand = ref(true);
const deptNodeAll = ref(false);
const deptOptions = ref([]);
const openDataScope = ref(false);
const menuTreeRef = ref(null);
const deptTreeRef = ref(null);
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
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: '0',
        menuIds: [],
        deptIds: [],
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        remark: undefined,
        dataScope: '1',
    },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
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
        let resData = null;
        if (response && response.data != null) {
            resData = response.data;
        }
        else {
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
    }
    catch (error) {
        console.error('[getList] 获取角色列表异常:', error);
        ElMessage.error('获取角色列表失败');
        roleList.value = [];
        total.value = 0;
    }
    finally {
        loading.value = false;
    }
}
// 搜索
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}
// 重置查询
const resetQuery = () => {
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
const handleDelete = async (row) => {
    const roleIds = row ? [row.roleId] : ids.value;
    try {
        await ElMessageBox.confirm(`确认删除选中的 ${roleIds.length} 个角色吗？`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        await delRole(roleIds.join(','));
        ElMessage.success('删除成功');
        getList();
    }
    catch {
        ElMessage.info('已取消删除');
    }
};
// 表格多选框选中数据
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.roleId);
    single.value = selection.length !== 1;
    multiple.value = selection.length === 0;
}
// 状态切换
function handleStatusChange(row, newVal) {
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
        }
        else {
            ElMessage.error(text + '失败: ' + (error?.message || '未知错误'));
        }
    });
}
// 分配用户
function handleAuthUser(row) {
    router.push(`/system/role-auth/user/${row.roleId}`);
}
// 获取菜单树
function getMenuTreeselect() {
    menuTreeselect().then(response => {
        menuOptions.value = response.data;
    });
}
// 获取所有部门选中 keys
function getDeptAllCheckedKeys() {
    if (!deptTreeRef.value)
        return [];
    // 尝试使用 getCheckedKeys 方法
    try {
        if (typeof deptTreeRef.value.getCheckedKeys === 'function') {
            const checkedKeys = deptTreeRef.value.getCheckedKeys();
            return checkedKeys;
        }
    }
    catch (e) {
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
function handleUpdate(row) {
    reset();
    // 修复角色ID获取逻辑
    let roleId;
    if (row) {
        roleId = row.roleId;
    }
    else if (ids.value.length > 0) {
        roleId = ids.value[0];
    }
    if (!roleId) {
        ElMessage.warning('请选择要修改的角色');
        return;
    }
    // 获取菜单树 & 角色信息
    const roleMenuPromise = getRoleMenuTreeselect(roleId);
    getRole(String(roleId))
        .then((response) => {
        let res = response.data ?? response;
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
            .then((res2) => {
            let data2 = res2.data ?? res2;
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
function getRoleMenuTreeselect(roleId) {
    return roleMenuTreeselect(String(roleId));
}
// 查询部门树
function getDeptTree(roleId) {
    return deptTreeSelect(String(roleId)).then((response) => {
        let data = response.data ?? response;
        if (data && data.data) {
            data = data.data;
        }
        deptOptions.value = data.depts || [];
        return response;
    });
}
// 菜单树相关方法
const handleMenuCheckChange = (keys) => {
    form.value.menuIds = keys;
};
// 菜单树：展开/折叠
const handleMenuExpand = (val) => {
    menuExpand.value = !!val;
    treeVisible.value = false;
    nextTick(() => {
        treeVisible.value = true;
    });
};
// 菜单树：全选/全不选
const handleMenuNodeAll = (val) => {
    menuNodeAll.value = !!val;
    if (val) {
        // 全选逻辑 - 获取所有菜单ID
        const allKeys = getAllMenuKeys(menuOptions.value);
        form.value.menuIds = allKeys;
    }
    else {
        // 全不选
        form.value.menuIds = [];
    }
};
const getAllMenuKeys = (nodes) => {
    const keys = [];
    const traverse = (nodeList) => {
        nodeList.forEach(node => {
            if (node.id) {
                keys.push(node.id);
            }
            if (node.children && node.children.length > 0) {
                traverse(node.children);
            }
        });
    };
    traverse(nodes);
    return keys;
};
// 菜单树：父子联动
const handleMenuTreeConnect = (val) => {
    form.value.menuCheckStrictly = !!val;
};
// 获取菜单所有选中 keys
const getMenuAllCheckedKeys = () => {
    return form.value.menuIds || [];
};
// 修改后的 submitForm 方法
const submitForm = async () => {
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
        const existingRoleByName = roleList.value.find(role => role.roleName === form.value.roleName && role.roleId !== form.value.roleId);
        if (existingRoleByName) {
            ElMessage.error(`角色名称 "${form.value.roleName}" 已存在，请使用其他名称`);
            return;
        }
        // 检查权限字符是否已存在（排除当前编辑的角色）
        const existingRoleByKey = roleList.value.find(role => role.roleKey === form.value.roleKey && role.roleId !== form.value.roleId);
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
    }
    catch (error) {
        console.error('表单验证失败或提交失败:', error);
        if (error instanceof Error) {
            // 如果是验证错误
            ElMessage.error('表单验证失败，请检查输入项');
        }
        else {
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
function dataScopeSelectChange(value) {
    form.value.dataScope = value;
    if (value !== '2' && deptTreeRef.value) {
        deptTreeRef.value.setCheckedKeys([]);
    }
}
// 分配数据权限
function handleDataScope(row) {
    reset();
    const roleId = row.roleId;
    const deptTreePromise = getDeptTree(roleId);
    getRole(String(roleId))
        .then((response) => {
        let res = response.data ?? response;
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
            .then((res2) => {
            let data2 = res2.data ?? res2;
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
const handleDeptCheckChange = (keys) => {
    form.value.deptIds = keys;
};
// 部门树：展开/折叠
const handleDeptExpand = (val) => {
    deptExpand.value = !!val;
    treeVisible.value = false;
    nextTick(() => {
        treeVisible.value = true;
    });
};
// 部门树：全选/全不选
const handleDeptNodeAll = (val) => {
    deptNodeAll.value = !!val;
    if (val) {
        // 全选逻辑 - 获取所有部门ID
        const allKeys = getAllDeptKeys(deptOptions.value);
        form.value.deptIds = allKeys;
    }
    else {
        // 全不选
        form.value.deptIds = [];
    }
};
// 获取所有部门 keys
const getAllDeptKeys = (nodes) => {
    const keys = [];
    const traverse = (nodeList) => {
        nodeList.forEach(node => {
            if (node.id) {
                keys.push(node.id);
            }
            if (node.children && node.children.length > 0) {
                traverse(node.children);
            }
        });
    };
    traverse(nodes);
    return keys;
};
// 部门树：父子联动
const handleDeptTreeConnect = (val) => {
    form.value.deptCheckStrictly = !!val;
};
// 组件初始化
getList();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
});
const __VLS_0 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    labelWidth: "68",
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    labelWidth: "68",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showSearch) }, null, null);
/** @type {typeof __VLS_ctx.queryRef} */ ;
var __VLS_8 = {};
__VLS_7.slots.default;
const __VLS_10 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    gutter: (16),
}));
const __VLS_12 = __VLS_11({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
const __VLS_14 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    span: (6),
}));
const __VLS_16 = __VLS_15({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    label: "角色名称",
    prop: "roleName",
}));
const __VLS_20 = __VLS_19({
    label: "角色名称",
    prop: "roleName",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.roleName),
    placeholder: "请输入角色名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.roleName),
    placeholder: "请输入角色名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_26;
let __VLS_27;
let __VLS_28;
const __VLS_29 = {
    onKeyup: (__VLS_ctx.handleQuery)
};
var __VLS_25;
var __VLS_21;
var __VLS_17;
const __VLS_30 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    span: (6),
}));
const __VLS_32 = __VLS_31({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
const __VLS_34 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    label: "权限字符",
    prop: "roleKey",
}));
const __VLS_36 = __VLS_35({
    label: "权限字符",
    prop: "roleKey",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.roleKey),
    placeholder: "请输入权限字符",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.roleKey),
    placeholder: "请输入权限字符",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_42;
let __VLS_43;
let __VLS_44;
const __VLS_45 = {
    onKeyup: (__VLS_ctx.handleQuery)
};
var __VLS_41;
var __VLS_37;
var __VLS_33;
const __VLS_46 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    span: (7),
}));
const __VLS_48 = __VLS_47({
    span: (7),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
const __VLS_50 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    label: "状态",
    prop: "status",
}));
const __VLS_52 = __VLS_51({
    label: "状态",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
const __VLS_54 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "角色状态",
    clearable: true,
}));
const __VLS_56 = __VLS_55({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "角色状态",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_58 = {}.MYOption;
    /** @type {[typeof __VLS_components.MYOption, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }));
    const __VLS_60 = __VLS_59({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
}
var __VLS_57;
var __VLS_53;
var __VLS_49;
const __VLS_62 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    span: (2),
}));
const __VLS_64 = __VLS_63({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
__VLS_65.slots.default;
const __VLS_66 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_69.slots.default;
const __VLS_70 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}));
const __VLS_72 = __VLS_71({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_74;
let __VLS_75;
let __VLS_76;
const __VLS_77 = {
    onClick: (__VLS_ctx.handleQuery)
};
__VLS_73.slots.default;
var __VLS_73;
var __VLS_69;
var __VLS_65;
const __VLS_78 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    span: (1),
}));
const __VLS_80 = __VLS_79({
    span: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
__VLS_81.slots.default;
const __VLS_82 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({}));
const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
const __VLS_86 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}));
const __VLS_88 = __VLS_87({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_90;
let __VLS_91;
let __VLS_92;
const __VLS_93 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_89.slots.default;
var __VLS_89;
var __VLS_85;
var __VLS_81;
var __VLS_13;
var __VLS_7;
var __VLS_3;
const __VLS_94 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    gutter: (10),
    ...{ class: "mb8" },
}));
const __VLS_96 = __VLS_95({
    gutter: (10),
    ...{ class: "mb8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
const __VLS_98 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    span: (2),
}));
const __VLS_100 = __VLS_99({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_101.slots.default;
const __VLS_102 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}));
const __VLS_104 = __VLS_103({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_106;
let __VLS_107;
let __VLS_108;
const __VLS_109 = {
    onClick: (() => __VLS_ctx.handleAdd())
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:add']) }, null, null);
__VLS_105.slots.default;
var __VLS_105;
var __VLS_101;
const __VLS_110 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    span: (2),
}));
const __VLS_112 = __VLS_111({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
__VLS_113.slots.default;
const __VLS_114 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    ...{ 'onClick': {} },
    type: "success",
    icon: "MYEdit",
    disabled: (__VLS_ctx.single),
}));
const __VLS_116 = __VLS_115({
    ...{ 'onClick': {} },
    type: "success",
    icon: "MYEdit",
    disabled: (__VLS_ctx.single),
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
let __VLS_118;
let __VLS_119;
let __VLS_120;
const __VLS_121 = {
    onClick: (() => __VLS_ctx.handleUpdate())
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:edit']) }, null, null);
__VLS_117.slots.default;
var __VLS_117;
var __VLS_113;
const __VLS_122 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    span: (2),
}));
const __VLS_124 = __VLS_123({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
__VLS_125.slots.default;
const __VLS_126 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}));
const __VLS_128 = __VLS_127({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
let __VLS_130;
let __VLS_131;
let __VLS_132;
const __VLS_133 = {
    onClick: (() => __VLS_ctx.handleDelete())
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:remove']) }, null, null);
__VLS_129.slots.default;
var __VLS_129;
var __VLS_125;
const __VLS_134 = {}.RightToolbar;
/** @type {[typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}));
const __VLS_136 = __VLS_135({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
let __VLS_138;
let __VLS_139;
let __VLS_140;
const __VLS_141 = {
    onQueryTable: (__VLS_ctx.getList)
};
var __VLS_137;
var __VLS_97;
const __VLS_142 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    ...{ 'onSelectionChange': {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    data: (__VLS_ctx.roleList),
    rowKey: "roleId",
}));
const __VLS_144 = __VLS_143({
    ...{ 'onSelectionChange': {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    data: (__VLS_ctx.roleList),
    rowKey: "roleId",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
let __VLS_146;
let __VLS_147;
let __VLS_148;
const __VLS_149 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_145.slots.default;
const __VLS_150 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
    type: "selection",
    width: "55",
    align: "center",
}));
const __VLS_152 = __VLS_151({
    type: "selection",
    width: "55",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const __VLS_154 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    label: "角色编号",
    prop: "roleId",
    width: "120",
}));
const __VLS_156 = __VLS_155({
    label: "角色编号",
    prop: "roleId",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
const __VLS_158 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    label: "角色名称",
    prop: "roleName",
    showOverflowTooltip: (true),
    width: "150",
}));
const __VLS_160 = __VLS_159({
    label: "角色名称",
    prop: "roleName",
    showOverflowTooltip: (true),
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
const __VLS_162 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
    label: "权限字符",
    prop: "roleKey",
    showOverflowTooltip: (true),
    width: "150",
}));
const __VLS_164 = __VLS_163({
    label: "权限字符",
    prop: "roleKey",
    showOverflowTooltip: (true),
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
const __VLS_166 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    label: "显示顺序",
    prop: "roleSort",
    width: "100",
}));
const __VLS_168 = __VLS_167({
    label: "显示顺序",
    prop: "roleSort",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
const __VLS_170 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
    label: "状态",
    align: "center",
    width: "100",
    prop: "body",
}));
const __VLS_172 = __VLS_171({
    label: "状态",
    align: "center",
    width: "100",
    prop: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
{
    const { body: __VLS_thisSlot } = __VLS_145.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_174 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
        ...{ 'onChange': {} },
        modelValue: (scope.row.status === '0'),
        size: "small",
        activeValue: (true),
        inactiveValue: (false),
    }));
    const __VLS_176 = __VLS_175({
        ...{ 'onChange': {} },
        modelValue: (scope.row.status === '0'),
        size: "small",
        activeValue: (true),
        inactiveValue: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    let __VLS_178;
    let __VLS_179;
    let __VLS_180;
    const __VLS_181 = {
        onChange: ((val) => __VLS_ctx.handleStatusChange(scope.row, val ? '0' : '1'))
    };
    var __VLS_177;
}
const __VLS_182 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
    label: "创建时间",
    align: "center",
    prop: "createTime",
}));
const __VLS_184 = __VLS_183({
    label: "创建时间",
    align: "center",
    prop: "createTime",
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
__VLS_185.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_185.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.createTime));
}
var __VLS_185;
const __VLS_186 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
    label: "操作",
    align: "center",
    prop: "operation",
    width: "150",
    className: "small-padding fixed-width",
}));
const __VLS_188 = __VLS_187({
    label: "操作",
    align: "center",
    prop: "operation",
    width: "150",
    className: "small-padding fixed-width",
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
{
    const { operation: __VLS_thisSlot } = __VLS_145.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    if (scope.row.roleId !== 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "operation-buttons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "operation-buttons" },
        });
        const __VLS_190 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYEdit",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_192 = __VLS_191({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYEdit",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_191));
        let __VLS_194;
        let __VLS_195;
        let __VLS_196;
        const __VLS_197 = {
            onClick: (() => __VLS_ctx.handleUpdate(scope.row))
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:edit']) }, null, null);
        __VLS_193.slots.default;
        var __VLS_193;
        const __VLS_198 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYDelete",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_200 = __VLS_199({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYDelete",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_199));
        let __VLS_202;
        let __VLS_203;
        let __VLS_204;
        const __VLS_205 = {
            onClick: (() => __VLS_ctx.handleDelete(scope.row))
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:remove']) }, null, null);
        __VLS_201.slots.default;
        var __VLS_201;
        const __VLS_206 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYCircleCheck",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_208 = __VLS_207({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYCircleCheck",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_207));
        let __VLS_210;
        let __VLS_211;
        let __VLS_212;
        const __VLS_213 = {
            onClick: (() => __VLS_ctx.handleDataScope(scope.row))
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:edit']) }, null, null);
        __VLS_209.slots.default;
        var __VLS_209;
        const __VLS_214 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYUserAlt",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_216 = __VLS_215({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYUserAlt",
            colorBg: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_215));
        let __VLS_218;
        let __VLS_219;
        let __VLS_220;
        const __VLS_221 = {
            onClick: (() => __VLS_ctx.handleAuthUser(scope.row))
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:edit']) }, null, null);
        __VLS_217.slots.default;
        var __VLS_217;
    }
}
var __VLS_145;
const __VLS_222 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_224 = __VLS_223({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_223));
let __VLS_226;
let __VLS_227;
let __VLS_228;
const __VLS_229 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_225;
const __VLS_230 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
    title: "新增用户",
    modelValue: (__VLS_ctx.open),
    width: "550px",
    height: "630px",
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
    showClose: (false),
    appendToBody: true,
}));
const __VLS_232 = __VLS_231({
    title: "新增用户",
    modelValue: (__VLS_ctx.open),
    width: "550px",
    height: "630px",
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
    showClose: (false),
    appendToBody: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_231));
__VLS_233.slots.default;
const __VLS_234 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
    ...{ class: "dialog_form" },
    ref: "roleRef",
    modelValue: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "100",
}));
const __VLS_236 = __VLS_235({
    ...{ class: "dialog_form" },
    ref: "roleRef",
    modelValue: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
/** @type {typeof __VLS_ctx.roleRef} */ ;
var __VLS_238 = {};
__VLS_237.slots.default;
const __VLS_240 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
    label: "角色名称",
    prop: "roleName",
}));
const __VLS_242 = __VLS_241({
    label: "角色名称",
    prop: "roleName",
}, ...__VLS_functionalComponentArgsRest(__VLS_241));
__VLS_243.slots.default;
const __VLS_244 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.form.roleName),
    placeholder: "请输入角色名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_246 = __VLS_245({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.form.roleName),
    placeholder: "请输入角色名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_245));
let __VLS_248;
let __VLS_249;
let __VLS_250;
const __VLS_251 = {
    onKeyup: (__VLS_ctx.handleQuery)
};
var __VLS_247;
var __VLS_243;
const __VLS_252 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    label: "权限字符",
    prop: "roleKey",
}));
const __VLS_254 = __VLS_253({
    label: "权限字符",
    prop: "roleKey",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
__VLS_255.slots.default;
const __VLS_256 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.form.roleKey),
    placeholder: "请输入权限字符",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_258 = __VLS_257({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.form.roleKey),
    placeholder: "请输入权限字符",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_257));
let __VLS_260;
let __VLS_261;
let __VLS_262;
const __VLS_263 = {
    onKeyup: (__VLS_ctx.handleQuery)
};
var __VLS_259;
var __VLS_255;
const __VLS_264 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({
    label: "角色顺序",
    prop: "roleSort",
}));
const __VLS_266 = __VLS_265({
    label: "角色顺序",
    prop: "roleSort",
}, ...__VLS_functionalComponentArgsRest(__VLS_265));
__VLS_267.slots.default;
/** @type {[typeof InputNumber, ]} */ ;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent(InputNumber, new InputNumber({
    modelValue: (__VLS_ctx.form.roleSort),
    min: (0),
    max: (999),
    width: "100px",
}));
const __VLS_269 = __VLS_268({
    modelValue: (__VLS_ctx.form.roleSort),
    min: (0),
    max: (999),
    width: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_268));
var __VLS_267;
const __VLS_271 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_272 = __VLS_asFunctionalComponent(__VLS_271, new __VLS_271({
    label: "状态",
}));
const __VLS_273 = __VLS_272({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_272));
__VLS_274.slots.default;
const __VLS_275 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_276 = __VLS_asFunctionalComponent(__VLS_275, new __VLS_275({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_277 = __VLS_276({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_276));
__VLS_278.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_279 = {}.MYRadio;
    /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
    // @ts-ignore
    const __VLS_280 = __VLS_asFunctionalComponent(__VLS_279, new __VLS_279({
        key: (dict.value),
        value: (dict.value),
    }));
    const __VLS_281 = __VLS_280({
        key: (dict.value),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_280));
    __VLS_282.slots.default;
    (dict.label);
    var __VLS_282;
}
var __VLS_278;
var __VLS_274;
const __VLS_283 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_284 = __VLS_asFunctionalComponent(__VLS_283, new __VLS_283({
    label: "菜单权限",
}));
const __VLS_285 = __VLS_284({
    label: "菜单权限",
}, ...__VLS_functionalComponentArgsRest(__VLS_284));
__VLS_286.slots.default;
const __VLS_287 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({
    gutter: (20),
    align: (true),
    ...{ class: "checkbox-row" },
}));
const __VLS_289 = __VLS_288({
    gutter: (20),
    align: (true),
    ...{ class: "checkbox-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_288));
__VLS_290.slots.default;
const __VLS_291 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_292 = __VLS_asFunctionalComponent(__VLS_291, new __VLS_291({
    span: (8),
}));
const __VLS_293 = __VLS_292({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_292));
__VLS_294.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "checkbox-label" },
});
const __VLS_295 = {}.MYCheckbox;
/** @type {[typeof __VLS_components.MYCheckbox, ]} */ ;
// @ts-ignore
const __VLS_296 = __VLS_asFunctionalComponent(__VLS_295, new __VLS_295({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.menuExpand),
    value: (true),
}));
const __VLS_297 = __VLS_296({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.menuExpand),
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_296));
let __VLS_299;
let __VLS_300;
let __VLS_301;
const __VLS_302 = {
    onChange: (__VLS_ctx.handleMenuExpand)
};
var __VLS_298;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_294;
const __VLS_303 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_304 = __VLS_asFunctionalComponent(__VLS_303, new __VLS_303({
    span: (8),
}));
const __VLS_305 = __VLS_304({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_304));
__VLS_306.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "checkbox-label" },
});
const __VLS_307 = {}.MYCheckbox;
/** @type {[typeof __VLS_components.MYCheckbox, ]} */ ;
// @ts-ignore
const __VLS_308 = __VLS_asFunctionalComponent(__VLS_307, new __VLS_307({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.menuNodeAll),
    value: (true),
}));
const __VLS_309 = __VLS_308({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.menuNodeAll),
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_308));
let __VLS_311;
let __VLS_312;
let __VLS_313;
const __VLS_314 = {
    onChange: (__VLS_ctx.handleMenuNodeAll)
};
var __VLS_310;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_306;
const __VLS_315 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_316 = __VLS_asFunctionalComponent(__VLS_315, new __VLS_315({
    span: (8),
}));
const __VLS_317 = __VLS_316({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_316));
__VLS_318.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "checkbox-label" },
});
const __VLS_319 = {}.MYCheckbox;
/** @type {[typeof __VLS_components.MYCheckbox, ]} */ ;
// @ts-ignore
const __VLS_320 = __VLS_asFunctionalComponent(__VLS_319, new __VLS_319({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.menuCheckStrictly),
    value: (true),
}));
const __VLS_321 = __VLS_320({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.menuCheckStrictly),
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_320));
let __VLS_323;
let __VLS_324;
let __VLS_325;
const __VLS_326 = {
    onChange: (__VLS_ctx.handleMenuTreeConnect)
};
var __VLS_322;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_318;
var __VLS_290;
if (__VLS_ctx.treeVisible) {
    const __VLS_327 = {}.MYTree;
    /** @type {[typeof __VLS_components.MYTree, ]} */ ;
    // @ts-ignore
    const __VLS_328 = __VLS_asFunctionalComponent(__VLS_327, new __VLS_327({
        ...{ 'onCheckChange': {} },
        ref: "menuTreeRef",
        ...{ class: "tree-border" },
        data: (__VLS_ctx.menuOptions),
        props: ({ label: 'label', children: 'children', value: 'id' }),
        showCheckbox: (true),
        showArrow: (true),
        checkedKeys: (__VLS_ctx.form.menuIds),
        checkStrictly: (!__VLS_ctx.form.menuCheckStrictly),
        defaultExpanded: (__VLS_ctx.menuExpand),
        defaultExpandedKeys: (__VLS_ctx.menuExpand ? __VLS_ctx.getAllMenuKeys(__VLS_ctx.menuOptions) : []),
        nodeKey: "id",
        emptyText: "加载中，请稍候",
        backgroundColor: "#0f1115",
    }));
    const __VLS_329 = __VLS_328({
        ...{ 'onCheckChange': {} },
        ref: "menuTreeRef",
        ...{ class: "tree-border" },
        data: (__VLS_ctx.menuOptions),
        props: ({ label: 'label', children: 'children', value: 'id' }),
        showCheckbox: (true),
        showArrow: (true),
        checkedKeys: (__VLS_ctx.form.menuIds),
        checkStrictly: (!__VLS_ctx.form.menuCheckStrictly),
        defaultExpanded: (__VLS_ctx.menuExpand),
        defaultExpandedKeys: (__VLS_ctx.menuExpand ? __VLS_ctx.getAllMenuKeys(__VLS_ctx.menuOptions) : []),
        nodeKey: "id",
        emptyText: "加载中，请稍候",
        backgroundColor: "#0f1115",
    }, ...__VLS_functionalComponentArgsRest(__VLS_328));
    let __VLS_331;
    let __VLS_332;
    let __VLS_333;
    const __VLS_334 = {
        onCheckChange: (__VLS_ctx.handleMenuCheckChange)
    };
    /** @type {typeof __VLS_ctx.menuTreeRef} */ ;
    var __VLS_335 = {};
    var __VLS_330;
}
var __VLS_286;
const __VLS_337 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_338 = __VLS_asFunctionalComponent(__VLS_337, new __VLS_337({
    label: "备注",
}));
const __VLS_339 = __VLS_338({
    label: "备注",
}, ...__VLS_functionalComponentArgsRest(__VLS_338));
__VLS_340.slots.default;
const __VLS_341 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_342 = __VLS_asFunctionalComponent(__VLS_341, new __VLS_341({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: "请输入内容",
}));
const __VLS_343 = __VLS_342({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: "请输入内容",
}, ...__VLS_functionalComponentArgsRest(__VLS_342));
var __VLS_340;
var __VLS_237;
{
    const { footer: __VLS_thisSlot } = __VLS_233.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_345 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_346 = __VLS_asFunctionalComponent(__VLS_345, new __VLS_345({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }));
    const __VLS_347 = __VLS_346({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_346));
    let __VLS_349;
    let __VLS_350;
    let __VLS_351;
    const __VLS_352 = {
        onClick: (__VLS_ctx.submitForm)
    };
    __VLS_348.slots.default;
    var __VLS_348;
    const __VLS_353 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_354 = __VLS_asFunctionalComponent(__VLS_353, new __VLS_353({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_355 = __VLS_354({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_354));
    let __VLS_357;
    let __VLS_358;
    let __VLS_359;
    const __VLS_360 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_356.slots.default;
    var __VLS_356;
}
var __VLS_233;
const __VLS_361 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_362 = __VLS_asFunctionalComponent(__VLS_361, new __VLS_361({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.openDataScope),
    width: "500px",
    height: "550px",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}));
const __VLS_363 = __VLS_362({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.openDataScope),
    width: "500px",
    height: "550px",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_362));
__VLS_364.slots.default;
const __VLS_365 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_366 = __VLS_asFunctionalComponent(__VLS_365, new __VLS_365({
    ...{ class: "dialog_form" },
    modelValue: (__VLS_ctx.form),
    labelWidth: "80",
}));
const __VLS_367 = __VLS_366({
    ...{ class: "dialog_form" },
    modelValue: (__VLS_ctx.form),
    labelWidth: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_366));
__VLS_368.slots.default;
const __VLS_369 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_370 = __VLS_asFunctionalComponent(__VLS_369, new __VLS_369({
    label: "角色名称",
}));
const __VLS_371 = __VLS_370({
    label: "角色名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_370));
__VLS_372.slots.default;
const __VLS_373 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_374 = __VLS_asFunctionalComponent(__VLS_373, new __VLS_373({
    modelValue: (__VLS_ctx.form.roleName),
    placeholder: "请输入角色名称",
    disabled: (true),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_375 = __VLS_374({
    modelValue: (__VLS_ctx.form.roleName),
    placeholder: "请输入角色名称",
    disabled: (true),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_374));
var __VLS_372;
const __VLS_377 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_378 = __VLS_asFunctionalComponent(__VLS_377, new __VLS_377({
    label: "权限字符",
}));
const __VLS_379 = __VLS_378({
    label: "权限字符",
}, ...__VLS_functionalComponentArgsRest(__VLS_378));
__VLS_380.slots.default;
const __VLS_381 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_382 = __VLS_asFunctionalComponent(__VLS_381, new __VLS_381({
    modelValue: (__VLS_ctx.form.roleKey),
    placeholder: "请输入权限字符",
    disabled: (true),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_383 = __VLS_382({
    modelValue: (__VLS_ctx.form.roleKey),
    placeholder: "请输入权限字符",
    disabled: (true),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_382));
var __VLS_380;
const __VLS_385 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_386 = __VLS_asFunctionalComponent(__VLS_385, new __VLS_385({
    label: "权限范围",
}));
const __VLS_387 = __VLS_386({
    label: "权限范围",
}, ...__VLS_functionalComponentArgsRest(__VLS_386));
__VLS_388.slots.default;
const __VLS_389 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_390 = __VLS_asFunctionalComponent(__VLS_389, new __VLS_389({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.dataScope),
}));
const __VLS_391 = __VLS_390({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.dataScope),
}, ...__VLS_functionalComponentArgsRest(__VLS_390));
let __VLS_393;
let __VLS_394;
let __VLS_395;
const __VLS_396 = {
    onChange: ((val) => __VLS_ctx.dataScopeSelectChange(String(val)))
};
__VLS_392.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.dataScopeOptions))) {
    const __VLS_397 = {}.MYOption;
    /** @type {[typeof __VLS_components.MYOption, ]} */ ;
    // @ts-ignore
    const __VLS_398 = __VLS_asFunctionalComponent(__VLS_397, new __VLS_397({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_399 = __VLS_398({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_398));
}
var __VLS_392;
var __VLS_388;
const __VLS_401 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_402 = __VLS_asFunctionalComponent(__VLS_401, new __VLS_401({
    label: "数据权限",
}));
const __VLS_403 = __VLS_402({
    label: "数据权限",
}, ...__VLS_functionalComponentArgsRest(__VLS_402));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (Number(__VLS_ctx.form.dataScope) === 2) }, null, null);
__VLS_404.slots.default;
const __VLS_405 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_406 = __VLS_asFunctionalComponent(__VLS_405, new __VLS_405({
    gutter: (20),
    align: (true),
    ...{ class: "checkbox-row" },
}));
const __VLS_407 = __VLS_406({
    gutter: (20),
    align: (true),
    ...{ class: "checkbox-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_406));
__VLS_408.slots.default;
const __VLS_409 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_410 = __VLS_asFunctionalComponent(__VLS_409, new __VLS_409({
    span: (8),
}));
const __VLS_411 = __VLS_410({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_410));
__VLS_412.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "checkbox-label" },
});
const __VLS_413 = {}.MYCheckbox;
/** @type {[typeof __VLS_components.MYCheckbox, ]} */ ;
// @ts-ignore
const __VLS_414 = __VLS_asFunctionalComponent(__VLS_413, new __VLS_413({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.deptExpand),
    value: (true),
}));
const __VLS_415 = __VLS_414({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.deptExpand),
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_414));
let __VLS_417;
let __VLS_418;
let __VLS_419;
const __VLS_420 = {
    onChange: (__VLS_ctx.handleDeptExpand)
};
var __VLS_416;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_412;
const __VLS_421 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_422 = __VLS_asFunctionalComponent(__VLS_421, new __VLS_421({
    span: (8),
}));
const __VLS_423 = __VLS_422({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_422));
__VLS_424.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "checkbox-label" },
});
const __VLS_425 = {}.MYCheckbox;
/** @type {[typeof __VLS_components.MYCheckbox, ]} */ ;
// @ts-ignore
const __VLS_426 = __VLS_asFunctionalComponent(__VLS_425, new __VLS_425({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.deptNodeAll),
    value: (true),
}));
const __VLS_427 = __VLS_426({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.deptNodeAll),
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_426));
let __VLS_429;
let __VLS_430;
let __VLS_431;
const __VLS_432 = {
    onChange: (__VLS_ctx.handleDeptNodeAll)
};
var __VLS_428;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_424;
const __VLS_433 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_434 = __VLS_asFunctionalComponent(__VLS_433, new __VLS_433({
    span: (8),
}));
const __VLS_435 = __VLS_434({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_434));
__VLS_436.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "checkbox-label" },
});
const __VLS_437 = {}.MYCheckbox;
/** @type {[typeof __VLS_components.MYCheckbox, ]} */ ;
// @ts-ignore
const __VLS_438 = __VLS_asFunctionalComponent(__VLS_437, new __VLS_437({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.deptCheckStrictly),
    value: (true),
}));
const __VLS_439 = __VLS_438({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.deptCheckStrictly),
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_438));
let __VLS_441;
let __VLS_442;
let __VLS_443;
const __VLS_444 = {
    onChange: (__VLS_ctx.handleDeptTreeConnect)
};
var __VLS_440;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_436;
var __VLS_408;
if (__VLS_ctx.treeVisible) {
    const __VLS_445 = {}.MYTree;
    /** @type {[typeof __VLS_components.MYTree, ]} */ ;
    // @ts-ignore
    const __VLS_446 = __VLS_asFunctionalComponent(__VLS_445, new __VLS_445({
        ...{ 'onCheckChange': {} },
        ref: "deptTreeRef",
        ...{ class: "tree-border" },
        data: (__VLS_ctx.deptOptions),
        props: ({ label: 'label', children: 'children', value: 'id' }),
        showCheckbox: (true),
        showArrow: (true),
        checkedKeys: (__VLS_ctx.form.deptIds),
        checkStrictly: (!__VLS_ctx.form.deptCheckStrictly),
        defaultExpanded: (__VLS_ctx.deptExpand),
        defaultExpandedKeys: (__VLS_ctx.deptExpand ? __VLS_ctx.getAllDeptKeys(__VLS_ctx.deptOptions) : []),
        nodeKey: "id",
        emptyText: "加载中，请稍候",
        backgroundColor: "#0f1115",
    }));
    const __VLS_447 = __VLS_446({
        ...{ 'onCheckChange': {} },
        ref: "deptTreeRef",
        ...{ class: "tree-border" },
        data: (__VLS_ctx.deptOptions),
        props: ({ label: 'label', children: 'children', value: 'id' }),
        showCheckbox: (true),
        showArrow: (true),
        checkedKeys: (__VLS_ctx.form.deptIds),
        checkStrictly: (!__VLS_ctx.form.deptCheckStrictly),
        defaultExpanded: (__VLS_ctx.deptExpand),
        defaultExpandedKeys: (__VLS_ctx.deptExpand ? __VLS_ctx.getAllDeptKeys(__VLS_ctx.deptOptions) : []),
        nodeKey: "id",
        emptyText: "加载中，请稍候",
        backgroundColor: "#0f1115",
    }, ...__VLS_functionalComponentArgsRest(__VLS_446));
    let __VLS_449;
    let __VLS_450;
    let __VLS_451;
    const __VLS_452 = {
        onCheckChange: (__VLS_ctx.handleDeptCheckChange)
    };
    /** @type {typeof __VLS_ctx.deptTreeRef} */ ;
    var __VLS_453 = {};
    var __VLS_448;
}
var __VLS_404;
var __VLS_368;
{
    const { footer: __VLS_thisSlot } = __VLS_364.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_455 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_456 = __VLS_asFunctionalComponent(__VLS_455, new __VLS_455({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_457 = __VLS_456({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_456));
    let __VLS_459;
    let __VLS_460;
    let __VLS_461;
    const __VLS_462 = {
        onClick: (__VLS_ctx.submitDataScope)
    };
    __VLS_458.slots.default;
    var __VLS_458;
    const __VLS_463 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_464 = __VLS_asFunctionalComponent(__VLS_463, new __VLS_463({
        ...{ 'onClick': {} },
    }));
    const __VLS_465 = __VLS_464({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_464));
    let __VLS_467;
    let __VLS_468;
    let __VLS_469;
    const __VLS_470 = {
        onClick: (__VLS_ctx.cancelDataScope)
    };
    __VLS_466.slots.default;
    var __VLS_466;
}
var __VLS_364;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-row']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-border']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-row']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-border']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_239 = __VLS_238, __VLS_336 = __VLS_335, __VLS_454 = __VLS_453;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            InputNumber: InputNumber,
            sys_normal_disable: sys_normal_disable,
            queryRef: queryRef,
            roleRef: roleRef,
            roleList: roleList,
            open: open,
            loading: loading,
            showSearch: showSearch,
            single: single,
            multiple: multiple,
            total: total,
            title: title,
            menuOptions: menuOptions,
            menuExpand: menuExpand,
            menuNodeAll: menuNodeAll,
            deptExpand: deptExpand,
            deptNodeAll: deptNodeAll,
            deptOptions: deptOptions,
            openDataScope: openDataScope,
            menuTreeRef: menuTreeRef,
            deptTreeRef: deptTreeRef,
            treeVisible: treeVisible,
            dataScopeOptions: dataScopeOptions,
            rules: rules,
            queryParams: queryParams,
            form: form,
            getList: getList,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleDelete: handleDelete,
            handleSelectionChange: handleSelectionChange,
            handleStatusChange: handleStatusChange,
            handleAuthUser: handleAuthUser,
            handleAdd: handleAdd,
            handleUpdate: handleUpdate,
            handleMenuCheckChange: handleMenuCheckChange,
            handleMenuExpand: handleMenuExpand,
            handleMenuNodeAll: handleMenuNodeAll,
            getAllMenuKeys: getAllMenuKeys,
            handleMenuTreeConnect: handleMenuTreeConnect,
            submitForm: submitForm,
            cancel: cancel,
            dataScopeSelectChange: dataScopeSelectChange,
            handleDataScope: handleDataScope,
            submitDataScope: submitDataScope,
            cancelDataScope: cancelDataScope,
            handleDeptCheckChange: handleDeptCheckChange,
            handleDeptExpand: handleDeptExpand,
            handleDeptNodeAll: handleDeptNodeAll,
            getAllDeptKeys: getAllDeptKeys,
            handleDeptTreeConnect: handleDeptTreeConnect,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
