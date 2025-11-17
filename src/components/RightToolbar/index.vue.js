import { ref, computed, watch } from 'vue';
const props = defineProps();
const emit = defineEmits();
// 响应式变量
const isChecked = ref(false);
const isIndeterminate = ref(false);
const value = ref([]);
const open = ref(false);
const title = ref('列设置');
// 转换 columns 为 transfer 所需格式
const transferData = computed(() => {
    return (props.columns || []).map(col => ({
        key: col.key,
        label: col.label,
        disabled: false
    }));
});
// 监听 columns 变化
watch(() => props.columns, (newColumns) => {
    if (newColumns && newColumns.length) {
        isChecked.value = newColumns.every((col) => col.visible);
        isIndeterminate.value =
            newColumns.some((col) => col.visible) &&
                !newColumns.every((col) => col.visible);
        value.value = newColumns
            .filter(col => !col.visible)
            .map(col => col.key);
    }
    else {
        isChecked.value = false;
        isIndeterminate.value = false;
        value.value = [];
    }
}, { immediate: true });
const toggleSearch = () => {
    emit('update:showSearch', !props.showSearch);
};
const refresh = () => {
    emit('queryTable');
};
const showColumn = () => {
    open.value = true;
    title.value = '列设置';
};
const toggleCheckAll = (val) => {
    if (props.columns) {
        props.columns.forEach((col) => {
            col.visible = !!val;
        });
    }
    isIndeterminate.value = false;
};
const checkboxChange = (val, key) => {
    if (props.columns) {
        const targetCol = props.columns.find(col => col.key === key);
        if (targetCol) {
            targetCol.visible = !!val;
        }
        const checkedCount = props.columns.filter((col) => col.visible).length;
        isChecked.value = checkedCount === props.columns.length;
        isIndeterminate.value =
            checkedCount > 0 && checkedCount < props.columns.length;
    }
};
const dataChange = (newModelValue) => {
    if (props.columns) {
        props.columns.forEach((col) => {
            col.visible = !newModelValue.includes(col.key);
        });
        value.value = newModelValue;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-right-btn" },
});
const __VLS_0 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    circle: true,
    type: "primary",
    plain: true,
    icon: "MYLoadingA",
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    circle: true,
    type: "primary",
    plain: true,
    icon: "MYLoadingA",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.refresh();
    }
};
var __VLS_3;
if (__VLS_ctx.showColumnsType === 'transfer') {
    const __VLS_8 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        size: "small",
        circle: true,
        icon: "Menu",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        size: "small",
        circle: true,
        icon: "Menu",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.showColumnsType === 'transfer'))
                return;
            __VLS_ctx.showColumn();
        }
    };
    var __VLS_11;
}
else if (__VLS_ctx.showColumnsType === 'checkbox') {
    const __VLS_16 = {}.MYDropdown;
    /** @type {[typeof __VLS_components.MYDropdown, typeof __VLS_components.MYDropdown, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        trigger: "click",
        hideOnClick: (false),
        ...{ style: {} },
    }));
    const __VLS_18 = __VLS_17({
        trigger: "click",
        hideOnClick: (false),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        circle: true,
    }));
    const __VLS_22 = __VLS_21({
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    const __VLS_24 = {}.MYOdometer;
    /** @type {[typeof __VLS_components.MYOdometer, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_23;
    {
        const { dropdown: __VLS_thisSlot } = __VLS_19.slots;
        const __VLS_28 = {}.MYDropdownMenu;
        /** @type {[typeof __VLS_components.MYDropdownMenu, typeof __VLS_components.MYDropdownMenu, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
        const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
        __VLS_31.slots.default;
        const __VLS_32 = {}.MYDropdownItem;
        /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
        const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
        __VLS_35.slots.default;
        const __VLS_36 = {}.MYCheckbox;
        /** @type {[typeof __VLS_components.MYCheckbox, typeof __VLS_components.MYCheckbox, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
            ...{ 'onChange': {} },
            indeterminate: (__VLS_ctx.isIndeterminate),
            checked: (__VLS_ctx.isChecked),
        }));
        const __VLS_38 = __VLS_37({
            ...{ 'onChange': {} },
            indeterminate: (__VLS_ctx.isIndeterminate),
            checked: (__VLS_ctx.isChecked),
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        let __VLS_40;
        let __VLS_41;
        let __VLS_42;
        const __VLS_43 = {
            onChange: (__VLS_ctx.toggleCheckAll)
        };
        __VLS_39.slots.default;
        var __VLS_39;
        var __VLS_35;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "check-line" },
        });
        for (const [col] of __VLS_getVForSourceType((__VLS_ctx.columns))) {
            const __VLS_44 = {}.MYDropdownItem;
            /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
            // @ts-ignore
            const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
            const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
            __VLS_47.slots.default;
            const __VLS_48 = {}.MYCheckbox;
            /** @type {[typeof __VLS_components.MYCheckbox, typeof __VLS_components.MYCheckbox, ]} */ ;
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
                ...{ 'onChange': {} },
                checked: (col.visible),
            }));
            const __VLS_50 = __VLS_49({
                ...{ 'onChange': {} },
                checked: (col.visible),
            }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            let __VLS_52;
            let __VLS_53;
            let __VLS_54;
            const __VLS_55 = {
                onChange: ((val) => __VLS_ctx.checkboxChange(val, col.key))
            };
            __VLS_51.slots.default;
            (col.label);
            var __VLS_51;
            var __VLS_47;
        }
        var __VLS_31;
    }
    var __VLS_19;
}
else {
    const __VLS_56 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        ...{ 'onClick': {} },
        circle: true,
        type: "info",
        plain: true,
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onClick': {} },
        circle: true,
        type: "info",
        plain: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_60;
    let __VLS_61;
    let __VLS_62;
    const __VLS_63 = {
        onClick: (...[$event]) => {
            if (!!(__VLS_ctx.showColumnsType === 'transfer'))
                return;
            if (!!(__VLS_ctx.showColumnsType === 'checkbox'))
                return;
            __VLS_ctx.showColumn();
        }
    };
    __VLS_59.slots.default;
    const __VLS_64 = {}.MYOdometerText;
    /** @type {[typeof __VLS_components.MYOdometerText, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        color: "var(--general)",
    }));
    const __VLS_66 = __VLS_65({
        color: "var(--general)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    var __VLS_59;
}
const __VLS_68 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    title: "列展示",
    modelValue: (__VLS_ctx.open),
    width: "600px",
    height: "600px",
    backgroundColor: "#0F1115",
    showClose: (false),
    appendToBody: true,
}));
const __VLS_70 = __VLS_69({
    title: "列展示",
    modelValue: (__VLS_ctx.open),
    width: "600px",
    height: "600px",
    backgroundColor: "#0F1115",
    showClose: (false),
    appendToBody: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_71.slots.default;
const __VLS_72 = {}.MYTransfer;
/** @type {[typeof __VLS_components.MYTransfer, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onUpdate:modelValue': {} },
    titles: (['显示', '隐藏']),
    modelValue: (__VLS_ctx.value),
    data: (__VLS_ctx.transferData),
    hoverBackground: "transparent",
    colorText: "var(--general)",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onUpdate:modelValue': {} },
    titles: (['显示', '隐藏']),
    modelValue: (__VLS_ctx.value),
    data: (__VLS_ctx.transferData),
    hoverBackground: "transparent",
    colorText: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    'onUpdate:modelValue': (__VLS_ctx.dataChange)
};
var __VLS_75;
var __VLS_71;
/** @type {__VLS_StyleScopedClasses['top-right-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['check-line']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            isChecked: isChecked,
            isIndeterminate: isIndeterminate,
            value: value,
            open: open,
            transferData: transferData,
            refresh: refresh,
            showColumn: showColumn,
            toggleCheckAll: toggleCheckAll,
            checkboxChange: checkboxChange,
            dataChange: dataChange,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
