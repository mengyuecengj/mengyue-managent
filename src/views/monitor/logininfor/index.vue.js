import { parseTime } from '@/utils/general';
import { list, delLogininfor, cleanLogininfor, unlockLogininfor } from '@/api/monitor/logininfor';
import { MYOption } from 'mengyue-plus';
import modal from '@/plugins/modal';
const { proxy } = getCurrentInstance();
const { sys_common_status } = proxy.useDict('sys_common_status');
const logininforList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const selectName = ref("");
const total = ref(0);
const dateRange = ref([]);
const defaultSort = { prop: 'loginTime', order: 'descending' };
const initQueryParams = {
    pageNum: 1,
    pageSize: 10,
    ipaddr: undefined,
    userName: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
};
// 查询参数
const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    ipaddr: undefined,
    userName: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
});
// 查询登录日志列表
function getList() {
    loading.value = true;
    list(proxy.addDateRange(queryParams.value, dateRange.value)).then((res) => {
        logininforList.value = res.rows;
        total.value = res.total;
        loading.value = false;
    });
}
// 搜索按钮操作
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}
// 重置按钮操作
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
// 多选框选中数据
function handleSelectionChange(selection) {
    ids.value = selection.map((item) => item.infoId);
    multiple.value = !selection.length;
    single.value = selection.length != 1;
    selectName.value = selection.map((item) => item.userName);
}
// 排序触发事件
function handleSortChange({ column, prop, order }) {
    queryParams.value.orderByColumn = column.prop;
    queryParams.value.isAsc = column.order;
    if (["loginTime"].includes(prop)) {
        getList();
    }
}
// 删除按钮操作
function handleDelete(row) {
    const infoIds = row.infoId || ids.value;
    modal.confirm('是否确认删除登录编号为"' + infoIds + '"的数据项?').then(() => {
        return delLogininfor(infoIds);
    }).then(() => {
        getList();
        modal.msgSuccess("删除成功");
    }).catch(() => { });
}
// 清空按钮操作
function handleClean() {
    modal.confirm("是否确认清空所有登录日志数据项?").then(() => {
        return cleanLogininfor();
    }).then(() => {
        getList();
        modal.msgSuccess("清空成功");
    }).catch(() => { });
}
// 解锁按钮操作
function handleUnlock() {
    const username = selectName.value;
    proxy.$modal.confirm('是否确认解锁用户"' + username + '"数据项?').then(() => {
        return unlockLogininfor(username);
    }).then(() => {
        proxy.$modal.msgSuccess("用户" + username + "解锁成功");
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
    label: "登录地址",
    prop: "ipaddr",
}));
const __VLS_20 = __VLS_19({
    label: "登录地址",
    prop: "ipaddr",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.ipaddr),
    placeholder: "请输入登录地址",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.ipaddr),
    placeholder: "请输入登录地址",
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
    label: "用户名称",
    prop: "userName",
}));
const __VLS_36 = __VLS_35({
    label: "用户名称",
    prop: "userName",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.userName),
    placeholder: "请输入用户名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.userName),
    placeholder: "请输入用户名称",
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
    placeholder: "状态",
    clearable: true,
}));
const __VLS_56 = __VLS_55({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "状态",
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
    type: "danger",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}));
const __VLS_104 = __VLS_103({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_106;
let __VLS_107;
let __VLS_108;
const __VLS_109 = {
    onClick: (__VLS_ctx.handleDelete)
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['monitor:logininfor:remove']) }, null, null);
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
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['monitor:logininfor:remove']) }, null, null);
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
    rowKey: "infoId",
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    ref: "logininforRef",
    data: (__VLS_ctx.logininforList),
    defaultSort: (__VLS_ctx.defaultSort),
    tableLayout: "fixed",
}));
const __VLS_132 = __VLS_131({
    ...{ 'onSelectionChange': {} },
    ...{ 'onSortChange': {} },
    rowKey: "infoId",
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    ref: "logininforRef",
    data: (__VLS_ctx.logininforList),
    defaultSort: (__VLS_ctx.defaultSort),
    tableLayout: "fixed",
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
/** @type {typeof __VLS_ctx.logininforRef} */ ;
var __VLS_139 = {};
__VLS_133.slots.default;
const __VLS_141 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
    type: "selection",
    width: "60",
    align: "center",
}));
const __VLS_143 = __VLS_142({
    type: "selection",
    width: "60",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
const __VLS_145 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
    label: "访问编号",
    align: "center",
    prop: "infoId",
    width: "100",
}));
const __VLS_147 = __VLS_146({
    label: "访问编号",
    align: "center",
    prop: "infoId",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
const __VLS_149 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
    label: "用户名称",
    align: "center",
    prop: "userName",
    width: "120",
    showOverflowTooltip: (true),
    sortable: "custom",
}));
const __VLS_151 = __VLS_150({
    label: "用户名称",
    align: "center",
    prop: "userName",
    width: "120",
    showOverflowTooltip: (true),
    sortable: "custom",
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
const __VLS_153 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
    label: "地址",
    align: "center",
    prop: "ipaddr",
    width: "120",
    showOverflowTooltip: (true),
}));
const __VLS_155 = __VLS_154({
    label: "地址",
    align: "center",
    prop: "ipaddr",
    width: "120",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const __VLS_157 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
    label: "登录地点",
    align: "center",
    prop: "loginLocation",
    width: "120",
    showOverflowTooltip: (true),
}));
const __VLS_159 = __VLS_158({
    label: "登录地点",
    align: "center",
    prop: "loginLocation",
    width: "120",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
const __VLS_161 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    label: "操作系统",
    align: "center",
    prop: "os",
    width: "120",
    showOverflowTooltip: (true),
}));
const __VLS_163 = __VLS_162({
    label: "操作系统",
    align: "center",
    prop: "os",
    width: "120",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
const __VLS_165 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
    label: "浏览器",
    align: "center",
    prop: "browser",
    width: "120",
}));
const __VLS_167 = __VLS_166({
    label: "浏览器",
    align: "center",
    prop: "browser",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
const __VLS_169 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
    label: "登录状态",
    align: "center",
    prop: "status",
    width: "100",
}));
const __VLS_171 = __VLS_170({
    label: "登录状态",
    align: "center",
    prop: "status",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
{
    const { status: __VLS_thisSlot } = __VLS_133.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_173 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
        options: (__VLS_ctx.sys_common_status),
        value: (scope.row.status),
    }));
    const __VLS_175 = __VLS_174({
        options: (__VLS_ctx.sys_common_status),
        value: (scope.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_174));
}
const __VLS_177 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
    label: "描述",
    align: "center",
    prop: "msg",
    width: "150",
    showOverflowTooltip: (true),
}));
const __VLS_179 = __VLS_178({
    label: "描述",
    align: "center",
    prop: "msg",
    width: "150",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_178));
const __VLS_181 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({
    label: "访问时间",
    align: "center",
    prop: "loginTime",
    width: "180",
    sortable: "custom",
}));
const __VLS_183 = __VLS_182({
    label: "访问时间",
    align: "center",
    prop: "loginTime",
    width: "180",
    sortable: "custom",
}, ...__VLS_functionalComponentArgsRest(__VLS_182));
__VLS_184.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_184.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.loginTime));
}
var __VLS_184;
var __VLS_133;
const __VLS_185 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_187 = __VLS_186({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
let __VLS_189;
let __VLS_190;
let __VLS_191;
const __VLS_192 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_188;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_140 = __VLS_139;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            MYOption: MYOption,
            sys_common_status: sys_common_status,
            logininforList: logininforList,
            loading: loading,
            showSearch: showSearch,
            multiple: multiple,
            total: total,
            defaultSort: defaultSort,
            queryParams: queryParams,
            getList: getList,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectionChange: handleSelectionChange,
            handleSortChange: handleSortChange,
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
