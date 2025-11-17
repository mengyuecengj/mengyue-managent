import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import selectUser from './selectUser.vue';
import { parseTime } from '@/utils/general';
import { allocatedUserList, authUserCancel, authUserCancelAll } from '@/api/system/role';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useDict } from '@/utils/dict';
// useDict 类型假设已调整，返回 { dictLoaded: Ref<boolean>, sys_normal_disable: Ref<DictOption[]> }
const { sys_normal_disable } = useDict('sys_normal_disable');
// 表单 ref
const queryRef = ref();
const selectRef = ref();
// 状态
const userList = ref([]);
const loading = ref(false);
const showSearch = ref(true);
const multiple = ref(true);
const total = ref(0);
const userIds = ref([]);
const route = useRoute();
const router = useRouter();
// 确保 roleId 有值
const roleIdFromRoute = String(route.params.roleId ?? '');
const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
    roleId: roleIdFromRoute,
    userName: undefined,
    phonenumber: undefined,
});
// 查询函数
async function getList() {
    loading.value = true;
    try {
        // 调试打印参数
        // 根据实际 API 签名选择传参方式：
        // 假设 allocatedUserList 接收对象：
        const resp = await allocatedUserList(queryParams);
        // 处理可能的 AxiosResponse 包装：
        let data;
        if (resp.data !== undefined) {
            data = resp.data;
        }
        else {
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
        }
        else {
            console.warn('[getList] data.rows 不是数组', data);
            userList.value = [];
            total.value = 0;
            ElMessage.error('获取用户列表格式异常');
        }
    }
    catch (error) {
        console.error('[getList] 异常', error);
        userList.value = [];
        total.value = 0;
        ElMessage.error('获取授权用户列表失败');
    }
    finally {
        loading.value = false;
    }
}
// 返回/关闭
function handleClose() {
    router.back();
}
// 搜索
function handleQuery() {
    queryParams.pageNum = 1;
    getList();
}
// 重置查询
function resetQuery() {
    if (queryRef.value) {
        queryRef.value.resetFields();
    }
    queryParams.pageNum = 1;
    queryParams.userName = undefined;
    queryParams.phonenumber = undefined;
    getList();
}
// 多选框变化
function handleSelectionChange(selection) {
    userIds.value = selection.map(item => item.userId);
    multiple.value = selection.length === 0;
}
// 打开选择用户弹窗
function openSelectUser() {
    if (selectRef.value && typeof selectRef.value.show === 'function') {
        selectRef.value.show();
    }
    else {
        console.warn('selectRef 未就绪或无 show 方法');
    }
}
// 取消单个用户授权
function cancelAuthUser(row) {
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
        }
        catch (err) {
            console.error('cancelAuthUser 异常', err);
            ElMessage.error('取消授权失败');
        }
    })
        .catch(() => { });
}
// 批量取消授权
function cancelAuthUserAll() {
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
        }
        catch (err) {
            console.error('cancelAuthUserAll 异常', err);
            ElMessage.error('批量取消授权失败');
        }
    })
        .catch(() => { });
}
onMounted(() => {
    getList();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
});
const __VLS_0 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    labelWidth: "68",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    labelWidth: "68",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showSearch) }, null, null);
/** @type {typeof __VLS_ctx.queryRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    span: (6),
    offset: (2),
}));
const __VLS_12 = __VLS_11({
    span: (6),
    offset: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
const __VLS_14 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "用户名称",
    prop: "userName",
}));
const __VLS_16 = __VLS_15({
    label: "用户名称",
    prop: "userName",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    placeholder: "请输入用户名称",
    modelValue: (__VLS_ctx.queryParams.userName),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
    ...{ style: {} },
}));
const __VLS_20 = __VLS_19({
    placeholder: "请输入用户名称",
    modelValue: (__VLS_ctx.queryParams.userName),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
var __VLS_17;
var __VLS_13;
const __VLS_22 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    span: (6),
    offset: (2),
}));
const __VLS_24 = __VLS_23({
    span: (6),
    offset: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    label: "手机号码",
    prop: "phonenumber",
}));
const __VLS_28 = __VLS_27({
    label: "手机号码",
    prop: "phonenumber",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
const __VLS_30 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    placeholder: "请输入手机号码",
    modelValue: (__VLS_ctx.queryParams.phonenumber),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
    ...{ style: {} },
}));
const __VLS_32 = __VLS_31({
    placeholder: "请输入手机号码",
    modelValue: (__VLS_ctx.queryParams.phonenumber),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
var __VLS_29;
var __VLS_25;
const __VLS_34 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    span: (2),
}));
const __VLS_36 = __VLS_35({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
const __VLS_42 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_46;
let __VLS_47;
let __VLS_48;
const __VLS_49 = {
    onClick: (__VLS_ctx.handleQuery)
};
__VLS_45.slots.default;
var __VLS_45;
var __VLS_41;
var __VLS_37;
const __VLS_50 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    span: (1),
}));
const __VLS_52 = __VLS_51({
    span: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
const __VLS_54 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
const __VLS_58 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}));
const __VLS_60 = __VLS_59({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_62;
let __VLS_63;
let __VLS_64;
const __VLS_65 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_61.slots.default;
var __VLS_61;
var __VLS_57;
var __VLS_53;
var __VLS_9;
var __VLS_3;
const __VLS_66 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    gutter: (10),
    ...{ class: "mb8" },
}));
const __VLS_68 = __VLS_67({
    gutter: (10),
    ...{ class: "mb8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_69.slots.default;
const __VLS_70 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    span: (3),
}));
const __VLS_72 = __VLS_71({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
__VLS_73.slots.default;
const __VLS_74 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}));
const __VLS_76 = __VLS_75({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_78;
let __VLS_79;
let __VLS_80;
const __VLS_81 = {
    onClick: (__VLS_ctx.openSelectUser)
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:add']) }, null, null);
__VLS_77.slots.default;
var __VLS_77;
var __VLS_73;
const __VLS_82 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    span: (4),
}));
const __VLS_84 = __VLS_83({
    span: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
const __VLS_86 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYCircleClose",
    disabled: (__VLS_ctx.multiple),
}));
const __VLS_88 = __VLS_87({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYCircleClose",
    disabled: (__VLS_ctx.multiple),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_90;
let __VLS_91;
let __VLS_92;
const __VLS_93 = {
    onClick: (__VLS_ctx.cancelAuthUserAll)
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:remove']) }, null, null);
__VLS_89.slots.default;
var __VLS_89;
var __VLS_85;
const __VLS_94 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    span: (3),
}));
const __VLS_96 = __VLS_95({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
const __VLS_98 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    ...{ 'onClick': {} },
    type: "warning",
    icon: "MYClose",
}));
const __VLS_100 = __VLS_99({
    ...{ 'onClick': {} },
    type: "warning",
    icon: "MYClose",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
let __VLS_102;
let __VLS_103;
let __VLS_104;
const __VLS_105 = {
    onClick: (__VLS_ctx.handleClose)
};
__VLS_101.slots.default;
var __VLS_101;
var __VLS_97;
const __VLS_106 = {}.RightToolbar;
/** @type {[typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}));
const __VLS_108 = __VLS_107({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
let __VLS_110;
let __VLS_111;
let __VLS_112;
const __VLS_113 = {
    onQueryTable: (__VLS_ctx.getList)
};
var __VLS_109;
var __VLS_69;
const __VLS_114 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    ...{ 'onSelectionChange': {} },
    data: (__VLS_ctx.userList),
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
}));
const __VLS_116 = __VLS_115({
    ...{ 'onSelectionChange': {} },
    data: (__VLS_ctx.userList),
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
let __VLS_118;
let __VLS_119;
let __VLS_120;
const __VLS_121 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_117.slots.default;
const __VLS_122 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    type: "selection",
    width: "55",
    align: "center",
}));
const __VLS_124 = __VLS_123({
    type: "selection",
    width: "55",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
const __VLS_126 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    label: "用户名称",
    prop: "userName",
    showOverflowTooltip: (true),
}));
const __VLS_128 = __VLS_127({
    label: "用户名称",
    prop: "userName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const __VLS_130 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    label: "用户昵称",
    prop: "nickName",
    showOverflowTooltip: (true),
}));
const __VLS_132 = __VLS_131({
    label: "用户昵称",
    prop: "nickName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const __VLS_134 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    label: "邮箱",
    prop: "email",
    showOverflowTooltip: (true),
}));
const __VLS_136 = __VLS_135({
    label: "邮箱",
    prop: "email",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
const __VLS_138 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    label: "手机",
    prop: "phonenumber",
    showOverflowTooltip: (true),
}));
const __VLS_140 = __VLS_139({
    label: "手机",
    prop: "phonenumber",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const __VLS_142 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    label: "状态",
    align: "center",
    prop: "status",
}));
const __VLS_144 = __VLS_143({
    label: "状态",
    align: "center",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
__VLS_145.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_145.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_146 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
        options: (__VLS_ctx.sys_normal_disable),
        value: (scope.row.status),
    }));
    const __VLS_148 = __VLS_147({
        options: (__VLS_ctx.sys_normal_disable),
        value: (scope.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
}
var __VLS_145;
const __VLS_150 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}));
const __VLS_152 = __VLS_151({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
__VLS_153.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_153.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.createTime));
}
var __VLS_153;
const __VLS_154 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    label: "操作",
    align: "center",
    className: "small-padding fixed-width",
    prop: "operation",
}));
const __VLS_156 = __VLS_155({
    label: "操作",
    align: "center",
    className: "small-padding fixed-width",
    prop: "operation",
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
{
    const { operation: __VLS_thisSlot } = __VLS_117.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_158 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYCircleClose",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }));
    const __VLS_160 = __VLS_159({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYCircleClose",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_159));
    let __VLS_162;
    let __VLS_163;
    let __VLS_164;
    const __VLS_165 = {
        onClick: (() => __VLS_ctx.cancelAuthUser(scope.row))
    };
    __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:role:remove']) }, null, null);
    __VLS_161.slots.default;
    var __VLS_161;
}
var __VLS_117;
const __VLS_166 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_168 = __VLS_167({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
let __VLS_170;
let __VLS_171;
let __VLS_172;
const __VLS_173 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_169;
/** @type {[typeof selectUser, ]} */ ;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent(selectUser, new selectUser({
    ...{ 'onOk': {} },
    ref: "selectRef",
    roleId: (__VLS_ctx.queryParams.roleId),
}));
const __VLS_175 = __VLS_174({
    ...{ 'onOk': {} },
    ref: "selectRef",
    roleId: (__VLS_ctx.queryParams.roleId),
}, ...__VLS_functionalComponentArgsRest(__VLS_174));
let __VLS_177;
let __VLS_178;
let __VLS_179;
const __VLS_180 = {
    onOk: (__VLS_ctx.handleQuery)
};
/** @type {typeof __VLS_ctx.selectRef} */ ;
var __VLS_181 = {};
var __VLS_176;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4, __VLS_182 = __VLS_181;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            selectUser: selectUser,
            parseTime: parseTime,
            sys_normal_disable: sys_normal_disable,
            queryRef: queryRef,
            selectRef: selectRef,
            userList: userList,
            loading: loading,
            showSearch: showSearch,
            multiple: multiple,
            total: total,
            queryParams: queryParams,
            getList: getList,
            handleClose: handleClose,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectionChange: handleSelectionChange,
            openSelectUser: openSelectUser,
            cancelAuthUser: cancelAuthUser,
            cancelAuthUserAll: cancelAuthUserAll,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
