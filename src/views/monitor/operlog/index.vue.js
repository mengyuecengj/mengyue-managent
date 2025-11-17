import { list, delOperlog, cleanOperlog } from '@/api/monitor/operlog';
import modal from '@/plugins/modal';
const { proxy } = getCurrentInstance();
const { sys_oper_type, sys_common_status } = proxy.useDict("sys_oper_type", "sys_common_status");
const operlogList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const multiple = ref(true);
const total = ref(0);
const dateRange = ref([]);
const defaultSort = ref({ prop: "operTime", order: "descending" });
// 初始查询参数
const initQueryParams = {
    pageNum: 1,
    pageSize: 10,
    operIp: undefined,
    title: undefined,
    operName: undefined,
    status: undefined,
    businessType: undefined,
    orderByColumn: undefined,
    isAsc: undefined,
};
const data = reactive({
    form: {
        operId: undefined,
        title: undefined,
        businessType: undefined,
        method: undefined,
        requestMethod: undefined,
        operatorType: undefined,
        operName: undefined,
        deptName: undefined,
        operUrl: undefined,
        operIp: undefined,
        operLocation: undefined,
        operParam: undefined,
        status: 0,
        errorMsg: undefined,
        operTime: undefined,
        costTime: undefined,
        jsonResult: undefined,
        type: undefined
    },
    queryParams: { ...initQueryParams }
});
const { queryParams, form } = toRefs(data);
// 查询登录日志
function getList() {
    loading.value = true;
    list(proxy.addDateRange(queryParams.value, dateRange.value)).then((res) => {
        operlogList.value = res.rows;
        total.value = res.total;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    });
}
// 操作日志类型字典翻译
function typeFormat(row) {
    return proxy.selectDictLabel(sys_oper_type.value, row.businessType);
}
// 搜索按钮操作
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}
// 重置按钮操作 - 修复：正确重置所有参数
function resetQuery() {
    dateRange.value = [];
    // 重置查询参数为初始值
    Object.assign(queryParams.value, initQueryParams);
    // 如果有表单引用，也重置表单
    if (proxy.$refs.queryRef) {
        proxy.$refs.queryRef.resetFields();
    }
    handleQuery();
}
// 多选框按钮操作 - 修复：正确设置multiple状态
function handleSelectionChange(selection) {
    ids.value = selection.map((item) => item.operId);
    multiple.value = !selection.length;
}
// 排序触发事件
function handleSortChange(column) {
    queryParams.value.orderByColumn = column.prop;
    queryParams.value.isAsc = column.order;
    getList();
}
// 详细按钮操作
function handleView(row) {
    open.value = true;
    form.value = { ...row };
}
// 删除按钮操作 - 修复：正确处理单条删除和批量删除
function handleDelete(row) {
    const operIds = row?.operId || ids.value;
    if (!operIds || (Array.isArray(operIds) && operIds.length === 0)) {
        modal.msgWarning("请选择要删除的数据项");
        return;
    }
    modal.confirm(`是否确认删除日志编号为"${operIds}"的数据项?`).then(() => {
        return delOperlog(operIds);
    }).then(() => {
        getList();
        modal.msgSuccess("删除成功");
        // 删除后清空选择
        if (proxy.$refs.operlogRef) {
            proxy.$refs.operlogRef.clearSelection();
        }
    }).catch(() => { });
}
// 清空按钮操作 - 修复：添加确认和错误处理
function handleClean() {
    modal.confirm("是否确认清空所有操作日志数据项?").then(() => {
        return cleanOperlog();
    }).then(() => {
        getList();
        proxy.$modal.msgSuccess("清空成功");
    }).catch(() => { });
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
    label: "操作地址",
    prop: "operIp",
}));
const __VLS_20 = __VLS_19({
    label: "操作地址",
    prop: "operIp",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.operIp),
    placeholder: "请输入操作地址",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.operIp),
    placeholder: "请输入操作地址",
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
    label: "系统模块",
    prop: "title",
}));
const __VLS_36 = __VLS_35({
    label: "系统模块",
    prop: "title",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.title),
    placeholder: "请输入系统模块",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.title),
    placeholder: "请输入系统模块",
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
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_common_status))) {
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
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}));
const __VLS_104 = __VLS_103({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_106;
let __VLS_107;
let __VLS_108;
const __VLS_109 = {
    onClick: (__VLS_ctx.handleDelete)
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['monitor:operlog:remove']) }, null, null);
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
    type: "danger",
    icon: "MYDelete",
}));
const __VLS_116 = __VLS_115({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYDelete",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
let __VLS_118;
let __VLS_119;
let __VLS_120;
const __VLS_121 = {
    onClick: (__VLS_ctx.handleClean)
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['monitor:operlog:remove']) }, null, null);
__VLS_117.slots.default;
var __VLS_117;
var __VLS_113;
const __VLS_122 = {}.RightToolbar;
/** @type {[typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}));
const __VLS_124 = __VLS_123({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
let __VLS_126;
let __VLS_127;
let __VLS_128;
const __VLS_129 = {
    onQueryTable: (__VLS_ctx.getList)
};
var __VLS_125;
var __VLS_97;
const __VLS_130 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    ...{ 'onSelectionChange': {} },
    ...{ 'onSortChange': {} },
    rowKey: "operId",
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    ref: "operlogRef",
    data: (__VLS_ctx.operlogList),
    defaultSort: (__VLS_ctx.defaultSort),
}));
const __VLS_132 = __VLS_131({
    ...{ 'onSelectionChange': {} },
    ...{ 'onSortChange': {} },
    rowKey: "operId",
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    ref: "operlogRef",
    data: (__VLS_ctx.operlogList),
    defaultSort: (__VLS_ctx.defaultSort),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
let __VLS_134;
let __VLS_135;
let __VLS_136;
const __VLS_137 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
const __VLS_138 = {
    onSortChange: (__VLS_ctx.handleSortChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {typeof __VLS_ctx.operlogRef} */ ;
var __VLS_139 = {};
__VLS_133.slots.default;
const __VLS_141 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
    type: "selection",
    width: "50",
    align: "center",
}));
const __VLS_143 = __VLS_142({
    type: "selection",
    width: "50",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
const __VLS_145 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
    label: "日志编号",
    align: "center",
    prop: "operId",
}));
const __VLS_147 = __VLS_146({
    label: "日志编号",
    align: "center",
    prop: "operId",
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
const __VLS_149 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
    label: "系统模块",
    align: "center",
    prop: "title",
    showOverflowTooltip: (true),
}));
const __VLS_151 = __VLS_150({
    label: "系统模块",
    align: "center",
    prop: "title",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
const __VLS_153 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
    label: "操作类型",
    align: "center",
    prop: "businessType",
}));
const __VLS_155 = __VLS_154({
    label: "操作类型",
    align: "center",
    prop: "businessType",
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
{
    const { businessType: __VLS_thisSlot } = __VLS_133.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_157 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
        options: (__VLS_ctx.sys_oper_type),
        value: (scope.row.businessType),
    }));
    const __VLS_159 = __VLS_158({
        options: (__VLS_ctx.sys_oper_type),
        value: (scope.row.businessType),
    }, ...__VLS_functionalComponentArgsRest(__VLS_158));
}
const __VLS_161 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    label: "操作人员",
    align: "center",
    width: "110",
    prop: "operName",
    showOverflowTooltip: (true),
}));
const __VLS_163 = __VLS_162({
    label: "操作人员",
    align: "center",
    width: "110",
    prop: "operName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
const __VLS_165 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
    label: "操作地址",
    align: "center",
    prop: "operIp",
    width: "130",
    showOverflowTooltip: (true),
}));
const __VLS_167 = __VLS_166({
    label: "操作地址",
    align: "center",
    prop: "operIp",
    width: "130",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
const __VLS_169 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
    label: "操作地点",
    align: "center",
    prop: "operLocation",
    width: "130",
    showOverflowTooltip: (true),
}));
const __VLS_171 = __VLS_170({
    label: "操作地点",
    align: "center",
    prop: "operLocation",
    width: "130",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
const __VLS_173 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
    label: "操作状态",
    align: "center",
    prop: "status",
}));
const __VLS_175 = __VLS_174({
    label: "操作状态",
    align: "center",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_174));
{
    const { status: __VLS_thisSlot } = __VLS_133.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_177 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
        options: (__VLS_ctx.sys_common_status),
        value: (scope.row.status),
    }));
    const __VLS_179 = __VLS_178({
        options: (__VLS_ctx.sys_common_status),
        value: (scope.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_178));
}
const __VLS_181 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({
    label: "操作日期",
    align: "center",
    prop: "operTime",
    width: "180",
    sortable: "custom",
    sortOrders: (['descending', 'ascending']),
}));
const __VLS_183 = __VLS_182({
    label: "操作日期",
    align: "center",
    prop: "operTime",
    width: "180",
    sortable: "custom",
    sortOrders: (['descending', 'ascending']),
}, ...__VLS_functionalComponentArgsRest(__VLS_182));
const __VLS_185 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
    label: "消耗时间",
    prop: "costTime",
}));
const __VLS_187 = __VLS_186({
    label: "消耗时间",
    prop: "costTime",
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
{
    const { costTime: __VLS_thisSlot } = __VLS_133.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (scope.row.costTime);
}
const __VLS_189 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent(__VLS_189, new __VLS_189({
    label: "操作",
    align: "center",
    prop: "operation",
    className: "small-padding fixed-width",
}));
const __VLS_191 = __VLS_190({
    label: "操作",
    align: "center",
    prop: "operation",
    className: "small-padding fixed-width",
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
{
    const { operation: __VLS_thisSlot } = __VLS_133.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_193 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYViewEye",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }));
    const __VLS_195 = __VLS_194({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYViewEye",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_194));
    let __VLS_197;
    let __VLS_198;
    let __VLS_199;
    const __VLS_200 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleView(scope.row);
        }
    };
    __VLS_196.slots.default;
    var __VLS_196;
}
var __VLS_133;
const __VLS_201 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_203 = __VLS_202({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
let __VLS_205;
let __VLS_206;
let __VLS_207;
const __VLS_208 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_204;
const __VLS_209 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_210 = __VLS_asFunctionalComponent(__VLS_209, new __VLS_209({
    title: "操作日志详细",
    modelValue: (__VLS_ctx.open),
    width: "800px",
    height: "650px",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}));
const __VLS_211 = __VLS_210({
    title: "操作日志详细",
    modelValue: (__VLS_ctx.open),
    width: "800px",
    height: "650px",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_210));
__VLS_212.slots.default;
const __VLS_213 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_214 = __VLS_asFunctionalComponent(__VLS_213, new __VLS_213({
    ...{ class: "dialog_form" },
    model: (__VLS_ctx.form),
    labelWidth: "100px",
}));
const __VLS_215 = __VLS_214({
    ...{ class: "dialog_form" },
    model: (__VLS_ctx.form),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_214));
__VLS_216.slots.default;
const __VLS_217 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({}));
const __VLS_219 = __VLS_218({}, ...__VLS_functionalComponentArgsRest(__VLS_218));
__VLS_220.slots.default;
const __VLS_221 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_222 = __VLS_asFunctionalComponent(__VLS_221, new __VLS_221({
    span: (12),
}));
const __VLS_223 = __VLS_222({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_222));
__VLS_224.slots.default;
const __VLS_225 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
    label: "操作模块: ",
}));
const __VLS_227 = __VLS_226({
    label: "操作模块: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
__VLS_228.slots.default;
(__VLS_ctx.form.title);
(__VLS_ctx.form.type ? __VLS_ctx.typeFormat(__VLS_ctx.form.type) : '');
var __VLS_228;
const __VLS_229 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({
    label: "登录信息: ",
}));
const __VLS_231 = __VLS_230({
    label: "登录信息: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_230));
__VLS_232.slots.default;
(__VLS_ctx.form.operName);
(__VLS_ctx.form.operIp);
(__VLS_ctx.form.operLocation);
var __VLS_232;
var __VLS_224;
const __VLS_233 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent(__VLS_233, new __VLS_233({
    span: (12),
}));
const __VLS_235 = __VLS_234({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_234));
__VLS_236.slots.default;
const __VLS_237 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
    label: "请求地址: ",
}));
const __VLS_239 = __VLS_238({
    label: "请求地址: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_238));
__VLS_240.slots.default;
(__VLS_ctx.form.operUrl);
var __VLS_240;
const __VLS_241 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({
    label: "请求方式: ",
}));
const __VLS_243 = __VLS_242({
    label: "请求方式: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_242));
__VLS_244.slots.default;
(__VLS_ctx.form.requestMethod);
var __VLS_244;
var __VLS_236;
const __VLS_245 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_246 = __VLS_asFunctionalComponent(__VLS_245, new __VLS_245({
    span: (24),
}));
const __VLS_247 = __VLS_246({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_246));
__VLS_248.slots.default;
const __VLS_249 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_250 = __VLS_asFunctionalComponent(__VLS_249, new __VLS_249({
    label: "操作方法: ",
}));
const __VLS_251 = __VLS_250({
    label: "操作方法: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_250));
__VLS_252.slots.default;
(__VLS_ctx.form.method);
var __VLS_252;
var __VLS_248;
const __VLS_253 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253({
    span: (24),
}));
const __VLS_255 = __VLS_254({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_254));
__VLS_256.slots.default;
const __VLS_257 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
    label: "请求参数: ",
}));
const __VLS_259 = __VLS_258({
    label: "请求参数: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_258));
__VLS_260.slots.default;
(__VLS_ctx.form.operParam);
var __VLS_260;
var __VLS_256;
const __VLS_261 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_262 = __VLS_asFunctionalComponent(__VLS_261, new __VLS_261({
    span: (24),
}));
const __VLS_263 = __VLS_262({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_262));
__VLS_264.slots.default;
const __VLS_265 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_266 = __VLS_asFunctionalComponent(__VLS_265, new __VLS_265({
    label: "返回参数: ",
}));
const __VLS_267 = __VLS_266({
    label: "返回参数: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_266));
__VLS_268.slots.default;
(__VLS_ctx.form.jsonResult);
var __VLS_268;
var __VLS_264;
const __VLS_269 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_270 = __VLS_asFunctionalComponent(__VLS_269, new __VLS_269({
    span: (8),
}));
const __VLS_271 = __VLS_270({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_270));
__VLS_272.slots.default;
const __VLS_273 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_274 = __VLS_asFunctionalComponent(__VLS_273, new __VLS_273({
    label: "操作状态: ",
}));
const __VLS_275 = __VLS_274({
    label: "操作状态: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_274));
__VLS_276.slots.default;
if (__VLS_ctx.form.status === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
else if (__VLS_ctx.form.status === 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
var __VLS_276;
var __VLS_272;
const __VLS_277 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({
    span: (8),
}));
const __VLS_279 = __VLS_278({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_278));
__VLS_280.slots.default;
const __VLS_281 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_282 = __VLS_asFunctionalComponent(__VLS_281, new __VLS_281({
    label: "消耗时间: ",
}));
const __VLS_283 = __VLS_282({
    label: "消耗时间: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_282));
__VLS_284.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.form.costTime);
var __VLS_284;
var __VLS_280;
const __VLS_285 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_286 = __VLS_asFunctionalComponent(__VLS_285, new __VLS_285({
    span: (8),
}));
const __VLS_287 = __VLS_286({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_286));
__VLS_288.slots.default;
const __VLS_289 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_290 = __VLS_asFunctionalComponent(__VLS_289, new __VLS_289({
    label: "操作时间: ",
}));
const __VLS_291 = __VLS_290({
    label: "操作时间: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_290));
__VLS_292.slots.default;
(__VLS_ctx.form.operTime);
var __VLS_292;
var __VLS_288;
const __VLS_293 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_294 = __VLS_asFunctionalComponent(__VLS_293, new __VLS_293({
    span: (24),
}));
const __VLS_295 = __VLS_294({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_294));
__VLS_296.slots.default;
const __VLS_297 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_298 = __VLS_asFunctionalComponent(__VLS_297, new __VLS_297({
    label: "异常信息: ",
}));
const __VLS_299 = __VLS_298({
    label: "异常信息: ",
}, ...__VLS_functionalComponentArgsRest(__VLS_298));
__VLS_300.slots.default;
(__VLS_ctx.form.errorMsg);
var __VLS_300;
var __VLS_296;
var __VLS_220;
var __VLS_216;
{
    const { footer: __VLS_thisSlot } = __VLS_212.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_301 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_302 = __VLS_asFunctionalComponent(__VLS_301, new __VLS_301({
        ...{ 'onClick': {} },
    }));
    const __VLS_303 = __VLS_302({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_302));
    let __VLS_305;
    let __VLS_306;
    let __VLS_307;
    const __VLS_308 = {
        onClick: (...[$event]) => {
            __VLS_ctx.open = false;
        }
    };
    __VLS_304.slots.default;
    var __VLS_304;
}
var __VLS_212;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_140 = __VLS_139;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            sys_oper_type: sys_oper_type,
            sys_common_status: sys_common_status,
            operlogList: operlogList,
            open: open,
            loading: loading,
            showSearch: showSearch,
            multiple: multiple,
            total: total,
            defaultSort: defaultSort,
            queryParams: queryParams,
            form: form,
            getList: getList,
            typeFormat: typeFormat,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectionChange: handleSelectionChange,
            handleSortChange: handleSortChange,
            handleView: handleView,
            handleDelete: handleDelete,
            handleClean: handleClean,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
