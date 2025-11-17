import { propertiesConfig } from '@/data/builder/attribute';
import { useEditorStore } from '@/store/modules/editor';
const editorStore = useEditorStore();
const selectedBlock = computed(() => editorStore.selectedBlock);
const formModel = ref({});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right-panel" },
});
if (__VLS_ctx.selectedBlock) {
    const __VLS_0 = {}.MYForm;
    /** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "dialog_form" },
        modelValue: (__VLS_ctx.formModel),
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "dialog_form" },
        modelValue: (__VLS_ctx.formModel),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    const __VLS_4 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        label: "标题",
    }));
    const __VLS_6 = __VLS_5({
        label: "标题",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        placeholderColor: "var(--navbar-text)",
        textColor: "var(--navbar-text)",
        modelValue: (__VLS_ctx.selectedBlock.label),
        placeholder: "请输入标题",
    }));
    const __VLS_10 = __VLS_9({
        placeholderColor: "var(--navbar-text)",
        textColor: "var(--navbar-text)",
        modelValue: (__VLS_ctx.selectedBlock.label),
        placeholder: "请输入标题",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    var __VLS_7;
    for (const [prop] of __VLS_getVForSourceType((__VLS_ctx.propertiesConfig))) {
        const __VLS_12 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            label: (prop.label),
        }));
        const __VLS_14 = __VLS_13({
            label: (prop.label),
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_15.slots.default;
        if (prop.type === 'input') {
            const __VLS_16 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                placeholderColor: "var(--navbar-text)",
                textColor: "var(--navbar-text)",
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
                placeholder: (prop.placeholder),
                type: (prop.inputType || 'text'),
            }));
            const __VLS_18 = __VLS_17({
                placeholderColor: "var(--navbar-text)",
                textColor: "var(--navbar-text)",
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
                placeholder: (prop.placeholder),
                type: (prop.inputType || 'text'),
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        }
        else if (prop.type === 'switch') {
            const __VLS_20 = {}.MYSwitch;
            /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
            }));
            const __VLS_22 = __VLS_21({
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        }
        else if (prop.type === 'select') {
            const __VLS_24 = {}.MYSelect;
            /** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
            }));
            const __VLS_26 = __VLS_25({
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
            }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            __VLS_27.slots.default;
            for (const [opt] of __VLS_getVForSourceType((prop.options))) {
                const __VLS_28 = {}.MYOption;
                /** @type {[typeof __VLS_components.MYOption, ]} */ ;
                // @ts-ignore
                const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
                    key: (opt.value),
                    value: (opt.value),
                    label: (opt.label),
                }));
                const __VLS_30 = __VLS_29({
                    key: (opt.value),
                    value: (opt.value),
                    label: (opt.label),
                }, ...__VLS_functionalComponentArgsRest(__VLS_29));
            }
            var __VLS_27;
        }
        var __VLS_15;
    }
    const __VLS_32 = {}.MYFormItem;
    /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        label: "默认值",
    }));
    const __VLS_34 = __VLS_33({
        label: "默认值",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        placeholderColor: "var(--navbar-text)",
        textColor: "var(--navbar-text)",
        modelValue: (__VLS_ctx.selectedBlock.options.modelValue),
        placeholder: "请输入默认值",
    }));
    const __VLS_38 = __VLS_37({
        placeholderColor: "var(--navbar-text)",
        textColor: "var(--navbar-text)",
        modelValue: (__VLS_ctx.selectedBlock.options.modelValue),
        placeholder: "请输入默认值",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_35;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-selection" },
    });
    const __VLS_40 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
    const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    var __VLS_43;
}
/** @type {__VLS_StyleScopedClasses['right-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['no-selection']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            propertiesConfig: propertiesConfig,
            selectedBlock: selectedBlock,
            formModel: formModel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
