import modal from '@/plugins/modal';
import { getCurrentInstance, ref } from 'vue';
import { forceLogout, list as initData } from '@/api/monitor/online';
import { parseTime } from '@/utils/general';
const { proxy } = getCurrentInstance();
// 明确指定 onlineList 的类型为 OnlineUser[]
const onlineList = ref([]);
const loading = ref(true);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const initQueryParams = {
    pageNum: 1,
    pageSize: 10,
    tokenId: undefined,
    deptName: undefined,
    ipaddr: undefined,
    loginLocation: undefined,
    browser: undefined,
    os: undefined,
    loginTime: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
};
const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    tokenId: undefined,
    deptName: undefined,
    ipaddr: undefined,
    loginLocation: undefined,
    browser: undefined,
    os: undefined,
    loginTime: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
});
const dateRange = ref([]);
// 查询登录日志列表
function getList() {
    loading.value = true;
    initData(proxy.addDateRange(queryParams.value, dateRange.value)).then((res) => {
        onlineList.value = res.rows; // 确保 res.rows 是 OnlineUser[] 类型
        total.value = res.total;
        loading.value = false;
    });
}
// 搜索按钮
function handleQuery() {
    pageNum.value = 1;
    getList();
}
// 重置按钮
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
// 强退按钮
function handleForceLogout(row) {
    modal.confirm('是否确认强退名称为"' + row.userName + '"的数据项?').then(function () {
        return forceLogout(row.tokenId);
    }).then(() => {
        // 立即从本地数据中移除被强退的用户，无需等待接口返回
        onlineList.value = onlineList.value.filter(user => user.tokenId !== row.tokenId);
        total.value = onlineList.value.length;
        modal.msgSuccess("强退成功");
    }).catch(() => { });
}
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
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {typeof __VLS_ctx.queryRef} */ ;
var __VLS_8 = {};
__VLS_7.slots.default;
const __VLS_10 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    gutter: (20),
}));
const __VLS_12 = __VLS_11({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
const __VLS_14 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    span: (9),
}));
const __VLS_16 = __VLS_15({
    span: (9),
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
    label: "操作系统",
    prop: "os",
}));
const __VLS_36 = __VLS_35({
    label: "操作系统",
    prop: "os",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.os),
    placeholder: "请输入操作系统",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.os),
    placeholder: "请输入操作系统",
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
    span: (3),
}));
const __VLS_48 = __VLS_47({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
const __VLS_50 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({}));
const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
const __VLS_54 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}));
const __VLS_56 = __VLS_55({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
let __VLS_58;
let __VLS_59;
let __VLS_60;
const __VLS_61 = {
    onClick: (__VLS_ctx.handleQuery)
};
__VLS_57.slots.default;
var __VLS_57;
var __VLS_53;
var __VLS_49;
const __VLS_62 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    span: (4),
}));
const __VLS_64 = __VLS_63({
    span: (4),
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
    type: "info",
    icon: "MYRefreshRight",
}));
const __VLS_72 = __VLS_71({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_74;
let __VLS_75;
let __VLS_76;
const __VLS_77 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_73.slots.default;
var __VLS_73;
var __VLS_69;
var __VLS_65;
var __VLS_13;
var __VLS_7;
var __VLS_3;
const __VLS_78 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    data: (__VLS_ctx.onlineList.slice((__VLS_ctx.pageNum - 1) * __VLS_ctx.pageSize, __VLS_ctx.pageNum * __VLS_ctx.pageSize)),
    ...{ style: {} },
}));
const __VLS_80 = __VLS_79({
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    data: (__VLS_ctx.onlineList.slice((__VLS_ctx.pageNum - 1) * __VLS_ctx.pageSize, __VLS_ctx.pageNum * __VLS_ctx.pageSize)),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_81.slots.default;
const __VLS_82 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    label: "序号",
    width: "80",
    align: "center",
    prop: "index",
}));
const __VLS_84 = __VLS_83({
    label: "序号",
    width: "80",
    align: "center",
    prop: "index",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const __VLS_86 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    label: "回话编号",
    align: "center",
    prop: "tokenId",
    showOverflowTooltip: (true),
}));
const __VLS_88 = __VLS_87({
    label: "回话编号",
    align: "center",
    prop: "tokenId",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const __VLS_90 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    label: "登录名称",
    align: "center",
    prop: "userName",
    showOverflowTooltip: (true),
}));
const __VLS_92 = __VLS_91({
    label: "登录名称",
    align: "center",
    prop: "userName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const __VLS_94 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    label: "所属部门",
    align: "center",
    prop: "deptName",
    showOverflowTooltip: (true),
}));
const __VLS_96 = __VLS_95({
    label: "所属部门",
    align: "center",
    prop: "deptName",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const __VLS_98 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    label: "主机",
    align: "center",
    prop: "ipaddr",
    showOverflowTooltip: (true),
}));
const __VLS_100 = __VLS_99({
    label: "主机",
    align: "center",
    prop: "ipaddr",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
const __VLS_102 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    label: "登录地点",
    align: "center",
    prop: "loginLocation",
    showOverflowTooltip: (true),
}));
const __VLS_104 = __VLS_103({
    label: "登录地点",
    align: "center",
    prop: "loginLocation",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const __VLS_106 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    label: "操作系统",
    align: "center",
    prop: "os",
    showOverflowTooltip: (true),
}));
const __VLS_108 = __VLS_107({
    label: "操作系统",
    align: "center",
    prop: "os",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
const __VLS_110 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    label: "浏览器",
    align: "center",
    prop: "browser",
    showOverflowTooltip: (true),
}));
const __VLS_112 = __VLS_111({
    label: "浏览器",
    align: "center",
    prop: "browser",
    showOverflowTooltip: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
const __VLS_114 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    label: "登录时间",
    align: "center",
    prop: "loginTime",
    sortable: "180",
}));
const __VLS_116 = __VLS_115({
    label: "登录时间",
    align: "center",
    prop: "loginTime",
    sortable: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_117.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.loginTime));
}
var __VLS_117;
const __VLS_118 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    label: "操作",
    align: "center",
    prop: "operation",
    className: "small-padding fixed-width",
}));
const __VLS_120 = __VLS_119({
    label: "操作",
    align: "center",
    prop: "operation",
    className: "small-padding fixed-width",
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
{
    const { operation: __VLS_thisSlot } = __VLS_81.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_122 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        ...{ 'onClick': {} },
        type: "primary",
        link: true,
        icon: "MYDelete",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }));
    const __VLS_124 = __VLS_123({
        ...{ 'onClick': {} },
        type: "primary",
        link: true,
        icon: "MYDelete",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    let __VLS_126;
    let __VLS_127;
    let __VLS_128;
    const __VLS_129 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleForceLogout(scope.row);
        }
    };
    __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['monitor:online:forceLogout']) }, null, null);
    __VLS_125.slots.default;
    var __VLS_125;
}
var __VLS_81;
const __VLS_130 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_132 = __VLS_131({
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            onlineList: onlineList,
            loading: loading,
            total: total,
            pageNum: pageNum,
            pageSize: pageSize,
            queryParams: queryParams,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleForceLogout: handleForceLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
