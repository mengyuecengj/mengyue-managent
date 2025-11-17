import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useAppStore from '@/store/modules/app';
import Sidebar from './components/Sidebar/index.vue';
import { Navbar, TagsView } from './components/index';
// import Settings from './components/Settings/index.vue'
const route = useRoute();
const appStore = useAppStore();
// 根据 route.meta.fullscreen 决定是否进入伪全屏分支
const isFullscreen = computed(() => !!route.meta?.fullscreen);
// 侧边栏开关与宽度（保持你原有逻辑）
const sidebarOpened = computed(() => appStore.sidebar.opened);
const sidebarWidth = computed(() => (sidebarOpened.value ? '220px' : '54px'));
// settings 抽屉显示控制
const showSettings = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.isFullscreen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "fullscreen-wrapper" },
    });
    const __VLS_0 = {}.MYMain;
    /** @type {[typeof __VLS_components.MYMain, typeof __VLS_components.MYMain, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "main-content main-content--fullscreen" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "main-content main-content--fullscreen" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    const __VLS_4 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
    const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
    {
        const { default: __VLS_thisSlot } = __VLS_7.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_8 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            name: "slide-fade",
            mode: "out-in",
        }));
        const __VLS_10 = __VLS_9({
            name: "slide-fade",
            mode: "out-in",
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        __VLS_11.slots.default;
        const __VLS_12 = ((Component));
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        var __VLS_11;
        __VLS_7.slots['' /* empty slot name completion */];
    }
    var __VLS_7;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layout-container" },
    });
    const __VLS_16 = {}.MYScroll;
    /** @type {[typeof __VLS_components.MYScroll, typeof __VLS_components.MYScroll, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ class: "layout-scrollbar" },
        thumbColor: "#454a58",
        thumbHoverColor: "#454a58",
        trackColor: "var(--track-color)",
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "layout-scrollbar" },
        thumbColor: "#454a58",
        thumbHoverColor: "#454a58",
        trackColor: "var(--track-color)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.MYAside;
    /** @type {[typeof __VLS_components.MYAside, typeof __VLS_components.MYAside, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ class: "aside" },
        ...{ class: ({ collapsed: !__VLS_ctx.sidebarOpened }) },
        width: (__VLS_ctx.sidebarWidth),
        height: "100vh",
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "aside" },
        ...{ class: ({ collapsed: !__VLS_ctx.sidebarOpened }) },
        width: (__VLS_ctx.sidebarWidth),
        height: "100vh",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    /** @type {[typeof Sidebar, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    var __VLS_23;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "content-wrapper" },
    });
    const __VLS_27 = {}.MYHeader;
    /** @type {[typeof __VLS_components.MYHeader, typeof __VLS_components.MYHeader, ]} */ ;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        ...{ class: "header" },
        height: "50px",
        fixed: true,
    }));
    const __VLS_29 = __VLS_28({
        ...{ class: "header" },
        height: "50px",
        fixed: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    __VLS_30.slots.default;
    const __VLS_31 = {}.Navbar;
    /** @type {[typeof __VLS_components.Navbar, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ 'onSetLayout': {} },
    }));
    const __VLS_33 = __VLS_32({
        ...{ 'onSetLayout': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    let __VLS_35;
    let __VLS_36;
    let __VLS_37;
    const __VLS_38 = {
        onSetLayout: (...[$event]) => {
            if (!!(__VLS_ctx.isFullscreen))
                return;
            __VLS_ctx.showSettings = true;
        }
    };
    var __VLS_34;
    var __VLS_30;
    const __VLS_39 = {}.TagsView;
    /** @type {[typeof __VLS_components.TagsView, ]} */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
        ...{ class: "tags-view" },
    }));
    const __VLS_41 = __VLS_40({
        ...{ class: "tags-view" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const __VLS_43 = {}.MYMain;
    /** @type {[typeof __VLS_components.MYMain, typeof __VLS_components.MYMain, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        ...{ class: "main-content" },
    }));
    const __VLS_45 = __VLS_44({
        ...{ class: "main-content" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    __VLS_46.slots.default;
    const __VLS_47 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({}));
    const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
    {
        const { default: __VLS_thisSlot } = __VLS_50.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_51 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
            name: "slide-fade",
            mode: "out-in",
        }));
        const __VLS_53 = __VLS_52({
            name: "slide-fade",
            mode: "out-in",
        }, ...__VLS_functionalComponentArgsRest(__VLS_52));
        __VLS_54.slots.default;
        const __VLS_55 = ((Component));
        // @ts-ignore
        const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
        const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
        var __VLS_54;
        __VLS_50.slots['' /* empty slot name completion */];
    }
    var __VLS_50;
    var __VLS_46;
    var __VLS_19;
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
            isFullscreen: isFullscreen,
            sidebarOpened: sidebarOpened,
            sidebarWidth: sidebarWidth,
            showSettings: showSettings,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
