import { parseTime } from '@/utils/general';
import modal from '@/plugins/modal';
import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from '@/api/system/dept';
import { getCurrentInstance } from 'vue';
import { MYInput, MYOption, MYSelect } from 'mengyue-plus';
// Refs and reactive data
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const deptList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const deptOptions = ref([]);
const tableContainer = ref(null);
const isExpandAll = ref(true);
const refreshTable = ref(true);
const data = reactive({
    form: {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: 0,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0",
    },
    queryParams: {
        deptName: undefined,
        status: undefined,
    },
    rules: {
        parentId: [{ required: true, message: "上级部门不能为空", trigger: "blur" }],
        deptName: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
        orderNum: [{ required: true, message: "显示顺序不能为空", trigger: "blur" }],
        email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
        phone: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
    },
});
const { queryParams, form, rules } = toRefs(data);
function filterTree(data, keyword) {
    const res = [];
    for (const node of data) {
        const children = node.children ? filterTree(node.children, keyword) : [];
        if ((node.deptName && node.deptName.includes(keyword)) || children.length) {
            res.push({ ...node, children });
        }
    }
    return res;
}
// 查询部门列表
async function getList() {
    const params = {};
    // 构建查询参数
    if (queryParams.value.deptName?.trim())
        params.deptName = queryParams.value.deptName.trim();
    if (queryParams.value.status)
        params.status = queryParams.value.status;
    //   if (queryParams.value.visible) params.visible = queryParams.visible;
    loading.value = true; // 开启加载状态
    try {
        // 调用 API 获取部门列表
        const response = await listDept(params);
        let list = response.data || [];
        // ✅ 多级搜索：根据部门名称过滤
        if (queryParams.value.deptName?.trim()) {
            list = filterTree(list, queryParams.value.deptName.trim());
        }
        // 转换为树形结构
        deptList.value = proxy.handleTree(list, 'deptId');
    }
    catch (err) {
        console.error(err);
        modal.msgError('获取部门列表失败');
    }
    finally {
        loading.value = false; // 关闭加载状态
    }
}
// 取消按钮
function cancel() {
    open.value = false;
    reset();
}
// 表单重置
function reset() {
    form.value = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: 0,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0",
    };
    proxy.resetForm('deptRef');
}
// 搜索按钮操作
function handleQuery() {
    getList();
}
// 重置按钮操作
function resetQuery() {
    // proxy.resetForm("queryRef");
    queryParams.value.deptName = '';
    queryParams.value.status = '';
    // handleQuery();
    getList();
}
// 新增按钮操作
async function handleAdd(row) {
    reset();
    try {
        const res = await listDept('');
        deptOptions.value = proxy.handleTree(res.data, "deptId");
    }
    catch (error) {
        console.error(error);
    }
    if (row) {
        form.value.parentId = row.deptId;
    }
    open.value = true;
    title.value = '添加部门';
}
// 展开/折叠
async function toggleExpandAll() {
    isExpandAll.value = !isExpandAll.value;
    await nextTick();
    const root = tableContainer.value;
    if (!root)
        return;
    const EXPAND_ICON_SELECTOR = '.my-table__expand-icon';
    const EXPANDED_CLASS = 'my-table__expand-icon--expanded';
    const clickElements = (els) => {
        for (const el of els) {
            try {
                el.click();
            }
            catch { }
        }
    };
    const MAX_ITER = 12;
    if (isExpandAll.value) {
        for (let i = 0; i < MAX_ITER; i++) {
            const toClickNodeList = Array.from(root.querySelectorAll(`${EXPAND_ICON_SELECTOR}:not(.${EXPANDED_CLASS})`));
            if (toClickNodeList.length === 0)
                break;
            clickElements(toClickNodeList);
            await nextTick();
        }
    }
    else {
        for (let i = 0; i < MAX_ITER; i++) {
            const expandedNodeList = Array.from(root.querySelectorAll(`${EXPAND_ICON_SELECTOR}.${EXPANDED_CLASS}`));
            if (expandedNodeList.length === 0)
                break;
            clickElements(expandedNodeList.reverse());
            await nextTick();
        }
    }
}
// 修改按钮操作
async function handleUpdate(row) {
    reset();
    try {
        const [listRes, deptRes] = await Promise.all([
            listDeptExcludeChild(row.deptId),
            getDept(row.deptId),
        ]);
        deptOptions.value = proxy.handleTree(listRes.data, "deptId");
        form.value = deptRes.data;
        open.value = true;
        title.value = '修改部门';
    }
    catch (error) {
        console.error(error);
    }
}
// 提交按钮
function submitForm() {
    proxy.$refs['deptRef']?.validate((valid) => {
        if (valid) {
            if (form.value.deptId != undefined) {
                updateDept(JSON.stringify(form.value)).then(() => {
                    proxy.$message.success('修改成功');
                    open.value = false;
                    getList();
                });
            }
            else {
                addDept(JSON.stringify(form.value)).then(() => {
                    proxy.$message.success('新增成功');
                    open.value = false;
                    getList();
                });
            }
        }
    });
}
// 删除按钮操作
function handleDelete(row) {
    modal.confirm(`是否确认删除名称为"${row.deptName}"的数据项?`).then(() => {
        return delDept(row.deptId.toString());
    }).then(() => {
        proxy.$message.success("删除成功");
        getList();
    }).catch(() => { });
}
// Initial fetch
getList();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
    ref: "tableContainer",
});
/** @type {typeof __VLS_ctx.tableContainer} */ ;
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
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showSearch) }, null, null);
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
    label: "部门名称",
    prop: "deptName",
}));
const __VLS_20 = __VLS_19({
    label: "部门名称",
    prop: "deptName",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.deptName),
    placeholder: "请输入部门名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.deptName),
    placeholder: "请输入部门名称",
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
    label: "状态",
    prop: "status",
}));
const __VLS_36 = __VLS_35({
    label: "状态",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "部门状态",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_40 = __VLS_39({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "部门状态",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_42 = {}.MYOption;
    /** @type {[typeof __VLS_components.MYOption, ]} */ ;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }));
    const __VLS_44 = __VLS_43({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
}
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
const __VLS_78 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    gutter: (10),
    ...{ class: "mb8" },
}));
const __VLS_80 = __VLS_79({
    gutter: (10),
    ...{ class: "mb8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
__VLS_81.slots.default;
const __VLS_82 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    span: (3),
}));
const __VLS_84 = __VLS_83({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
const __VLS_86 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYSortAlt",
}));
const __VLS_88 = __VLS_87({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYSortAlt",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_90;
let __VLS_91;
let __VLS_92;
const __VLS_93 = {
    onClick: (__VLS_ctx.toggleExpandAll)
};
__VLS_89.slots.default;
var __VLS_89;
var __VLS_85;
const __VLS_94 = {}.RightToolbar;
/** @type {[typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, typeof __VLS_components.RightToolbar, typeof __VLS_components.rightToolbar, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}));
const __VLS_96 = __VLS_95({
    ...{ 'onQueryTable': {} },
    showSearch: (__VLS_ctx.showSearch),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_98;
let __VLS_99;
let __VLS_100;
const __VLS_101 = {
    onQueryTable: (__VLS_ctx.getList)
};
var __VLS_97;
var __VLS_81;
if (__VLS_ctx.refreshTable) {
    const __VLS_102 = {}.MYTable;
    /** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        data: (__VLS_ctx.deptList),
        rowKey: "deptId",
        headerBackgroundColor: "var(--table-header-bg)",
        borderColor: "var(--table-border-color)",
        bodyBackgroundColor: "var(--table-body-bg)",
        headerTextColor: "var(--general)",
        bodyTextColor: "var(--general)",
        defaultExpandAll: (__VLS_ctx.isExpandAll),
        treeProps: ({ children: 'children', hasChildren: 'hasChildren' }),
    }));
    const __VLS_104 = __VLS_103({
        data: (__VLS_ctx.deptList),
        rowKey: "deptId",
        headerBackgroundColor: "var(--table-header-bg)",
        borderColor: "var(--table-border-color)",
        bodyBackgroundColor: "var(--table-body-bg)",
        headerTextColor: "var(--general)",
        bodyTextColor: "var(--general)",
        defaultExpandAll: (__VLS_ctx.isExpandAll),
        treeProps: ({ children: 'children', hasChildren: 'hasChildren' }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    __VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
    __VLS_105.slots.default;
    const __VLS_106 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
        prop: "deptName",
        label: "部门名称",
        width: "260",
    }));
    const __VLS_108 = __VLS_107({
        prop: "deptName",
        label: "部门名称",
        width: "260",
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    const __VLS_110 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
        prop: "orderNum",
        label: "排序",
        width: "200",
    }));
    const __VLS_112 = __VLS_111({
        prop: "orderNum",
        label: "排序",
        width: "200",
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
    const __VLS_114 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
        prop: "status",
        label: "状态",
        width: "100",
    }));
    const __VLS_116 = __VLS_115({
        prop: "status",
        label: "状态",
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    {
        const { status: __VLS_thisSlot } = __VLS_105.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_118 = {}.DictTag;
        /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
        // @ts-ignore
        const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
            options: (__VLS_ctx.sys_normal_disable),
            value: (scope.row.status),
        }));
        const __VLS_120 = __VLS_119({
            options: (__VLS_ctx.sys_normal_disable),
            value: (scope.row.status),
        }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    }
    const __VLS_122 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        prop: "createTime",
        label: "创建时间",
        width: "200",
        align: "center",
    }));
    const __VLS_124 = __VLS_123({
        prop: "createTime",
        label: "创建时间",
        width: "200",
        align: "center",
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    __VLS_125.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_125.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.parseTime(scope.row.createTime));
    }
    var __VLS_125;
    const __VLS_126 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
        label: "操作",
        align: "center",
        prop: "operation",
        width: "150",
        className: "small-padding fixed-width",
    }));
    const __VLS_128 = __VLS_127({
        label: "操作",
        align: "center",
        prop: "operation",
        width: "150",
        className: "small-padding fixed-width",
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    {
        const { operation: __VLS_thisSlot } = __VLS_105.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        if (scope.row.roleId !== 1) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "operation-buttons" },
            });
            const __VLS_130 = {}.MYButton;
            /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
            // @ts-ignore
            const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
                ...{ 'onClick': {} },
                link: true,
                type: "primary",
                icon: "MYEdit",
                colorBg: "var(--table-body-bg)",
                colorText: "var(--general-text)",
            }));
            const __VLS_132 = __VLS_131({
                ...{ 'onClick': {} },
                link: true,
                type: "primary",
                icon: "MYEdit",
                colorBg: "var(--table-body-bg)",
                colorText: "var(--general-text)",
            }, ...__VLS_functionalComponentArgsRest(__VLS_131));
            let __VLS_134;
            let __VLS_135;
            let __VLS_136;
            const __VLS_137 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.refreshTable))
                        return;
                    if (!(scope.row.roleId !== 1))
                        return;
                    __VLS_ctx.handleUpdate(scope.row);
                }
            };
            __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:dept:edit']) }, null, null);
            __VLS_133.slots.default;
            var __VLS_133;
            const __VLS_138 = {}.MYButton;
            /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
            // @ts-ignore
            const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
                ...{ 'onClick': {} },
                link: true,
                type: "primary",
                icon: "MYPlus",
                colorBg: "var(--table-body-bg)",
                colorText: "var(--general-text)",
            }));
            const __VLS_140 = __VLS_139({
                ...{ 'onClick': {} },
                link: true,
                type: "primary",
                icon: "MYPlus",
                colorBg: "var(--table-body-bg)",
                colorText: "var(--general-text)",
            }, ...__VLS_functionalComponentArgsRest(__VLS_139));
            let __VLS_142;
            let __VLS_143;
            let __VLS_144;
            const __VLS_145 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.refreshTable))
                        return;
                    if (!(scope.row.roleId !== 1))
                        return;
                    __VLS_ctx.handleAdd(scope.row);
                }
            };
            __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:dept:add']) }, null, null);
            __VLS_141.slots.default;
            var __VLS_141;
            if (scope.row.deptId !== 0) {
                const __VLS_146 = {}.MYButton;
                /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
                // @ts-ignore
                const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
                    ...{ 'onClick': {} },
                    link: true,
                    type: "primary",
                    icon: "MYDelete",
                    colorBg: "var(--table-body-bg)",
                    colorText: "var(--general-text)",
                }));
                const __VLS_148 = __VLS_147({
                    ...{ 'onClick': {} },
                    link: true,
                    type: "primary",
                    icon: "MYDelete",
                    colorBg: "var(--table-body-bg)",
                    colorText: "var(--general-text)",
                }, ...__VLS_functionalComponentArgsRest(__VLS_147));
                let __VLS_150;
                let __VLS_151;
                let __VLS_152;
                const __VLS_153 = {
                    onClick: (...[$event]) => {
                        if (!(__VLS_ctx.refreshTable))
                            return;
                        if (!(scope.row.roleId !== 1))
                            return;
                        if (!(scope.row.deptId !== 0))
                            return;
                        __VLS_ctx.handleDelete(scope.row);
                    }
                };
                __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:dept:remove']) }, null, null);
                __VLS_149.slots.default;
                var __VLS_149;
            }
        }
    }
    var __VLS_105;
}
const __VLS_154 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    height: "390px",
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "600px",
    appendToBody: true,
    backgroundColor: "#0F1115",
}));
const __VLS_156 = __VLS_155({
    height: "390px",
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "600px",
    appendToBody: true,
    backgroundColor: "#0F1115",
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
__VLS_157.slots.default;
const __VLS_158 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    ref: "deptRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}));
const __VLS_160 = __VLS_159({
    ref: "deptRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
/** @type {typeof __VLS_ctx.deptRef} */ ;
var __VLS_162 = {};
__VLS_161.slots.default;
const __VLS_164 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
    gutter: (10),
}));
const __VLS_166 = __VLS_165({
    gutter: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_165));
__VLS_167.slots.default;
if (__VLS_ctx.form.parentId !== 0) {
    const __VLS_168 = {}.MYCol;
    /** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
    // @ts-ignore
    const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({
        span: (24),
    }));
    const __VLS_170 = __VLS_169({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_169));
    __VLS_171.slots.default;
    const __VLS_172 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({
        label: "上级部门",
        prop: "parentId",
    }));
    const __VLS_174 = __VLS_173({
        label: "上级部门",
        prop: "parentId",
    }, ...__VLS_functionalComponentArgsRest(__VLS_173));
    __VLS_175.slots.default;
    const __VLS_176 = {}.MYTreeSelect;
    /** @type {[typeof __VLS_components.MYTreeSelect, ]} */ ;
    // @ts-ignore
    const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
        modelValue: (__VLS_ctx.form.parentId),
        data: (__VLS_ctx.deptOptions),
        props: ({ label: 'deptName', children: 'children', value: 'deptId' }),
        multiple: (false),
        filterable: (false),
        size: ('large'),
        popperClass: ('custom-dropdown'),
        backgroundColor: "red",
        textColor: "blue",
        activeColor: "yellow",
    }));
    const __VLS_178 = __VLS_177({
        modelValue: (__VLS_ctx.form.parentId),
        data: (__VLS_ctx.deptOptions),
        props: ({ label: 'deptName', children: 'children', value: 'deptId' }),
        multiple: (false),
        filterable: (false),
        size: ('large'),
        popperClass: ('custom-dropdown'),
        backgroundColor: "red",
        textColor: "blue",
        activeColor: "yellow",
    }, ...__VLS_functionalComponentArgsRest(__VLS_177));
    var __VLS_175;
    var __VLS_171;
}
const __VLS_180 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
    span: (12),
}));
const __VLS_182 = __VLS_181({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
__VLS_183.slots.default;
const __VLS_184 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
    label: "部门名称",
    prop: "deptName",
}));
const __VLS_186 = __VLS_185({
    label: "部门名称",
    prop: "deptName",
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
__VLS_187.slots.default;
const __VLS_188 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
    modelValue: (__VLS_ctx.form.deptName),
    placeholder: "请输入部门名称",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_190 = __VLS_189({
    modelValue: (__VLS_ctx.form.deptName),
    placeholder: "请输入部门名称",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_189));
var __VLS_187;
var __VLS_183;
const __VLS_192 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
    span: (12),
}));
const __VLS_194 = __VLS_193({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
__VLS_195.slots.default;
const __VLS_196 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
    label: "显示顺序",
    prop: "orderNum",
}));
const __VLS_198 = __VLS_197({
    label: "显示顺序",
    prop: "orderNum",
}, ...__VLS_functionalComponentArgsRest(__VLS_197));
__VLS_199.slots.default;
const __VLS_200 = {}.MYInputNumber;
/** @type {[typeof __VLS_components.MYInputNumber, ]} */ ;
// @ts-ignore
const __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({
    modelValue: (__VLS_ctx.form.orderNum),
    controlsPosition: "right",
    min: (0),
}));
const __VLS_202 = __VLS_201({
    modelValue: (__VLS_ctx.form.orderNum),
    controlsPosition: "right",
    min: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_201));
var __VLS_199;
var __VLS_195;
const __VLS_204 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({
    span: (12),
}));
const __VLS_206 = __VLS_205({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_205));
__VLS_207.slots.default;
const __VLS_208 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({
    label: "负责人",
    prop: "leader",
}));
const __VLS_210 = __VLS_209({
    label: "负责人",
    prop: "leader",
}, ...__VLS_functionalComponentArgsRest(__VLS_209));
__VLS_211.slots.default;
const __VLS_212 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
    modelValue: (__VLS_ctx.form.leader),
    placeholder: "请输入负责人",
    maxlength: "20",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_214 = __VLS_213({
    modelValue: (__VLS_ctx.form.leader),
    placeholder: "请输入负责人",
    maxlength: "20",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
var __VLS_211;
var __VLS_207;
const __VLS_216 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    span: (12),
}));
const __VLS_218 = __VLS_217({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
__VLS_219.slots.default;
const __VLS_220 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
    label: "联系电话",
    prop: "phone",
}));
const __VLS_222 = __VLS_221({
    label: "联系电话",
    prop: "phone",
}, ...__VLS_functionalComponentArgsRest(__VLS_221));
__VLS_223.slots.default;
const __VLS_224 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
    modelValue: (__VLS_ctx.form.phone),
    placeholder: "请输入联系电话",
    maxlength: "11",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_226 = __VLS_225({
    modelValue: (__VLS_ctx.form.phone),
    placeholder: "请输入联系电话",
    maxlength: "11",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
var __VLS_223;
var __VLS_219;
const __VLS_228 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
    span: (12),
}));
const __VLS_230 = __VLS_229({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_229));
__VLS_231.slots.default;
const __VLS_232 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
    label: "邮箱",
    prop: "email",
}));
const __VLS_234 = __VLS_233({
    label: "邮箱",
    prop: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
__VLS_235.slots.default;
const __VLS_236 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
    modelValue: (__VLS_ctx.form.email),
    placeholder: "请输入邮箱",
    maxlength: "50",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_238 = __VLS_237({
    modelValue: (__VLS_ctx.form.email),
    placeholder: "请输入邮箱",
    maxlength: "50",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
var __VLS_235;
var __VLS_231;
const __VLS_240 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
    span: (12),
}));
const __VLS_242 = __VLS_241({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_241));
__VLS_243.slots.default;
const __VLS_244 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
    label: "部门状态",
}));
const __VLS_246 = __VLS_245({
    label: "部门状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_245));
__VLS_247.slots.default;
const __VLS_248 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_250 = __VLS_249({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_249));
__VLS_251.slots.default;
const __VLS_252 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    value: "0",
}));
const __VLS_254 = __VLS_253({
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
__VLS_255.slots.default;
var __VLS_255;
const __VLS_256 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({
    value: "1",
}));
const __VLS_258 = __VLS_257({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_257));
__VLS_259.slots.default;
var __VLS_259;
var __VLS_251;
var __VLS_247;
var __VLS_243;
var __VLS_167;
var __VLS_161;
{
    const { footer: __VLS_thisSlot } = __VLS_157.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_260 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }));
    const __VLS_262 = __VLS_261({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_261));
    let __VLS_264;
    let __VLS_265;
    let __VLS_266;
    const __VLS_267 = {
        onClick: (__VLS_ctx.submitForm)
    };
    __VLS_263.slots.default;
    var __VLS_263;
    const __VLS_268 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_270 = __VLS_269({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_269));
    let __VLS_272;
    let __VLS_273;
    let __VLS_274;
    const __VLS_275 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_271.slots.default;
    var __VLS_271;
}
var __VLS_157;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_163 = __VLS_162;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            MYInput: MYInput,
            MYOption: MYOption,
            MYSelect: MYSelect,
            sys_normal_disable: sys_normal_disable,
            deptList: deptList,
            open: open,
            loading: loading,
            showSearch: showSearch,
            title: title,
            deptOptions: deptOptions,
            tableContainer: tableContainer,
            isExpandAll: isExpandAll,
            refreshTable: refreshTable,
            queryParams: queryParams,
            form: form,
            rules: rules,
            getList: getList,
            cancel: cancel,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleAdd: handleAdd,
            toggleExpandAll: toggleExpandAll,
            handleUpdate: handleUpdate,
            submitForm: submitForm,
            handleDelete: handleDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
