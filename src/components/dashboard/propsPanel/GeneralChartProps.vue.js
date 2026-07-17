import { useDashboardStore } from '@/store/modules/dashboard';
import { cloneDeep } from 'lodash-es';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// 基础数据
const formModel = reactive({});
const dashboardStore = useDashboardStore();
const barChartTypes = ['basic-bar', 'horizontal-bar', 'stacked-bar', 'capsule-bar', 'line-bar', 'percent-bar'];
const dataDialogVisible = ref(false);
const currentData = ref([]);
// 定义轴图表类型
const axisChartTypes = [
    // 柱形图
    'basic-bar', 'horizontal-bar', 'stacked-bar', 'capsule-bar', 'line-bar', 'percent-bar',
    // 折线图
    'basic-line', 'area-line', 'smooth-line',
    // 散点图
    'basic-scatter'
];
// 计算属性
const selectedBlock = computed(() => {
    if (!dashboardStore.selectedId)
        return null;
    return dashboardStore.blocks.find(b => b.id === dashboardStore.selectedId);
});
const isBarChart = computed(() => {
    if (!selectedBlock.value)
        return false;
    return barChartTypes.includes(selectedBlock.value.type);
});
const isPieChart = computed(() => {
    if (!selectedBlock.value)
        return false;
    return ['basic-pie', 'ring-pie', 'rose-pie', 'rotate-pie'].includes(selectedBlock.value.type);
});
const isAxisChart = computed(() => {
    if (!selectedBlock.value)
        return false;
    return axisChartTypes.includes(selectedBlock.value.type);
});
// 图层名称相关
const updateName = (name) => {
    if (selectedBlock.value) {
        dashboardStore.renameBlock(selectedBlock.value.id, name);
        // 如果标题已开启，同步更新标题文本
        if (selectedBlock.value.title === true &&
            selectedBlock.value.config.options?.title) {
            updateTitleText(name);
        }
    }
};
// 最大宽度相关
const barWidth = computed({
    get() {
        const series = selectedBlock.value?.config?.options?.series?.[0] || {};
        if (!series?.barWidth)
            return 30;
        const value = parseInt(series.barWidth) || 30;
        return value;
    },
    set(value) {
        updateBarWidth(value);
    }
});
const updateBarWidth = (value) => {
    if (!selectedBlock.value) {
        return;
    }
    const block = selectedBlock.value;
    if (!block.config.options) {
        block.config.options = {};
    }
    if (!block.config.options.series) {
        block.config.options.series = [];
    }
    if (block.config.options.series.length === 0) {
        block.config.options.series.push({});
    }
    block.config.options.series[0].barWidth = `${value}%`;
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            series: [
                ...block.config.options.series
            ]
        }
    };
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
// 标题设置相关 
const updateTitle = (show) => {
    if (!selectedBlock.value)
        return;
    const block = selectedBlock.value;
    if (!block.config.options) {
        block.config.options = {};
    }
    if (show) {
        block.config.options.title = {
            text: block.titleText,
            show: show,
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        };
    }
    else {
        if (block.config.options.title) {
            block.config.options.title = false;
        }
        else {
            block.config.options.title = {
                show: false
            };
        }
    }
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options
        }
    };
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
watch(() => selectedBlock.value?.title, (newVal) => {
    if (newVal !== undefined) {
        updateTitle(newVal);
    }
}, { immediate: true });
const titleText = computed({
    get() {
        if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
            return selectedBlock.value?.name || '';
        }
        return selectedBlock.value.config.options.title.text || selectedBlock.value.name;
    },
    set(value) {
        updateTitleText(value);
    }
});
const updateTitleText = (text) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options)
        return;
    const block = selectedBlock.value;
    if (!block.config.options.title) {
        block.config.options.title = {
            text: '',
            show: false,
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize: 8
            }
        };
    }
    block.config.options.title.text = text || block.name;
    if (!text && block.name) {
        block.config.options.title.text = block.name;
    }
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            title: {
                ...block.config.options.title
            }
        }
    };
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
const updateTitleColor = (color) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
        return;
    }
    if (!color)
        color = '#fff';
    selectedBlock.value.config.options.title.textStyle.color = color;
};
const updateFontWeight = (thickness) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
        return;
    }
    if (!thickness)
        thickness = '600';
    const block = selectedBlock.value;
    const weight = thickness || '600';
    if (!block.config.options.title.textStyle) {
        block.config.options.title.textStyle = {};
    }
    block.config.options.title.textStyle.fontWeight = weight;
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            title: {
                ...block.config.options.title,
                textStyle: {
                    ...block.config.options.title.textStyle,
                    fontWeight: weight
                }
            }
        }
    };
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
const updateFontSize = (fontSize) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
        return;
    }
    if (!fontSize)
        fontSize = 8;
    const block = selectedBlock.value;
    const size = fontSize || 8;
    if (!block.config.options.title.textStyle) {
        block.config.options.title.textStyle = {};
    }
    block.config.options.title.textStyle.fontSize = size;
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            title: {
                ...block.config.options.title,
                textStyle: {
                    ...block.config.options.title.textStyle,
                    fontSize: size
                }
            }
        }
    };
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
// 数据编辑相关
const openDataDialog = () => {
    if (!selectedBlock.value)
        return;
    const block = selectedBlock.value;
    const options = block.config.options;
    let currentDataList = [];
    if (isPieChart.value) {
        if (options?.series && options.series.length > 0 && Array.isArray(options.series[0].data)) {
            currentDataList = [...options.series[0].data.map((item) => ({
                    name: item.name || '',
                    value: item.value || 0
                }))];
        }
    }
    else {
        let names = [];
        if (options?.xAxis) {
            if (Array.isArray(options.xAxis)) {
                if (options.xAxis.length > 0 && options.xAxis[0].data) {
                    names = [...options.xAxis[0].data];
                }
            }
            else if (options.xAxis.data) {
                names = [...options.xAxis.data];
            }
        }
        let values = [];
        if (options?.series && options.series.length > 0 && options.series[0].data) {
            values = [...options.series[0].data];
        }
        currentDataList = names.map((name, index) => ({
            name,
            value: index < values.length ? values[index] : 0
        }));
    }
    if (currentDataList.length === 0) {
        currentDataList = [];
    }
    currentData.value = currentDataList;
    dataDialogVisible.value = true;
};
// 关闭对话框
const closeDataDialog = () => {
    dataDialogVisible.value = false;
};
// 删除数据项
const removeDataItem = (index) => {
    currentData.value.splice(index, 1);
};
// 保存数据
const saveData = () => {
    if (!selectedBlock.value)
        return;
    const block = selectedBlock.value;
    const options = block.config.options;
    if (isPieChart.value) {
        if (options.series && options.series.length > 0) {
            options.series[0].data = currentData.value.map(item => ({
                name: item.name,
                value: item.value
            }));
        }
    }
    else {
        const names = currentData.value.map(item => item.name);
        const values = currentData.value.map(item => item.value);
        if (options.xAxis) {
            if (Array.isArray(options.xAxis)) {
                if (options.xAxis.length > 0) {
                    options.xAxis[0].data = names;
                }
            }
            else {
                options.xAxis.data = names;
            }
        }
        if (options.series && options.series.length > 0) {
            options.series[0].data = values;
        }
    }
    const newConfig = {
        ...block.config,
        options: { ...options }
    };
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
    closeDataDialog();
};
// X轴设置
const updateXName = (value) => {
    if (!selectedBlock.value)
        return;
    const block = selectedBlock.value;
    const xAxis = block.config.options.xAxis;
    if (Array.isArray(xAxis)) {
        if (xAxis.length > 0) {
            xAxis[0].name = value;
        }
    }
    else {
        xAxis.name = value;
    }
    const newConfig = cloneDeep(block.config);
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
// 数据x轴线条 / x轴线条颜色 / 偏移量 / 旋转角度 / 倒置数据 / 数据字号大小
const updateXAxisProperty = (property, updater) => {
    watch(() => selectedBlock.value?.[property], (newVal) => {
        if (!selectedBlock.value || newVal === undefined)
            return;
        const block = selectedBlock.value;
        const options = block.config.options;
        if (!options.xAxis) {
            options.xAxis = Array.isArray(options.xAxis) ? [] : {};
        }
        const xAxis = Array.isArray(options.xAxis) ? (options.xAxis[0] || (options.xAxis[0] = {})) : options.xAxis;
        updater(xAxis, newVal);
        const newConfig = {
            ...block.config,
            options: { ...options }
        };
        dashboardStore.updateBlock(block.id, {
            config: newConfig
        });
    }, { immediate: true });
};
updateXAxisProperty('xVisible', (xAxis, newVal) => {
    if (!xAxis.axisLine)
        xAxis.axisLine = {};
    if (!xAxis.axisLabel)
        xAxis.axisLabel = {};
    xAxis.axisLine.show = newVal;
    xAxis.axisLabel.show = newVal;
});
updateXAxisProperty('splitLine', (xAxis, newVal) => {
    if (!xAxis.splitLine)
        xAxis.splitLine = {};
    xAxis.splitLine.show = newVal;
});
updateXAxisProperty('splitLineColor', (xAxis, newVal) => {
    if (!xAxis.splitLine)
        xAxis.splitLine = {};
    if (!xAxis.splitLine.lineStyle)
        xAxis.splitLine.lineStyle = {};
    xAxis.splitLine.lineStyle.color = newVal;
});
updateXAxisProperty('xmove', (xAxis, newVal) => {
    if (!xAxis.offset)
        xAxis.offset = 0;
    xAxis.offset = newVal;
});
updateXAxisProperty('xRotate', (xAxis, newVal) => {
    if (!xAxis.axisLabel.rotate)
        xAxis.axisLabel.rotate = 0;
    xAxis.axisLabel.rotate = newVal;
});
updateXAxisProperty('xInverse', (xAxis, newVal) => {
    if (!xAxis.inverse)
        xAxis.inverse = {};
    xAxis.inverse = newVal;
});
updateXAxisProperty('xDataSize', (xAxis, newVal) => {
    if (!xAxis.axisLabel.fontSize)
        xAxis.axisLabel.fontSize = 12;
    xAxis.axisLabel.fontSize = newVal;
});
// y轴名字
const updateYName = (value) => {
    if (!selectedBlock.value)
        return;
    const block = selectedBlock.value;
    const yAxis = block.config.options.yAxis;
    if (Array.isArray(yAxis)) {
        if (yAxis.length > 0) {
            yAxis[0].name = value;
        }
    }
    else {
        yAxis.name = value;
    }
    const newConfig = cloneDeep(block.config);
    dashboardStore.updateBlock(block.id, {
        config: newConfig
    });
};
// 数据y轴线条 / y轴线条颜色 / 偏移量 / 旋转角度 / 倒置数据 / 数据字号大小
const updateYAxisProperty = (property, updater) => {
    watch(() => selectedBlock.value?.[property], (newVal) => {
        if (!selectedBlock.value || newVal === undefined)
            return;
        const block = selectedBlock.value;
        const options = block.config.options;
        if (!options.yAxis) {
            options.yAxis = Array.isArray(options.yAxis) ? [] : {};
        }
        const yAxis = Array.isArray(options.yAxis) ?
            (options.yAxis[0] || (options.yAxis[0] = {})) :
            options.yAxis;
        updater(yAxis, newVal);
        const newConfig = {
            ...block.config,
            options: { ...options }
        };
        dashboardStore.updateBlock(block.id, {
            config: newConfig
        });
    }, { immediate: true });
};
updateYAxisProperty('yVisible', (yAxis, newVal) => {
    if (!yAxis.axisLine)
        yAxis.axisLine = {};
    if (!yAxis.axisLabel)
        yAxis.axisLabel = {};
    yAxis.axisLine.show = newVal;
    yAxis.axisLabel.show = newVal;
});
updateYAxisProperty('ySplitLine', (yAxis, newVal) => {
    if (!yAxis.splitLine)
        yAxis.splitLine = {};
    yAxis.splitLine.show = newVal;
});
updateYAxisProperty('ySplitLineColor', (yAxis, newVal) => {
    if (!yAxis.splitLine)
        yAxis.splitLine = {};
    if (!yAxis.splitLine.lineStyle)
        yAxis.splitLine.lineStyle = {};
    yAxis.splitLine.lineStyle.color = newVal;
});
updateYAxisProperty('yInverse', (yAxis, newVal) => {
    yAxis.inverse = newVal;
});
updateYAxisProperty('yDataSize', (yAxis, newVal) => {
    if (!yAxis.axisLabel)
        yAxis.axisLabel = {};
    yAxis.axisLabel.fontSize = newVal;
});
// 数据标签设置
const updateSeriesProperty = (property, updater) => {
    watch(() => selectedBlock.value?.[property], (newVal) => {
        if (!selectedBlock.value || newVal === undefined)
            return;
        const block = selectedBlock.value;
        const options = block.config.options;
        if (!options.series || options.series.length === 0) {
            options.series = [{}];
        }
        options.series.forEach((series) => {
            updater(series, newVal);
        });
        const newConfig = {
            ...block.config,
            options: { ...options }
        };
        dashboardStore.updateBlock(block.id, {
            config: newConfig
        });
    }, { immediate: true });
};
updateSeriesProperty('dataAlign', (series, newVal) => {
    if (!series.label)
        series.label = {};
    series.label.show = newVal;
});
updateSeriesProperty('dataSize', (series, newVal) => {
    if (!series.label)
        series.label = { show: true, position: 'top' };
    series.label.fontSize = parseInt(newVal) || 12;
});
updateSeriesProperty('dataSizeColor', (series, newVal) => {
    if (!series.label)
        series.label = { show: true, position: 'top' };
    series.label.color = newVal || '#fff';
});
updateSeriesProperty('dataWeight', (series, newVal) => {
    if (!series.label)
        series.label = { show: true, position: 'top' };
    series.label.fontWeight = newVal || 'normal';
});
// 边距设置
const updateGridProperty = (property, updater) => {
    watch(() => selectedBlock.value?.[property], (newVal) => {
        if (!selectedBlock.value || newVal === undefined)
            return;
        const block = selectedBlock.value;
        const options = block.config.options;
        // 确保 grid 存在
        if (!options.grid) {
            options.grid = {};
        }
        // 应用具体更新逻辑
        updater(options.grid, newVal);
        // 更新配置
        const newConfig = {
            ...block.config,
            options: { ...options }
        };
        dashboardStore.updateBlock(block.id, {
            config: newConfig
        });
    }, { immediate: true });
};
// 顶边距
updateGridProperty('MPTop', (grid, newVal) => {
    grid.top = `${newVal}%`;
});
// 底边距
updateGridProperty('MPBottom', (grid, newVal) => {
    grid.bottom = `${newVal}%`;
});
// 左边距
updateGridProperty('MPLeft', (grid, newVal) => {
    grid.left = `${newVal}%`;
});
// 右边距
updateGridProperty('MPRight', (grid, newVal) => {
    grid.right = `${newVal}%`;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.selectedBlock) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "props-panel" },
    });
    const __VLS_0 = {}.MYForm;
    /** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "operation-list" },
        modelValue: (__VLS_ctx.formModel),
        labelWidth: (60),
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "operation-list" },
        modelValue: (__VLS_ctx.formModel),
        labelWidth: (60),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    const __VLS_4 = {}.MYScrollbar;
    /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ScrollWidth: "4px",
        height: "100%",
    }));
    const __VLS_6 = __VLS_5({
        ScrollWidth: "4px",
        height: "100%",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        label: (__VLS_ctx.$t('dashboard.props.layerName')),
    }));
    const __VLS_10 = __VLS_9({
        label: (__VLS_ctx.$t('dashboard.props.layerName')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    const __VLS_12 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.selectedBlock.name),
        placeholder: (__VLS_ctx.$t('dashboard.props.layerName')),
        placeholderColor: "#fff",
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.selectedBlock.name),
        placeholder: (__VLS_ctx.$t('dashboard.props.layerName')),
        placeholderColor: "#fff",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_16;
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = {
        onInput: (__VLS_ctx.updateName)
    };
    var __VLS_15;
    var __VLS_11;
    const __VLS_20 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: (__VLS_ctx.$t('dashboard.props.hidden')),
    }));
    const __VLS_22 = __VLS_21({
        label: (__VLS_ctx.$t('dashboard.props.hidden')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    const __VLS_24 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        modelValue: (__VLS_ctx.selectedBlock.visible),
    }));
    const __VLS_26 = __VLS_25({
        modelValue: (__VLS_ctx.selectedBlock.visible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_23;
    if (__VLS_ctx.isBarChart) {
        const __VLS_28 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            label: (__VLS_ctx.$t('dashboard.props.color')),
        }));
        const __VLS_30 = __VLS_29({
            label: (__VLS_ctx.$t('dashboard.props.color')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        __VLS_31.slots.default;
        const __VLS_32 = {}.MYSelectColor;
        /** @type {[typeof __VLS_components.MYSelectColor, ]} */ ;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
            modelValue: (__VLS_ctx.selectedBlock.color),
        }));
        const __VLS_34 = __VLS_33({
            modelValue: (__VLS_ctx.selectedBlock.color),
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        var __VLS_31;
    }
    if (__VLS_ctx.isBarChart) {
        const __VLS_36 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
            label: (__VLS_ctx.$t('dashboard.props.maxWidth')),
        }));
        const __VLS_38 = __VLS_37({
            label: (__VLS_ctx.$t('dashboard.props.maxWidth')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_39.slots.default;
        const __VLS_40 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            ...{ 'onChange': {} },
            modelValue: (__VLS_ctx.barWidth),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_42 = __VLS_41({
            ...{ 'onChange': {} },
            modelValue: (__VLS_ctx.barWidth),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        let __VLS_44;
        let __VLS_45;
        let __VLS_46;
        const __VLS_47 = {
            onChange: (__VLS_ctx.updateBarWidth)
        };
        var __VLS_43;
        var __VLS_39;
    }
    const __VLS_48 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        label: (__VLS_ctx.$t('dashboard.props.titleSetting')),
    }));
    const __VLS_50 = __VLS_49({
        label: (__VLS_ctx.$t('dashboard.props.titleSetting')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    const __VLS_52 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        modelValue: (__VLS_ctx.selectedBlock.title),
    }));
    const __VLS_54 = __VLS_53({
        modelValue: (__VLS_ctx.selectedBlock.title),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    var __VLS_51;
    if (__VLS_ctx.selectedBlock.title === true) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_56 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            label: (__VLS_ctx.$t('dashboard.props.title')),
        }));
        const __VLS_58 = __VLS_57({
            label: (__VLS_ctx.$t('dashboard.props.title')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        __VLS_59.slots.default;
        const __VLS_60 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.titleText),
            placeholder: (__VLS_ctx.$t('dashboard.props.title')),
        }));
        const __VLS_62 = __VLS_61({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.titleText),
            placeholder: (__VLS_ctx.$t('dashboard.props.title')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_61));
        let __VLS_64;
        let __VLS_65;
        let __VLS_66;
        const __VLS_67 = {
            onInput: (__VLS_ctx.updateTitleText)
        };
        var __VLS_63;
        var __VLS_59;
        const __VLS_68 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
            label: (__VLS_ctx.$t('dashboard.props.titleColor')),
        }));
        const __VLS_70 = __VLS_69({
            label: (__VLS_ctx.$t('dashboard.props.titleColor')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        __VLS_71.slots.default;
        const __VLS_72 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.titleColor),
            placeholder: (__VLS_ctx.$t('dashboard.props.titleColor')),
        }));
        const __VLS_74 = __VLS_73({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.titleColor),
            placeholder: (__VLS_ctx.$t('dashboard.props.titleColor')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        let __VLS_76;
        let __VLS_77;
        let __VLS_78;
        const __VLS_79 = {
            onInput: (__VLS_ctx.updateTitleColor)
        };
        var __VLS_75;
        var __VLS_71;
        const __VLS_80 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
            label: (__VLS_ctx.$t('dashboard.props.titleWeight')),
        }));
        const __VLS_82 = __VLS_81({
            label: (__VLS_ctx.$t('dashboard.props.titleWeight')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_81));
        __VLS_83.slots.default;
        const __VLS_84 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.fontWeight),
            placeholder: (__VLS_ctx.$t('dashboard.props.titleWeight')),
        }));
        const __VLS_86 = __VLS_85({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.fontWeight),
            placeholder: (__VLS_ctx.$t('dashboard.props.titleWeight')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_85));
        let __VLS_88;
        let __VLS_89;
        let __VLS_90;
        const __VLS_91 = {
            onInput: (__VLS_ctx.updateFontWeight)
        };
        var __VLS_87;
        var __VLS_83;
        const __VLS_92 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
            label: (__VLS_ctx.$t('dashboard.props.titleSize')),
        }));
        const __VLS_94 = __VLS_93({
            label: (__VLS_ctx.$t('dashboard.props.titleSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        __VLS_95.slots.default;
        const __VLS_96 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.fontSize),
            placeholder: (__VLS_ctx.$t('dashboard.props.titleSize')),
        }));
        const __VLS_98 = __VLS_97({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.fontSize),
            placeholder: (__VLS_ctx.$t('dashboard.props.titleSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_97));
        let __VLS_100;
        let __VLS_101;
        let __VLS_102;
        const __VLS_103 = {
            onInput: (__VLS_ctx.updateFontSize)
        };
        var __VLS_99;
        var __VLS_95;
    }
    const __VLS_104 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
        label: (__VLS_ctx.$t('dashboard.props.data')),
    }));
    const __VLS_106 = __VLS_105({
        label: (__VLS_ctx.$t('dashboard.props.data')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    __VLS_107.slots.default;
    const __VLS_108 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
        ...{ 'onClick': {} },
    }));
    const __VLS_110 = __VLS_109({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    let __VLS_112;
    let __VLS_113;
    let __VLS_114;
    const __VLS_115 = {
        onClick: (__VLS_ctx.openDataDialog)
    };
    __VLS_111.slots.default;
    (__VLS_ctx.$t('dashboard.props.editData'));
    var __VLS_111;
    const __VLS_116 = {}.MYDialog;
    /** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
        ...{ 'onClose': {} },
        modelValue: (__VLS_ctx.dataDialogVisible),
        title: (__VLS_ctx.$t('dashboard.props.dataEditor.title')),
        width: "800px",
        height: "650px",
        showClose: (false),
        appendToBody: true,
    }));
    const __VLS_118 = __VLS_117({
        ...{ 'onClose': {} },
        modelValue: (__VLS_ctx.dataDialogVisible),
        title: (__VLS_ctx.$t('dashboard.props.dataEditor.title')),
        width: "800px",
        height: "650px",
        showClose: (false),
        appendToBody: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    let __VLS_120;
    let __VLS_121;
    let __VLS_122;
    const __VLS_123 = {
        onClose: (__VLS_ctx.closeDataDialog)
    };
    __VLS_119.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "data-editor-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "data-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-cell" },
    });
    (__VLS_ctx.$t('dashboard.props.dataEditor.name'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-cell" },
    });
    (__VLS_ctx.$t('dashboard.props.dataEditor.value'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-cell" },
    });
    (__VLS_ctx.$t('dashboard.props.dataEditor.operation'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-body" },
    });
    const __VLS_124 = {}.MYScrollbar;
    /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
        ScrollWidth: "4px",
        trackColor: "transparent",
    }));
    const __VLS_126 = __VLS_125({
        ScrollWidth: "4px",
        trackColor: "transparent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_125));
    __VLS_127.slots.default;
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.currentData))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "table-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        const __VLS_128 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
            modelValue: (item.name),
            placeholder: (__VLS_ctx.$t('dashboard.props.dataEditor.name')),
        }));
        const __VLS_130 = __VLS_129({
            modelValue: (item.name),
            placeholder: (__VLS_ctx.$t('dashboard.props.dataEditor.name')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_129));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        const __VLS_132 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
            modelValue: (item.value),
            modelModifiers: { number: true, },
            type: "number",
            placeholder: (__VLS_ctx.$t('dashboard.props.dataEditor.value')),
        }));
        const __VLS_134 = __VLS_133({
            modelValue: (item.value),
            modelModifiers: { number: true, },
            type: "number",
            placeholder: (__VLS_ctx.$t('dashboard.props.dataEditor.value')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_133));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        const __VLS_136 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
            ...{ 'onClick': {} },
            type: "danger",
            ...{ class: "btn-remove" },
        }));
        const __VLS_138 = __VLS_137({
            ...{ 'onClick': {} },
            type: "danger",
            ...{ class: "btn-remove" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_137));
        let __VLS_140;
        let __VLS_141;
        let __VLS_142;
        const __VLS_143 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedBlock))
                    return;
                __VLS_ctx.removeDataItem(index);
            }
        };
        __VLS_139.slots.default;
        (__VLS_ctx.$t('dashboard.props.dataEditor.delete'));
        var __VLS_139;
    }
    var __VLS_127;
    const __VLS_144 = {}.MYScrollbar;
    /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
        ScrollWidth: "4px",
        trackColor: "transparent",
    }));
    const __VLS_146 = __VLS_145({
        ScrollWidth: "4px",
        trackColor: "transparent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_145));
    __VLS_147.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "data-preview" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (__VLS_ctx.$t('dashboard.props.dataEditor.jsonPreview'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    (JSON.stringify(__VLS_ctx.currentData, null, 2));
    var __VLS_147;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_148 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
        ...{ 'onClick': {} },
    }));
    const __VLS_150 = __VLS_149({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_149));
    let __VLS_152;
    let __VLS_153;
    let __VLS_154;
    const __VLS_155 = {
        onClick: (__VLS_ctx.closeDataDialog)
    };
    __VLS_151.slots.default;
    (__VLS_ctx.$t('dashboard.props.dataEditor.cancel'));
    var __VLS_151;
    const __VLS_156 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_158 = __VLS_157({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_157));
    let __VLS_160;
    let __VLS_161;
    let __VLS_162;
    const __VLS_163 = {
        onClick: (__VLS_ctx.saveData)
    };
    __VLS_159.slots.default;
    (__VLS_ctx.$t('dashboard.props.dataEditor.save'));
    var __VLS_159;
    var __VLS_119;
    var __VLS_107;
    if (__VLS_ctx.isAxisChart) {
        const __VLS_164 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
            label: (__VLS_ctx.$t('dashboard.props.xAxisSetting')),
        }));
        const __VLS_166 = __VLS_165({
            label: (__VLS_ctx.$t('dashboard.props.xAxisSetting')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_165));
        __VLS_167.slots.default;
        const __VLS_168 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({
            modelValue: (__VLS_ctx.selectedBlock.xAlign),
        }));
        const __VLS_170 = __VLS_169({
            modelValue: (__VLS_ctx.selectedBlock.xAlign),
        }, ...__VLS_functionalComponentArgsRest(__VLS_169));
        var __VLS_167;
    }
    if (__VLS_ctx.selectedBlock.xAlign && __VLS_ctx.isAxisChart) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_172 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({
            label: (__VLS_ctx.$t('dashboard.props.xAxisName')),
        }));
        const __VLS_174 = __VLS_173({
            label: (__VLS_ctx.$t('dashboard.props.xAxisName')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_173));
        __VLS_175.slots.default;
        const __VLS_176 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.xName),
            placeholder: (__VLS_ctx.$t('dashboard.props.xAxisName')),
        }));
        const __VLS_178 = __VLS_177({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.xName),
            placeholder: (__VLS_ctx.$t('dashboard.props.xAxisName')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_177));
        let __VLS_180;
        let __VLS_181;
        let __VLS_182;
        const __VLS_183 = {
            onInput: (__VLS_ctx.updateXName)
        };
        var __VLS_179;
        var __VLS_175;
        const __VLS_184 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
            label: (__VLS_ctx.$t('dashboard.props.xAxisShow')),
        }));
        const __VLS_186 = __VLS_185({
            label: (__VLS_ctx.$t('dashboard.props.xAxisShow')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_185));
        __VLS_187.slots.default;
        const __VLS_188 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.xVisible),
        }));
        const __VLS_190 = __VLS_189({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.xVisible),
        }, ...__VLS_functionalComponentArgsRest(__VLS_189));
        var __VLS_187;
        const __VLS_192 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
            label: (__VLS_ctx.$t('dashboard.props.xAxisGridLine')),
        }));
        const __VLS_194 = __VLS_193({
            label: (__VLS_ctx.$t('dashboard.props.xAxisGridLine')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_193));
        __VLS_195.slots.default;
        const __VLS_196 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.splitLine),
        }));
        const __VLS_198 = __VLS_197({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.splitLine),
        }, ...__VLS_functionalComponentArgsRest(__VLS_197));
        var __VLS_195;
        if (__VLS_ctx.selectedBlock.splitLine) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            const __VLS_200 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({
                label: (__VLS_ctx.$t('dashboard.props.xAxisGridLineColor')),
            }));
            const __VLS_202 = __VLS_201({
                label: (__VLS_ctx.$t('dashboard.props.xAxisGridLineColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_201));
            __VLS_203.slots.default;
            const __VLS_204 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({
                modelValue: (__VLS_ctx.selectedBlock.splitLineColor),
                placeholder: (__VLS_ctx.$t('dashboard.props.xAxisGridLineColor')),
            }));
            const __VLS_206 = __VLS_205({
                modelValue: (__VLS_ctx.selectedBlock.splitLineColor),
                placeholder: (__VLS_ctx.$t('dashboard.props.xAxisGridLineColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_205));
            var __VLS_203;
        }
        const __VLS_208 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({
            label: (__VLS_ctx.$t('dashboard.props.xAxisOffset')),
        }));
        const __VLS_210 = __VLS_209({
            label: (__VLS_ctx.$t('dashboard.props.xAxisOffset')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_209));
        __VLS_211.slots.default;
        const __VLS_212 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
            modelValue: (__VLS_ctx.selectedBlock.xmove),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_214 = __VLS_213({
            modelValue: (__VLS_ctx.selectedBlock.xmove),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_213));
        var __VLS_211;
        const __VLS_216 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
            label: (__VLS_ctx.$t('dashboard.props.xAxisRotate')),
        }));
        const __VLS_218 = __VLS_217({
            label: (__VLS_ctx.$t('dashboard.props.xAxisRotate')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_217));
        __VLS_219.slots.default;
        const __VLS_220 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
            modelValue: (__VLS_ctx.selectedBlock.xRotate),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_222 = __VLS_221({
            modelValue: (__VLS_ctx.selectedBlock.xRotate),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_221));
        var __VLS_219;
        const __VLS_224 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
            label: (__VLS_ctx.$t('dashboard.props.xAxisReverse')),
        }));
        const __VLS_226 = __VLS_225({
            label: (__VLS_ctx.$t('dashboard.props.xAxisReverse')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_225));
        __VLS_227.slots.default;
        const __VLS_228 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.xInverse),
        }));
        const __VLS_230 = __VLS_229({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.xInverse),
        }, ...__VLS_functionalComponentArgsRest(__VLS_229));
        var __VLS_227;
        const __VLS_232 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
            label: (__VLS_ctx.$t('dashboard.props.xAxisFontSize')),
        }));
        const __VLS_234 = __VLS_233({
            label: (__VLS_ctx.$t('dashboard.props.xAxisFontSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_233));
        __VLS_235.slots.default;
        const __VLS_236 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
            modelValue: (__VLS_ctx.selectedBlock.xDataSize),
            placeholder: (__VLS_ctx.$t('dashboard.props.xAxisFontSize')),
        }));
        const __VLS_238 = __VLS_237({
            modelValue: (__VLS_ctx.selectedBlock.xDataSize),
            placeholder: (__VLS_ctx.$t('dashboard.props.xAxisFontSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_237));
        var __VLS_235;
    }
    if (__VLS_ctx.isAxisChart) {
        const __VLS_240 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
            label: (__VLS_ctx.$t('dashboard.props.yAxisSetting')),
        }));
        const __VLS_242 = __VLS_241({
            label: (__VLS_ctx.$t('dashboard.props.yAxisSetting')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_241));
        __VLS_243.slots.default;
        const __VLS_244 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
            modelValue: (__VLS_ctx.selectedBlock.yAlign),
        }));
        const __VLS_246 = __VLS_245({
            modelValue: (__VLS_ctx.selectedBlock.yAlign),
        }, ...__VLS_functionalComponentArgsRest(__VLS_245));
        var __VLS_243;
    }
    if (__VLS_ctx.selectedBlock.yAlign && __VLS_ctx.isAxisChart) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_248 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
            label: (__VLS_ctx.$t('dashboard.props.yAxisName')),
        }));
        const __VLS_250 = __VLS_249({
            label: (__VLS_ctx.$t('dashboard.props.yAxisName')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_249));
        __VLS_251.slots.default;
        const __VLS_252 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.yName),
            placeholder: (__VLS_ctx.$t('dashboard.props.yAxisName')),
        }));
        const __VLS_254 = __VLS_253({
            ...{ 'onInput': {} },
            modelValue: (__VLS_ctx.selectedBlock.yName),
            placeholder: (__VLS_ctx.$t('dashboard.props.yAxisName')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_253));
        let __VLS_256;
        let __VLS_257;
        let __VLS_258;
        const __VLS_259 = {
            onInput: (__VLS_ctx.updateYName)
        };
        var __VLS_255;
        var __VLS_251;
        const __VLS_260 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({
            label: (__VLS_ctx.$t('dashboard.props.yAxisShow')),
        }));
        const __VLS_262 = __VLS_261({
            label: (__VLS_ctx.$t('dashboard.props.yAxisShow')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_261));
        __VLS_263.slots.default;
        const __VLS_264 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.yVisible),
        }));
        const __VLS_266 = __VLS_265({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.yVisible),
        }, ...__VLS_functionalComponentArgsRest(__VLS_265));
        var __VLS_263;
        const __VLS_268 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({
            label: (__VLS_ctx.$t('dashboard.props.yAxisGridLine')),
        }));
        const __VLS_270 = __VLS_269({
            label: (__VLS_ctx.$t('dashboard.props.yAxisGridLine')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_269));
        __VLS_271.slots.default;
        const __VLS_272 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.ySplitLine),
        }));
        const __VLS_274 = __VLS_273({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.ySplitLine),
        }, ...__VLS_functionalComponentArgsRest(__VLS_273));
        var __VLS_271;
        if (__VLS_ctx.selectedBlock.ySplitLine) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            const __VLS_276 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_277 = __VLS_asFunctionalComponent(__VLS_276, new __VLS_276({
                label: (__VLS_ctx.$t('dashboard.props.yAxisGridLineColor')),
            }));
            const __VLS_278 = __VLS_277({
                label: (__VLS_ctx.$t('dashboard.props.yAxisGridLineColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_277));
            __VLS_279.slots.default;
            const __VLS_280 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_281 = __VLS_asFunctionalComponent(__VLS_280, new __VLS_280({
                modelValue: (__VLS_ctx.selectedBlock.ySplitLineColor),
                placeholder: (__VLS_ctx.$t('dashboard.props.yAxisGridLineColor')),
            }));
            const __VLS_282 = __VLS_281({
                modelValue: (__VLS_ctx.selectedBlock.ySplitLineColor),
                placeholder: (__VLS_ctx.$t('dashboard.props.yAxisGridLineColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_281));
            var __VLS_279;
        }
        const __VLS_284 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_285 = __VLS_asFunctionalComponent(__VLS_284, new __VLS_284({
            label: (__VLS_ctx.$t('dashboard.props.yAxisReverse')),
        }));
        const __VLS_286 = __VLS_285({
            label: (__VLS_ctx.$t('dashboard.props.yAxisReverse')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_285));
        __VLS_287.slots.default;
        const __VLS_288 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.yInverse),
        }));
        const __VLS_290 = __VLS_289({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.yInverse),
        }, ...__VLS_functionalComponentArgsRest(__VLS_289));
        var __VLS_287;
        const __VLS_292 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
            label: (__VLS_ctx.$t('dashboard.props.yAxisFontSize')),
        }));
        const __VLS_294 = __VLS_293({
            label: (__VLS_ctx.$t('dashboard.props.yAxisFontSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_293));
        __VLS_295.slots.default;
        const __VLS_296 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({
            modelValue: (__VLS_ctx.selectedBlock.yDataSize),
            placeholder: (__VLS_ctx.$t('dashboard.props.yAxisFontSize')),
        }));
        const __VLS_298 = __VLS_297({
            modelValue: (__VLS_ctx.selectedBlock.yDataSize),
            placeholder: (__VLS_ctx.$t('dashboard.props.yAxisFontSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_297));
        var __VLS_295;
    }
    const __VLS_300 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_301 = __VLS_asFunctionalComponent(__VLS_300, new __VLS_300({
        label: (__VLS_ctx.$t('dashboard.props.valueSetting')),
    }));
    const __VLS_302 = __VLS_301({
        label: (__VLS_ctx.$t('dashboard.props.valueSetting')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_301));
    __VLS_303.slots.default;
    const __VLS_304 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_305 = __VLS_asFunctionalComponent(__VLS_304, new __VLS_304({
        modelValue: (__VLS_ctx.selectedBlock.dataSettingAlign),
    }));
    const __VLS_306 = __VLS_305({
        modelValue: (__VLS_ctx.selectedBlock.dataSettingAlign),
    }, ...__VLS_functionalComponentArgsRest(__VLS_305));
    var __VLS_303;
    if (__VLS_ctx.selectedBlock.dataSettingAlign) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_308 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_309 = __VLS_asFunctionalComponent(__VLS_308, new __VLS_308({
            label: (__VLS_ctx.$t('dashboard.props.valueShow')),
        }));
        const __VLS_310 = __VLS_309({
            label: (__VLS_ctx.$t('dashboard.props.valueShow')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_309));
        __VLS_311.slots.default;
        const __VLS_312 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_313 = __VLS_asFunctionalComponent(__VLS_312, new __VLS_312({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.dataAlign),
        }));
        const __VLS_314 = __VLS_313({
            size: "small",
            modelValue: (__VLS_ctx.selectedBlock.dataAlign),
        }, ...__VLS_functionalComponentArgsRest(__VLS_313));
        var __VLS_311;
        if (__VLS_ctx.selectedBlock.dataAlign) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            const __VLS_316 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_317 = __VLS_asFunctionalComponent(__VLS_316, new __VLS_316({
                label: (__VLS_ctx.$t('dashboard.props.valueFontSize')),
            }));
            const __VLS_318 = __VLS_317({
                label: (__VLS_ctx.$t('dashboard.props.valueFontSize')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_317));
            __VLS_319.slots.default;
            const __VLS_320 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_321 = __VLS_asFunctionalComponent(__VLS_320, new __VLS_320({
                modelValue: (__VLS_ctx.selectedBlock.dataSize),
                placeholder: (__VLS_ctx.$t('dashboard.props.valueFontSize')),
            }));
            const __VLS_322 = __VLS_321({
                modelValue: (__VLS_ctx.selectedBlock.dataSize),
                placeholder: (__VLS_ctx.$t('dashboard.props.valueFontSize')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_321));
            var __VLS_319;
            const __VLS_324 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_325 = __VLS_asFunctionalComponent(__VLS_324, new __VLS_324({
                label: (__VLS_ctx.$t('dashboard.props.valueFontColor')),
            }));
            const __VLS_326 = __VLS_325({
                label: (__VLS_ctx.$t('dashboard.props.valueFontColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_325));
            __VLS_327.slots.default;
            const __VLS_328 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_329 = __VLS_asFunctionalComponent(__VLS_328, new __VLS_328({
                modelValue: (__VLS_ctx.selectedBlock.dataSizeColor),
                placeholder: (__VLS_ctx.$t('dashboard.props.valueFontColor')),
            }));
            const __VLS_330 = __VLS_329({
                modelValue: (__VLS_ctx.selectedBlock.dataSizeColor),
                placeholder: (__VLS_ctx.$t('dashboard.props.valueFontColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_329));
            var __VLS_327;
            const __VLS_332 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_333 = __VLS_asFunctionalComponent(__VLS_332, new __VLS_332({
                label: (__VLS_ctx.$t('dashboard.props.valueFontWeight')),
            }));
            const __VLS_334 = __VLS_333({
                label: (__VLS_ctx.$t('dashboard.props.valueFontWeight')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_333));
            __VLS_335.slots.default;
            const __VLS_336 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_337 = __VLS_asFunctionalComponent(__VLS_336, new __VLS_336({
                modelValue: (__VLS_ctx.selectedBlock.dataWeight),
                placeholder: (__VLS_ctx.$t('dashboard.props.valueFontWeight')),
            }));
            const __VLS_338 = __VLS_337({
                modelValue: (__VLS_ctx.selectedBlock.dataWeight),
                placeholder: (__VLS_ctx.$t('dashboard.props.valueFontWeight')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_337));
            var __VLS_335;
        }
    }
    if (__VLS_ctx.isAxisChart) {
        const __VLS_340 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_341 = __VLS_asFunctionalComponent(__VLS_340, new __VLS_340({
            label: (__VLS_ctx.$t('dashboard.props.coordinateMargin')),
        }));
        const __VLS_342 = __VLS_341({
            label: (__VLS_ctx.$t('dashboard.props.coordinateMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_341));
        __VLS_343.slots.default;
        const __VLS_344 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_345 = __VLS_asFunctionalComponent(__VLS_344, new __VLS_344({
            modelValue: (__VLS_ctx.selectedBlock.MPAlign),
        }));
        const __VLS_346 = __VLS_345({
            modelValue: (__VLS_ctx.selectedBlock.MPAlign),
        }, ...__VLS_functionalComponentArgsRest(__VLS_345));
        var __VLS_343;
    }
    if (__VLS_ctx.selectedBlock.MPAlign && __VLS_ctx.isAxisChart) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_348 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_349 = __VLS_asFunctionalComponent(__VLS_348, new __VLS_348({
            label: (__VLS_ctx.$t('dashboard.props.topMargin')),
        }));
        const __VLS_350 = __VLS_349({
            label: (__VLS_ctx.$t('dashboard.props.topMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_349));
        __VLS_351.slots.default;
        const __VLS_352 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_353 = __VLS_asFunctionalComponent(__VLS_352, new __VLS_352({
            modelValue: (__VLS_ctx.selectedBlock.MPTop),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_354 = __VLS_353({
            modelValue: (__VLS_ctx.selectedBlock.MPTop),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_353));
        var __VLS_351;
        const __VLS_356 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_357 = __VLS_asFunctionalComponent(__VLS_356, new __VLS_356({
            label: (__VLS_ctx.$t('dashboard.props.topMargin')),
        }));
        const __VLS_358 = __VLS_357({
            label: (__VLS_ctx.$t('dashboard.props.topMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_357));
        __VLS_359.slots.default;
        const __VLS_360 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_361 = __VLS_asFunctionalComponent(__VLS_360, new __VLS_360({
            modelValue: (__VLS_ctx.selectedBlock.MPTop),
            placeholder: (__VLS_ctx.$t('dashboard.props.topMargin')),
        }));
        const __VLS_362 = __VLS_361({
            modelValue: (__VLS_ctx.selectedBlock.MPTop),
            placeholder: (__VLS_ctx.$t('dashboard.props.topMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_361));
        var __VLS_359;
        const __VLS_364 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_365 = __VLS_asFunctionalComponent(__VLS_364, new __VLS_364({
            label: (__VLS_ctx.$t('dashboard.props.bottomMargin')),
        }));
        const __VLS_366 = __VLS_365({
            label: (__VLS_ctx.$t('dashboard.props.bottomMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_365));
        __VLS_367.slots.default;
        const __VLS_368 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_369 = __VLS_asFunctionalComponent(__VLS_368, new __VLS_368({
            modelValue: (__VLS_ctx.selectedBlock.MPBottom),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_370 = __VLS_369({
            modelValue: (__VLS_ctx.selectedBlock.MPBottom),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_369));
        var __VLS_367;
        const __VLS_372 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_373 = __VLS_asFunctionalComponent(__VLS_372, new __VLS_372({
            label: (__VLS_ctx.$t('dashboard.props.bottomMargin')),
        }));
        const __VLS_374 = __VLS_373({
            label: (__VLS_ctx.$t('dashboard.props.bottomMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_373));
        __VLS_375.slots.default;
        const __VLS_376 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_377 = __VLS_asFunctionalComponent(__VLS_376, new __VLS_376({
            modelValue: (__VLS_ctx.selectedBlock.MPBottom),
            placeholder: (__VLS_ctx.$t('dashboard.props.bottomMargin')),
        }));
        const __VLS_378 = __VLS_377({
            modelValue: (__VLS_ctx.selectedBlock.MPBottom),
            placeholder: (__VLS_ctx.$t('dashboard.props.bottomMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_377));
        var __VLS_375;
        const __VLS_380 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_381 = __VLS_asFunctionalComponent(__VLS_380, new __VLS_380({
            label: (__VLS_ctx.$t('dashboard.props.leftMargin')),
        }));
        const __VLS_382 = __VLS_381({
            label: (__VLS_ctx.$t('dashboard.props.leftMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_381));
        __VLS_383.slots.default;
        const __VLS_384 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_385 = __VLS_asFunctionalComponent(__VLS_384, new __VLS_384({
            modelValue: (__VLS_ctx.selectedBlock.MPLeft),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_386 = __VLS_385({
            modelValue: (__VLS_ctx.selectedBlock.MPLeft),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_385));
        var __VLS_383;
        const __VLS_388 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_389 = __VLS_asFunctionalComponent(__VLS_388, new __VLS_388({
            label: (__VLS_ctx.$t('dashboard.props.leftMargin')),
        }));
        const __VLS_390 = __VLS_389({
            label: (__VLS_ctx.$t('dashboard.props.leftMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_389));
        __VLS_391.slots.default;
        const __VLS_392 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_393 = __VLS_asFunctionalComponent(__VLS_392, new __VLS_392({
            modelValue: (__VLS_ctx.selectedBlock.MPLeft),
            placeholder: (__VLS_ctx.$t('dashboard.props.leftMargin')),
        }));
        const __VLS_394 = __VLS_393({
            modelValue: (__VLS_ctx.selectedBlock.MPLeft),
            placeholder: (__VLS_ctx.$t('dashboard.props.leftMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_393));
        var __VLS_391;
        const __VLS_396 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_397 = __VLS_asFunctionalComponent(__VLS_396, new __VLS_396({
            label: (__VLS_ctx.$t('dashboard.props.rightMargin')),
        }));
        const __VLS_398 = __VLS_397({
            label: (__VLS_ctx.$t('dashboard.props.rightMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_397));
        __VLS_399.slots.default;
        const __VLS_400 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_401 = __VLS_asFunctionalComponent(__VLS_400, new __VLS_400({
            modelValue: (__VLS_ctx.selectedBlock.MPRight),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_402 = __VLS_401({
            modelValue: (__VLS_ctx.selectedBlock.MPRight),
            max: (100),
            min: (0),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_401));
        var __VLS_399;
        const __VLS_404 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_405 = __VLS_asFunctionalComponent(__VLS_404, new __VLS_404({
            label: (__VLS_ctx.$t('dashboard.props.rightMargin')),
        }));
        const __VLS_406 = __VLS_405({
            label: (__VLS_ctx.$t('dashboard.props.rightMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_405));
        __VLS_407.slots.default;
        const __VLS_408 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_409 = __VLS_asFunctionalComponent(__VLS_408, new __VLS_408({
            modelValue: (__VLS_ctx.selectedBlock.MPRight),
            placeholder: (__VLS_ctx.$t('dashboard.props.rightMargin')),
        }));
        const __VLS_410 = __VLS_409({
            modelValue: (__VLS_ctx.selectedBlock.MPRight),
            placeholder: (__VLS_ctx.$t('dashboard.props.rightMargin')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_409));
        var __VLS_407;
    }
    var __VLS_7;
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['props-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-list']} */ ;
/** @type {__VLS_StyleScopedClasses['data-editor-container']} */ ;
/** @type {__VLS_StyleScopedClasses['data-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['header-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['header-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-body']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-remove']} */ ;
/** @type {__VLS_StyleScopedClasses['data-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formModel: formModel,
            dataDialogVisible: dataDialogVisible,
            currentData: currentData,
            selectedBlock: selectedBlock,
            isBarChart: isBarChart,
            isAxisChart: isAxisChart,
            updateName: updateName,
            barWidth: barWidth,
            updateBarWidth: updateBarWidth,
            titleText: titleText,
            updateTitleText: updateTitleText,
            updateTitleColor: updateTitleColor,
            updateFontWeight: updateFontWeight,
            updateFontSize: updateFontSize,
            openDataDialog: openDataDialog,
            closeDataDialog: closeDataDialog,
            removeDataItem: removeDataItem,
            saveData: saveData,
            updateXName: updateXName,
            updateYName: updateYName,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
