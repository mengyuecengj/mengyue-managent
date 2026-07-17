const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-renderer" },
    ...{ style: ({
            width: __VLS_ctx.width + 'px',
            height: __VLS_ctx.height + 'px',
            display: 'flex',
            alignItems: __VLS_ctx.config.alignItems || 'center',
            justifyContent: __VLS_ctx.config.justifyContent || 'center',
            backgroundColor: __VLS_ctx.config.backgroundColor || 'transparent',
            padding: __VLS_ctx.config.padding || '10px'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-content" },
    ...{ style: ({
            fontSize: __VLS_ctx.config.fontSize + 'px',
            color: __VLS_ctx.config.color,
            fontWeight: __VLS_ctx.config.fontWeight,
            textAlign: __VLS_ctx.config.textAlign,
            lineHeight: __VLS_ctx.config.lineHeight,
            whiteSpace: 'pre-wrap'
        }) },
});
(__VLS_ctx.config.text || '请设置文本内容');
/** @type {__VLS_StyleScopedClasses['text-renderer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
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
