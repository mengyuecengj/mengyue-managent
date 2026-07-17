import { ref } from 'vue';
const props = defineProps({
    src: {
        type: String,
        default: '/'
    },
    iframeId: {
        type: String
    }
});
const height = ref(document.documentElement.clientHeight - 94.5 + 'px');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: ('height' + __VLS_ctx.height) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.iframe, __VLS_intrinsicElements.iframe)({
    id: (__VLS_ctx.iframeId),
    ...{ style: {} },
    src: (__VLS_ctx.src),
    frameborder: "no",
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            height: height,
        };
    },
    props: {
        src: {
            type: String,
            default: '/'
        },
        iframeId: {
            type: String
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        src: {
            type: String,
            default: '/'
        },
        iframeId: {
            type: String
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
