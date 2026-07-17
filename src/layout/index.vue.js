import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import useAppStore from '@/store/modules/app';
import Sidebar from './components/Sidebar/index.vue';
import { Navbar, TagsView } from './components/index';
import useSettingStore from '@/store/modules/settings';
const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingStore();
const isNoLayoutRoute = computed(() => route.meta?.noLayout === true);
const isFullscreen = computed(() => !!route.meta?.fullscreen);
const sidebarOpened = computed(() => appStore.sidebar.opened);
const sidebarWidth = computed(() => sidebarOpened.value ? '220px' : '54px');
const showSettings = ref(false);
/* =============================
   新增：布局模式 class 控制
   ============================= */
const layoutClasses = computed(() => {
    return {
        'compact-mode': settingsStore.compactMode,
        'shadow-mode': settingsStore.enableShadow,
        'radius-mode': settingsStore.enableRadius
    };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.isNoLayoutRoute) {
    const __VLS_0 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    {
        const { default: __VLS_thisSlot } = __VLS_3.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_4 = ((Component));
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
        const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_3.slots['' /* empty slot name completion */];
    }
    var __VLS_3;
}
else if (__VLS_ctx.isFullscreen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "fullscreen-wrapper" },
        ...{ class: (__VLS_ctx.layoutClasses) },
    });
    const __VLS_8 = {}.MYMain;
    /** @type {[typeof __VLS_components.MYMain, typeof __VLS_components.MYMain, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "main-content main-content--fullscreen" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "main-content main-content--fullscreen" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    const __VLS_12 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    {
        const { default: __VLS_thisSlot } = __VLS_15.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        if (__VLS_ctx.settingsStore.pageAnimation) {
            const __VLS_16 = {}.transition;
            /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                name: "slide-fade",
                mode: "out-in",
            }));
            const __VLS_18 = __VLS_17({
                name: "slide-fade",
                mode: "out-in",
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            __VLS_19.slots.default;
            const __VLS_20 = ((Component));
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
            const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
            var __VLS_19;
        }
        else {
            const __VLS_24 = ((Component));
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
            const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
        }
        __VLS_15.slots['' /* empty slot name completion */];
    }
    var __VLS_15;
    var __VLS_11;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layout-container" },
        ...{ class: (__VLS_ctx.layoutClasses) },
    });
    const __VLS_28 = {}.MYScroll;
    /** @type {[typeof __VLS_components.MYScroll, typeof __VLS_components.MYScroll, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ class: "layout-scrollbar" },
        thumbColor: "#454a58",
        thumbHoverColor: "#454a58",
        trackColor: "var(--track-color)",
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "layout-scrollbar" },
        thumbColor: "#454a58",
        thumbHoverColor: "#454a58",
        trackColor: "var(--track-color)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    const __VLS_32 = {}.MYAside;
    /** @type {[typeof __VLS_components.MYAside, typeof __VLS_components.MYAside, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ class: "aside" },
        ...{ class: ({ collapsed: !__VLS_ctx.sidebarOpened }) },
        width: (__VLS_ctx.sidebarWidth),
        height: "100vh",
    }));
    const __VLS_34 = __VLS_33({
        ...{ class: "aside" },
        ...{ class: ({ collapsed: !__VLS_ctx.sidebarOpened }) },
        width: (__VLS_ctx.sidebarWidth),
        height: "100vh",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    /** @type {[typeof Sidebar, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
    const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
    var __VLS_35;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "content-wrapper" },
    });
    const __VLS_39 = {}.MYHeader;
    /** @type {[typeof __VLS_components.MYHeader, typeof __VLS_components.MYHeader, ]} */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
        ...{ class: "header" },
        height: "50px",
        fixed: true,
    }));
    const __VLS_41 = __VLS_40({
        ...{ class: "header" },
        height: "50px",
        fixed: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    __VLS_42.slots.default;
    const __VLS_43 = {}.Navbar;
    /** @type {[typeof __VLS_components.Navbar, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        ...{ 'onSetLayout': {} },
    }));
    const __VLS_45 = __VLS_44({
        ...{ 'onSetLayout': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    let __VLS_47;
    let __VLS_48;
    let __VLS_49;
    const __VLS_50 = {
        onSetLayout: (...[$event]) => {
            if (!!(__VLS_ctx.isNoLayoutRoute))
                return;
            if (!!(__VLS_ctx.isFullscreen))
                return;
            __VLS_ctx.showSettings = true;
        }
    };
    var __VLS_46;
    var __VLS_42;
    const __VLS_51 = {}.TagsView;
    /** @type {[typeof __VLS_components.TagsView, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        ...{ class: "tags-view" },
    }));
    const __VLS_53 = __VLS_52({
        ...{ class: "tags-view" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.settingsStore.tagsView) }, null, null);
    const __VLS_55 = {}.MYMain;
    /** @type {[typeof __VLS_components.MYMain, typeof __VLS_components.MYMain, ]} */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        ...{ class: "main-content" },
    }));
    const __VLS_57 = __VLS_56({
        ...{ class: "main-content" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    __VLS_58.slots.default;
    const __VLS_59 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({}));
    const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
    {
        const { default: __VLS_thisSlot } = __VLS_62.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        if (__VLS_ctx.settingsStore.pageAnimation) {
            const __VLS_63 = {}.transition;
            /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
            // @ts-ignore
            const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
                name: "slide-fade",
                mode: "out-in",
            }));
            const __VLS_65 = __VLS_64({
                name: "slide-fade",
                mode: "out-in",
            }, ...__VLS_functionalComponentArgsRest(__VLS_64));
            __VLS_66.slots.default;
            const __VLS_67 = ((Component));
            // @ts-ignore
            const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
            const __VLS_69 = __VLS_68({}, ...__VLS_functionalComponentArgsRest(__VLS_68));
            var __VLS_66;
        }
        else {
            const __VLS_71 = ((Component));
            // @ts-ignore
            const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({}));
            const __VLS_73 = __VLS_72({}, ...__VLS_functionalComponentArgsRest(__VLS_72));
        }
        __VLS_62.slots['' /* empty slot name completion */];
    }
    var __VLS_62;
    var __VLS_58;
    var __VLS_31;
}
/** @type {__VLS_StyleScopedClasses['fullscreen-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content--fullscreen']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-scrollbar']} */ ;
/** @type {__VLS_StyleScopedClasses['aside']} */ ;
/** @type {__VLS_StyleScopedClasses['collapsed']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['tags-view']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Sidebar: Sidebar,
            Navbar: Navbar,
            TagsView: TagsView,
            settingsStore: settingsStore,
            isNoLayoutRoute: isNoLayoutRoute,
            isFullscreen: isFullscreen,
            sidebarOpened: sidebarOpened,
            sidebarWidth: sidebarWidth,
            showSettings: showSettings,
            layoutClasses: layoutClasses,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
