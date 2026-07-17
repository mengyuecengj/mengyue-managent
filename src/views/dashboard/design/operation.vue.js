import { useDashboardStore } from '@/store/modules/dashboard';
const dashboardStore = useDashboardStore();
const { screen, blocks, selectedId } = storeToRefs(dashboardStore);
const selectedBlock = computed(() => {
    return selectedId.value ? blocks.value.find(b => b.id === selectedId.value) : null;
});
watch(screen, (val) => {
    const canvas = document.querySelector('.canvas-placeholder');
    if (!canvas)
        return;
    canvas.style.backgroundColor = val.backgroundColor;
    canvas.style.backgroundImage = val.backgroundImage ? `url(${val.backgroundImage})` : 'none';
    canvas.style.backgroundSize = 'cover';
    canvas.style.backgroundPosition = 'center';
    canvas.style.width = `${val.width}px`;
    canvas.style.height = `${val.height}px`;
}, { deep: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "props-panel" },
});
if (!__VLS_ctx.selectedBlock) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "global-props" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "prop-group" },
    });
    const __VLS_0 = {}.MYForm;
    /** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "operation-list" },
        modelValue: (__VLS_ctx.screen),
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "operation-list" },
        modelValue: (__VLS_ctx.screen),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    const __VLS_4 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        label: (__VLS_ctx.$t('dashboard.operation.screenWidth')),
    }));
    const __VLS_6 = __VLS_5({
        label: (__VLS_ctx.$t('dashboard.operation.screenWidth')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        modelValue: (__VLS_ctx.screen.width),
        placeholder: (__VLS_ctx.$t('dashboard.operation.screenWidth')),
        type: "number",
    }));
    const __VLS_10 = __VLS_9({
        modelValue: (__VLS_ctx.screen.width),
        placeholder: (__VLS_ctx.$t('dashboard.operation.screenWidth')),
        type: "number",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    var __VLS_7;
    const __VLS_12 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        label: (__VLS_ctx.$t('dashboard.operation.screenHeight')),
    }));
    const __VLS_14 = __VLS_13({
        label: (__VLS_ctx.$t('dashboard.operation.screenHeight')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    const __VLS_16 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        modelValue: (__VLS_ctx.screen.height),
        placeholder: (__VLS_ctx.$t('dashboard.operation.screenHeight')),
        type: "number",
    }));
    const __VLS_18 = __VLS_17({
        modelValue: (__VLS_ctx.screen.height),
        placeholder: (__VLS_ctx.$t('dashboard.operation.screenHeight')),
        type: "number",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    var __VLS_15;
    const __VLS_20 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: (__VLS_ctx.$t('dashboard.operation.screenTitle')),
    }));
    const __VLS_22 = __VLS_21({
        label: (__VLS_ctx.$t('dashboard.operation.screenTitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    const __VLS_24 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        modelValue: (__VLS_ctx.screen.title),
        placeholder: (__VLS_ctx.$t('dashboard.operation.screenTitle')),
    }));
    const __VLS_26 = __VLS_25({
        modelValue: (__VLS_ctx.screen.title),
        placeholder: (__VLS_ctx.$t('dashboard.operation.screenTitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_23;
    const __VLS_28 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        label: (__VLS_ctx.$t('dashboard.operation.backgroundColor')),
    }));
    const __VLS_30 = __VLS_29({
        label: (__VLS_ctx.$t('dashboard.operation.backgroundColor')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    const __VLS_32 = {}.MYSelectColor;
    /** @type {[typeof __VLS_components.MYSelectColor, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        modelValue: (__VLS_ctx.screen.backgroundColor),
    }));
    const __VLS_34 = __VLS_33({
        modelValue: (__VLS_ctx.screen.backgroundColor),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    var __VLS_31;
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['props-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['global-props']} */ ;
/** @type {__VLS_StyleScopedClasses['prop-group']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-list']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            screen: screen,
            selectedBlock: selectedBlock,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
