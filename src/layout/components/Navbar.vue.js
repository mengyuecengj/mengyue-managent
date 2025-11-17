import { ElMessageBox } from 'element-plus';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import useAppStore from '@/store/modules/app';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';
import svgIcon from '@/components/SvgIcon/index.vue';
const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const router = useRouter();
function toggleSidebar() {
    appStore.toggleSidebar();
}
function handleCommand(command) {
    switch (command) {
        case "setLayout":
            setLayout();
            break;
        case "logout":
            logout();
            break;
    }
}
function logout() {
    ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        const currentPath = router.currentRoute.value.fullPath;
        userStore.logOut().then(() => {
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`); // encode 以防特殊字符
        });
    }).catch(() => { });
}
// 触发父组件事件
const emit = defineEmits(['setLayout']);
function setLayout() {
    emit('setLayout');
}
function toggleTheme() {
    settingsStore.toggleTheme();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "navbar" },
});
/** @type {[typeof Hamburger, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Hamburger, new Hamburger({
    ...{ 'onToggleClick': {} },
    id: "hamburger-container",
    isActive: (__VLS_ctx.appStore.sidebar.opened),
    ...{ class: "hamburger-container" },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onToggleClick': {} },
    id: "hamburger-container",
    isActive: (__VLS_ctx.appStore.sidebar.opened),
    ...{ class: "hamburger-container" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onToggleClick: (__VLS_ctx.toggleSidebar)
};
var __VLS_2;
if (!__VLS_ctx.settingsStore.topNav) {
    /** @type {[typeof Breadcrumb, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(Breadcrumb, new Breadcrumb({
        id: "breadcrumb-container",
        ...{ class: "breadcrumb-container" },
    }));
    const __VLS_8 = __VLS_7({
        id: "breadcrumb-container",
        ...{ class: "breadcrumb-container" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right-menu" },
});
if (__VLS_ctx.appStore.device !== 'mobile') {
    const __VLS_10 = {}.HeaderSearch;
    /** @type {[typeof __VLS_components.HeaderSearch, typeof __VLS_components.headerSearch, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        id: "header-search",
        ...{ class: "right-menu-item" },
    }));
    const __VLS_12 = __VLS_11({
        id: "header-search",
        ...{ class: "right-menu-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    /** @type {[typeof Screenfull, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(Screenfull, new Screenfull({
        id: "screenfull",
        ...{ class: "right-menu-item hover-effect" },
    }));
    const __VLS_15 = __VLS_14({
        id: "screenfull",
        ...{ class: "right-menu-item hover-effect" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.toggleTheme) },
        ...{ class: "right-menu-item hover-effect theme-switch-wrapper" },
    });
    if (__VLS_ctx.settingsStore.isDark) {
        /** @type {[typeof svgIcon, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(svgIcon, new svgIcon({
            iconClass: "sunny",
            ...{ style: {} },
        }));
        const __VLS_18 = __VLS_17({
            iconClass: "sunny",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    }
    else {
        /** @type {[typeof svgIcon, ]} */ ;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(svgIcon, new svgIcon({
            iconClass: "moon",
        }));
        const __VLS_21 = __VLS_20({
            iconClass: "moon",
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    }
    /** @type {[typeof SizeSelect, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(SizeSelect, new SizeSelect({
        id: "size-select",
    }));
    const __VLS_24 = __VLS_23({
        id: "size-select",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "avatar-container" },
});
const __VLS_26 = {}.MYDropdown;
/** @type {[typeof __VLS_components.MYDropdown, typeof __VLS_components.MYDropdown, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ...{ 'onCommand': {} },
    ...{ class: "right-menu-item" },
    trigger: "click",
    placement: "bottom-end",
    textColor: "var(--navbar-text)",
    backGroundColor: "var(--navbar-bg)",
    noCaret: true,
}));
const __VLS_28 = __VLS_27({
    ...{ 'onCommand': {} },
    ...{ class: "right-menu-item" },
    trigger: "click",
    placement: "bottom-end",
    textColor: "var(--navbar-text)",
    backGroundColor: "var(--navbar-bg)",
    noCaret: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_30;
let __VLS_31;
let __VLS_32;
const __VLS_33 = {
    onCommand: (__VLS_ctx.handleCommand)
};
__VLS_29.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_29.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.userStore.avatar),
        ...{ class: "user-avatar" },
    });
}
{
    const { dropdown: __VLS_thisSlot } = __VLS_29.slots;
    const __VLS_34 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        to: "/user/profile",
        ...{ class: "a_link" },
    }));
    const __VLS_36 = __VLS_35({
        to: "/user/profile",
        ...{ class: "a_link" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    __VLS_37.slots.default;
    const __VLS_38 = {}.MYDropdownItem;
    /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
    const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_41.slots.default;
    var __VLS_41;
    var __VLS_37;
    const __VLS_42 = {}.MYDropdownItem;
    /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
        divided: true,
        command: "logout",
    }));
    const __VLS_44 = __VLS_43({
        divided: true,
        command: "logout",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_45.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    var __VLS_45;
}
var __VLS_29;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-container']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumb-container']} */ ;
/** @type {__VLS_StyleScopedClasses['right-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['right-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['right-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['hover-effect']} */ ;
/** @type {__VLS_StyleScopedClasses['right-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['hover-effect']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-switch-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['right-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['user-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['a_link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Breadcrumb: Breadcrumb,
            Hamburger: Hamburger,
            Screenfull: Screenfull,
            SizeSelect: SizeSelect,
            svgIcon: svgIcon,
            appStore: appStore,
            userStore: userStore,
            settingsStore: settingsStore,
            toggleSidebar: toggleSidebar,
            handleCommand: handleCommand,
            toggleTheme: toggleTheme,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
; /* PartiallyEnd: #4569/main.vue */
