import logo from '@/assets/images/gou.png';
import useSettingsStore from '@/store/modules/settings';
const __VLS_props = defineProps({
    collapse: {
        type: Boolean,
        required: true
    }
});
const title = import.meta.env.VITE_APP_TITLE;
const settingsStore = useSettingsStore();
const sideTheme = computed(() => settingsStore.sideTheme);
// 修复后的计算属性
const getLogoBackground = computed(() => {
    if (settingsStore.isDark) {
        return 'var(--sidebar-bg)';
    }
    return sideTheme.value === 'theme-dark'
        ? 'var(--menu-bg)' // 替换 variables.menuBg
        : 'var(--menu-light-bg)'; // 替换 variables.menuLightBg
});
const getLogoTextColor = computed(() => {
    if (settingsStore.isDark) {
        return 'var(--sidebar-logo-text)';
    }
    return sideTheme.value === 'theme-dark'
        ? '#fff' // 保持白色（深色主题下 Logo 文字需高对比度）
        : 'var(--menu-light-text)'; // 替换 variables.menuLightText
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sidebar-logo']} */ ;
// CSS variable injection 
__VLS_ctx.getLogoBackground;
__VLS_ctx.getLogoTextColor;
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-logo-container" },
    ...{ class: ({ 'collapse': __VLS_ctx.collapse }) },
});
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "sidebarLogoFade",
}));
const __VLS_2 = __VLS_1({
    name: "sidebarLogoFade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.collapse) {
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: "collapse",
        ...{ class: "sidebar-logo-link" },
        to: "/",
    }));
    const __VLS_6 = __VLS_5({
        key: "collapse",
        ...{ class: "sidebar-logo-link" },
        to: "/",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    if (__VLS_ctx.logo) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (__VLS_ctx.logo),
            ...{ class: "sidebar-logo" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
            ...{ class: "sidebar-title" },
        });
        (__VLS_ctx.title);
    }
    var __VLS_7;
}
else {
    const __VLS_8 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        key: "expand",
        ...{ class: "sidebar-logo-link" },
        to: "/",
    }));
    const __VLS_10 = __VLS_9({
        key: "expand",
        ...{ class: "sidebar-logo-link" },
        to: "/",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    if (__VLS_ctx.logo) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (__VLS_ctx.logo),
            ...{ class: "sidebar-logo" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "sidebar-title" },
    });
    (__VLS_ctx.title);
    var __VLS_11;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['sidebar-logo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-title']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            logo: logo,
            title: title,
            getLogoBackground: getLogoBackground,
            getLogoTextColor: getLogoTextColor,
        };
    },
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
