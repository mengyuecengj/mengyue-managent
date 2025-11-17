import { ref } from 'vue';
const __VLS_props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
});
const toggleFold = ref(true);
const emit = defineEmits();
const toggleClick = () => {
    toggleFold.value = !toggleFold.value;
    emit('toggleClick');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hamburger']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.toggleClick) },
    ...{ style: {} },
});
if (__VLS_ctx.toggleFold) {
    const __VLS_0 = {}.MYExpand;
    /** @type {[typeof __VLS_components.MYExpand, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        color: "var(--navbar-hamburger)",
        ...{ class: ({ 'is-active': __VLS_ctx.isActive }) },
    }));
    const __VLS_2 = __VLS_1({
        color: "var(--navbar-hamburger)",
        ...{ class: ({ 'is-active': __VLS_ctx.isActive }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else {
    const __VLS_4 = {}.MYFold;
    /** @type {[typeof __VLS_components.MYFold, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        color: "var(--navbar-hamburger)",
    }));
    const __VLS_6 = __VLS_5({
        color: "var(--navbar-hamburger)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
/** @type {__VLS_StyleScopedClasses['is-active']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            toggleFold: toggleFold,
            toggleClick: toggleClick,
        };
    },
    emits: {},
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
