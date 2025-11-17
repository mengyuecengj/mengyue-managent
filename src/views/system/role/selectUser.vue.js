import { ElMessage } from 'element-plus';
import { unallocatedUserList, authUserSelectAll } from '@/api/system/role';
import { useDict } from '@/utils/dict';
import { parseTime } from '@/utils/general';
const props = defineProps();
const emit = defineEmits();
const dictRes = useDict('sys_normal_disable');
const sys_normal_disable = dictRes.sys_normal_disable.value;
// 表单 & 表格 refs
const queryRef = ref();
const refTable = ref(null);
// 响应式状态
const visible = ref(false);
const loading = ref(false);
const userList = ref([]);
const total = ref(0);
const userIds = ref([]);
const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
    roleId: undefined,
    userName: undefined,
    phonenumber: undefined,
});
function unwrapResponse(resp) {
    let data = resp;
    if (data && typeof data === 'object' && 'data' in data) {
        data = data.data;
    }
    return data == null ? null : data;
}
function show() {
    queryParams.roleId = props.roleId;
    queryParams.pageNum = 1;
    queryParams.pageSize = 10;
    queryParams.userName = undefined;
    queryParams.phonenumber = undefined;
    getList();
    visible.value = true;
}
const __VLS_exposed = { show };
defineExpose(__VLS_exposed);
// ===== 点击行切换选中 =====
function clickRow(row) {
    if (refTable.value) {
        refTable.value.toggleRowSelection(row);
    }
}
// ===== 多选框选中变化 =====
function handleSelectionChange(selection) {
    userIds.value = selection.map(item => item.userId);
}
// ===== 查询列表 =====
async function getList() {
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
        const dataUnwrapped = unwrapResponse(resp);
        if (dataUnwrapped && Array.isArray(dataUnwrapped.rows)) {
            userList.value = dataUnwrapped.rows;
            total.value = typeof dataUnwrapped.total === 'number'
                ? dataUnwrapped.total
                : dataUnwrapped.rows.length;
        }
        else {
            console.warn('[SelectUser] getList 未解析到 rows:', dataUnwrapped);
            userList.value = [];
            total.value = 0;
            ElMessage.error('获取可选用户列表异常');
        }
    }
    catch (err) {
        console.error('[SelectUser] getList 异常', err);
        userList.value = [];
        total.value = 0;
        ElMessage.error('获取可选用户列表失败');
    }
    finally {
        loading.value = false;
    }
}
// ===== 搜索 =====
function handleQuery() {
    queryParams.pageNum = 1;
    getList();
}
// ===== 重置 =====
function resetQuery() {
    if (queryRef.value) {
        queryRef.value.resetFields();
    }
    queryParams.pageNum = 1;
    queryParams.userName = undefined;
    queryParams.phonenumber = undefined;
    getList();
}
// ===== 确定选择用户 =====
async function handleSelectUser() {
    const roleId = queryParams.roleId;
    const uIds = userIds.value.join(',');
    if (!uIds) {
        ElMessage.warning('请选择要分配的用户');
        return;
    }
    try {
        // 直接传递对象，不要使用 JSON.stringify()
        const resp = await authUserSelectAll({
            roleId: roleId,
            userIds: uIds
        });
        const dataUnwrapped = unwrapResponse(resp);
        const msg = dataUnwrapped?.msg ?? '操作成功';
        ElMessage.success(msg);
        visible.value = false;
        emit('ok');
    }
    catch (err) {
        console.error('[SelectUser] handleSelectUser 异常', err);
        ElMessage.error('分配用户失败');
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "选择用户",
    modelValue: (__VLS_ctx.visible),
    width: "800px",
    height: "650px",
    top: "5vh",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}));
const __VLS_2 = __VLS_1({
    title: "选择用户",
    modelValue: (__VLS_ctx.visible),
    width: "800px",
    height: "650px",
    top: "5vh",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    gutter: (20),
}));
const __VLS_6 = __VLS_5({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "dialog_form" },
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
}));
const __VLS_10 = __VLS_9({
    ...{ class: "dialog_form" },
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {typeof __VLS_ctx.queryRef} */ ;
var __VLS_12 = {};
__VLS_11.slots.default;
const __VLS_14 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    gutter: (20),
}));
const __VLS_16 = __VLS_15({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    span: (10),
}));
const __VLS_20 = __VLS_19({
    span: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    prop: "userName",
    label: "用户名称",
}));
const __VLS_24 = __VLS_23({
    prop: "userName",
    label: "用户名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.userName),
    placeholder: "请输入用户名称",
    clearable: true,
    ...{ style: {} },
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_28 = __VLS_27({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.userName),
    placeholder: "请输入用户名称",
    clearable: true,
    ...{ style: {} },
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_30;
let __VLS_31;
let __VLS_32;
const __VLS_33 = {
    onKeyup: (__VLS_ctx.handleQuery)
};
var __VLS_29;
var __VLS_25;
var __VLS_21;
const __VLS_34 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    span: (12),
}));
const __VLS_36 = __VLS_35({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    prop: "status",
    label: "手机号码",
}));
const __VLS_40 = __VLS_39({
    prop: "status",
    label: "手机号码",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
const __VLS_42 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    modelValue: (__VLS_ctx.queryParams.phonenumber),
    placeholder: "请输入手机号码",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_44 = __VLS_43({
    modelValue: (__VLS_ctx.queryParams.phonenumber),
    placeholder: "请输入手机号码",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_46 = {}.MYOption;
    /** @type {[typeof __VLS_components.MYOption, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }));
    const __VLS_48 = __VLS_47({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
}
var __VLS_45;
var __VLS_41;
var __VLS_37;
const __VLS_50 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    span: (4),
}));
const __VLS_52 = __VLS_51({
    span: (4),
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
    type: "primary",
    icon: "MYSearch",
}));
const __VLS_60 = __VLS_59({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_62;
let __VLS_63;
let __VLS_64;
const __VLS_65 = {
    onClick: (__VLS_ctx.handleQuery)
};
__VLS_61.slots.default;
var __VLS_61;
var __VLS_57;
var __VLS_53;
const __VLS_66 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    span: (4),
}));
const __VLS_68 = __VLS_67({
    span: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_69.slots.default;
const __VLS_70 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
__VLS_73.slots.default;
const __VLS_74 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}));
const __VLS_76 = __VLS_75({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_78;
let __VLS_79;
let __VLS_80;
const __VLS_81 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_77.slots.default;
var __VLS_77;
var __VLS_73;
var __VLS_69;
var __VLS_17;
var __VLS_11;
var __VLS_7;
const __VLS_82 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    ...{ style: {} },
}));
const __VLS_84 = __VLS_83({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
const __VLS_86 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    ...{ 'onRowClick': {} },
    ...{ 'onSelectionChange': {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    ref: "refTable",
    data: (__VLS_ctx.userList),
    ...{ style: {} },
    rowKey: "userId",
}));
const __VLS_88 = __VLS_87({
    ...{ 'onRowClick': {} },
    ...{ 'onSelectionChange': {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    ref: "refTable",
    data: (__VLS_ctx.userList),
    ...{ style: {} },
    rowKey: "userId",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_90;
let __VLS_91;
let __VLS_92;
const __VLS_93 = {
    onRowClick: (__VLS_ctx.clickRow)
};
const __VLS_94 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {typeof __VLS_ctx.refTable} */ ;
var __VLS_95 = {};
__VLS_89.slots.default;
const __VLS_97 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    type: "selection",
    width: "55",
}));
const __VLS_99 = __VLS_98({
    type: "selection",
    width: "55",
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
const __VLS_101 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
    label: "用户名称",
    prop: "userName",
    showOverflowTooltip: (true),
}));
const __VLS_103 = __VLS_102({
    label: "用户名称",
    prop: "userName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const __VLS_105 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    label: "用户昵称",
    prop: "nickName",
    showOverflowTooltip: (true),
}));
const __VLS_107 = __VLS_106({
    label: "用户昵称",
    prop: "nickName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const __VLS_109 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
    label: "邮箱",
    prop: "email",
    showOverflowTooltip: (true),
}));
const __VLS_111 = __VLS_110({
    label: "邮箱",
    prop: "email",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
const __VLS_113 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    label: "手机",
    prop: "phonenumber",
    showOverflowTooltip: (true),
}));
const __VLS_115 = __VLS_114({
    label: "手机",
    prop: "phonenumber",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
const __VLS_117 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
    label: "状态",
    align: "center",
    prop: "status",
}));
const __VLS_119 = __VLS_118({
    label: "状态",
    align: "center",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
__VLS_120.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_120.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_121 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
        options: (__VLS_ctx.sys_normal_disable),
        value: (scope.row.status),
    }));
    const __VLS_123 = __VLS_122({
        options: (__VLS_ctx.sys_normal_disable),
        value: (scope.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
}
var __VLS_120;
const __VLS_125 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}));
const __VLS_127 = __VLS_126({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_128.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_128.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.createTime));
}
var __VLS_128;
var __VLS_89;
const __VLS_129 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
    ...{ style: {} },
}));
const __VLS_131 = __VLS_130({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
let __VLS_133;
let __VLS_134;
let __VLS_135;
const __VLS_136 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_132;
var __VLS_85;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_137 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }));
    const __VLS_139 = __VLS_138({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    let __VLS_141;
    let __VLS_142;
    let __VLS_143;
    const __VLS_144 = {
        onClick: (__VLS_ctx.handleSelectUser)
    };
    __VLS_140.slots.default;
    var __VLS_140;
    const __VLS_145 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_147 = __VLS_146({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_146));
    let __VLS_149;
    let __VLS_150;
    let __VLS_151;
    const __VLS_152 = {
        onClick: (...[$event]) => {
            __VLS_ctx.visible = false;
        }
    };
    __VLS_148.slots.default;
    var __VLS_148;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_13 = __VLS_12, __VLS_96 = __VLS_95;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            sys_normal_disable: sys_normal_disable,
            queryRef: queryRef,
            refTable: refTable,
            visible: visible,
            loading: loading,
            userList: userList,
            total: total,
            queryParams: queryParams,
            clickRow: clickRow,
            handleSelectionChange: handleSelectionChange,
            getList: getList,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectUser: handleSelectUser,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
