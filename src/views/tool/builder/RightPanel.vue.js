import { useEditorStore } from '@/store/modules/editor';
import { propertiesConfig } from '@/api-data/builder/attribute';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const editorStore = useEditorStore();
const selectedBlock = computed(() => editorStore.selectedBlock);
const formModel = ref({});
const defaultValueStr = computed(() => {
    if (!selectedBlock.value?.options?.modelValue)
        return '';
    const val = selectedBlock.value.options.modelValue;
    return Array.isArray(val) ? val.join(',') : String(val);
});
const updateDefaultValue = (newVal) => {
    if (!selectedBlock.value)
        return;
    selectedBlock.value.options.modelValue = newVal;
};
const defaultValuePlaceholder = computed(() => t('system.builder.enterDefaultValue'));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
        label: (__VLS_ctx.t('system.builder.label')),
    }));
    const __VLS_6 = __VLS_5({
        label: (__VLS_ctx.t('system.builder.label')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        modelValue: (__VLS_ctx.selectedBlock.label),
        placeholder: (__VLS_ctx.t('system.builder.pleaseEnterLabel')),
    }));
    const __VLS_10 = __VLS_9({
        modelValue: (__VLS_ctx.selectedBlock.label),
        placeholder: (__VLS_ctx.t('system.builder.pleaseEnterLabel')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    var __VLS_7;
    for (const [prop] of __VLS_getVForSourceType((__VLS_ctx.propertiesConfig))) {
        const __VLS_12 = {}.MYFormItem;
        /** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            label: (__VLS_ctx.t(`system.builder.props.${prop.label}`) || prop.label),
        }));
        const __VLS_14 = __VLS_13({
            label: (__VLS_ctx.t(`system.builder.props.${prop.label}`) || prop.label),
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_15.slots.default;
        if (prop.type === 'input') {
            const __VLS_16 = {}.MYInput;
            /** @type {[typeof __VLS_components.MYInput, ]} */ ;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
                placeholder: (prop.placeholderKey ? __VLS_ctx.t(prop.placeholderKey) : (prop.placeholderKey || '')),
            }));
            const __VLS_18 = __VLS_17({
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
                placeholder: (prop.placeholderKey ? __VLS_ctx.t(prop.placeholderKey) : (prop.placeholderKey || '')),
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        }
        else if (prop.type === 'switch') {
            const __VLS_20 = {}.MYSwitch;
            /** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
                size: "small",
                modelValue: (__VLS_ctx.selectedBlock.options[prop.key]),
            }));
            const __VLS_22 = __VLS_21({
                size: "small",
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
                    label: (__VLS_ctx.t(opt.label) || opt.label),
                }));
                const __VLS_30 = __VLS_29({
                    key: (opt.value),
                    value: (opt.value),
                    label: (__VLS_ctx.t(opt.label) || opt.label),
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
        label: (__VLS_ctx.t('system.builder.defaultValue')),
    }));
    const __VLS_34 = __VLS_33({
        label: (__VLS_ctx.t('system.builder.defaultValue')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.MYInput;
    /** @type {[typeof __VLS_components.MYInput, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (__VLS_ctx.defaultValueStr),
        placeholder: (__VLS_ctx.defaultValuePlaceholder),
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (__VLS_ctx.defaultValueStr),
        placeholder: (__VLS_ctx.defaultValuePlaceholder),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    let __VLS_42;
    const __VLS_43 = {
        'onUpdate:modelValue': (__VLS_ctx.updateDefaultValue)
    };
    var __VLS_39;
    var __VLS_35;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-selection" },
    });
    const __VLS_44 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (__VLS_ctx.t('system.builder.noComponentSelected'));
    var __VLS_47;
}
/** @type {__VLS_StyleScopedClasses['right-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['no-selection']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            propertiesConfig: propertiesConfig,
            t: t,
            selectedBlock: selectedBlock,
            formModel: formModel,
            defaultValueStr: defaultValueStr,
            updateDefaultValue: updateDefaultValue,
            defaultValuePlaceholder: defaultValuePlaceholder,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
