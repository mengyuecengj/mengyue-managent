import BaseBorder from './BaseBorder.vue';
import { BorderBox1 as DvBorderBox1 } from '@kjgl77/datav-vue3';
const rawDvBorderBox1 = markRaw(DvBorderBox1);
const props = defineProps();
const forceConfig = computed(() => {
    return {
        ...props.config,
        color: props.config?.color ? [...props.config.color] : ['#4fd2dd', '#235fa7'],
        backgroundColor: props.config?.backgroundColor || 'transparent'
    };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof BaseBorder, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BaseBorder, new BaseBorder({
    width: (props.width),
    height: (props.height),
    component: (__VLS_ctx.rawDvBorderBox1),
    config: (__VLS_ctx.forceConfig),
    key: (__VLS_ctx.forceConfig.color?.join('') || 'default'),
}));
const __VLS_1 = __VLS_0({
    width: (props.width),
    height: (props.height),
    component: (__VLS_ctx.rawDvBorderBox1),
    config: (__VLS_ctx.forceConfig),
    key: (__VLS_ctx.forceConfig.color?.join('') || 'default'),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseBorder: BaseBorder,
            rawDvBorderBox1: rawDvBorderBox1,
            forceConfig: forceConfig,
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
