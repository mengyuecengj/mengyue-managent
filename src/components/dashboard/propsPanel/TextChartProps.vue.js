import { useDashboardStore } from '@/store/modules/dashboard';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const dashboardStore = useDashboardStore();
const modelForm = reactive({});
const selectedBlock = computed(() => {
    if (!dashboardStore.selectedId)
        return null;
    return dashboardStore.blocks.find((b) => b.id === dashboardStore.selectedId) || null;
});
// 文本内容
const textContainer = computed({
    get() {
        return selectedBlock.value?.textContainer ?? '';
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        dashboardStore.updateBlock(id, { textContainer: val });
    }
});
// 文本颜色
const textColor = computed({
    get() {
        return selectedBlock.value?.textColor ?? '';
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        dashboardStore.updateBlock(id, { textColor: val });
    }
});
// 文本大小
const textSize = computed({
    get() {
        return selectedBlock.value?.textSize ?? "";
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        const numVal = typeof val === 'string' ? parseInt(val) || "" : val;
        dashboardStore.updateBlock(id, { textSize: String(numVal) });
    }
});
// 文本粗细
const textWeight = computed({
    get() {
        return selectedBlock.value?.textWeight ?? "";
    },
    set(val) {
        if (!selectedBlock.value)
            return;
        const id = selectedBlock.value.id;
        const numVal = typeof val === 'string' ? parseInt(val) || "" : val;
        dashboardStore.updateBlock(id, { textWeight: String(numVal) });
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
        label: (__VLS_ctx.t('dashboard.props.textContent')),
    }));
    const __VLS_34 = __VLS_33({
        label: (__VLS_ctx.t('dashboard.props.textContent')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.MYSwitch;
    /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        modelValue: (__VLS_ctx.selectedBlock.textVisible),
    }));
    const __VLS_38 = __VLS_37({
        modelValue: (__VLS_ctx.selectedBlock.textVisible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_35;
    if (__VLS_ctx.selectedBlock.textVisible) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_40 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            label: (__VLS_ctx.t('dashboard.props.textContent')),
        }));
        const __VLS_42 = __VLS_41({
            label: (__VLS_ctx.t('dashboard.props.textContent')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        __VLS_43.slots.default;
        const __VLS_44 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            modelValue: (__VLS_ctx.textContainer),
            placeholder: (__VLS_ctx.t('dashboard.props.textContentPlaceholder')),
        }));
        const __VLS_46 = __VLS_45({
            modelValue: (__VLS_ctx.textContainer),
            placeholder: (__VLS_ctx.t('dashboard.props.textContentPlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        var __VLS_43;
        const __VLS_48 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            label: (__VLS_ctx.t('dashboard.props.textColor')),
        }));
        const __VLS_50 = __VLS_49({
            label: (__VLS_ctx.t('dashboard.props.textColor')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_51.slots.default;
        const __VLS_52 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
            modelValue: (__VLS_ctx.textColor),
            placeholder: (__VLS_ctx.t('dashboard.props.textColorPlaceholder')),
        }));
        const __VLS_54 = __VLS_53({
            modelValue: (__VLS_ctx.textColor),
            placeholder: (__VLS_ctx.t('dashboard.props.textColorPlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        var __VLS_51;
        const __VLS_56 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            label: (__VLS_ctx.t('dashboard.props.textSize')),
        }));
        const __VLS_58 = __VLS_57({
            label: (__VLS_ctx.t('dashboard.props.textSize')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        __VLS_59.slots.default;
        const __VLS_60 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
            modelValue: (__VLS_ctx.textSize),
            placeholder: (__VLS_ctx.t('dashboard.props.textSizePlaceholder')),
        }));
        const __VLS_62 = __VLS_61({
            modelValue: (__VLS_ctx.textSize),
            placeholder: (__VLS_ctx.t('dashboard.props.textSizePlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_61));
        var __VLS_59;
        const __VLS_64 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
            label: (__VLS_ctx.t('dashboard.props.textWeight')),
        }));
        const __VLS_66 = __VLS_65({
            label: (__VLS_ctx.t('dashboard.props.textWeight')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
        __VLS_67.slots.default;
        const __VLS_68 = {}.MYInput;
        /** @type {[typeof __VLS_components.MYInput, ]} */ ;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
            modelValue: (__VLS_ctx.textWeight),
            placeholder: (__VLS_ctx.t('dashboard.props.textWeightPlaceholder')),
        }));
        const __VLS_70 = __VLS_69({
            modelValue: (__VLS_ctx.textWeight),
            placeholder: (__VLS_ctx.t('dashboard.props.textWeightPlaceholder')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        var __VLS_67;
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
            textContainer: textContainer,
            textColor: textColor,
            textSize: textSize,
            textWeight: textWeight,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
