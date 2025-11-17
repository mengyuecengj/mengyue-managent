import iFrame from '@/components/iFrame/index.vue';
const url = ref(import.meta.env.VITE_APP_BASE_API + '/druid/login.html');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof iFrame, typeof iFrame, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(iFrame, new iFrame({
    src: (__VLS_ctx.url),
}));
const __VLS_1 = __VLS_0({
    src: (__VLS_ctx.url),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            iFrame: iFrame,
            url: url,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
