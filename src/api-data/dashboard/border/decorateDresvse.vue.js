import BaseBorder from './BaseBorder.vue';
import { Decoration4 } from '@kjgl77/datav-vue3';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof BaseBorder, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BaseBorder, new BaseBorder({
    width: (__VLS_ctx.width),
    height: (__VLS_ctx.height),
    component: (__VLS_ctx.Decoration4),
    config: ({ reverse: true }),
}));
const __VLS_1 = __VLS_0({
    width: (__VLS_ctx.width),
    height: (__VLS_ctx.height),
    component: (__VLS_ctx.Decoration4),
    config: ({ reverse: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseBorder: BaseBorder,
            Decoration4: Decoration4,
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
