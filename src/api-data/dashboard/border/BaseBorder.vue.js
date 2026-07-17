import { watch, nextTick, ref, markRaw, onMounted } from 'vue';
const props = defineProps();
const borderRef = ref(null);
const key = ref(0); // 用于强制重新渲染
const rawComponent = markRaw(props.component);
// 尝试调用组件的各种更新方法
const updateComponent = () => {
    const comp = borderRef.value;
    if (!comp)
        return false;
    let updated = false;
    // 尝试调用各种可能的更新方法
    if (typeof comp.mergeConfig === 'function') {
        comp.mergeConfig(props.config || {});
        updated = true;
    }
    if (typeof comp.updateBegin === 'function') {
        comp.updateBegin();
        updated = true;
    }
    if (typeof comp.update === 'function') {
        comp.update();
        updated = true;
    }
    if (typeof comp.resize === 'function') {
        comp.resize();
        updated = true;
    }
    if (typeof comp.initWH === 'function') {
        comp.initWH();
        updated = true;
    }
    // 对于没有任何更新方法的组件，返回false表示需要强制重新渲染
    return updated;
};
// 处理配置变化
watch(() => props.config, async (newConfig) => {
    if (!newConfig)
        return;
    await nextTick();
    // 尝试更新组件
    const updated = updateComponent();
    // 如果组件没有提供更新方法，强制重新渲染
    if (!updated) {
        key.value += 1;
    }
}, { deep: true, immediate: true });
// 处理尺寸变化
watch([() => props.width, () => props.height], async () => {
    await nextTick();
    // 尝试更新组件
    const updated = updateComponent();
    // 如果组件没有提供更新方法，强制重新渲染
    if (!updated) {
        key.value += 1;
    }
}, { immediate: true });
// 组件挂载时初始化
onMounted(() => {
    nextTick(() => {
        updateComponent();
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "border-renderer" },
    ...{ style: ({ width: props.width + 'px', height: props.height + 'px' }) },
});
const __VLS_0 = ((__VLS_ctx.rawComponent));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    key: (__VLS_ctx.key),
    ref: "borderRef",
    ...(props.config || {}),
    width: (props.width),
    height: (props.height),
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    key: (__VLS_ctx.key),
    ref: "borderRef",
    ...(props.config || {}),
    width: (props.width),
    height: (props.height),
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
            key: key,
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
