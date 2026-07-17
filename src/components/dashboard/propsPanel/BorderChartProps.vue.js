import { useDashboardStore } from '@/store/modules/dashboard';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const dashboardStore = useDashboardStore();
const selectedBlock = computed(() => {
    return dashboardStore.blocks.find(b => b.id === dashboardStore.selectedId);
});
const borderName = computed({
    get: () => selectedBlock.value?.name || '',
    set: (val) => {
        if (selectedBlock.value) {
            dashboardStore.renameBlock(selectedBlock.value.id, val);
        }
    }
});
const backgroundColor = computed({
    get: () => selectedBlock.value?.backgroundColor || '',
    set: (val) => {
        if (selectedBlock.value) {
            dashboardStore.updateBlock(selectedBlock.value.id, { backgroundColor: val });
        }
    }
});
const modelForm = reactive({});
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
        label: (__VLS_ctx.$t('dashboard.props.layerName')),
    }));
    const __VLS_18 = __VLS_17({
        label: (__VLS_ctx.$t('dashboard.props.layerName')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        modelValue: (__VLS_ctx.borderName),
        placeholder: (__VLS_ctx.t('dashboard.props.layerNamePlaceholder')),
    }));
    const __VLS_22 = __VLS_21({
        modelValue: (__VLS_ctx.borderName),
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
        label: (__VLS_ctx.t('dashboard.props.backgroundColor')),
    }));
    const __VLS_34 = __VLS_33({
        label: (__VLS_ctx.t('dashboard.props.backgroundColor')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        modelValue: (__VLS_ctx.backgroundColor),
        placeholder: (__VLS_ctx.t('dashboard.props.backgroundColorPlaceholder')),
    }));
    const __VLS_38 = __VLS_37({
        modelValue: (__VLS_ctx.backgroundColor),
        placeholder: (__VLS_ctx.t('dashboard.props.backgroundColorPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_35;
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
            selectedBlock: selectedBlock,
            borderName: borderName,
            backgroundColor: backgroundColor,
            modelForm: modelForm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
