import { MYInput, MYRate, MYSelect, MYOption, MYSwitch, MYCheckbox, MYRadio, MYButton, MYPickColor, MYSlidebar, MYPagination } from 'mengyue-plus';
import { useEditorStore } from '@/store/modules/editor';
import { computed } from 'vue';
const props = defineProps({
    config: {
        type: Object,
        required: true
    }
});
const editorStore = useEditorStore();
const onSelect = () => {
    editorStore.selectBlock(props.config);
};
const isActive = computed(() => editorStore.currentBlock === props.config);
// 如果 colorText/colorBg 不是 prop，而是 style，计算 style 对象
const getButtonStyle = (options) => {
    const style = {};
    if (options.colorText)
        style.color = options.colorText;
    if (options.colorBg)
        style.backgroundColor = options.colorBg;
    return style;
};
const myMap = {
    input: MYInput,
    rate: MYRate,
    switch: MYSwitch,
    select: MYSelect,
    options: MYOption,
    checkbox: MYCheckbox,
    // radioGroup: MYRadioGroup,
    radio: MYRadio,
    button: MYButton,
    colorPicker: MYPickColor,
    slidebar: MYSlidebar,
    pagination: MYPagination
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.onSelect) },
    ...{ class: ({ active: __VLS_ctx.isActive }) },
    ...{ class: "renderer-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "custom-label" },
    ...{ style: ({ width: __VLS_ctx.config.options.labelWidth || '100px' }) },
});
(__VLS_ctx.config.label);
if (__VLS_ctx.config.type !== 'button') {
    const __VLS_0 = ((__VLS_ctx.myMap[__VLS_ctx.config.type]));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...(__VLS_ctx.config.options),
        modelValue: (__VLS_ctx.config.options.modelValue),
        ...{ class: "custom-component" },
    }));
    const __VLS_2 = __VLS_1({
        ...(__VLS_ctx.config.options),
        modelValue: (__VLS_ctx.config.options.modelValue),
        ...{ class: "custom-component" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else {
    const __VLS_4 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        ...{ style: (__VLS_ctx.getButtonStyle(__VLS_ctx.config.options)) },
    }));
    const __VLS_6 = __VLS_5({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        ...{ style: (__VLS_ctx.getButtonStyle(__VLS_ctx.config.options)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    (__VLS_ctx.config.options.label || '按钮');
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['renderer-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-label']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            MYButton: MYButton,
            onSelect: onSelect,
            isActive: isActive,
            getButtonStyle: getButtonStyle,
            myMap: myMap,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
