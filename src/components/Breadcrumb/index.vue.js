debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['my-breadcrumb-separator']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.MYBreadcrumb;
/** @type {[typeof __VLS_components.MYBreadcrumb, typeof __VLS_components.MYBreadcrumb, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    separator: "/",
    ...{ class: "breadcrumb" },
}));
const __VLS_2 = __VLS_1({
    separator: "/",
    ...{ class: "breadcrumb" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.$route.matched))) {
    (item.path);
    if (item.meta.title) {
        const __VLS_5 = {}.MYBreadcrumbItem;
        /** @type {[typeof __VLS_components.MYBreadcrumbItem, typeof __VLS_components.MYBreadcrumbItem, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            ...{ class: "breadcrumb-item" },
        }));
        const __VLS_7 = __VLS_6({
            ...{ class: "breadcrumb-item" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        __VLS_8.slots.default;
        (item.meta.title);
        var __VLS_8;
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['breadcrumb']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumb-item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
