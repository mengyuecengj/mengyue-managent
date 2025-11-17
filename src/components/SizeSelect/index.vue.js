import useAppStore from "@/store/modules/app";
import modal from "@/plugins/modal";
const appStore = useAppStore();
const size = computed(() => appStore.size);
const sizeOptions = ref([
    { label: "较大", value: "large" },
    { label: "默认", value: "default" },
    { label: "稍小", value: "small" },
]);
function handleSetSize(size) {
    modal.loading("正在设置布局大小，请稍候...");
    appStore.setSize(size);
    setTimeout("window.location.reload()", 1000);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.MYDropdown;
/** @type {[typeof __VLS_components.MYDropdown, typeof __VLS_components.MYDropdown, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onCommand': {} },
    trigger: "click",
    ...{ class: "size-dropdown" },
    noCaret: true,
    textColor: "var(--navbar-text)",
    backGroundColor: "var(--navbar-bg)",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onCommand': {} },
    trigger: "click",
    ...{ class: "size-dropdown" },
    noCaret: true,
    textColor: "var(--navbar-text)",
    backGroundColor: "var(--navbar-bg)",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onCommand: (__VLS_ctx.handleSetSize)
};
var __VLS_8 = {};
__VLS_3.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_9 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        iconClass: "size",
        ...{ class: "size-icon" },
    }));
    const __VLS_11 = __VLS_10({
        iconClass: "size",
        ...{ class: "size-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
{
    const { dropdown: __VLS_thisSlot } = __VLS_3.slots;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.sizeOptions))) {
        const __VLS_13 = {}.MYDropdownItem;
        /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            key: (item.value),
            disabled: (__VLS_ctx.size === item.value),
            command: (item.value),
        }));
        const __VLS_15 = __VLS_14({
            key: (item.value),
            disabled: (__VLS_ctx.size === item.value),
            command: (item.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        __VLS_16.slots.default;
        (item.label);
        var __VLS_16;
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['size-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['size-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            size: size,
            sizeOptions: sizeOptions,
            handleSetSize: handleSetSize,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
