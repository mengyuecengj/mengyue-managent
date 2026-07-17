const props = defineProps({
    src: {
        type: String,
        required: true
    }
});
const height = ref(document.documentElement.clientHeight - 94.5 + "px;");
const loading = ref(true);
const url = computed(() => props.src);
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 300);
    window.onresize = function temp() {
        height.value = document.documentElement.clientHeight - 94.5 + "px;";
    };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: ('height:' + __VLS_ctx.height) },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.iframe)({
    src: (__VLS_ctx.url),
    frameborder: "no",
    ...{ style: {} },
    scrolling: "auto",
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            height: height,
            loading: loading,
            url: url,
        };
    },
    props: {
        src: {
            type: String,
            required: true
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
            required: true
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
