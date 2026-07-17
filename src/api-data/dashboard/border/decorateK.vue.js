import { ref, onMounted, onUnmounted } from 'vue';
const containerRef = ref(null);
const scale = ref(1);
let resizeObserver = null;
const updateScale = () => {
    if (!containerRef.value)
        return;
    const { width, height } = containerRef.value.getBoundingClientRect();
    const baseSize = 150; // 原始尺寸
    const targetSize = Math.min(width, height);
    // 计算缩放比例，保持1:1宽高比
    scale.value = targetSize / baseSize;
};
onMounted(() => {
    if (containerRef.value) {
        // 初始化尺寸
        updateScale();
        // 监听尺寸变化
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(updateScale);
            resizeObserver.observe(containerRef.value);
        }
        else {
            window.addEventListener('resize', updateScale);
        }
    }
});
onUnmounted(() => {
    if (resizeObserver && containerRef.value) {
        resizeObserver.unobserve(containerRef.value);
        resizeObserver.disconnect();
    }
    else {
        window.removeEventListener('resize', updateScale);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "containerRef",
    ...{ class: "decoration-container" },
    'small-bg': true,
});
/** @type {typeof __VLS_ctx.containerRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "decoration-wrapper" },
    ...{ style: ({ transform: `scale(${__VLS_ctx.scale})` }) },
});
const __VLS_0 = {}.DvDecoration12;
/** @type {[typeof __VLS_components.DvDecoration12, typeof __VLS_components.dvDecoration12, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['decoration-container']} */ ;
/** @type {__VLS_StyleScopedClasses['decoration-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            containerRef: containerRef,
            scale: scale,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
