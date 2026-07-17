import BarChartRenderer from '@/components/dashboard/renderers/BarChartRenderer.vue';
const props = defineProps();
const rendererMap = {
    'basic-bar': BarChartRenderer,
    'horizontal-bar': BarChartRenderer,
    'stacked-bar': BarChartRenderer,
    'capsule-bar': BarChartRenderer,
    'line-bar': BarChartRenderer,
    'percent-bar': BarChartRenderer
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-renderer" },
});
for (const [block] of __VLS_getVForSourceType((__VLS_ctx.blocks))) {
    const __VLS_0 = ((__VLS_ctx.rendererMap[block.type]));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (block.id),
        config: (block.config),
        ...{ class: "renderer-item" },
    }));
    const __VLS_2 = __VLS_1({
        key: (block.id),
        config: (block.config),
        ...{ class: "renderer-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
/** @type {__VLS_StyleScopedClasses['dashboard-renderer']} */ ;
/** @type {__VLS_StyleScopedClasses['renderer-item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            rendererMap: rendererMap,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
