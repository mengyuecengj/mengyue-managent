import { markRaw, ref, watch, onMounted } from 'vue';
const props = defineProps();
const borderRef = ref(null);
const keyRef = ref(0);
const rawComponent = markRaw(props.component);
const safeResize = () => {
    const comp = borderRef.value;
    if (!comp)
        return;
    if (typeof comp.resize === 'function') {
        comp.resize();
    }
    else if (typeof comp.initWH === 'function') {
        comp.initWH();
    }
};
onMounted(safeResize);
watch([() => props.width, () => props.height], safeResize);
watch(() => props.config, (newVal) => {
    console.log('config changed', newVal);
    keyRef.value++;
}, { deep: true });
// 监听颜色变化
watch(() => props.color, (newVal) => {
    if (newVal) {
        keyRef.value++;
    }
}, { deep: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "border-renderer" },
    ...{ style: ({
            width: props.width + 'px',
            height: props.height + 'px',
            backgroundColor: props.backgroundColor || 'transparent'
        }) },
});
const __VLS_0 = ((__VLS_ctx.rawComponent));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    key: (`${props.color?.join('') || 'default'}`),
    ref: "borderRef",
    width: (props.width),
    height: (props.height),
    ...(props.config),
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    key: (`${props.color?.join('') || 'default'}`),
    ref: "borderRef",
    width: (props.width),
    height: (props.height),
    ...(props.config),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.borderRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_6 = {};
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['border-renderer']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4, __VLS_7 = __VLS_6;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            borderRef: borderRef,
            rawComponent: rawComponent,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
