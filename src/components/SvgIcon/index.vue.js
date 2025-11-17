const svgModules = import.meta.glob('@/assets/svg/*.svg', { eager: true });
const props = defineProps();
const svgClass = computed(() => `svg-icon ${props.className || ''}`.trim());
const iconComponent = computed(() => {
    const path = `/src/assets/svg/${props.iconClass}.svg`;
    return svgModules[path]?.default || null;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = ((__VLS_ctx.iconComponent));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (__VLS_ctx.svgClass) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: (__VLS_ctx.svgClass) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            svgClass: svgClass,
            iconComponent: iconComponent,
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
