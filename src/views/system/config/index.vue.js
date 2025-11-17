import { listConfig, getConfig, delConfig, updateConfig, addConfig } from '@/api/system/config';
import { refreshCache } from '@/api/system/dict';
import { useDict } from '@/utils/dict';
import modal from '@/plugins/modal';
// 使用参数
const { sys_yes_no } = useDict('sys_yes_no');
// 响应式数据
const allConfigList = ref([]);
const loading = ref(true);
const total = ref(0);
const open = ref(false);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const title = ref('添加参数');
const queryRef = ref();
const formRef = ref();
// 计算当前页数据
const currentPageData = computed(() => {
    const start = (queryParams.value.pageNum - 1) * queryParams.value.pageSize;
    const end = start + queryParams.value.pageSize;
    return allConfigList.value.slice(start, end);
});
// 表单验证规则
const rules = {
    configName: [
        { required: true, message: '参数名称不能为空', trigger: 'blur' }
    ],
    configCode: [
        { required: true, message: '参数键名不能为空', trigger: 'blur' }
    ],
    configValue: [
        { required: true, message: '参数键值不能为空', trigger: 'blur' }
    ]
};
const data = reactive({
    form: {
        configId: undefined,
        configName: '',
        configCode: '',
        configValue: '',
        status: '0',
        remark: '',
        createTime: ''
    },
    queryParams: {
        configName: '',
        configCode: '',
        configValue: '',
        status: '',
        pageSize: 10,
        pageNum: 1
    }
});
const { queryParams, form } = toRefs(data);
// 重置表单
const reset = () => {
    form.value = {
        configId: undefined,
        configName: '',
        configCode: '',
        configValue: '',
        status: '0',
        remark: '',
        createTime: ''
    };
    if (formRef.value) {
        formRef.value.clearValidate();
    }
};
// 获取参数列表
// 获取参数列表 - 添加详细调试
const getList = async () => {
    loading.value = true;
    try {
        const response = await listConfig(queryParams.value);
        if (response && response.code === 200) {
            // 处理数据
            const data = response.data.rows || response.data.list || response.data || [];
            allConfigList.value = data;
            total.value = response.data.total || data.length;
        }
        else {
            console.warn('⚠️ API 返回非200状态:', response?.code);
            allConfigList.value = [];
            total.value = 0;
        }
    }
    catch (error) {
        console.error('💥 获取列表失败:', error);
        console.error('错误详情:', error.message);
        allConfigList.value = [];
        total.value = 0;
    }
    finally {
        loading.value = false;
    }
};
// 分页事件处理
const handlePagination = (pagination) => {
    queryParams.value.pageNum = pagination.page;
    queryParams.value.pageSize = pagination.limit;
};
// 搜索
// 搜索 - 添加详细调试
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
};
// 重置查询
const resetQuery = () => {
    queryParams.value = {
        configName: '',
        configCode: '',
        status: '',
        pageSize: 10,
        pageNum: 1
    };
    if (queryRef.value) {
        queryRef.value.resetFields();
    }
    getList();
};
// 表格选择事件
const handleSelectionChange = (selection) => {
    ids.value = selection.map(item => item.configId);
    single.value = selection.length !== 1;
    multiple.value = selection.length === 0;
};
// 新增参数
const configAdd = () => {
    reset();
    title.value = '添加参数';
    open.value = true;
};
// 修改参数
const handleConfigUpdate = (row) => {
    let dictId;
    if (row && row.configId) {
        dictId = row.configId;
    }
    else if (ids.value.length === 1) {
        dictId = ids.value[0];
    }
    else {
        modal.msgError('请选择要修改的参数');
        return;
    }
    reset();
    title.value = '修改参数';
    getConfig(String(dictId)).then((res) => {
        if (res.code === 200) {
            form.value = { ...res.data };
            open.value = true;
        }
    }).catch(error => {
        modal.msgError('获取参数详情失败');
    });
};
// 提交表单
const submitAddDict = async () => {
    if (!formRef.value) {
        return;
    }
    1;
    try {
        await formRef.value.validate();
        if (form.value.configId) {
            const response = await updateConfig(form.value);
            if (response.code === 200) {
                modal.msgSuccess('修改成功');
                open.value = false;
                getList();
            }
            else {
                modal.msgError(response.msg || '修改失败');
            }
        }
        else {
            const response = await addConfig(form.value);
            if (response.code === 200) {
                modal.msgSuccess('新增成功');
                open.value = false;
                getList();
            }
            else {
                modal.msgError(response.msg || '新增失败');
            }
        }
    }
    catch (error) {
        modal.msgError('提交失败，请检查表单');
    }
};
// 删除参数
// 删除参数 - 修复版本
const handleDelete = async (row) => {
    // 处理事件对象的情况
    let actualRow;
    let actualIds = [];
    if (row && 'configId' in row) {
        // 如果传入的是行数据
        actualRow = row;
        actualIds = [actualRow.configId];
    }
    else if (ids.value.length > 0) {
        // 如果通过复选框选择删除
        actualIds = [...ids.value];
    }
    else {
        console.error('❌ 未选择要删除的参数');
        modal.msgError('请选择要删除的参数');
        return;
    }
    if (actualIds.length === 0 || actualIds.some(id => !id)) {
        console.error('❌ 参数ID无效:', actualIds);
        modal.msgError('参数ID无效');
        return;
    }
    modal.confirm(`是否确认删除参数编号为"${actualIds}"的数据项?`).then(() => {
        // 如果是单个删除，使用单个删除接口
        if (actualIds.length === 1) {
            return delConfig(actualIds[0]);
        }
        else {
            // 如果是批量删除，使用批量删除接口（如果有的话）
            return delConfig(actualIds.join(','));
        }
    }).then((response) => {
        if (response && response.code === 200) {
            getList();
            modal.msgSuccess('删除成功');
        }
        else {
            modal.msgError(response?.message || response?.msg || '删除失败');
        }
    }).catch((error) => {
        modal.msgError('删除操作异常: ' + (error.message || '未知错误'));
    });
};
// 刷新缓存
const refresh = async () => {
    const response = await refreshCache();
    if (response.code === 200) {
        modal.msgSuccess('刷新成功');
    }
    else {
        modal.msgError('刷新失败');
    }
};
// 取消对话框
const cancel = () => {
    open.value = false;
    reset();
};
// 组件挂载时获取数据
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
    label: "参数名称",
    prop: "configName",
}));
const __VLS_20 = __VLS_19({
    label: "参数名称",
    prop: "configName",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.queryParams.configName),
    placeholder: "请输入参数名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.queryParams.configName),
    placeholder: "请输入参数名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_21;
var __VLS_17;
const __VLS_26 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    span: (6),
}));
const __VLS_28 = __VLS_27({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
const __VLS_30 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    label: "",
    prop: "configCode",
}));
const __VLS_32 = __VLS_31({
    label: "",
    prop: "configCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
const __VLS_34 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    modelValue: (__VLS_ctx.queryParams.configCode),
    placeholder: "请输入参数键名",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_36 = __VLS_35({
    modelValue: (__VLS_ctx.queryParams.configCode),
    placeholder: "请输入参数键名",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
var __VLS_33;
var __VLS_29;
const __VLS_38 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    span: (7),
}));
const __VLS_40 = __VLS_39({
    span: (7),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
const __VLS_42 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    label: "系统内置",
    prop: "status",
}));
const __VLS_44 = __VLS_43({
    label: "系统内置",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
const __VLS_46 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "系统内置",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_48 = __VLS_47({
    modelValue: (__VLS_ctx.queryParams.status),
    placeholder: "系统内置",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_yes_no))) {
    const __VLS_50 = {}.MYOption;
    /** @type {[typeof __VLS_components.MYOption, ]} */ ;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }));
    const __VLS_52 = __VLS_51({
        key: (dict.value),
        label: (dict.label),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
}
var __VLS_49;
var __VLS_45;
var __VLS_41;
const __VLS_54 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    span: (2),
}));
const __VLS_56 = __VLS_55({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
const __VLS_58 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
__VLS_61.slots.default;
const __VLS_62 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}));
const __VLS_64 = __VLS_63({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYSearch",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
let __VLS_66;
let __VLS_67;
let __VLS_68;
const __VLS_69 = {
    onClick: (__VLS_ctx.handleQuery)
};
__VLS_65.slots.default;
var __VLS_65;
var __VLS_61;
var __VLS_57;
const __VLS_70 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    span: (1),
}));
const __VLS_72 = __VLS_71({
    span: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
__VLS_73.slots.default;
const __VLS_74 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
__VLS_77.slots.default;
const __VLS_78 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}));
const __VLS_80 = __VLS_79({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
let __VLS_82;
let __VLS_83;
let __VLS_84;
const __VLS_85 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_81.slots.default;
var __VLS_81;
var __VLS_77;
var __VLS_73;
var __VLS_13;
var __VLS_7;
var __VLS_3;
const __VLS_86 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    gutter: (10),
    ...{ class: "mb8" },
}));
const __VLS_88 = __VLS_87({
    gutter: (10),
    ...{ class: "mb8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
__VLS_89.slots.default;
const __VLS_90 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    span: (2),
}));
const __VLS_92 = __VLS_91({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
__VLS_93.slots.default;
const __VLS_94 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}));
const __VLS_96 = __VLS_95({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_98;
let __VLS_99;
let __VLS_100;
const __VLS_101 = {
    onClick: (__VLS_ctx.configAdd)
};
__VLS_97.slots.default;
var __VLS_97;
var __VLS_93;
const __VLS_102 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    span: (2),
}));
const __VLS_104 = __VLS_103({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
__VLS_105.slots.default;
const __VLS_106 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    ...{ 'onClick': {} },
    type: "success",
    icon: "MYEdit",
    disabled: (__VLS_ctx.single),
}));
const __VLS_108 = __VLS_107({
    ...{ 'onClick': {} },
    type: "success",
    icon: "MYEdit",
    disabled: (__VLS_ctx.single),
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
let __VLS_110;
let __VLS_111;
let __VLS_112;
const __VLS_113 = {
    onClick: (__VLS_ctx.handleConfigUpdate)
};
__VLS_109.slots.default;
var __VLS_109;
var __VLS_105;
const __VLS_114 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    span: (2),
}));
const __VLS_116 = __VLS_115({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
const __VLS_118 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYDelete",
    disabled: (__VLS_ctx.multiple),
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_122;
let __VLS_123;
let __VLS_124;
const __VLS_125 = {
    onClick: (__VLS_ctx.handleDelete)
};
__VLS_121.slots.default;
var __VLS_121;
var __VLS_117;
const __VLS_126 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    span: (2),
}));
const __VLS_128 = __VLS_127({
    span: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
__VLS_129.slots.default;
const __VLS_130 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYLoadingA",
}));
const __VLS_132 = __VLS_131({
    ...{ 'onClick': {} },
    type: "danger",
    icon: "MYLoadingA",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
let __VLS_134;
let __VLS_135;
let __VLS_136;
const __VLS_137 = {
    onClick: (__VLS_ctx.refresh)
};
__VLS_133.slots.default;
var __VLS_133;
var __VLS_129;
var __VLS_89;
const __VLS_138 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    ...{ 'onSelectChange': {} },
    ...{ 'onSelectionChange': {} },
    data: (__VLS_ctx.currentPageData),
    rowKey: "configId",
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
}));
const __VLS_140 = __VLS_139({
    ...{ 'onSelectChange': {} },
    ...{ 'onSelectionChange': {} },
    data: (__VLS_ctx.currentPageData),
    rowKey: "configId",
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
let __VLS_142;
let __VLS_143;
let __VLS_144;
const __VLS_145 = {
    onSelectChange: (__VLS_ctx.handleSelectionChange)
};
const __VLS_146 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_141.slots.default;
const __VLS_147 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent(__VLS_147, new __VLS_147({
    type: "selection",
    width: "55",
    align: "center",
}));
const __VLS_149 = __VLS_148({
    type: "selection",
    width: "55",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
const __VLS_151 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
    label: "参数主键",
    prop: "configId",
    width: "120",
}));
const __VLS_153 = __VLS_152({
    label: "参数主键",
    prop: "configId",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
const __VLS_155 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
    label: "参数名称",
    prop: "configName",
    showOverflowTooltip: (true),
    width: "150",
}));
const __VLS_157 = __VLS_156({
    label: "参数名称",
    prop: "configName",
    showOverflowTooltip: (true),
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_156));
const __VLS_159 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent(__VLS_159, new __VLS_159({
    label: "参数键名",
    prop: "configCode",
    showOverflowTooltip: (true),
    width: "150",
}));
const __VLS_161 = __VLS_160({
    label: "参数键名",
    prop: "configCode",
    showOverflowTooltip: (true),
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_160));
const __VLS_163 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({
    label: "参数键值",
    prop: "configValue",
    showOverflowTooltip: (true),
    width: "150",
}));
const __VLS_165 = __VLS_164({
    label: "参数键值",
    prop: "configValue",
    showOverflowTooltip: (true),
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_164));
const __VLS_167 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_168 = __VLS_asFunctionalComponent(__VLS_167, new __VLS_167({
    label: "系统内置",
    align: "center",
    width: "100",
    prop: "type",
}));
const __VLS_169 = __VLS_168({
    label: "系统内置",
    align: "center",
    width: "100",
    prop: "type",
}, ...__VLS_functionalComponentArgsRest(__VLS_168));
{
    const { type: __VLS_thisSlot } = __VLS_141.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_171 = {}.DictTag;
    /** @type {[typeof __VLS_components.DictTag, typeof __VLS_components.dictTag, ]} */ ;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
        options: (__VLS_ctx.sys_yes_no),
        value: (scope.row.status),
    }));
    const __VLS_173 = __VLS_172({
        options: (__VLS_ctx.sys_yes_no),
        value: (scope.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
}
const __VLS_175 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_176 = __VLS_asFunctionalComponent(__VLS_175, new __VLS_175({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}));
const __VLS_177 = __VLS_176({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_176));
const __VLS_179 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({
    label: "操作",
    align: "center",
    width: "200",
    className: "small-padding fixed-width",
    prop: "operation",
}));
const __VLS_181 = __VLS_180({
    label: "操作",
    align: "center",
    width: "200",
    className: "small-padding fixed-width",
    prop: "operation",
}, ...__VLS_functionalComponentArgsRest(__VLS_180));
{
    const { operation: __VLS_thisSlot } = __VLS_141.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_183 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_184 = __VLS_asFunctionalComponent(__VLS_183, new __VLS_183({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
        icon: "MYEdit",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }));
    const __VLS_185 = __VLS_184({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
        icon: "MYEdit",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_184));
    let __VLS_187;
    let __VLS_188;
    let __VLS_189;
    const __VLS_190 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleConfigUpdate(scope.row);
        }
    };
    __VLS_186.slots.default;
    var __VLS_186;
    const __VLS_191 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
        icon: "MYDelete",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }));
    const __VLS_193 = __VLS_192({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
        icon: "MYDelete",
        colorBg: "var(--table-body-bg)",
        colorText: "var(--general-text)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_192));
    let __VLS_195;
    let __VLS_196;
    let __VLS_197;
    const __VLS_198 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(scope.row);
        }
    };
    __VLS_194.slots.default;
    var __VLS_194;
}
var __VLS_141;
const __VLS_199 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_200 = __VLS_asFunctionalComponent(__VLS_199, new __VLS_199({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}));
const __VLS_201 = __VLS_200({
    ...{ 'onPagination': {} },
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.queryParams.pageNum),
    limit: (__VLS_ctx.queryParams.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_200));
let __VLS_203;
let __VLS_204;
let __VLS_205;
const __VLS_206 = {
    onPagination: (__VLS_ctx.handlePagination)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
var __VLS_202;
const __VLS_207 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_208 = __VLS_asFunctionalComponent(__VLS_207, new __VLS_207({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "600px",
    height: "450px",
    appendToBody: true,
    backgroundColor: "#0b1115",
}));
const __VLS_209 = __VLS_208({
    title: (__VLS_ctx.title),
    modelValue: (__VLS_ctx.open),
    width: "600px",
    height: "450px",
    appendToBody: true,
    backgroundColor: "#0b1115",
}, ...__VLS_functionalComponentArgsRest(__VLS_208));
__VLS_210.slots.default;
const __VLS_211 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({
    ...{ class: "dialog_form" },
    ...{ style: {} },
    ref: "formRef",
    modelValue: (__VLS_ctx.data.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80",
}));
const __VLS_213 = __VLS_212({
    ...{ class: "dialog_form" },
    ...{ style: {} },
    ref: "formRef",
    modelValue: (__VLS_ctx.data.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_212));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_215 = {};
__VLS_214.slots.default;
const __VLS_217 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({
    gutter: (20),
}));
const __VLS_219 = __VLS_218({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
__VLS_220.slots.default;
const __VLS_221 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_222 = __VLS_asFunctionalComponent(__VLS_221, new __VLS_221({
    span: (20),
}));
const __VLS_223 = __VLS_222({
    span: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_222));
__VLS_224.slots.default;
const __VLS_225 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
    label: "参数名称",
    prop: "configName",
}));
const __VLS_227 = __VLS_226({
    label: "参数名称",
    prop: "configName",
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
__VLS_228.slots.default;
const __VLS_229 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({
    modelValue: (__VLS_ctx.form.configName),
    placeholder: "请输入参数名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_231 = __VLS_230({
    modelValue: (__VLS_ctx.form.configName),
    placeholder: "请输入参数名称",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_230));
var __VLS_228;
var __VLS_224;
const __VLS_233 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent(__VLS_233, new __VLS_233({
    span: (20),
}));
const __VLS_235 = __VLS_234({
    span: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_234));
__VLS_236.slots.default;
const __VLS_237 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
    label: "参数键名",
    prop: "configCode",
}));
const __VLS_239 = __VLS_238({
    label: "参数键名",
    prop: "configCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_238));
__VLS_240.slots.default;
const __VLS_241 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({
    modelValue: (__VLS_ctx.form.configCode),
    placeholder: "请输入参数键名",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_243 = __VLS_242({
    modelValue: (__VLS_ctx.form.configCode),
    placeholder: "请输入参数键名",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_242));
var __VLS_240;
var __VLS_236;
const __VLS_245 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_246 = __VLS_asFunctionalComponent(__VLS_245, new __VLS_245({
    span: (20),
}));
const __VLS_247 = __VLS_246({
    span: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_246));
__VLS_248.slots.default;
const __VLS_249 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_250 = __VLS_asFunctionalComponent(__VLS_249, new __VLS_249({
    label: "参数键值",
    prop: "configCode",
}));
const __VLS_251 = __VLS_250({
    label: "参数键值",
    prop: "configCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_250));
__VLS_252.slots.default;
const __VLS_253 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253({
    modelValue: (__VLS_ctx.form.configValue),
    placeholder: "请输入参数键值",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_255 = __VLS_254({
    modelValue: (__VLS_ctx.form.configValue),
    placeholder: "请输入参数键值",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_254));
var __VLS_252;
var __VLS_248;
const __VLS_257 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
    span: (20),
}));
const __VLS_259 = __VLS_258({
    span: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_258));
__VLS_260.slots.default;
const __VLS_261 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_262 = __VLS_asFunctionalComponent(__VLS_261, new __VLS_261({
    label: "系统内置",
    prop: "status",
}));
const __VLS_263 = __VLS_262({
    label: "系统内置",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_262));
__VLS_264.slots.default;
const __VLS_265 = {}.MYRadioGroup;
/** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_266 = __VLS_asFunctionalComponent(__VLS_265, new __VLS_265({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_267 = __VLS_266({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_266));
__VLS_268.slots.default;
for (const [dict] of __VLS_getVForSourceType((__VLS_ctx.sys_yes_no))) {
    const __VLS_269 = {}.MYRadio;
    /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
    // @ts-ignore
    const __VLS_270 = __VLS_asFunctionalComponent(__VLS_269, new __VLS_269({
        key: (dict.value),
        value: (dict.value),
    }));
    const __VLS_271 = __VLS_270({
        key: (dict.value),
        value: (dict.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_270));
    __VLS_272.slots.default;
    (dict.label);
    var __VLS_272;
}
var __VLS_268;
var __VLS_264;
var __VLS_260;
const __VLS_273 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_274 = __VLS_asFunctionalComponent(__VLS_273, new __VLS_273({
    span: (20),
}));
const __VLS_275 = __VLS_274({
    span: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_274));
__VLS_276.slots.default;
const __VLS_277 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({
    label: "备注",
    prop: "remark",
}));
const __VLS_279 = __VLS_278({
    label: "备注",
    prop: "remark",
}, ...__VLS_functionalComponentArgsRest(__VLS_278));
__VLS_280.slots.default;
const __VLS_281 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_282 = __VLS_asFunctionalComponent(__VLS_281, new __VLS_281({
    modelValue: (__VLS_ctx.form.remark),
    placeholder: "请输入备注",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_283 = __VLS_282({
    modelValue: (__VLS_ctx.form.remark),
    placeholder: "请输入备注",
    clearable: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_282));
var __VLS_280;
var __VLS_276;
var __VLS_220;
var __VLS_214;
{
    const { footer: __VLS_thisSlot } = __VLS_210.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_285 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_286 = __VLS_asFunctionalComponent(__VLS_285, new __VLS_285({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }));
    const __VLS_287 = __VLS_286({
        ...{ 'onClick': {} },
        ...{ style: {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_286));
    let __VLS_289;
    let __VLS_290;
    let __VLS_291;
    const __VLS_292 = {
        onClick: (__VLS_ctx.submitAddDict)
    };
    __VLS_288.slots.default;
    var __VLS_288;
    const __VLS_293 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_294 = __VLS_asFunctionalComponent(__VLS_293, new __VLS_293({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_295 = __VLS_294({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_294));
    let __VLS_297;
    let __VLS_298;
    let __VLS_299;
    const __VLS_300 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_296.slots.default;
    var __VLS_296;
}
var __VLS_210;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb8']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_216 = __VLS_215;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            sys_yes_no: sys_yes_no,
            total: total,
            open: open,
            single: single,
            multiple: multiple,
            title: title,
            queryRef: queryRef,
            formRef: formRef,
            currentPageData: currentPageData,
            rules: rules,
            data: data,
            queryParams: queryParams,
            form: form,
            handlePagination: handlePagination,
            handleQuery: handleQuery,
            resetQuery: resetQuery,
            handleSelectionChange: handleSelectionChange,
            configAdd: configAdd,
            handleConfigUpdate: handleConfigUpdate,
            submitAddDict: submitAddDict,
            handleDelete: handleDelete,
            refresh: refresh,
            cancel: cancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
