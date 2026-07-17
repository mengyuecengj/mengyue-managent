import modal from '@/plugins/modal';
import { useRouter } from 'vue-router';
import { parseTime } from '@/utils/general';
import { changeUserStatus, listUser, resetUserPwd, delUser, getUser, updateUser, addUser, deptTreeSelect, } from "@/api/system/user";
import "splitpanes/dist/splitpanes.css";
import { useDict } from '@/utils/dict';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_normal_disable, sys_user_sex } = useDict("sys_normal_disable", "sys_user_sex");
const userList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(false);
const multiple = ref(false);
const total = ref(0);
const title = ref("新增用户");
const dateRange = ref([]);
const deptName = ref("");
const deptOptions = ref([]);
const enabledDeptOptions = ref();
const initPassword = ref(undefined);
const postOptions = ref([]);
const roleOptions = ref([]);
const dictLoaded = ref(false);
// 列显隐信息
const columns = ref([
    { key: 0, label: `用户编号`, visible: true },
    { key: 1, label: `用户名称`, visible: true },
    { key: 2, label: `用户昵称`, visible: true },
    { key: 3, label: `部门`, visible: true },
    { key: 4, label: `手机号码`, visible: true },
    { key: 5, label: `状态`, visible: true },
    { key: 6, label: `创建时间`, visible: true },
]);
// 表单数据 - 直接使用 ref，像 login.vue 一样
const form = ref({
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
const queryParams = ref({
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
    const baseRules = {
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
const filterNode = (value, data) => {
    if (!value)
        return true;
    return data.label.indexOf(value) !== -1;
};
// 监听部门搜索
watch(deptName, (val) => {
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
    listUser(finalParams).then((response) => {
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
const filterDisabledDept = (deptList) => {
    return deptList.filter((dept) => {
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
const handleNodeClick = (data) => {
    // 确保部门ID正确设置
    if (data && data.id) {
        queryParams.value.deptId = Number(data.id);
    }
    else {
        queryParams.value.deptId = undefined;
    }
    queryParams.value.pageNum = 1;
    handleQuery();
};
// 搜索
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
};
// 重置查询
const resetQuery = () => {
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
const handleSelectionChange = (selection) => {
    ids.value = selection.map((item) => item.userId);
    single.value = selection.length === 1;
    multiple.value = selection.length > 0;
};
// 删除
const handleDelete = (row) => {
    const userIds = row?.userId || ids.value;
    modal.confirm(`是否确认删除用户编号为"${userIds}"的数据项?`).then(() => {
        return delUser(userIds);
    }).then(() => {
        getList();
        modal.msgSuccess('删除成功');
    }).catch(() => { });
};
// 导出
const handleExport = () => {
    proxy.download("system/user/export", { ...queryParams.value }, `user_${new Date().getTime()}.xlsx`);
};
// 在表格脚本中加强状态变更处理
const handleStatusChange = async (row, val) => {
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
    }
    catch (error) {
        console.error('状态变更失败:', error);
        // 恢复原始状态
        row.status = originalStatus;
        // 强制重新渲染
        await nextTick();
    }
};
// 授权角色
const handleAuthRole = (row) => {
    const userId = row.userId;
    if (!userId || isNaN(Number(userId))) {
        modal.msgError('用户ID无效');
        return;
    }
    router.push(`/system/user-auth/role/${userId}`);
};
// 重置密码
const handleResetPwd = async (row) => {
    try {
        const result = await modal.prompt(`请输入"${row.userName}"的新密码`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^.{5,20}$/,
            inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
            inputValidator: (value) => {
                if (/<|>|"|'|\||\\/.test(value)) {
                    return "不能包含非法字符：< > \" ' \\ |";
                }
                return true;
            },
        });
        if (result) {
            await resetUserPwd(row.userId, result);
            modal.msgSuccess("密码重置成功");
        }
    }
    catch (error) {
        // 用户取消操作
    }
};
// 取消
const cancel = () => {
    open.value = false;
    reset();
};
// 新增
const handleAdd = () => {
    reset();
    title.value = "新增用户";
    getUser(undefined).then((response) => {
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
const handleUpdate = (row) => {
    if (!row && !ids.value.length) {
        modal.msgError("请先选择一个用户");
        return;
    }
    reset();
    const userId = row?.userId || ids.value[0];
    getUser(userId).then((response) => {
        const userData = { ...response.data };
        // 修复：确保 sex 字段有值，如果后端没返回就使用默认值
        if (userData.sex === undefined || userData.sex === null) {
            userData.sex = "0"; // 默认值，根据你的字典设置，比如 "0" 表示未知
        }
        else {
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
const handlePostChange = (value) => {
    if (Array.isArray(value)) {
        form.value.postIds = value;
    }
};
const handleRoleChange = (value) => {
    if (Array.isArray(value)) {
        form.value.roleIds = value;
    }
};
const postIdsString = computed({
    get: () => form.value.postIds.join(','),
    set: (value) => {
        if (value) {
            form.value.postIds = value.split(',').filter(Boolean).map(Number);
        }
        else {
            form.value.postIds = [];
        }
    }
});
const roleIdsString = computed({
    get: () => form.value.roleIds.join(','),
    set: (value) => {
        if (value) {
            form.value.roleIds = value.split(',').filter(Boolean).map(Number);
        }
        else {
            form.value.roleIds = [];
        }
    }
});
const submitForm = async () => {
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
        const existUserName = userList.value.find(user => user.userName === form.value.userName && user.userId !== currentUserId);
        if (existUserName) {
            modal.msgError(`用户名 "${form.value.userName}" 已存在，请使用其他用户名`);
            return;
        }
        // 检查手机号重复
        if (form.value.phonenumber) {
            const existPhone = userList.value.find(user => user.phonenumber === form.value.phonenumber && user.userId !== currentUserId);
            if (existPhone) {
                modal.msgError(`手机号码 "${form.value.phonenumber}" 已存在，请使用其他手机号`);
                return;
            }
        }
        // 检查邮箱重复
        if (form.value.email) {
            const existEmail = userList.value.find(user => user.email === form.value.email && user.userId !== currentUserId);
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
        }
        else {
            await addUser(submitData);
            modal.msgSuccess("新增成功");
        }
        open.value = false;
        await getList();
    }
    catch (error) {
        console.error('表单提交失败:', error);
    }
};
// 初始化
getDeptTree();
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
    gutter: (24),
}));
const __VLS_2 = __VLS_1({
    gutter: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    labelWidth: "80",
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    labelWidth: "80",
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
    span: (8),
}));
const __VLS_16 = __VLS_15({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    label: (__VLS_ctx.t('system.user.query.userName')),
    prop: "userName",
}));
const __VLS_20 = __VLS_19({
    label: (__VLS_ctx.t('system.user.query.userName')),
    prop: "userName",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.userName),
    placeholder: (__VLS_ctx.t('system.user.placeholder.userName')),
    clearable: true,
    ...{ style: {} },
    placeholderColor: "var(--text-color-content)",
    textColor: "var(--text-color-content)",
    ...{ class: "dark-input" },
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.userName),
    placeholder: (__VLS_ctx.t('system.user.placeholder.userName')),
    clearable: true,
    ...{ style: {} },
    placeholderColor: "var(--text-color-content)",
    textColor: "var(--text-color-content)",
    ...{ class: "dark-input" },
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
    span: (8),
}));
const __VLS_32 = __VLS_31({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
const __VLS_34 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    label: (__VLS_ctx.t('system.user.query.nickName')),
    prop: "nickName",
}));
const __VLS_36 = __VLS_35({
    label: (__VLS_ctx.t('system.user.query.nickName')),
    prop: "nickName",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.nickName),
    placeholder: (__VLS_ctx.t('system.user.placeholder.nickName')),
    placeholderColor: "var(--text-color-content)",
    clearable: true,
    textColor: "var(--text-color-content)",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.nickName),
    placeholder: (__VLS_ctx.t('system.user.placeholder.nickName')),
    placeholderColor: "var(--text-color-content)",
    clearable: true,
    textColor: "var(--text-color-content)",
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
    span: (8),
}));
const __VLS_48 = __VLS_47({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
const __VLS_50 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    label: (__VLS_ctx.t('system.user.query.phone')),
    prop: "phonenumber",
}));
const __VLS_52 = __VLS_51({
    label: (__VLS_ctx.t('system.user.query.phone')),
    prop: "phonenumber",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
const __VLS_54 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.phonenumber),
    placeholder: (__VLS_ctx.t('system.user.placeholder.phone')),
    placeholderColor: "var(--text-color-content)",
    clearable: true,
    textColor: "var(--text-color-content)",
}));
const __VLS_56 = __VLS_55({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.phonenumber),
    placeholder: (__VLS_ctx.t('system.user.placeholder.phone')),
    placeholderColor: "var(--text-color-content)",
    clearable: true,
    textColor: "var(--text-color-content)",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
let __VLS_58;
let __VLS_59;
let __VLS_60;
const __VLS_61 = {
    onKeyup: (__VLS_ctx.handleQuery)
};
var __VLS_57;
var __VLS_53;
var __VLS_49;
const __VLS_62 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    span: (7),
}));
const __VLS_64 = __VLS_63({
    span: (7),
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
__VLS_65.slots.default;
const __VLS_66 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    label: (__VLS_ctx.t('system.user.query.status')),
    prop: "status",
}));
const __VLS_68 = __VLS_67({
    label: (__VLS_ctx.t('system.user.query.status')),
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_69.slots.default;
const __VLS_70 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: (__VLS_ctx.t('system.user.placeholder.status')),
    clearable: true,
}));
const __VLS_72 = __VLS_71({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: (__VLS_ctx.t('system.user.placeholder.status')),
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
__VLS_73.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_74 = {}.MYOption;
    /** @type {[typeof __VLS_components.MYOption, ]} */ ;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }));
    const __VLS_76 = __VLS_75({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
}
var __VLS_73;
var __VLS_69;
var __VLS_65;
const __VLS_78 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    span: (2.5),
}));
const __VLS_80 = __VLS_79({
    span: (2.5),
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
    type: "primary",
    icon: "MYSearch",
}));
const __VLS_88 = __VLS_87({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_90;
let __VLS_91;
let __VLS_92;
const __VLS_93 = {
    onClick: (__VLS_ctx.handleQuery)
};
__VLS_89.slots.default;
(__VLS_ctx.t('system.user.query.search'));
var __VLS_89;
var __VLS_85;
var __VLS_81;
const __VLS_94 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    span: (4),
}));
const __VLS_96 = __VLS_95({
    span: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
const __VLS_98 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({}));
const __VLS_100 = __VLS_99({}, ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_101.slots.default;
const __VLS_102 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}));
const __VLS_104 = __VLS_103({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_106;
let __VLS_107;
let __VLS_108;
const __VLS_109 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_105.slots.default;
(__VLS_ctx.t('system.user.query.reset'));
var __VLS_105;
var __VLS_101;
var __VLS_97;
var __VLS_13;
var __VLS_7;
var __VLS_3;
const __VLS_110 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    gutter: (16),
    ...{ class: "mb8" },
}));
const __VLS_112 = __VLS_111({
    gutter: (16),
    ...{ class: "mb8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
__VLS_113.slots.default;
const __VLS_114 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    span: (3),
}));
const __VLS_116 = __VLS_115({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
const __VLS_118 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
    colorText: "#fff",
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
    colorText: "#fff",
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_122;
let __VLS_123;
let __VLS_124;
const __VLS_125 = {
    onClick: (__VLS_ctx.handleAdd)
};
__VLS_121.slots.default;
(__VLS_ctx.t('system.user.button.add'));
var __VLS_121;
var __VLS_117;
const __VLS_126 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    span: (3),
}));
const __VLS_128 = __VLS_127({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
__VLS_129.slots.default;
const __VLS_130 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    ...{ 'onClick': {} },
    type: "success",
    disabled: (!__VLS_ctx.single),
}));
const __VLS_132 = __VLS_131({
    ...{ 'onClick': {} },
    type: "success",
    disabled: (!__VLS_ctx.single),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
let __VLS_134;
let __VLS_135;
let __VLS_136;
const __VLS_137 = {
    onClick: (__VLS_ctx.handleUpdate)
};
__VLS_133.slots.default;
const __VLS_138 = {}.MYEdit;
/** @type {[typeof __VLS_components.MYEdit, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    size: "14px",
    color: "white",
}));
const __VLS_140 = __VLS_139({
    size: "14px",
    color: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
(__VLS_ctx.t('system.user.button.edit'));
var __VLS_133;
var __VLS_129;
const __VLS_142 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    span: (3),
}));
const __VLS_144 = __VLS_143({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
__VLS_145.slots.default;
const __VLS_146 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    ...{ 'onClick': {} },
    type: "danger",
    disabled: (!__VLS_ctx.single),
}));
const __VLS_148 = __VLS_147({
    ...{ 'onClick': {} },
    type: "danger",
    disabled: (!__VLS_ctx.single),
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
let __VLS_150;
let __VLS_151;
let __VLS_152;
const __VLS_153 = {
    onClick: (__VLS_ctx.handleDelete)
};
__VLS_149.slots.default;
const __VLS_154 = {}.MYDelete;
/** @type {[typeof __VLS_components.MYDelete, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    size: "14px",
    color: "white",
}));
const __VLS_156 = __VLS_155({
    size: "14px",
    color: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
(__VLS_ctx.t('system.user.button.delete'));
var __VLS_149;
var __VLS_145;
var __VLS_113;
const __VLS_158 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    ...{ 'onSelectionChange': {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    data: (__VLS_ctx.userList),
    headerTextColor: "var(--text-color-content)",
    bodyTextColor: "var(--text-color-content)",
    rowKey: "userId",
    stripe: "var(--table-stripe-bg)",
}));
const __VLS_160 = __VLS_159({
    ...{ 'onSelectionChange': {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    data: (__VLS_ctx.userList),
    headerTextColor: "var(--text-color-content)",
    bodyTextColor: "var(--text-color-content)",
    rowKey: "userId",
    stripe: "var(--table-stripe-bg)",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
let __VLS_162;
let __VLS_163;
let __VLS_164;
const __VLS_165 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_161.slots.default;
const __VLS_166 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    type: "selection",
    width: "50",
    align: "center",
}));
const __VLS_168 = __VLS_167({
    type: "selection",
    width: "50",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
if (__VLS_ctx.columns[0].visible) {
    const __VLS_170 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
        label: (__VLS_ctx.t('system.user.table.userId')),
        align: "center",
        key: "userId",
        prop: "userId",
    }));
    const __VLS_172 = __VLS_171({
        label: (__VLS_ctx.t('system.user.table.userId')),
        align: "center",
        key: "userId",
        prop: "userId",
    }, ...__VLS_functionalComponentArgsRest(__VLS_171));
}
if (__VLS_ctx.columns[1].visible) {
    const __VLS_174 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
        label: (__VLS_ctx.t('system.user.table.userName')),
        align: "center",
        key: "userName",
        prop: "userName",
        showOverflowTooltip: (true),
    }));
    const __VLS_176 = __VLS_175({
        label: (__VLS_ctx.t('system.user.table.userName')),
        align: "center",
        key: "userName",
        prop: "userName",
        showOverflowTooltip: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_175));
}
if (__VLS_ctx.columns[2].visible) {
    const __VLS_178 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({
        label: (__VLS_ctx.t('system.user.table.nickName')),
        align: "center",
        key: "nickName",
        prop: "nickName",
        showOverflowTooltip: (true),
    }));
    const __VLS_180 = __VLS_179({
        label: (__VLS_ctx.t('system.user.table.nickName')),
        align: "center",
        key: "nickName",
        prop: "nickName",
        showOverflowTooltip: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_179));
}
if (__VLS_ctx.columns[3].visible) {
    const __VLS_182 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
        label: (__VLS_ctx.t('system.user.table.dept')),
        align: "center",
        key: "deptName",
        prop: "deptName",
        showOverflowTooltip: (true),
    }));
    const __VLS_184 = __VLS_183({
        label: (__VLS_ctx.t('system.user.table.dept')),
        align: "center",
        key: "deptName",
        prop: "deptName",
        showOverflowTooltip: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_183));
}
if (__VLS_ctx.columns[4].visible) {
    const __VLS_186 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
        label: (__VLS_ctx.t('system.user.table.phone')),
        align: "center",
        key: "phonenumber",
        prop: "phonenumber",
        width: "120",
    }));
    const __VLS_188 = __VLS_187({
        label: (__VLS_ctx.t('system.user.table.phone')),
        align: "center",
        key: "phonenumber",
        prop: "phonenumber",
        width: "120",
    }, ...__VLS_functionalComponentArgsRest(__VLS_187));
}
if (__VLS_ctx.columns[5].visible) {
    const __VLS_190 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
        label: (__VLS_ctx.t('system.user.table.status')),
        align: "center",
        prop: "status",
        key: "status",
    }));
    const __VLS_192 = __VLS_191({
        label: (__VLS_ctx.t('system.user.table.status')),
        align: "center",
        prop: "status",
        key: "status",
    }, ...__VLS_functionalComponentArgsRest(__VLS_191));
}
{
    const { status: __VLS_thisSlot } = __VLS_161.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_194 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
        ...{ 'onChange': {} },
        modelValue: (scope.row.status === '0'),
        size: "small",
        activeValue: (true),
        inactiveValue: (false),
    }));
    const __VLS_196 = __VLS_195({
        ...{ 'onChange': {} },
        modelValue: (scope.row.status === '0'),
        size: "small",
        activeValue: (true),
        inactiveValue: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_195));
    let __VLS_198;
    let __VLS_199;
    let __VLS_200;
    const __VLS_201 = {
        onChange: ((val) => __VLS_ctx.handleStatusChange(scope.row, val))
    };
    var __VLS_197;
}
if (__VLS_ctx.columns[6].visible) {
    const __VLS_202 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
        label: (__VLS_ctx.t('system.user.table.createTime')),
        align: "center",
        prop: "createTime",
        width: "160",
    }));
    const __VLS_204 = __VLS_203({
        label: (__VLS_ctx.t('system.user.table.createTime')),
        align: "center",
        prop: "createTime",
        width: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_203));
    __VLS_205.slots.default;
    {
        const { createTime: __VLS_thisSlot } = __VLS_205.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.parseTime(scope.row.createTime));
    }
    var __VLS_205;
}
const __VLS_206 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    label: (__VLS_ctx.t('system.user.table.operation')),
    align: "center",
    prop: "operation",
    className: "small-padding fixed-width",
}));
const __VLS_208 = __VLS_207({
    label: (__VLS_ctx.t('system.user.table.operation')),
    align: "center",
    prop: "operation",
    className: "small-padding fixed-width",
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
{
    const { operation: __VLS_thisSlot } = __VLS_161.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    if (scope.row.userId !== 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "operation-buttons" },
        });
        const __VLS_210 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYEdit",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_212 = __VLS_211({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYEdit",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_211));
        let __VLS_214;
        let __VLS_215;
        let __VLS_216;
        const __VLS_217 = {
            onClick: (...[$event]) => {
                if (!(scope.row.userId !== 1))
                    return;
                __VLS_ctx.handleUpdate(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:user:edit']) }, null, null);
        __VLS_213.slots.default;
        (__VLS_ctx.t('system.user.button.edit'));
        var __VLS_213;
        const __VLS_218 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYDelete",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_220 = __VLS_219({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYDelete",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_219));
        let __VLS_222;
        let __VLS_223;
        let __VLS_224;
        const __VLS_225 = {
            onClick: (...[$event]) => {
                if (!(scope.row.userId !== 1))
                    return;
                __VLS_ctx.handleDelete(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:user:remove']) }, null, null);
        __VLS_221.slots.default;
        (__VLS_ctx.t('system.user.button.delete'));
        var __VLS_221;
        const __VLS_226 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYUnlockAlt",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_228 = __VLS_227({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYUnlockAlt",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_227));
        let __VLS_230;
        let __VLS_231;
        let __VLS_232;
        const __VLS_233 = {
            onClick: (...[$event]) => {
                if (!(scope.row.userId !== 1))
                    return;
                __VLS_ctx.handleResetPwd(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:user:resetPwd']) }, null, null);
        __VLS_229.slots.default;
        (__VLS_ctx.t('system.user.button.resetPwd'));
        var __VLS_229;
        const __VLS_234 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYCircleCheck",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_236 = __VLS_235({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYCircleCheck",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_235));
        let __VLS_238;
        let __VLS_239;
        let __VLS_240;
        const __VLS_241 = {
            onClick: (...[$event]) => {
                if (!(scope.row.userId !== 1))
                    return;
                __VLS_ctx.handleAuthRole(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:user:edit']) }, null, null);
        __VLS_237.slots.default;
        (__VLS_ctx.t('system.user.button.auth'));
        var __VLS_237;
    }
}
var __VLS_161;
const __VLS_242 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_244 = __VLS_243({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
let __VLS_246;
let __VLS_247;
let __VLS_248;
const __VLS_249 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_245;
const __VLS_250 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "800px",
    height: "600px",
    textColor: "var(--text-color-content)",
    showClose: (false),
    appendToBody: true,
}));
const __VLS_252 = __VLS_251({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "800px",
    height: "600px",
    textColor: "var(--text-color-content)",
    showClose: (false),
    appendToBody: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_251));
__VLS_253.slots.default;
const __VLS_254 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({
    ...{ class: "dialog_form" },
    ref: "userRef",
    modelValue: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80",
}));
const __VLS_256 = __VLS_255({
    ...{ class: "dialog_form" },
    ref: "userRef",
    modelValue: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_255));
/** @type {typeof __VLS_ctx.userRef} */ ;
var __VLS_258 = {};
__VLS_257.slots.default;
const __VLS_260 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({}));
const __VLS_262 = __VLS_261({}, ...__VLS_functionalComponentArgsRest(__VLS_261));
__VLS_263.slots.default;
const __VLS_264 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({
    span: (12),
}));
const __VLS_266 = __VLS_265({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_265));
__VLS_267.slots.default;
const __VLS_268 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({
    label: (__VLS_ctx.t('system.user.form.nickName')),
    prop: "nickName",
}));
const __VLS_270 = __VLS_269({
    label: (__VLS_ctx.t('system.user.form.nickName')),
    prop: "nickName",
}, ...__VLS_functionalComponentArgsRest(__VLS_269));
__VLS_271.slots.default;
const __VLS_272 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
    modelValue: (__VLS_ctx.form.nickName),
    placeholder: (__VLS_ctx.t('system.user.placeholder.nickName')),
    placeholderColor: "var(--text-color-content)",
    maxlength: "30",
}));
const __VLS_274 = __VLS_273({
    modelValue: (__VLS_ctx.form.nickName),
    placeholder: (__VLS_ctx.t('system.user.placeholder.nickName')),
    placeholderColor: "var(--text-color-content)",
    maxlength: "30",
}, ...__VLS_functionalComponentArgsRest(__VLS_273));
var __VLS_271;
var __VLS_267;
const __VLS_276 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_277 = __VLS_asFunctionalComponent(__VLS_276, new __VLS_276({
    span: (12),
}));
const __VLS_278 = __VLS_277({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_277));
__VLS_279.slots.default;
const __VLS_280 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_281 = __VLS_asFunctionalComponent(__VLS_280, new __VLS_280({
    label: (__VLS_ctx.t('system.user.form.dept')),
    prop: "deptId",
}));
const __VLS_282 = __VLS_281({
    label: (__VLS_ctx.t('system.user.form.dept')),
    prop: "deptId",
}, ...__VLS_functionalComponentArgsRest(__VLS_281));
__VLS_283.slots.default;
const __VLS_284 = {}.MYTreeSelect;
/** @type {[typeof __VLS_components.MYTreeSelect, ]} */ ;
// @ts-ignore
const __VLS_285 = __VLS_asFunctionalComponent(__VLS_284, new __VLS_284({
    modelValue: (__VLS_ctx.form.deptId),
    data: (__VLS_ctx.enabledDeptOptions),
    props: ({ label: 'label', children: 'children', value: 'id' }),
    multiple: (false),
    filterable: (false),
    showArrow: (true),
    size: ('large'),
    popperClass: ('custom-dropdown'),
    backgroundColor: "#0f1115",
    height: "10px",
}));
const __VLS_286 = __VLS_285({
    modelValue: (__VLS_ctx.form.deptId),
    data: (__VLS_ctx.enabledDeptOptions),
    props: ({ label: 'label', children: 'children', value: 'id' }),
    multiple: (false),
    filterable: (false),
    showArrow: (true),
    size: ('large'),
    popperClass: ('custom-dropdown'),
    backgroundColor: "#0f1115",
    height: "10px",
}, ...__VLS_functionalComponentArgsRest(__VLS_285));
var __VLS_283;
var __VLS_279;
var __VLS_263;
const __VLS_288 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({}));
const __VLS_290 = __VLS_289({}, ...__VLS_functionalComponentArgsRest(__VLS_289));
__VLS_291.slots.default;
const __VLS_292 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
    span: (12),
}));
const __VLS_294 = __VLS_293({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
__VLS_295.slots.default;
const __VLS_296 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({
    label: (__VLS_ctx.t('system.user.form.phone')),
    prop: "phonenumber",
}));
const __VLS_298 = __VLS_297({
    label: (__VLS_ctx.t('system.user.form.phone')),
    prop: "phonenumber",
}, ...__VLS_functionalComponentArgsRest(__VLS_297));
__VLS_299.slots.default;
const __VLS_300 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_301 = __VLS_asFunctionalComponent(__VLS_300, new __VLS_300({
    modelValue: (__VLS_ctx.form.phonenumber),
    placeholder: (__VLS_ctx.t('system.user.placeholder.phone')),
    placeholderColor: "var(--text-color-content)",
    maxlength: "11",
}));
const __VLS_302 = __VLS_301({
    modelValue: (__VLS_ctx.form.phonenumber),
    placeholder: (__VLS_ctx.t('system.user.placeholder.phone')),
    placeholderColor: "var(--text-color-content)",
    maxlength: "11",
}, ...__VLS_functionalComponentArgsRest(__VLS_301));
var __VLS_299;
var __VLS_295;
const __VLS_304 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_305 = __VLS_asFunctionalComponent(__VLS_304, new __VLS_304({
    span: (12),
}));
const __VLS_306 = __VLS_305({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_305));
__VLS_307.slots.default;
const __VLS_308 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_309 = __VLS_asFunctionalComponent(__VLS_308, new __VLS_308({
    label: (__VLS_ctx.t('system.user.form.email')),
    prop: "email",
}));
const __VLS_310 = __VLS_309({
    label: (__VLS_ctx.t('system.user.form.email')),
    prop: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_309));
__VLS_311.slots.default;
const __VLS_312 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_313 = __VLS_asFunctionalComponent(__VLS_312, new __VLS_312({
    modelValue: (__VLS_ctx.form.email),
    placeholder: (__VLS_ctx.t('system.user.placeholder.email')),
    placeholderColor: "var(--text-color-content)",
    maxlength: "50",
}));
const __VLS_314 = __VLS_313({
    modelValue: (__VLS_ctx.form.email),
    placeholder: (__VLS_ctx.t('system.user.placeholder.email')),
    placeholderColor: "var(--text-color-content)",
    maxlength: "50",
}, ...__VLS_functionalComponentArgsRest(__VLS_313));
var __VLS_311;
var __VLS_307;
var __VLS_291;
const __VLS_316 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_317 = __VLS_asFunctionalComponent(__VLS_316, new __VLS_316({}));
const __VLS_318 = __VLS_317({}, ...__VLS_functionalComponentArgsRest(__VLS_317));
__VLS_319.slots.default;
const __VLS_320 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_321 = __VLS_asFunctionalComponent(__VLS_320, new __VLS_320({
    span: (12),
}));
const __VLS_322 = __VLS_321({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_321));
__VLS_323.slots.default;
if (!__VLS_ctx.form.userId) {
    const __VLS_324 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_325 = __VLS_asFunctionalComponent(__VLS_324, new __VLS_324({
        label: (__VLS_ctx.t('system.user.form.userName')),
        prop: "userName",
    }));
    const __VLS_326 = __VLS_325({
        label: (__VLS_ctx.t('system.user.form.userName')),
        prop: "userName",
    }, ...__VLS_functionalComponentArgsRest(__VLS_325));
    __VLS_327.slots.default;
    const __VLS_328 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_329 = __VLS_asFunctionalComponent(__VLS_328, new __VLS_328({
        modelValue: (__VLS_ctx.form.userName),
        placeholder: (__VLS_ctx.t('system.user.placeholder.userName')),
        placeholderColor: "var(--text-color-content)",
        maxlength: "30",
    }));
    const __VLS_330 = __VLS_329({
        modelValue: (__VLS_ctx.form.userName),
        placeholder: (__VLS_ctx.t('system.user.placeholder.userName')),
        placeholderColor: "var(--text-color-content)",
        maxlength: "30",
    }, ...__VLS_functionalComponentArgsRest(__VLS_329));
    var __VLS_327;
}
var __VLS_323;
const __VLS_332 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_333 = __VLS_asFunctionalComponent(__VLS_332, new __VLS_332({
    span: (12),
}));
const __VLS_334 = __VLS_333({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_333));
__VLS_335.slots.default;
if (!__VLS_ctx.form.userId) {
    const __VLS_336 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_337 = __VLS_asFunctionalComponent(__VLS_336, new __VLS_336({
        label: (__VLS_ctx.t('system.user.form.password')),
        prop: "password",
    }));
    const __VLS_338 = __VLS_337({
        label: (__VLS_ctx.t('system.user.form.password')),
        prop: "password",
    }, ...__VLS_functionalComponentArgsRest(__VLS_337));
    __VLS_339.slots.default;
    const __VLS_340 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_341 = __VLS_asFunctionalComponent(__VLS_340, new __VLS_340({
        modelValue: (__VLS_ctx.form.password),
        placeholder: (__VLS_ctx.t('system.user.placeholder.password')),
        placeholderColor: "var(--text-color-content)",
        type: "password",
        maxlength: "20",
        showPassword: true,
    }));
    const __VLS_342 = __VLS_341({
        modelValue: (__VLS_ctx.form.password),
        placeholder: (__VLS_ctx.t('system.user.placeholder.password')),
        placeholderColor: "var(--text-color-content)",
        type: "password",
        maxlength: "20",
        showPassword: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_341));
    var __VLS_339;
}
var __VLS_335;
var __VLS_319;
const __VLS_344 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_345 = __VLS_asFunctionalComponent(__VLS_344, new __VLS_344({}));
const __VLS_346 = __VLS_345({}, ...__VLS_functionalComponentArgsRest(__VLS_345));
__VLS_347.slots.default;
const __VLS_348 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_349 = __VLS_asFunctionalComponent(__VLS_348, new __VLS_348({
    span: (12),
}));
const __VLS_350 = __VLS_349({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_349));
__VLS_351.slots.default;
if (__VLS_ctx.dictLoaded) {
    const __VLS_352 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_353 = __VLS_asFunctionalComponent(__VLS_352, new __VLS_352({
        label: (__VLS_ctx.t('system.user.form.sex')),
        prop: "sex",
    }));
    const __VLS_354 = __VLS_353({
        label: (__VLS_ctx.t('system.user.form.sex')),
        prop: "sex",
    }, ...__VLS_functionalComponentArgsRest(__VLS_353));
    __VLS_355.slots.default;
    const __VLS_356 = {}.MYSelect;
    /** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
    // @ts-ignore
    const __VLS_357 = __VLS_asFunctionalComponent(__VLS_356, new __VLS_356({
        modelValue: (__VLS_ctx.form.sex),
        placeholder: (__VLS_ctx.t('system.user.placeholder.status')),
        clearable: true,
    }));
    const __VLS_358 = __VLS_357({
        modelValue: (__VLS_ctx.form.sex),
        placeholder: (__VLS_ctx.t('system.user.placeholder.status')),
        clearable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_357));
    __VLS_359.slots.default;
    for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_user_sex))) {
        const __VLS_360 = {}.MYOption;
        /** @type {[typeof __VLS_components.MYOption, ]} */ ;
        // @ts-ignore
        const __VLS_361 = __VLS_asFunctionalComponent(__VLS_360, new __VLS_360({
            key: (dict.value),
            label: (dict.label),
            value: (dict.value),
        }));
        const __VLS_362 = __VLS_361({
            key: (dict.value),
            label: (dict.label),
            value: (dict.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_361));
    }
    var __VLS_359;
    var __VLS_355;
}
var __VLS_351;
const __VLS_364 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent(__VLS_364, new __VLS_364({
    span: (12),
}));
const __VLS_366 = __VLS_365({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_365));
__VLS_367.slots.default;
const __VLS_368 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_369 = __VLS_asFunctionalComponent(__VLS_368, new __VLS_368({
    label: (__VLS_ctx.t('system.user.form.status')),
    prop: "status",
}));
const __VLS_370 = __VLS_369({
    label: (__VLS_ctx.t('system.user.form.status')),
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_369));
__VLS_371.slots.default;
const __VLS_372 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_373 = __VLS_asFunctionalComponent(__VLS_372, new __VLS_372({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_374 = __VLS_373({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_373));
__VLS_375.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_376 = {}.MYRadio;
    /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
    // @ts-ignore
    const __VLS_377 = __VLS_asFunctionalComponent(__VLS_376, new __VLS_376({
        key: (dict.value),
        value: (dict.value),
    }));
    const __VLS_378 = __VLS_377({
        key: (dict.value),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_377));
    __VLS_379.slots.default;
    (dict.label);
    var __VLS_379;
}
var __VLS_375;
var __VLS_371;
var __VLS_367;
var __VLS_347;
const __VLS_380 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_381 = __VLS_asFunctionalComponent(__VLS_380, new __VLS_380({}));
const __VLS_382 = __VLS_381({}, ...__VLS_functionalComponentArgsRest(__VLS_381));
__VLS_383.slots.default;
const __VLS_384 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_385 = __VLS_asFunctionalComponent(__VLS_384, new __VLS_384({
    span: (12),
}));
const __VLS_386 = __VLS_385({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_385));
__VLS_387.slots.default;
if (__VLS_ctx.postOptions?.length) {
    const __VLS_388 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_389 = __VLS_asFunctionalComponent(__VLS_388, new __VLS_388({
        label: (__VLS_ctx.t('system.user.form.post')),
        prop: "postIds",
    }));
    const __VLS_390 = __VLS_389({
        label: (__VLS_ctx.t('system.user.form.post')),
        prop: "postIds",
    }, ...__VLS_functionalComponentArgsRest(__VLS_389));
    __VLS_391.slots.default;
    const __VLS_392 = {}.MYSelect;
    /** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
    // @ts-ignore
    const __VLS_393 = __VLS_asFunctionalComponent(__VLS_392, new __VLS_392({
        ...{ 'onChange': {} },
        vModel: (__VLS_ctx.form.postIds.join(',')),
        multiple: true,
        placeholder: (__VLS_ctx.t('system.user.placeholder.post')),
    }));
    const __VLS_394 = __VLS_393({
        ...{ 'onChange': {} },
        vModel: (__VLS_ctx.form.postIds.join(',')),
        multiple: true,
        placeholder: (__VLS_ctx.t('system.user.placeholder.post')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_393));
    let __VLS_396;
    let __VLS_397;
    let __VLS_398;
    const __VLS_399 = {
        onChange: (__VLS_ctx.handlePostChange)
    };
    __VLS_395.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.postOptions))) {
        const __VLS_400 = {}.MYOption;
        /** @type {[typeof __VLS_components.MYOption, ]} */ ;
        // @ts-ignore
        const __VLS_401 = __VLS_asFunctionalComponent(__VLS_400, new __VLS_400({
            key: (item.postId),
            label: (item.postName),
            value: (item.postId),
            disabled: (item.status == 1),
        }));
        const __VLS_402 = __VLS_401({
            key: (item.postId),
            label: (item.postName),
            value: (item.postId),
            disabled: (item.status == 1),
        }, ...__VLS_functionalComponentArgsRest(__VLS_401));
    }
    var __VLS_395;
    var __VLS_391;
}
var __VLS_387;
const __VLS_404 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_405 = __VLS_asFunctionalComponent(__VLS_404, new __VLS_404({
    span: (12),
}));
const __VLS_406 = __VLS_405({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_405));
__VLS_407.slots.default;
if (__VLS_ctx.roleOptions?.length) {
    const __VLS_408 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_409 = __VLS_asFunctionalComponent(__VLS_408, new __VLS_408({
        label: (__VLS_ctx.t('system.user.form.role')),
        prop: "roleIds",
    }));
    const __VLS_410 = __VLS_409({
        label: (__VLS_ctx.t('system.user.form.role')),
        prop: "roleIds",
    }, ...__VLS_functionalComponentArgsRest(__VLS_409));
    __VLS_411.slots.default;
    const __VLS_412 = {}.MYSelect;
    /** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
    // @ts-ignore
    const __VLS_413 = __VLS_asFunctionalComponent(__VLS_412, new __VLS_412({
        ...{ 'onChange': {} },
        vModel: (__VLS_ctx.form.roleIds.join(',')),
        multiple: true,
        placeholder: (__VLS_ctx.t('system.user.placeholder.role')),
    }));
    const __VLS_414 = __VLS_413({
        ...{ 'onChange': {} },
        vModel: (__VLS_ctx.form.roleIds.join(',')),
        multiple: true,
        placeholder: (__VLS_ctx.t('system.user.placeholder.role')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_413));
    let __VLS_416;
    let __VLS_417;
    let __VLS_418;
    const __VLS_419 = {
        onChange: (__VLS_ctx.handleRoleChange)
    };
    __VLS_415.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.roleOptions))) {
        const __VLS_420 = {}.MYOption;
        /** @type {[typeof __VLS_components.MYOption, ]} */ ;
        // @ts-ignore
        const __VLS_421 = __VLS_asFunctionalComponent(__VLS_420, new __VLS_420({
            key: (item.roleId),
            label: (item.roleName),
            value: (item.roleId),
            disabled: (item.status == 1),
        }));
        const __VLS_422 = __VLS_421({
            key: (item.roleId),
            label: (item.roleName),
            value: (item.roleId),
            disabled: (item.status == 1),
        }, ...__VLS_functionalComponentArgsRest(__VLS_421));
    }
    var __VLS_415;
    var __VLS_411;
}
var __VLS_407;
var __VLS_383;
const __VLS_424 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_425 = __VLS_asFunctionalComponent(__VLS_424, new __VLS_424({}));
const __VLS_426 = __VLS_425({}, ...__VLS_functionalComponentArgsRest(__VLS_425));
__VLS_427.slots.default;
const __VLS_428 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_429 = __VLS_asFunctionalComponent(__VLS_428, new __VLS_428({
    span: (24),
}));
const __VLS_430 = __VLS_429({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_429));
__VLS_431.slots.default;
const __VLS_432 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_433 = __VLS_asFunctionalComponent(__VLS_432, new __VLS_432({
    label: (__VLS_ctx.t('system.user.form.remark')),
}));
const __VLS_434 = __VLS_433({
    label: (__VLS_ctx.t('system.user.form.remark')),
}, ...__VLS_functionalComponentArgsRest(__VLS_433));
__VLS_435.slots.default;
const __VLS_436 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_437 = __VLS_asFunctionalComponent(__VLS_436, new __VLS_436({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: (__VLS_ctx.t('system.user.placeholder.remark')),
    placeholderColor: "var(--text-color-content)",
    rows: (3),
    maxlength: "500",
}));
const __VLS_438 = __VLS_437({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: (__VLS_ctx.t('system.user.placeholder.remark')),
    placeholderColor: "var(--text-color-content)",
    rows: (3),
    maxlength: "500",
}, ...__VLS_functionalComponentArgsRest(__VLS_437));
var __VLS_435;
var __VLS_431;
var __VLS_427;
var __VLS_257;
{
    const { footer: __VLS_thisSlot } = __VLS_253.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_440 = {}.MYRow;
    /** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
    // @ts-ignore
    const __VLS_441 = __VLS_asFunctionalComponent(__VLS_440, new __VLS_440({
        gutter: (20),
    }));
    const __VLS_442 = __VLS_441({
        gutter: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_441));
    __VLS_443.slots.default;
    const __VLS_444 = {}.MYCol;
    /** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
    // @ts-ignore
    const __VLS_445 = __VLS_asFunctionalComponent(__VLS_444, new __VLS_444({
        span: (12),
    }));
    const __VLS_446 = __VLS_445({
        span: (12),
    }, ...__VLS_functionalComponentArgsRest(__VLS_445));
    __VLS_447.slots.default;
    const __VLS_448 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_449 = __VLS_asFunctionalComponent(__VLS_448, new __VLS_448({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_450 = __VLS_449({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_449));
    let __VLS_452;
    let __VLS_453;
    let __VLS_454;
    const __VLS_455 = {
        onClick: (__VLS_ctx.submitForm)
    };
    __VLS_451.slots.default;
    (__VLS_ctx.t('system.user.action.confirm'));
    var __VLS_451;
    var __VLS_447;
    const __VLS_456 = {}.MYCol;
    /** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
    // @ts-ignore
    const __VLS_457 = __VLS_asFunctionalComponent(__VLS_456, new __VLS_456({
        span: (4),
    }));
    const __VLS_458 = __VLS_457({
        span: (4),
    }, ...__VLS_functionalComponentArgsRest(__VLS_457));
    __VLS_459.slots.default;
    const __VLS_460 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_461 = __VLS_asFunctionalComponent(__VLS_460, new __VLS_460({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_462 = __VLS_461({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_461));
    let __VLS_464;
    let __VLS_465;
    let __VLS_466;
    const __VLS_467 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_463.slots.default;
    (__VLS_ctx.t('system.user.action.cancel'));
    var __VLS_463;
    var __VLS_459;
    var __VLS_443;
}
var __VLS_253;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-input']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_259 = __VLS_258;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            t: t,
            sys_normal_disable: sys_normal_disable,
            sys_user_sex: sys_user_sex,
            userList: userList,
            open: open,
            loading: loading,
            showSearch: showSearch,
            single: single,
            total: total,
            title: title,
            enabledDeptOptions: enabledDeptOptions,
            postOptions: postOptions,
            roleOptions: roleOptions,
            dictLoaded: dictLoaded,
            columns: columns,
            form: form,
            queryParams: queryParams,
            rules: rules,
            queryRef: queryRef,
            userRef: userRef,
            getList: getList,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectionChange: handleSelectionChange,
            handleDelete: handleDelete,
            handleStatusChange: handleStatusChange,
            handleAuthRole: handleAuthRole,
            handleResetPwd: handleResetPwd,
            cancel: cancel,
            handleAdd: handleAdd,
            handleUpdate: handleUpdate,
            handlePostChange: handlePostChange,
            handleRoleChange: handleRoleChange,
            submitForm: submitForm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
