import { isExternal } from '@/utils/validate';
const props = defineProps({
    to: {
        type: [String, Object],
        required: true
    }
});
const isExt = computed(() => {
    return isExternal(props.to);
});
const type = computed(() => {
    if (isExt.value) {
        return 'a';
    }
    return 'router-link';
});
function linkProps() {
    if (isExt.value) {
        return {
            href: props.to,
            target: '_blank',
            rel: 'noopener'
        };
    }
    return {
        to: props.to
    };
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = ((__VLS_ctx.type));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.linkProps()),
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.linkProps()),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            type: type,
            linkProps: linkProps,
        };
    },
    props: {
        to: {
            type: [String, Object],
            required: true
        }
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        to: {
            type: [String, Object],
            required: true
        }
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
