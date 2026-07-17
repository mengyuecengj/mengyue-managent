import { MYInput, MYRate, MYSelect, MYOption, MYSwitch, MYCheckboxGroup, MYCheckbox, MYRadioGroup, MYRadio, MYButton, MYCollapse, MYCollapseItem, MYPickColor, MYSlidebar, MYPagination, MYBadge, MYProgress, MYTimeline, MYTimelineItem } from 'mengyue-plus';
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
    // select: MYSelect,
    // options: MYOption,
    // checkbox: MYCheckbox,
    // radio: MYRadio,
    button: MYButton,
    colorPicker: MYPickColor,
    slidebar: MYSlidebar,
    timeline: MYTimeline,
    timelineItem: MYTimelineItem
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
if (__VLS_ctx.config.type === 'select') {
    const __VLS_0 = {}.MYSelect;
    /** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
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
    __VLS_3.slots.default;
    for (const [option] of __VLS_getVForSourceType((__VLS_ctx.config.options.options))) {
        const __VLS_4 = {}.MYOption;
        /** @type {[typeof __VLS_components.MYOption, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            key: (option.value),
            label: (option.label),
            value: (option.value),
        }));
        const __VLS_6 = __VLS_5({
            key: (option.value),
            label: (option.label),
            value: (option.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    }
    var __VLS_3;
}
else if (__VLS_ctx.config.type === 'badge') {
    const __VLS_8 = {}.MYBadge;
    /** @type {[typeof __VLS_components.MYBadge, typeof __VLS_components.MYBadge, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
    }));
    const __VLS_10 = __VLS_9({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    const __VLS_12 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        size: "medium",
        type: "primary",
    }));
    const __VLS_14 = __VLS_13({
        size: "medium",
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    (__VLS_ctx.config.options.buttonText || '操作');
    var __VLS_15;
    var __VLS_11;
}
else if (__VLS_ctx.config.type === 'result') {
    const __VLS_16 = {}.MYResult;
    /** @type {[typeof __VLS_components.MYResult, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        icon: (__VLS_ctx.config.options.icon),
        key: (__VLS_ctx.config.options.icon),
    }));
    const __VLS_18 = __VLS_17({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        icon: (__VLS_ctx.config.options.icon),
        key: (__VLS_ctx.config.options.icon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
else if (__VLS_ctx.config.type === 'pagination') {
    const __VLS_20 = {}.MYPagination;
    /** @type {[typeof __VLS_components.MYPagination, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        key: (__VLS_ctx.config.id || __VLS_ctx.config.type + Number(__VLS_ctx.config.options.currentPage)),
        ...(__VLS_ctx.config.options),
        currentPage: (Number(__VLS_ctx.config.options.currentPage)),
        ...{ class: "custom-component" },
    }));
    const __VLS_22 = __VLS_21({
        key: (__VLS_ctx.config.id || __VLS_ctx.config.type + Number(__VLS_ctx.config.options.currentPage)),
        ...(__VLS_ctx.config.options),
        currentPage: (Number(__VLS_ctx.config.options.currentPage)),
        ...{ class: "custom-component" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
else if (__VLS_ctx.config.type === 'radio') {
    const __VLS_24 = {}.MYRadioGroup;
    /** @type {[typeof __VLS_components.MYRadioGroup, typeof __VLS_components.MYRadioGroup, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        modelValue: (__VLS_ctx.config.options.modelValue),
        size: (__VLS_ctx.config.options.size || 'default'),
        ...{ class: "custom-component" },
        direction: (__VLS_ctx.config.options.direction || 'horizontal'),
    }));
    const __VLS_26 = __VLS_25({
        modelValue: (__VLS_ctx.config.options.modelValue),
        size: (__VLS_ctx.config.options.size || 'default'),
        ...{ class: "custom-component" },
        direction: (__VLS_ctx.config.options.direction || 'horizontal'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.config.options.optionList))) {
        const __VLS_28 = {}.MYRadio;
        /** @type {[typeof __VLS_components.MYRadio, typeof __VLS_components.MYRadio, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            key: (item.value),
            value: (item.value),
            border: (__VLS_ctx.config.options.border),
        }));
        const __VLS_30 = __VLS_29({
            key: (item.value),
            value: (item.value),
            border: (__VLS_ctx.config.options.border),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        __VLS_31.slots.default;
        (item.label);
        var __VLS_31;
    }
    var __VLS_27;
}
else if (__VLS_ctx.config.type === 'border') {
    const __VLS_32 = {}.MYBorder;
    /** @type {[typeof __VLS_components.MYBorder, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
    }));
    const __VLS_34 = __VLS_33({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
}
else if (__VLS_ctx.config.type === 'timeline') {
    const __VLS_36 = {}.MYTimeline;
    /** @type {[typeof __VLS_components.MYTimeline, typeof __VLS_components.MYTimeline, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        timestamp: (__VLS_ctx.config.options.timestamp),
    }));
    const __VLS_38 = __VLS_37({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        timestamp: (__VLS_ctx.config.options.timestamp),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    if (__VLS_ctx.config.children && __VLS_ctx.config.children.length > 0) {
        for (const [child, index] of __VLS_getVForSourceType((__VLS_ctx.config.children))) {
            const __VLS_40 = {}.Renderer;
            /** @type {[typeof __VLS_components.Renderer, ]} */ ;
            // @ts-ignore
            const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
                key: (index),
                config: (child),
            }));
            const __VLS_42 = __VLS_41({
                key: (index),
                config: (child),
            }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        }
    }
    var __VLS_39;
}
else if (__VLS_ctx.config.type === 'checkbox') {
    const __VLS_44 = {}.MYCheckboxGroup;
    /** @type {[typeof __VLS_components.MYCheckboxGroup, typeof __VLS_components.MYCheckboxGroup, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        modelValue: (__VLS_ctx.config.options.modelValue),
        size: (__VLS_ctx.config.options.size || 'default'),
        ...{ class: "custom-component" },
        direction: (__VLS_ctx.config.options.direction || 'horizontal'),
        gap: (__VLS_ctx.config.options.gap),
    }));
    const __VLS_46 = __VLS_45({
        modelValue: (__VLS_ctx.config.options.modelValue),
        size: (__VLS_ctx.config.options.size || 'default'),
        ...{ class: "custom-component" },
        direction: (__VLS_ctx.config.options.direction || 'horizontal'),
        gap: (__VLS_ctx.config.options.gap),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.config.options.optionList))) {
        const __VLS_48 = {}.MYCheckbox;
        /** @type {[typeof __VLS_components.MYCheckbox, typeof __VLS_components.MYCheckbox, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            key: (item.value),
            value: (item.value),
            border: (__VLS_ctx.config.options.border),
        }));
        const __VLS_50 = __VLS_49({
            key: (item.value),
            value: (item.value),
            border: (__VLS_ctx.config.options.border),
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_51.slots.default;
        (item.label);
        var __VLS_51;
    }
    var __VLS_47;
}
else if (__VLS_ctx.config.type === 'checkbox') {
    const __VLS_52 = {}.MYCheckboxGroup;
    /** @type {[typeof __VLS_components.MYCheckboxGroup, typeof __VLS_components.MYCheckboxGroup, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        modelValue: (__VLS_ctx.config.options.modelValue),
        size: (__VLS_ctx.config.options.size || 'default'),
        ...{ class: "custom-component" },
        direction: (__VLS_ctx.config.options.direction || 'horizontal'),
        gap: (__VLS_ctx.config.options.gap),
    }));
    const __VLS_54 = __VLS_53({
        modelValue: (__VLS_ctx.config.options.modelValue),
        size: (__VLS_ctx.config.options.size || 'default'),
        ...{ class: "custom-component" },
        direction: (__VLS_ctx.config.options.direction || 'horizontal'),
        gap: (__VLS_ctx.config.options.gap),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.config.options.optionList))) {
        const __VLS_56 = {}.MYCheckbox;
        /** @type {[typeof __VLS_components.MYCheckbox, typeof __VLS_components.MYCheckbox, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            key: (item.value),
            value: (item.value),
            border: (__VLS_ctx.config.options.border),
        }));
        const __VLS_58 = __VLS_57({
            key: (item.value),
            value: (item.value),
            border: (__VLS_ctx.config.options.border),
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        __VLS_59.slots.default;
        (item.label);
        var __VLS_59;
    }
    var __VLS_55;
}
else if (__VLS_ctx.config.type === 'collapse') {
    const __VLS_60 = {}.MYCollapse;
    /** @type {[typeof __VLS_components.MYCollapse, typeof __VLS_components.MYCollapse, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...(__VLS_ctx.config.options),
        modelValue: (__VLS_ctx.config.options.modelValue),
        ...{ class: "custom-component" },
    }));
    const __VLS_62 = __VLS_61({
        ...(__VLS_ctx.config.options),
        modelValue: (__VLS_ctx.config.options.modelValue),
        ...{ class: "custom-component" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_63.slots.default;
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.config.children))) {
        const __VLS_64 = {}.MYCollapseItem;
        /** @type {[typeof __VLS_components.MYCollapseItem, typeof __VLS_components.MYCollapseItem, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
            key: (index),
            title: (item.options?.title || item.label),
            name: (item.options?.name || index.toString()),
        }));
        const __VLS_66 = __VLS_65({
            key: (index),
            title: (item.options?.title || item.label),
            name: (item.options?.name || index.toString()),
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
        __VLS_67.slots.default;
        if (item.children && item.children.length > 0) {
            for (const [child, childIndex] of __VLS_getVForSourceType((item.children))) {
                const __VLS_68 = {}.Renderer;
                /** @type {[typeof __VLS_components.Renderer, ]} */ ;
                // @ts-ignore
                const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
                    key: (childIndex),
                    config: (child),
                }));
                const __VLS_70 = __VLS_69({
                    key: (childIndex),
                    config: (child),
                }, ...__VLS_functionalComponentArgsRest(__VLS_69));
            }
        }
        else if (item.type === 'collapseItem' && !item.children) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            (item.content || '折叠内容');
        }
        var __VLS_67;
    }
    var __VLS_63;
}
if (__VLS_ctx.config.type === 'progress') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "progress-container" },
    });
    const __VLS_72 = {}.MYProgress;
    /** @type {[typeof __VLS_components.MYProgress, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        ...(__VLS_ctx.config.options),
        status: (__VLS_ctx.config.options.status),
        ...{ class: "custom-component" },
        ...{ style: {} },
    }));
    const __VLS_74 = __VLS_73({
        ...(__VLS_ctx.config.options),
        status: (__VLS_ctx.config.options.status),
        ...{ class: "custom-component" },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
}
else if (__VLS_ctx.config.type !== 'button') {
    const __VLS_76 = ((__VLS_ctx.myMap[__VLS_ctx.config.type]));
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        ...(__VLS_ctx.config.options),
        modelValue: (__VLS_ctx.config.options.modelValue),
        ...{ class: (`my-switch--${__VLS_ctx.config.options.size || 'medium'}`) },
        ...{ class: "custom-component" },
    }));
    const __VLS_78 = __VLS_77({
        ...(__VLS_ctx.config.options),
        modelValue: (__VLS_ctx.config.options.modelValue),
        ...{ class: (`my-switch--${__VLS_ctx.config.options.size || 'medium'}`) },
        ...{ class: "custom-component" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
}
else {
    const __VLS_80 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        ...{ style: (__VLS_ctx.getButtonStyle(__VLS_ctx.config.options)) },
    }));
    const __VLS_82 = __VLS_81({
        ...(__VLS_ctx.config.options),
        ...{ class: "custom-component" },
        ...{ style: (__VLS_ctx.getButtonStyle(__VLS_ctx.config.options)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    __VLS_83.slots.default;
    (__VLS_ctx.config.options.label || '按钮');
    var __VLS_83;
}
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['renderer-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-label']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-container']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-component']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            MYSelect: MYSelect,
            MYOption: MYOption,
            MYCheckboxGroup: MYCheckboxGroup,
            MYCheckbox: MYCheckbox,
            MYRadioGroup: MYRadioGroup,
            MYRadio: MYRadio,
            MYButton: MYButton,
            MYCollapse: MYCollapse,
            MYPagination: MYPagination,
            MYBadge: MYBadge,
            MYProgress: MYProgress,
            MYTimeline: MYTimeline,
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
