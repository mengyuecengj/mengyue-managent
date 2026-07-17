import { ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SettingsDrawer from "@/layout/components/Settings/index.vue";
import useAppStore from "@/store/modules/app";
import useUserStore from "@/store/modules/user";
import useSettingsStore from "@/store/modules/settings";
import svgIcon from "@/components/SvgIcon/index.vue";
const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const router = useRouter();
const showSettingsDrawer = ref(false);
/* i18n */
const { locale } = useI18n();
/* sidebar */
function toggleSidebar() {
    appStore.toggleSidebar();
}
/* dropdown command */
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
/* 退出登录 */
function logout() {
    ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
        const currentPath = router.currentRoute.value.fullPath;
        userStore.logOut().then(() => {
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        });
    })
        .catch(() => { });
}
/* 布局设置 */
function setLayout() {
    showSettingsDrawer.value = true;
}
/* 主题切换 */
function toggleTheme() {
    settingsStore.toggleTheme();
}
/* 🌐 切换语言 */
function changeLanguage(lang) {
    locale.value = lang;
    localStorage.setItem("lang", lang);
    // 强制刷新确保菜单/组件刷新
    location.reload();
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
if (__VLS_ctx.settingsStore.breadcrumb && !__VLS_ctx.settingsStore.topNav) {
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "right-menu-item hover-effect" },
    });
    const __VLS_23 = {}.MYDropdown;
    /** @type {[typeof __VLS_components.MYDropdown, typeof __VLS_components.MYDropdown, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        ...{ 'onCommand': {} },
        trigger: "click",
        placement: "bottom-end",
        textColor: "var(--navbar-text)",
        backgroundColor: "var(--navbar-bg) !important",
        noCaret: true,
    }));
    const __VLS_25 = __VLS_24({
        ...{ 'onCommand': {} },
        trigger: "click",
        placement: "bottom-end",
        textColor: "var(--navbar-text)",
        backgroundColor: "var(--navbar-bg) !important",
        noCaret: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    let __VLS_27;
    let __VLS_28;
    let __VLS_29;
    const __VLS_30 = {
        onCommand: (__VLS_ctx.changeLanguage)
    };
    __VLS_26.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_26.slots;
        const __VLS_31 = {}.MYText;
        /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            size: "16px",
            color: "var(--navbar-text)",
        }));
        const __VLS_33 = __VLS_32({
            size: "16px",
            color: "var(--navbar-text)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        __VLS_34.slots.default;
        var __VLS_34;
    }
    {
        const { dropdown: __VLS_thisSlot } = __VLS_26.slots;
        const __VLS_35 = {}.MYDropdownItem;
        /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            command: "zh-CN",
        }));
        const __VLS_37 = __VLS_36({
            command: "zh-CN",
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        __VLS_38.slots.default;
        var __VLS_38;
        const __VLS_39 = {}.MYDropdownItem;
        /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
            command: "en-US",
        }));
        const __VLS_41 = __VLS_40({
            command: "en-US",
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        __VLS_42.slots.default;
        var __VLS_42;
    }
    var __VLS_26;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "avatar-container" },
});
const __VLS_43 = {}.MYDropdown;
/** @type {[typeof __VLS_components.MYDropdown, typeof __VLS_components.MYDropdown, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    ...{ 'onCommand': {} },
    ...{ class: "right-menu-item" },
    trigger: "click",
    placement: "bottom-end",
    textColor: "var(--navbar-text)",
    backgroundColor: "var(--navbar-bg)",
    noCaret: true,
}));
const __VLS_45 = __VLS_44({
    ...{ 'onCommand': {} },
    ...{ class: "right-menu-item" },
    trigger: "click",
    placement: "bottom-end",
    textColor: "var(--navbar-text)",
    backgroundColor: "var(--navbar-bg)",
    noCaret: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_47;
let __VLS_48;
let __VLS_49;
const __VLS_50 = {
    onCommand: (__VLS_ctx.handleCommand)
};
__VLS_46.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_46.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.userStore.avatar),
        ...{ class: "user-avatar" },
    });
}
{
    const { dropdown: __VLS_thisSlot } = __VLS_46.slots;
    const __VLS_51 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        to: "/user/profile",
        ...{ class: "a_link" },
    }));
    const __VLS_53 = __VLS_52({
        to: "/user/profile",
        ...{ class: "a_link" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_54.slots.default;
    const __VLS_55 = {}.MYDropdownItem;
    /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
    const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
    __VLS_58.slots.default;
    (__VLS_ctx.$t('person.personCenter'));
    var __VLS_58;
    var __VLS_54;
    if (__VLS_ctx.settingsStore.showSettings) {
        const __VLS_59 = {}.MYDropdownItem;
        /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
            command: "setLayout",
        }));
        const __VLS_61 = __VLS_60({
            command: "setLayout",
        }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        __VLS_62.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.$t('person.layoutSettings'));
        var __VLS_62;
    }
    const __VLS_63 = {}.MYDropdownItem;
    /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        divided: true,
        command: "logout",
    }));
    const __VLS_65 = __VLS_64({
        divided: true,
        command: "logout",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_66.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('person.logout'));
    var __VLS_66;
}
var __VLS_46;
/** @type {[typeof SettingsDrawer, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(SettingsDrawer, new SettingsDrawer({
    modelValue: (__VLS_ctx.showSettingsDrawer),
}));
const __VLS_68 = __VLS_67({
    modelValue: (__VLS_ctx.showSettingsDrawer),
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
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
/** @type {__VLS_StyleScopedClasses['right-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['hover-effect']} */ ;
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
            SettingsDrawer: SettingsDrawer,
            svgIcon: svgIcon,
            appStore: appStore,
            userStore: userStore,
            settingsStore: settingsStore,
            showSettingsDrawer: showSettingsDrawer,
            toggleSidebar: toggleSidebar,
            handleCommand: handleCommand,
            toggleTheme: toggleTheme,
            changeLanguage: changeLanguage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
