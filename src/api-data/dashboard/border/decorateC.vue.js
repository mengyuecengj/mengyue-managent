import BaseBorder from '@/api-data/dashboard/border/BaseBorder.vue';
import { Decoration3 } from '@kjgl77/datav-vue3';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    w50rem: true,
    h18rem: true,
    flex: true,
    'justify-center': true,
    'items-center': true,
    'bg-dark': true,
});
/** @type {[typeof BaseBorder, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BaseBorder, new BaseBorder({
    width: (props.width),
    height: (props.height),
    component: (__VLS_ctx.Decoration3),
}));
const __VLS_1 = __VLS_0({
    width: (props.width),
    height: (props.height),
    component: (__VLS_ctx.Decoration3),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseBorder: BaseBorder,
            Decoration3: Decoration3,
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
