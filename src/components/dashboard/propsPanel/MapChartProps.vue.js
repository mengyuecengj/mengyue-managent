import { useDashboardStore } from '@/store/modules/dashboard';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const dashboardStore = useDashboardStore();
const modelForm = ref({});
const selectedBlock = computed(() => {
    if (!dashboardStore.selectedId)
        return null;
    return dashboardStore.blocks.find((b) => b.id === dashboardStore.selectedId) || null;
});
// 地图缩放
const mapZoom = computed({
    get() {
        return selectedBlock.value?.config.options.series?.[0]?.zoom || 1.2;
    },
    set(val) {
        const series = selectedBlock.value.config.options.series[0];
        dashboardStore.updateBlock(selectedBlock.value.id, {
            config: {
                ...selectedBlock.value.config,
                options: {
                    ...selectedBlock.value.config.options,
                    series: [{
                            ...series,
                            zoom: val,
                            aspectScale: 1
                        }]
                }
            }
        });
    }
});
// 悬浮地名
const visibleName = computed({
    get() {
        const tooltip = selectedBlock.value?.config.options?.tooltip;
        return tooltip ? tooltip.trigger !== undefined : false;
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        if (val) {
            config.options.tooltip = {
                trigger: 'item',
                formatter: function (params) {
                    if (params.value) {
                        return `${params.name}: ${params.value}`;
                    }
                    return params.name;
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                textStyle: {
                    color: '#fff'
                }
            },
                config.options.series[0].emphasis = {
                    itemStyle: {
                        areaColor: '#3bb8c7'
                    }
                };
        }
        else {
            delete config.options.tooltip;
        }
        dashboardStore.updateBlock(id, {
            config,
            mapNameVisible: val
        });
    }
});
// 悬浮地名文字大小
const mapNameSize = computed({
    get() {
        const tooltip = selectedBlock.value?.config.options?.tooltip;
        return tooltip?.textStyle?.fontSize || "12";
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        if (!config.options.tooltip) {
            config.options.tooltip = {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.7)',
                textStyle: { color: '#fff' }
            };
        }
        if (!config.options.tooltip.textStyle) {
            config.options.tooltip.textStyle = {};
        }
        config.options.tooltip.textStyle.fontSize = val;
        dashboardStore.updateBlock(id, {
            config
        });
    }
});
// 悬浮地名文字颜色
const mapNameColor = computed({
    get() {
        const tooltip = selectedBlock.value?.config.options?.tooltip;
        return tooltip?.textStyle?.color || '';
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        if (!config.options.tooltip) {
            config.options.tooltip = {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.7)',
                textStyle: { fontSize: '12' }
            };
        }
        if (!config.options.tooltip.textStyle) {
            config.options.tooltip.textStyle = {};
        }
        config.options.tooltip.textStyle.color = val;
        dashboardStore.updateBlock(id, {
            config
        });
    }
});
// 悬浮地名高亮颜色（与区域高亮共用）
const mapNameColorHover = computed({
    get() {
        const series = selectedBlock.value?.config.options?.series?.[0];
        return series ? series.emphasis.itemStyle.areaColor : '';
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        if (val) {
            config.options.series[0].emphasis = {
                itemStyle: {
                    areaColor: val
                }
            };
        }
    }
});
// 边框线宽
const borderWidth = computed({
    get() {
        const series = selectedBlock.value?.config.options?.series?.[0];
        return series ? series.itemStyle.borderWidth : 0;
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        config.options.series[0].itemStyle = {
            ...config.options.series[0].itemStyle,
            borderWidth: val
        };
        dashboardStore.updateBlock(selectedBlock.value.id, {
            config
        });
    }
});
// 边框颜色
const borderColor = computed({
    get() {
        const series = selectedBlock.value?.config.options?.series?.[0];
        return series ? series.itemStyle.borderColor : '';
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        config.options.series[0].itemStyle = {
            ...config.options.series[0].itemStyle,
            borderColor: val
        };
    }
});
// 区域颜色
const areaColor = computed({
    get() {
        const series = selectedBlock.value?.config.options?.series?.[0];
        return series ? series.itemStyle.areaColor : '';
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const config = { ...selectedBlock.value.config };
        if (!config.options) {
            config.options = {};
        }
        config.options.series[0].itemStyle = {
            ...config.options.series[0].itemStyle,
            areaColor: val
        };
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.selectedBlock) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "props-panel" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "back-btn" },
    });
    const __VLS_0 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        type: "info",
        size: "small",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        type: "info",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.selectedBlock))
                return;
            __VLS_ctx.dashboardStore.selectBlock(null);
        }
    };
    __VLS_3.slots.default;
    (__VLS_ctx.t('dashboard.props.backToParent'));
    var __VLS_3;
    const __VLS_8 = {}.MYForm;
    /** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        modelValue: (__VLS_ctx.modelForm),
        ...{ class: "operation-list" },
        labelWidth: (60),
    }));
    const __VLS_10 = __VLS_9({
        modelValue: (__VLS_ctx.modelForm),
        ...{ class: "operation-list" },
        labelWidth: (60),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    const __VLS_12 = {}.MYScrollbar;
    /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ScrollWidth: "4px",
        height: "100%",
    }));
    const __VLS_14 = __VLS_13({
        ScrollWidth: "4px",
        height: "100%",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    const __VLS_16 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        label: (__VLS_ctx.t('dashboard.props.layerName')),
    }));
    const __VLS_18 = __VLS_17({
        label: (__VLS_ctx.t('dashboard.props.layerName')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        modelValue: (__VLS_ctx.selectedBlock.name),
        placeholder: (__VLS_ctx.t('dashboard.props.layerNamePlaceholder')),
    }));
    const __VLS_22 = __VLS_21({
        modelValue: (__VLS_ctx.selectedBlock.name),
        placeholder: (__VLS_ctx.t('dashboard.props.layerNamePlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    var __VLS_19;
    const __VLS_24 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        label: (__VLS_ctx.t('dashboard.props.hidden')),
    }));
    const __VLS_26 = __VLS_25({
        label: (__VLS_ctx.t('dashboard.props.hidden')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    const __VLS_28 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        modelValue: (__VLS_ctx.selectedBlock.visible),
    }));
    const __VLS_30 = __VLS_29({
        modelValue: (__VLS_ctx.selectedBlock.visible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    var __VLS_27;
    const __VLS_32 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        label: (__VLS_ctx.t('dashboard.props.mapSetting')),
    }));
    const __VLS_34 = __VLS_33({
        label: (__VLS_ctx.t('dashboard.props.mapSetting')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        modelValue: (__VLS_ctx.selectedBlock.mapSetting),
    }));
    const __VLS_38 = __VLS_37({
        modelValue: (__VLS_ctx.selectedBlock.mapSetting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_35;
    if (__VLS_ctx.selectedBlock.mapSetting) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_40 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            label: (__VLS_ctx.t('dashboard.props.mapZoom')),
        }));
        const __VLS_42 = __VLS_41({
            label: (__VLS_ctx.t('dashboard.props.mapZoom')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        __VLS_43.slots.default;
        const __VLS_44 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            modelValue: (__VLS_ctx.mapZoom),
            max: (100),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_46 = __VLS_45({
            modelValue: (__VLS_ctx.mapZoom),
            max: (100),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        var __VLS_43;
        const __VLS_48 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            label: (__VLS_ctx.t('dashboard.props.hoverPlaceName')),
        }));
        const __VLS_50 = __VLS_49({
            label: (__VLS_ctx.t('dashboard.props.hoverPlaceName')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_51.slots.default;
        const __VLS_52 = {}.MYSwitch;
        /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
            modelValue: (__VLS_ctx.visibleName),
        }));
        const __VLS_54 = __VLS_53({
            modelValue: (__VLS_ctx.visibleName),
        }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        var __VLS_51;
        if (__VLS_ctx.visibleName) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            const __VLS_56 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
                label: (__VLS_ctx.t('dashboard.props.fontSize')),
            }));
            const __VLS_58 = __VLS_57({
                label: (__VLS_ctx.t('dashboard.props.fontSize')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_57));
            __VLS_59.slots.default;
            const __VLS_60 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
                modelValue: (__VLS_ctx.mapNameSize),
                placeholder: (__VLS_ctx.t('dashboard.props.fontSizePlaceholder')),
            }));
            const __VLS_62 = __VLS_61({
                modelValue: (__VLS_ctx.mapNameSize),
                placeholder: (__VLS_ctx.t('dashboard.props.fontSizePlaceholder')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            var __VLS_59;
            const __VLS_64 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
                label: (__VLS_ctx.t('dashboard.props.fontColor')),
            }));
            const __VLS_66 = __VLS_65({
                label: (__VLS_ctx.t('dashboard.props.fontColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_65));
            __VLS_67.slots.default;
            const __VLS_68 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
                modelValue: (__VLS_ctx.mapNameColor),
                placeholder: (__VLS_ctx.t('dashboard.props.fontColorPlaceholder')),
            }));
            const __VLS_70 = __VLS_69({
                modelValue: (__VLS_ctx.mapNameColor),
                placeholder: (__VLS_ctx.t('dashboard.props.fontColorPlaceholder')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_69));
            var __VLS_67;
            const __VLS_72 = {}.MYFormItem;
            /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
                label: (__VLS_ctx.t('dashboard.props.highlightColor')),
            }));
            const __VLS_74 = __VLS_73({
                label: (__VLS_ctx.t('dashboard.props.highlightColor')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_73));
            __VLS_75.slots.default;
            const __VLS_76 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
                modelValue: (__VLS_ctx.mapNameColorHover),
                placeholder: (__VLS_ctx.t('dashboard.props.highlightColorPlaceholder')),
            }));
            const __VLS_78 = __VLS_77({
                modelValue: (__VLS_ctx.mapNameColorHover),
                placeholder: (__VLS_ctx.t('dashboard.props.highlightColorPlaceholder')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_77));
            var __VLS_75;
        }
        const __VLS_80 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
            label: (__VLS_ctx.t('dashboard.props.borderWidth')),
        }));
        const __VLS_82 = __VLS_81({
            label: (__VLS_ctx.t('dashboard.props.borderWidth')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_81));
        __VLS_83.slots.default;
        const __VLS_84 = {}.MYSlidebar;
        /** @type {[typeof __VLS_components.MYSlidebar, ]} */ ;
        // @ts-ignore
        const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
            modelValue: (__VLS_ctx.borderWidth),
            max: (100),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }));
        const __VLS_86 = __VLS_85({
            modelValue: (__VLS_ctx.borderWidth),
            max: (100),
            thumbColor: "#409EFF",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_85));
        var __VLS_83;
        const __VLS_88 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
            label: (__VLS_ctx.t('dashboard.props.borderColor')),
        }));
        const __VLS_90 = __VLS_89({
            label: (__VLS_ctx.t('dashboard.props.borderColor')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_89));
        __VLS_91.slots.default;
        const __VLS_92 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
            modelValue: (__VLS_ctx.borderColor),
            placeholder: (__VLS_ctx.t('dashboard.props.borderColorPlaceholder')),
        }));
        const __VLS_94 = __VLS_93({
            modelValue: (__VLS_ctx.borderColor),
            placeholder: (__VLS_ctx.t('dashboard.props.borderColorPlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        var __VLS_91;
        const __VLS_96 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
            label: (__VLS_ctx.t('dashboard.props.areaColor')),
        }));
        const __VLS_98 = __VLS_97({
            label: (__VLS_ctx.t('dashboard.props.areaColor')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_97));
        __VLS_99.slots.default;
        const __VLS_100 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            modelValue: (__VLS_ctx.areaColor),
            placeholder: (__VLS_ctx.t('dashboard.props.areaColorPlaceholder')),
        }));
        const __VLS_102 = __VLS_101({
            modelValue: (__VLS_ctx.areaColor),
            placeholder: (__VLS_ctx.t('dashboard.props.areaColorPlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        var __VLS_99;
        const __VLS_104 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
            label: (__VLS_ctx.t('dashboard.props.areaHighlightColor')),
        }));
        const __VLS_106 = __VLS_105({
            label: (__VLS_ctx.t('dashboard.props.areaHighlightColor')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_105));
        __VLS_107.slots.default;
        const __VLS_108 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
            modelValue: (__VLS_ctx.mapNameColorHover),
            placeholder: (__VLS_ctx.t('dashboard.props.areaHighlightColorPlaceholder')),
        }));
        const __VLS_110 = __VLS_109({
            modelValue: (__VLS_ctx.mapNameColorHover),
            placeholder: (__VLS_ctx.t('dashboard.props.areaHighlightColorPlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_109));
        var __VLS_107;
    }
    var __VLS_15;
    var __VLS_11;
}
/** @type {__VLS_StyleScopedClasses['props-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['back-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-list']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            t: t,
            dashboardStore: dashboardStore,
            modelForm: modelForm,
            selectedBlock: selectedBlock,
            mapZoom: mapZoom,
            visibleName: visibleName,
            mapNameSize: mapNameSize,
            mapNameColor: mapNameColor,
            mapNameColorHover: mapNameColorHover,
            borderWidth: borderWidth,
            borderColor: borderColor,
            areaColor: areaColor,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
