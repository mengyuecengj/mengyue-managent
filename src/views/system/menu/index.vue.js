import { reactive, ref, nextTick, getCurrentInstance } from 'vue';
import { addMenu, delMenu, getMenu, listMenu } from '@/api/system/menu';
import { parseTime } from '@/utils/general';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { proxy } = getCurrentInstance();
// 字典
const { sys_show_hide, sys_normal_disable } = proxy.useDict('sys_show_hide', 'sys_normal_disable');
// 表格及表单状态
const menuList = ref([]);
const loading = ref(false);
const showSearch = ref(true);
const open = ref(false);
const title = ref('');
const isExpandAll = ref(false);
const refreshTable = ref(true);
const tableContainer = ref(null);
const queryRef = ref(null);
const menuRef = ref(null);
const menuOptions = ref([]);
// reactive 对象
const data = reactive({
    form: {
        parentId: 0,
        menuType: 'M',
        isFrame: '1',
        isCache: '0',
        visible: '0',
        status: '0'
    },
    queryParams: {
        menuName: '',
        visible: '',
        status: ''
    }
});
const { form, queryParams } = data;
const queryRules = {
    menuName: [{ type: 'string', message: '菜单名称必须为字符串', trigger: 'blur' }],
    status: [{ type: 'string', message: '状态必须为字符串', trigger: 'change' }]
};
// -------------------------- 工具函数：递归过滤树 --------------------------
function filterTree(data, keyword) {
    const res = [];
    for (const node of data) {
        const children = node.children ? filterTree(node.children, keyword) : [];
        if ((node.menuName && node.menuName.includes(keyword)) || children.length) {
            res.push({ ...node, children });
        }
    }
    return res;
}
// -------------------------- API --------------------------
async function getList() {
    const params = {};
    if (queryParams.menuName?.trim())
        params.menuName = queryParams.menuName.trim();
    if (queryParams.status)
        params.status = queryParams.status;
    if (queryParams.visible)
        params.visible = queryParams.visible;
    loading.value = true;
    try {
        const response = await listMenu(params);
        let list = response.data || [];
        // ✅ 多级搜索
        if (queryParams.menuName?.trim()) {
            list = filterTree(list, queryParams.menuName.trim());
        }
        // 转树
        menuList.value = proxy.handleTree(list, 'menuId');
    }
    catch (err) {
        console.error(err);
        proxy.$modal.msgError('获取菜单列表失败');
    }
    finally {
        loading.value = false;
    }
}
async function getTreeselect() {
    menuOptions.value = [];
    try {
        const response = await listMenu();
        const menu = { menuId: 0, menuName: '主类目', children: [] };
        menu.children = proxy.handleTree(response.data, 'menuId');
        menuOptions.value.push(menu);
    }
    catch (err) {
        console.error('Failed to fetch treeselect:', err);
    }
}
// -------------------------- 操作 --------------------------
function handleQuery() {
    getList();
}
function resetQuery() {
    queryParams.menuName = '';
    queryParams.status = '';
    queryParams.visible = '';
    getList();
}
function resetForm() {
    form.parentId = 0;
    form.menuType = 'M';
    form.isFrame = '1';
    form.isCache = '0';
    form.visible = '0';
    form.status = '0';
    form.menuName = '';
    form.icon = '';
    form.orderNum = undefined;
    form.path = '';
    form.component = '';
    form.perms = '';
    if (menuRef.value)
        proxy.resetForm(menuRef.value);
}
async function handleAdd(row) {
    resetForm();
    await getTreeselect();
    form.parentId = row?.menuId || 0;
    open.value = true;
    title.value = '添加菜单';
}
async function handleUpdate(row) {
    resetForm();
    await getTreeselect();
    const response = await getMenu(row.menuId.toString());
    Object.assign(form, response.data);
    open.value = true;
    title.value = '修改菜单';
}
async function handleDelete(row) {
    try {
        await proxy.$modal.confirm(`是否确认删除名称为"${row.menuName}"的数据项?`);
        await delMenu(row.menuId.toString());
        getList();
        proxy.$modal.msgSuccess('删除成功');
    }
    catch { }
}
function submitForm() {
    if (menuRef.value) {
        menuRef.value.validate((valid) => {
            if (valid) {
                addMenu(JSON.stringify(form)).then(() => {
                    proxy.$modal.msgSuccess('新增成功');
                    open.value = false;
                    getList();
                });
            }
        });
    }
}
// -------------------------- 表格折叠 --------------------------
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
// -------------------------- 初始化 --------------------------
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
    rules: (__VLS_ctx.queryRules),
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.queryParams),
    ref: "queryRef",
    inline: (true),
    rules: (__VLS_ctx.queryRules),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showSearch) }, null, null);
/** @type {typeof __VLS_ctx.queryRef} */ ;
var __VLS_8 = {};
__VLS_7.slots.default;
const __VLS_10 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    gutter: (24),
}));
const __VLS_12 = __VLS_11({
    gutter: (24),
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
    prop: "menuName",
    label: (__VLS_ctx.t('system.menu.menuName')),
}));
const __VLS_20 = __VLS_19({
    prop: "menuName",
    label: (__VLS_ctx.t('system.menu.menuName')),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.menuName),
    placeholder: (__VLS_ctx.t('system.menu.placeholder.placeholderMenu')),
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.menuName),
    placeholder: (__VLS_ctx.t('system.menu.placeholder.placeholderMenu')),
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
    prop: "status",
    label: (__VLS_ctx.t('system.menu.status')),
}));
const __VLS_36 = __VLS_35({
    prop: "status",
    label: (__VLS_ctx.t('system.menu.status')),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: (__VLS_ctx.t('system.menu.placeholder.menuStatus')),
    clearable: true,
    ...{ style: {} },
}));
const __VLS_40 = __VLS_39({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: (__VLS_ctx.t('system.menu.placeholder.menuStatus')),
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
    span: (3.5),
}));
const __VLS_48 = __VLS_47({
    span: (3.5),
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
(__VLS_ctx.t('system.user.query.search'));
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
(__VLS_ctx.t('system.user.query.reset'));
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
(__VLS_ctx.t('system.role.table.expandCollapse'));
var __VLS_89;
var __VLS_85;
var __VLS_81;
if (__VLS_ctx.refreshTable) {
    const __VLS_94 = {}.MYTable;
    /** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
    // @ts-ignore
    const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
        data: (__VLS_ctx.menuList),
        rowKey: "menuId",
        headerBackgroundColor: "var(--table-header-bg)",
        borderColor: "var(--table-border-color)",
        bodyBackgroundColor: "var(--table-body-bg)",
        headerTextColor: "var(--general)",
        bodyTextColor: "var(--general)",
        defaultExpandAll: (__VLS_ctx.isExpandAll),
        treeProps: ({ children: 'children', hasChildren: 'hasChildren' }),
    }));
    const __VLS_96 = __VLS_95({
        data: (__VLS_ctx.menuList),
        rowKey: "menuId",
        headerBackgroundColor: "var(--table-header-bg)",
        borderColor: "var(--table-border-color)",
        bodyBackgroundColor: "var(--table-body-bg)",
        headerTextColor: "var(--general)",
        bodyTextColor: "var(--general)",
        defaultExpandAll: (__VLS_ctx.isExpandAll),
        treeProps: ({ children: 'children', hasChildren: 'hasChildren' }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_95));
    __VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
    __VLS_97.slots.default;
    const __VLS_98 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
        prop: "menuName",
        label: (__VLS_ctx.t('system.menu.menuName')),
        showOverflowTooltip: (true),
        width: "160",
    }));
    const __VLS_100 = __VLS_99({
        prop: "menuName",
        label: (__VLS_ctx.t('system.menu.menuName')),
        showOverflowTooltip: (true),
        width: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    const __VLS_102 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        prop: "icon",
        label: (__VLS_ctx.t('system.menu.icon')),
        align: "center",
        width: "100",
    }));
    const __VLS_104 = __VLS_103({
        prop: "icon",
        label: (__VLS_ctx.t('system.menu.icon')),
        align: "center",
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    {
        const { icon: __VLS_thisSlot } = __VLS_97.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_106 = {}.SvgIcon;
        /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
        // @ts-ignore
        const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
            iconClass: (scope.row.icon),
        }));
        const __VLS_108 = __VLS_107({
            iconClass: (scope.row.icon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    }
    const __VLS_110 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
        prop: "orderNum",
        label: (__VLS_ctx.t('system.menu.order')),
        width: "60",
    }));
    const __VLS_112 = __VLS_111({
        prop: "orderNum",
        label: (__VLS_ctx.t('system.menu.order')),
        width: "60",
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
    const __VLS_114 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
        prop: "perms",
        label: (__VLS_ctx.t('system.menu.identifier')),
        showOverflowTooltip: (true),
    }));
    const __VLS_116 = __VLS_115({
        prop: "perms",
        label: (__VLS_ctx.t('system.menu.identifier')),
        showOverflowTooltip: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    const __VLS_118 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
        prop: "component",
        label: (__VLS_ctx.t('system.menu.component')),
        showOverflowTooltip: (true),
    }));
    const __VLS_120 = __VLS_119({
        prop: "component",
        label: (__VLS_ctx.t('system.menu.component')),
        showOverflowTooltip: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    const __VLS_122 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        prop: "body",
        label: (__VLS_ctx.t('system.menu.status')),
        width: "100",
    }));
    const __VLS_124 = __VLS_123({
        prop: "body",
        label: (__VLS_ctx.t('system.menu.status')),
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    {
        const { body: __VLS_thisSlot } = __VLS_97.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_126 = {}.DictTag;
        /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
        // @ts-ignore
        const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
            options: (__VLS_ctx.sys_normal_disable),
            value: (scope.row.status),
        }));
        const __VLS_128 = __VLS_127({
            options: (__VLS_ctx.sys_normal_disable),
            value: (scope.row.status),
        }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    }
    const __VLS_130 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
        label: (__VLS_ctx.t('system.user.table.createTime')),
        align: "center",
        width: "200",
        prop: "createTime",
    }));
    const __VLS_132 = __VLS_131({
        label: (__VLS_ctx.t('system.user.table.createTime')),
        align: "center",
        width: "200",
        prop: "createTime",
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    __VLS_133.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_133.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.parseTime(scope.row.createTime));
    }
    var __VLS_133;
    const __VLS_134 = {}.MYTableColumn;
    /** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
        label: (__VLS_ctx.t('system.user.table.operation')),
        prop: "operation",
        align: "center",
        width: "210",
        className: "small-padding fixed-width",
    }));
    const __VLS_136 = __VLS_135({
        label: (__VLS_ctx.t('system.user.table.operation')),
        prop: "operation",
        align: "center",
        width: "210",
        className: "small-padding fixed-width",
    }, ...__VLS_functionalComponentArgsRest(__VLS_135));
    {
        const { operation: __VLS_thisSlot } = __VLS_97.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_138 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYEdit",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_140 = __VLS_139({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYEdit",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_139));
        let __VLS_142;
        let __VLS_143;
        let __VLS_144;
        const __VLS_145 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.refreshTable))
                    return;
                __VLS_ctx.handleUpdate(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:menu:edit']) }, null, null);
        __VLS_141.slots.default;
        (__VLS_ctx.t('system.user.button.edit'));
        var __VLS_141;
        const __VLS_146 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYPlus",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_148 = __VLS_147({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYPlus",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_147));
        let __VLS_150;
        let __VLS_151;
        let __VLS_152;
        const __VLS_153 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.refreshTable))
                    return;
                __VLS_ctx.handleAdd(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:menu:add']) }, null, null);
        __VLS_149.slots.default;
        (__VLS_ctx.t('system.user.button.add'));
        var __VLS_149;
        const __VLS_154 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYDelete",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }));
        const __VLS_156 = __VLS_155({
            ...{ 'onClick': {} },
            size: "supersmall",
            link: true,
            type: "primary",
            icon: "MYDelete",
            colorBackground: "transparent",
            colorText: "var(--general-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_155));
        let __VLS_158;
        let __VLS_159;
        let __VLS_160;
        const __VLS_161 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.refreshTable))
                    return;
                __VLS_ctx.handleDelete(scope.row);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:menu:remove']) }, null, null);
        __VLS_157.slots.default;
        (__VLS_ctx.t('system.user.button.delete'));
        var __VLS_157;
    }
    var __VLS_97;
}
const __VLS_162 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "550px",
    height: "660px",
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
    showClose: (false),
    appendToBody: true,
}));
const __VLS_164 = __VLS_163({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "550px",
    height: "660px",
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
    showClose: (false),
    appendToBody: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
__VLS_165.slots.default;
const __VLS_166 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    ...{ class: "dialog_form" },
    model: (__VLS_ctx.form),
    ref: "menuRef",
    valueWidth: "100px",
}));
const __VLS_168 = __VLS_167({
    ...{ class: "dialog_form" },
    model: (__VLS_ctx.form),
    ref: "menuRef",
    valueWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
/** @type {typeof __VLS_ctx.menuRef} */ ;
var __VLS_170 = {};
__VLS_169.slots.default;
const __VLS_172 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({
    value: "菜单名称",
    label: "上级菜单",
    prop: "menuName",
    rules: ([{ required: true, message: '请输入菜单名称' }]),
}));
const __VLS_174 = __VLS_173({
    value: "菜单名称",
    label: "上级菜单",
    prop: "menuName",
    rules: ([{ required: true, message: '请输入菜单名称' }]),
}, ...__VLS_functionalComponentArgsRest(__VLS_173));
__VLS_175.slots.default;
const __VLS_176 = {}.MYTreeSelect;
/** @type {[typeof __VLS_components.MYTreeSelect, ]} */ ;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
    ...{ class: "tree-border" },
    data: (__VLS_ctx.menuOptions),
    showCheckbox: true,
    ref: "menuRef",
    nodeKey: "id",
    checkStrictly: (!__VLS_ctx.form.menuName),
    emptyText: "加载中，请稍候",
    props: ({ label: 'label', children: 'children' }),
    backgroundColor: "#0f1115",
}));
const __VLS_178 = __VLS_177({
    ...{ class: "tree-border" },
    data: (__VLS_ctx.menuOptions),
    showCheckbox: true,
    ref: "menuRef",
    nodeKey: "id",
    checkStrictly: (!__VLS_ctx.form.menuName),
    emptyText: "加载中，请稍候",
    props: ({ label: 'label', children: 'children' }),
    backgroundColor: "#0f1115",
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
/** @type {typeof __VLS_ctx.menuRef} */ ;
var __VLS_180 = {};
var __VLS_179;
var __VLS_175;
const __VLS_182 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
    value: "图标",
    prop: "icon",
    label: "菜单图标",
}));
const __VLS_184 = __VLS_183({
    value: "图标",
    prop: "icon",
    label: "菜单图标",
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
__VLS_185.slots.default;
const __VLS_186 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({}));
const __VLS_188 = __VLS_187({}, ...__VLS_functionalComponentArgsRest(__VLS_187));
var __VLS_185;
const __VLS_190 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
    value: "菜单类型",
    prop: "menuType",
    label: "菜单类型",
}));
const __VLS_192 = __VLS_191({
    value: "菜单类型",
    prop: "menuType",
    label: "菜单类型",
}, ...__VLS_functionalComponentArgsRest(__VLS_191));
__VLS_193.slots.default;
const __VLS_194 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
    modelValue: (__VLS_ctx.form.menuType),
}));
const __VLS_196 = __VLS_195({
    modelValue: (__VLS_ctx.form.menuType),
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
__VLS_197.slots.default;
const __VLS_198 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({
    value: "M",
}));
const __VLS_200 = __VLS_199({
    value: "M",
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
__VLS_201.slots.default;
var __VLS_201;
const __VLS_202 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
    value: "C",
}));
const __VLS_204 = __VLS_203({
    value: "C",
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
__VLS_205.slots.default;
var __VLS_205;
const __VLS_206 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    value: "F",
}));
const __VLS_208 = __VLS_207({
    value: "F",
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
__VLS_209.slots.default;
var __VLS_209;
var __VLS_197;
var __VLS_193;
const __VLS_210 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
    value: "排序",
    prop: "orderNum",
    label: "排序",
}));
const __VLS_212 = __VLS_211({
    value: "排序",
    prop: "orderNum",
    label: "排序",
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
__VLS_213.slots.default;
const __VLS_214 = {}.MYInputNumber;
/** @type {[typeof __VLS_components.MYInputNumber, ]} */ ;
// @ts-ignore
const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({
    modelValue: (__VLS_ctx.form.orderNum),
    min: (0),
}));
const __VLS_216 = __VLS_215({
    modelValue: (__VLS_ctx.form.orderNum),
    min: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_215));
var __VLS_213;
const __VLS_218 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218({
    value: "是否外链",
    prop: "isFrame",
    label: "外链",
}));
const __VLS_220 = __VLS_219({
    value: "是否外链",
    prop: "isFrame",
    label: "外链",
}, ...__VLS_functionalComponentArgsRest(__VLS_219));
__VLS_221.slots.default;
const __VLS_222 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
    modelValue: (__VLS_ctx.form.isFrame),
}));
const __VLS_224 = __VLS_223({
    modelValue: (__VLS_ctx.form.isFrame),
}, ...__VLS_functionalComponentArgsRest(__VLS_223));
__VLS_225.slots.default;
const __VLS_226 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({
    value: "1",
}));
const __VLS_228 = __VLS_227({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_227));
__VLS_229.slots.default;
var __VLS_229;
const __VLS_230 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
    value: "0",
}));
const __VLS_232 = __VLS_231({
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_231));
__VLS_233.slots.default;
var __VLS_233;
var __VLS_225;
var __VLS_221;
const __VLS_234 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
    value: "是否缓存",
    prop: "isCache",
    label: "缓存",
}));
const __VLS_236 = __VLS_235({
    value: "是否缓存",
    prop: "isCache",
    label: "缓存",
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
__VLS_237.slots.default;
const __VLS_238 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({
    modelValue: (__VLS_ctx.form.isCache),
}));
const __VLS_240 = __VLS_239({
    modelValue: (__VLS_ctx.form.isCache),
}, ...__VLS_functionalComponentArgsRest(__VLS_239));
__VLS_241.slots.default;
const __VLS_242 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
    value: "0",
}));
const __VLS_244 = __VLS_243({
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
__VLS_245.slots.default;
var __VLS_245;
const __VLS_246 = {}.MYRadio;
/** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
// @ts-ignore
const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
    value: "1",
}));
const __VLS_248 = __VLS_247({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_247));
__VLS_249.slots.default;
var __VLS_249;
var __VLS_241;
var __VLS_237;
const __VLS_250 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
    value: "显示状态",
    prop: "visible",
    label: "显示状态",
}));
const __VLS_252 = __VLS_251({
    value: "显示状态",
    prop: "visible",
    label: "显示状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_251));
__VLS_253.slots.default;
const __VLS_254 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({
    modelValue: (__VLS_ctx.form.visible),
}));
const __VLS_256 = __VLS_255({
    modelValue: (__VLS_ctx.form.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_255));
__VLS_257.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_show_hide))) {
    const __VLS_258 = {}.MYRadio;
    /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
    // @ts-ignore
    const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
        key: (dict.value),
        value: (dict.value),
    }));
    const __VLS_260 = __VLS_259({
        key: (dict.value),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_259));
    __VLS_261.slots.default;
    (dict.label);
    var __VLS_261;
}
var __VLS_257;
var __VLS_253;
const __VLS_262 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
    value: "菜单状态",
    prop: "status",
    label: "菜单状态",
}));
const __VLS_264 = __VLS_263({
    value: "菜单状态",
    prop: "status",
    label: "菜单状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_263));
__VLS_265.slots.default;
const __VLS_266 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_268 = __VLS_267({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_267));
__VLS_269.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_270 = {}.MYRadio;
    /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
    // @ts-ignore
    const __VLS_271 = __VLS_asFunctionalComponent(__VLS_270, new __VLS_270({
        key: (dict.value),
        value: (dict.value),
    }));
    const __VLS_272 = __VLS_271({
        key: (dict.value),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_271));
    __VLS_273.slots.default;
    (dict.label);
    var __VLS_273;
}
var __VLS_269;
var __VLS_265;
if (__VLS_ctx.form.menuType !== 'F') {
    const __VLS_274 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_275 = __VLS_asFunctionalComponent(__VLS_274, new __VLS_274({
        value: "路由地址",
        prop: "path",
    }));
    const __VLS_276 = __VLS_275({
        value: "路由地址",
        prop: "path",
    }, ...__VLS_functionalComponentArgsRest(__VLS_275));
    __VLS_277.slots.default;
    const __VLS_278 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_279 = __VLS_asFunctionalComponent(__VLS_278, new __VLS_278({
        modelValue: (__VLS_ctx.form.path),
        placeholder: "请输入路由地址",
    }));
    const __VLS_280 = __VLS_279({
        modelValue: (__VLS_ctx.form.path),
        placeholder: "请输入路由地址",
    }, ...__VLS_functionalComponentArgsRest(__VLS_279));
    var __VLS_277;
}
if (__VLS_ctx.form.menuType === 'C') {
    const __VLS_282 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({
        value: "组件路径",
        prop: "component",
    }));
    const __VLS_284 = __VLS_283({
        value: "组件路径",
        prop: "component",
    }, ...__VLS_functionalComponentArgsRest(__VLS_283));
    __VLS_285.slots.default;
    const __VLS_286 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_287 = __VLS_asFunctionalComponent(__VLS_286, new __VLS_286({
        modelValue: (__VLS_ctx.form.component),
        placeholder: "请输入组件路径",
    }));
    const __VLS_288 = __VLS_287({
        modelValue: (__VLS_ctx.form.component),
        placeholder: "请输入组件路径",
    }, ...__VLS_functionalComponentArgsRest(__VLS_287));
    var __VLS_285;
}
if (__VLS_ctx.form.menuType !== 'M') {
    const __VLS_290 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_291 = __VLS_asFunctionalComponent(__VLS_290, new __VLS_290({
        value: "权限标识",
        prop: "perms",
    }));
    const __VLS_292 = __VLS_291({
        value: "权限标识",
        prop: "perms",
    }, ...__VLS_functionalComponentArgsRest(__VLS_291));
    __VLS_293.slots.default;
    const __VLS_294 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_295 = __VLS_asFunctionalComponent(__VLS_294, new __VLS_294({
        modelValue: (__VLS_ctx.form.perms),
        placeholder: "请输入权限标识",
    }));
    const __VLS_296 = __VLS_295({
        modelValue: (__VLS_ctx.form.perms),
        placeholder: "请输入权限标识",
    }, ...__VLS_functionalComponentArgsRest(__VLS_295));
    var __VLS_293;
}
var __VLS_169;
{
    const { footer: __VLS_thisSlot } = __VLS_165.slots;
    const __VLS_298 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_299 = __VLS_asFunctionalComponent(__VLS_298, new __VLS_298({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }));
    const __VLS_300 = __VLS_299({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_299));
    let __VLS_302;
    let __VLS_303;
    let __VLS_304;
    const __VLS_305 = {
        onClick: (__VLS_ctx.submitForm)
    };
    __VLS_301.slots.default;
    var __VLS_301;
    const __VLS_306 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_307 = __VLS_asFunctionalComponent(__VLS_306, new __VLS_306({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_308 = __VLS_307({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_307));
    let __VLS_310;
    let __VLS_311;
    let __VLS_312;
    const __VLS_313 = {
        onClick: (...[$event]) => {
            __VLS_ctx.open = false;
        }
    };
    __VLS_309.slots.default;
    var __VLS_309;
}
var __VLS_165;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-border']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_171 = __VLS_170, __VLS_181 = __VLS_180;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            t: t,
            sys_show_hide: sys_show_hide,
            sys_normal_disable: sys_normal_disable,
            menuList: menuList,
            loading: loading,
            showSearch: showSearch,
            open: open,
            title: title,
            isExpandAll: isExpandAll,
            refreshTable: refreshTable,
            tableContainer: tableContainer,
            queryRef: queryRef,
            menuRef: menuRef,
            menuOptions: menuOptions,
            form: form,
            queryParams: queryParams,
            queryRules: queryRules,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleAdd: handleAdd,
            handleUpdate: handleUpdate,
            handleDelete: handleDelete,
            submitForm: submitForm,
            toggleExpandAll: toggleExpandAll,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
