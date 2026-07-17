import { useRoute, useRouter } from 'vue-router';
import { nextTick } from 'vue';
const route = useRoute();
const router = useRouter();
// 在 redirect 页面中解析参数并跳转
nextTick(() => {
    const { params, query } = route;
    let path = Array.isArray(params.path) ? params.path.join('/') : params.path;
    if (path && path.startsWith('/')) {
        router.replace({ path, query });
    }
    else {
        router.push('/');
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
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
