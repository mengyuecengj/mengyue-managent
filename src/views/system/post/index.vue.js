import { listPost, addPost, delPost, getPost, updatePost, } from '@/api/system/post';
import { useDict } from '@/utils/dict';
import { parseTime } from '@/utils/general';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// ===== 字典 =====
const { sys_normal_disable } = useDict('sys_normal_disable');
// ===== refs & state =====
const queryRef = ref();
const postRef = ref();
const postList = ref([]);
const open = ref(false);
const loading = ref(false);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref('');
const data = reactive({
    form: {
        postId: undefined,
        postCode: '',
        postName: '',
        postSort: 0,
        status: '0',
        remark: '',
    },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        postCode: undefined,
        postName: undefined,
        status: undefined,
    },
    rules: {
        postCode: [{ required: true, message: '岗位编码不能为空', trigger: 'blur' }],
        postName: [{ required: true, message: '岗位名称不能为空', trigger: 'blur' }],
        postSort: [{ required: true, message: '岗位排序不能为空', trigger: 'blur' }],
    },
});
const { queryParams, form, rules } = toRefs(data);
// unwrapResponse：兼容 AxiosResponse 或直接返回对象
function unwrapResponse(resp) {
    let data = resp;
    if (data && typeof data === 'object' && 'data' in data) {
        data = data.data;
    }
    if (data && typeof data === 'object' && 'data' in data) {
        data = data.data;
    }
    return data == null ? null : data;
}
// ===== 查询岗位列表 =====
async function getList() {
    loading.value = true;
    try {
        // 根据后端API签名，如果需要 JSON.stringify，可改为 JSON.stringify(queryParams.value)
        const params = {
            pageNum: queryParams.value.pageNum,
            pageSize: queryParams.value.pageSize,
            postCode: queryParams.value.postCode,
            postName: queryParams.value.postName,
            status: queryParams.value.status,
        };
        const resp = await listPost(params);
        const dataUnwrapped = unwrapResponse(resp);
        if (dataUnwrapped && Array.isArray(dataUnwrapped.rows)) {
            postList.value = dataUnwrapped.rows;
            total.value =
                typeof dataUnwrapped.total === 'number'
                    ? dataUnwrapped.total
                    : dataUnwrapped.rows.length;
        }
        else {
            console.warn('[Post] getList 未解析到 rows:', dataUnwrapped);
            postList.value = [];
            total.value = 0;
            ElMessage.error('获取岗位列表格式异常');
        }
    }
    catch (err) {
        console.error('[Post] getList 异常', err);
        postList.value = [];
        total.value = 0;
        ElMessage.error('获取岗位列表失败');
    }
    finally {
        loading.value = false;
    }
}
// ===== 搜索 =====
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}
// ===== 重置查询 =====
function resetQuery() {
    if (queryRef.value) {
        queryRef.value.resetFields();
    }
    queryParams.value.pageNum = 1;
    queryParams.value.postCode = undefined;
    queryParams.value.postName = undefined;
    queryParams.value.status = undefined;
    getList();
}
// ===== 表格多选变化 =====
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.postId).filter(id => id !== undefined);
    single.value = selection.length !== 1;
    multiple.value = selection.length === 0;
}
// ===== 取消对话框 =====
function cancel() {
    open.value = false;
    resetForm();
}
// 重置表单数据
function resetForm() {
    form.value = {
        postId: undefined,
        postCode: '',
        postName: '',
        postSort: 0,
        status: '0',
        remark: '',
    };
    if (postRef.value) {
        postRef.value.resetFields();
    }
}
// ===== 新增 =====
function handleAdd() {
    resetForm();
    title.value = '添加岗位';
    open.value = true;
}
// ===== 修改 =====
async function handleUpdate(row) {
    resetForm();
    let postId;
    if (row && row.postId !== undefined) {
        postId = row.postId;
    }
    else if (ids.value.length === 1) {
        postId = ids.value[0];
    }
    if (postId === undefined) {
        ElMessage.warning('请选择要修改的岗位');
        return;
    }
    try {
        const resp = await getPost({ pageNum: postId });
        const dataUnwrapped = unwrapResponse(resp);
        if (dataUnwrapped) {
            form.value = {
                postId: dataUnwrapped.postId,
                postCode: dataUnwrapped.postCode,
                postName: dataUnwrapped.postName,
                postSort: dataUnwrapped.postSort,
                status: dataUnwrapped.status,
                remark: dataUnwrapped.remark,
            };
            title.value = '修改岗位';
            open.value = true;
        }
        else {
            ElMessage.error('获取岗位信息失败');
        }
    }
    catch (err) {
        console.error('[Post] handleUpdate 异常', err);
        ElMessage.error('获取岗位信息异常');
    }
}
// ===== 提交表单 =====
function submitForm() {
    if (!postRef.value) {
        ElMessage.error('表单未就绪');
        return;
    }
    postRef.value.validate(async (valid) => {
        if (valid) {
            const formData = {
                postCode: form.value.postCode,
                postName: form.value.postName,
                postSort: form.value.postSort,
                status: form.value.status,
                remark: form.value.remark,
            };
            if (form.value.postId !== undefined) {
                formData.postId = form.value.postId;
            }
            try {
                if (form.value.postId !== undefined) {
                    const resp = await updatePost(formData);
                    const dataUnwrapped = unwrapResponse(resp);
                    const msg = dataUnwrapped?.msg ?? '修改成功';
                    ElMessage.success(msg);
                }
                else {
                    const resp = await addPost(formData);
                    const dataUnwrapped = unwrapResponse(resp);
                    const msg = dataUnwrapped?.msg ?? '新增成功';
                    ElMessage.success(msg);
                }
                open.value = false;
                getList();
            }
            catch (err) {
                console.error('[Post] submitForm 异常', err);
                ElMessage.error('保存岗位失败');
            }
        }
    });
}
// ===== 删除 =====
async function handleDelete(row) {
    let postIds;
    if (row && row.postId !== undefined) {
        postIds = [row.postId];
    }
    else {
        postIds = ids.value;
    }
    if (postIds.length === 0) {
        ElMessage.warning('请选择要删除的岗位');
        return;
    }
    try {
        await ElMessageBox.confirm(`是否确认删除岗位编号为 "${postIds.join(',')}" 的数据？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        const resp = await delPost(postIds.join(','));
        const dataUnwrapped = unwrapResponse(resp);
        const msg = dataUnwrapped?.msg ?? '删除成功';
        ElMessage.success(msg);
        getList();
    }
    catch (err) {
        // 如果用户取消确认，err 会被捕获，这里忽略
        if (err !== 'cancel' && err !== 'close') {
            console.error('[Post] handleDelete 异常', err);
            ElMessage.error('删除失败');
        }
    }
}
// ===== 初始化 =====
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
    label: (__VLS_ctx.t('system.post.postCode')),
    prop: "postCode",
}));
const __VLS_20 = __VLS_19({
    label: (__VLS_ctx.t('system.post.postCode')),
    prop: "postCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.postCode),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postPlaceholder')),
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.postCode),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postPlaceholder')),
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
    label: (__VLS_ctx.t('system.post.postName')),
    prop: "postName",
}));
const __VLS_36 = __VLS_35({
    label: (__VLS_ctx.t('system.post.postName')),
    prop: "postName",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.postName),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postNamePlaceholder')),
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.postName),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postNamePlaceholder')),
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
    label: (__VLS_ctx.t('system.post.status')),
    prop: "status",
}));
const __VLS_52 = __VLS_51({
    label: (__VLS_ctx.t('system.post.status')),
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
const __VLS_54 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: (__VLS_ctx.t('system.post.placeholder.statusPlaceholder')),
    clearable: true,
}));
const __VLS_56 = __VLS_55({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: (__VLS_ctx.t('system.post.placeholder.statusPlaceholder')),
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
    span: (3),
}));
const __VLS_64 = __VLS_63({
    span: (3),
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
(__VLS_ctx.t('system.user.query.search'));
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
(__VLS_ctx.t('system.user.query.reset'));
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
    ...{ style: {} },
}));
const __VLS_96 = __VLS_95({
    gutter: (10),
    ...{ class: "mb8" },
    ...{ style: {} },
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
    onClick: (__VLS_ctx.handleAdd)
};
__VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:post:add']) }, null, null);
__VLS_105.slots.default;
(__VLS_ctx.t('system.role.button.add'));
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
(__VLS_ctx.t('system.role.button.edit'));
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
(__VLS_ctx.t('system.role.button.del'));
var __VLS_129;
var __VLS_125;
var __VLS_97;
const __VLS_134 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    ...{ 'onSelectionChange': {} },
    data: (__VLS_ctx.postList),
    ...{ style: {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    tableLayout: "fixed",
}));
const __VLS_136 = __VLS_135({
    ...{ 'onSelectionChange': {} },
    data: (__VLS_ctx.postList),
    ...{ style: {} },
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
    tableLayout: "fixed",
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
let __VLS_138;
let __VLS_139;
let __VLS_140;
const __VLS_141 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_137.slots.default;
const __VLS_142 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    type: "selection",
    width: "60",
    align: "center",
}));
const __VLS_144 = __VLS_143({
    type: "selection",
    width: "60",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const __VLS_146 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    label: (__VLS_ctx.t('system.post.postId')),
    align: "center",
    prop: "postId",
    width: "100",
}));
const __VLS_148 = __VLS_147({
    label: (__VLS_ctx.t('system.post.postId')),
    align: "center",
    prop: "postId",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
const __VLS_150 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
    label: (__VLS_ctx.t('system.post.postCode')),
    align: "center",
    prop: "postCode",
    width: "120",
}));
const __VLS_152 = __VLS_151({
    label: (__VLS_ctx.t('system.post.postCode')),
    align: "center",
    prop: "postCode",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const __VLS_154 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    label: (__VLS_ctx.t('system.post.postName')),
    align: "center",
    prop: "postName",
    width: "150",
}));
const __VLS_156 = __VLS_155({
    label: (__VLS_ctx.t('system.post.postName')),
    align: "center",
    prop: "postName",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
const __VLS_158 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    label: (__VLS_ctx.t('system.post.postOrder')),
    align: "center",
    prop: "postSort",
    width: "100",
}));
const __VLS_160 = __VLS_159({
    label: (__VLS_ctx.t('system.post.postOrder')),
    align: "center",
    prop: "postSort",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
const __VLS_162 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
    label: (__VLS_ctx.t('system.post.status')),
    align: "center",
    prop: "status",
    width: "100",
}));
const __VLS_164 = __VLS_163({
    label: (__VLS_ctx.t('system.post.status')),
    align: "center",
    prop: "status",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
{
    const { status: __VLS_thisSlot } = __VLS_137.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_166 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
        options: (__VLS_ctx.sys_normal_disable),
        value: (scope.row.status),
    }));
    const __VLS_168 = __VLS_167({
        options: (__VLS_ctx.sys_normal_disable),
        value: (scope.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_167));
}
const __VLS_170 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
    label: (__VLS_ctx.t('system.post.createTime')),
    align: "center",
    prop: "createTime",
    width: "180",
}));
const __VLS_172 = __VLS_171({
    label: (__VLS_ctx.t('system.post.createTime')),
    align: "center",
    prop: "createTime",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
__VLS_173.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_173.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.createTime));
}
var __VLS_173;
const __VLS_174 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
    label: (__VLS_ctx.t('system.post.actions')),
    align: "center",
    prop: "operation",
    width: "150",
    className: "small-padding fixed-width",
}));
const __VLS_176 = __VLS_175({
    label: (__VLS_ctx.t('system.post.actions')),
    align: "center",
    prop: "operation",
    width: "150",
    className: "small-padding fixed-width",
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
{
    const { operation: __VLS_thisSlot } = __VLS_137.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_178 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYEdit",
        colorBackground: "transparent",
        colorText: "var(--general-text)",
    }));
    const __VLS_180 = __VLS_179({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYEdit",
        colorBackground: "transparent",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_179));
    let __VLS_182;
    let __VLS_183;
    let __VLS_184;
    const __VLS_185 = {
        onClick: (() => __VLS_ctx.handleUpdate(scope.row))
    };
    __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:post:edit']) }, null, null);
    __VLS_181.slots.default;
    (__VLS_ctx.t('system.user.button.edit'));
    var __VLS_181;
    const __VLS_186 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYDelete",
        colorBackground: "transparent",
        colorText: "var(--general-text)",
    }));
    const __VLS_188 = __VLS_187({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: "MYDelete",
        colorBackground: "transparent",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_187));
    let __VLS_190;
    let __VLS_191;
    let __VLS_192;
    const __VLS_193 = {
        onClick: (() => __VLS_ctx.handleDelete(scope.row))
    };
    __VLS_asFunctionalDirective(__VLS_directives.vHasPermi)(null, { ...__VLS_directiveBindingRestFields, value: (['system:post:remove']) }, null, null);
    __VLS_189.slots.default;
    (__VLS_ctx.t('system.user.button.delete'));
    var __VLS_189;
}
var __VLS_137;
const __VLS_194 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_196 = __VLS_195({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
let __VLS_198;
let __VLS_199;
let __VLS_200;
const __VLS_201 = {
    onPagination: (__VLS_ctx.getList)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_197;
const __VLS_202 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
    height: "480px",
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "600px",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}));
const __VLS_204 = __VLS_203({
    height: "480px",
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "600px",
    appendToBody: true,
    backgroundColor: "var(--dialog-bg) !important",
    textColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
__VLS_205.slots.default;
const __VLS_206 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    ...{ class: "dialog_form" },
    ref: "postRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "100px",
}));
const __VLS_208 = __VLS_207({
    ...{ class: "dialog_form" },
    ref: "postRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
/** @type {typeof __VLS_ctx.postRef} */ ;
var __VLS_210 = {};
__VLS_209.slots.default;
const __VLS_212 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
    label: (__VLS_ctx.t('system.post.postCode')),
    prop: "postCode",
}));
const __VLS_214 = __VLS_213({
    label: (__VLS_ctx.t('system.post.postCode')),
    prop: "postCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
__VLS_215.slots.default;
const __VLS_216 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    modelValue: (__VLS_ctx.form.postCode),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postPlaceholder')),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_218 = __VLS_217({
    modelValue: (__VLS_ctx.form.postCode),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postPlaceholder')),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
var __VLS_215;
const __VLS_220 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
    label: (__VLS_ctx.t('system.post.postName')),
    prop: "postName",
}));
const __VLS_222 = __VLS_221({
    label: (__VLS_ctx.t('system.post.postName')),
    prop: "postName",
}, ...__VLS_functionalComponentArgsRest(__VLS_221));
__VLS_223.slots.default;
const __VLS_224 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
    modelValue: (__VLS_ctx.form.postName),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postNamePlaceholder')),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_226 = __VLS_225({
    modelValue: (__VLS_ctx.form.postName),
    placeholder: (__VLS_ctx.t('system.post.placeholder.postNamePlaceholder')),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
var __VLS_223;
const __VLS_228 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
    label: (__VLS_ctx.t('system.post.postOrder')),
    prop: "postSort",
}));
const __VLS_230 = __VLS_229({
    label: (__VLS_ctx.t('system.post.postOrder')),
    prop: "postSort",
}, ...__VLS_functionalComponentArgsRest(__VLS_229));
__VLS_231.slots.default;
const __VLS_232 = {}.MYInputNumber;
/** @type {[typeof __VLS_components.MYInputNumber, ]} */ ;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
    modelValue: (__VLS_ctx.form.postSort),
    min: (0),
    controlsPosition: "right",
}));
const __VLS_234 = __VLS_233({
    modelValue: (__VLS_ctx.form.postSort),
    min: (0),
    controlsPosition: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
var __VLS_231;
const __VLS_236 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
    label: (__VLS_ctx.t('system.post.status')),
    prop: "status",
}));
const __VLS_238 = __VLS_237({
    label: (__VLS_ctx.t('system.post.status')),
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
__VLS_239.slots.default;
const __VLS_240 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_242 = __VLS_241({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_241));
__VLS_243.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_normal_disable))) {
    const __VLS_244 = {}.MYRadio;
    /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
    // @ts-ignore
    const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
        key: (dict.value),
        value: (dict.value),
    }));
    const __VLS_246 = __VLS_245({
        key: (dict.value),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_245));
    __VLS_247.slots.default;
    (dict.label);
    var __VLS_247;
}
var __VLS_243;
var __VLS_239;
const __VLS_248 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
    label: (__VLS_ctx.t('system.user.form.remark')),
    prop: "remark",
}));
const __VLS_250 = __VLS_249({
    label: (__VLS_ctx.t('system.user.form.remark')),
    prop: "remark",
}, ...__VLS_functionalComponentArgsRest(__VLS_249));
__VLS_251.slots.default;
const __VLS_252 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: (__VLS_ctx.t('system.user.form.remark')),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_254 = __VLS_253({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: (__VLS_ctx.t('system.user.form.remark')),
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
var __VLS_251;
var __VLS_209;
{
    const { footer: __VLS_thisSlot } = __VLS_205.slots;
    const __VLS_256 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_258 = __VLS_257({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_257));
    let __VLS_260;
    let __VLS_261;
    let __VLS_262;
    const __VLS_263 = {
        onClick: (__VLS_ctx.submitForm)
    };
    __VLS_259.slots.default;
    (__VLS_ctx.t('system.user.action.confirm'));
    var __VLS_259;
    const __VLS_264 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({
        ...{ 'onClick': {} },
    }));
    const __VLS_266 = __VLS_265({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_265));
    let __VLS_268;
    let __VLS_269;
    let __VLS_270;
    const __VLS_271 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_267.slots.default;
    (__VLS_ctx.t('system.user.action.cancel'));
    var __VLS_267;
}
var __VLS_205;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_211 = __VLS_210;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            t: t,
            sys_normal_disable: sys_normal_disable,
            queryRef: queryRef,
            postRef: postRef,
            postList: postList,
            open: open,
            loading: loading,
            showSearch: showSearch,
            single: single,
            multiple: multiple,
            total: total,
            title: title,
            queryParams: queryParams,
            form: form,
            rules: rules,
            getList: getList,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectionChange: handleSelectionChange,
            cancel: cancel,
            handleAdd: handleAdd,
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
