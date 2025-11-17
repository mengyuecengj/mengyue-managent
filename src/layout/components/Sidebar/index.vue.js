import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import Logo from '@/layout/components/Sidebar/Logo.vue';
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import { isExternal } from '@/utils/validate';
const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const sidebarRouters = computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);
const isFullscreen = computed(() => !!route.meta.fullscreen);
// 替换原代码中的 variables.xxx 为 CSS 变量
const getMenuBackground = computed(() => settingsStore.isDark
    ? 'var(--sidebar-bg)'
    : sideTheme.value === 'theme-dark'
        ? 'var(--menu-bg)'
        : 'var(--menu-light-bg)');
const getMenuTextColor = computed(() => settingsStore.isDark
    ? 'var(--sidebar-logo-text)'
    : sideTheme.value === 'theme-dark'
        ? 'var(--menu-text)'
        : 'var(--menu-light-text)');
const activeMenu = computed(() => {
    const path = route.meta.activeMenu || route.path;
    return typeof path === 'string' ? (path.startsWith('/') ? path : `/${path}`) : '/';
});
// 默认展开的菜单
const defaultOpeneds = ref([]);
// 获取主菜单的索引（第一级菜单）
const getMainMenuIndex = (menuKey) => {
    // 主菜单的索引是单个数字，如 '2', '3', '4'
    const parts = menuKey.split('-');
    return parts[0]; // 返回第一级
};
// 加载保存的状态
const loadMenuState = () => {
    try {
        const savedOpeneds = localStorage.getItem('test_menu_openeds');
        if (savedOpeneds) {
            defaultOpeneds.value = JSON.parse(savedOpeneds);
        }
    }
    catch (error) {
        console.error('加载菜单状态失败:', error);
    }
};
// 保存状态
const saveMenuState = () => {
    try {
        localStorage.setItem('test_menu_openeds', JSON.stringify(defaultOpeneds.value));
    }
    catch (error) {
        console.error('保存菜单状态失败:', error);
    }
};
// 菜单展开事件处理 - 修复 unique-opened 逻辑
const handleMenuOpen = (key, keyPath) => {
    const mainMenuIndex = getMainMenuIndex(key);
    if (uniqueOpened.value) {
        // 在 unique-opened 模式下，关闭其他主菜单，只保留当前主菜单及其子菜单
        const newOpeneds = defaultOpeneds.value.filter(menuKey => {
            const currentMainMenu = getMainMenuIndex(menuKey);
            // 保留当前主菜单的所有子菜单，关闭其他主菜单
            return currentMainMenu === mainMenuIndex;
        });
        // 添加新展开的菜单
        if (!newOpeneds.includes(key)) {
            newOpeneds.push(key);
        }
        defaultOpeneds.value = newOpeneds;
    }
    else {
        // 非 unique-opened 模式，简单添加
        if (!defaultOpeneds.value.includes(key)) {
            defaultOpeneds.value.push(key);
        }
    }
    saveMenuState();
};
// 菜单关闭事件处理
const handleMenuClose = (key, keyPath) => {
    const index = defaultOpeneds.value.indexOf(key);
    if (index > -1) {
        defaultOpeneds.value.splice(index, 1);
        saveMenuState();
    }
};
// 菜单选择处理
function handleSelect(index, indexPath) {
    if (index === route.path)
        return;
    if (isExternal(index)) {
        window.open(index, '_blank');
        return;
    }
    // 在选择菜单时，确保其所有父级菜单都是展开状态
    const parentMenus = indexPath.slice(0, -1); // 移除最后一个元素（当前菜单）
    if (uniqueOpened.value) {
        // 在 unique-opened 模式下，只保留当前主菜单路径
        const mainMenuIndex = getMainMenuIndex(index);
        const currentMainMenuMenus = defaultOpeneds.value.filter(menuKey => getMainMenuIndex(menuKey) === mainMenuIndex);
        // 添加缺失的父级菜单
        parentMenus.forEach(menuKey => {
            if (!currentMainMenuMenus.includes(menuKey)) {
                currentMainMenuMenus.push(menuKey);
            }
        });
        defaultOpeneds.value = currentMainMenuMenus;
    }
    else {
        // 非 unique-opened 模式，简单添加父级菜单
        parentMenus.forEach(menuKey => {
            if (!defaultOpeneds.value.includes(menuKey)) {
                defaultOpeneds.value.push(menuKey);
            }
        });
    }
    saveMenuState();
    router.push(index).catch(err => {
        if (!err.message.includes('Avoided redundant navigation')) {
            console.error('导航错误:', err);
        }
    });
}
// 组件挂载时加载状态
onMounted(() => {
    loadMenuState();
});
// 确保 unique-opened 始终为 true
const uniqueOpened = computed(() => true);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sidebar-scrollbar']} */ ;
/** @type {__VLS_StyleScopedClasses['MYScrollbar__wrap']} */ ;
// CSS variable injection 
__VLS_ctx.getMenuBackground;
__VLS_ctx.getMenuBackground;
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ({ 'has-logo': __VLS_ctx.showLogo, hidden: __VLS_ctx.isFullscreen, 'is-collapse': __VLS_ctx.isCollapse }) },
    ...{ class: "sidebar-container" },
});
if (__VLS_ctx.showLogo) {
    /** @type {[typeof Logo, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Logo, new Logo({
        collapse: (__VLS_ctx.isCollapse),
    }));
    const __VLS_1 = __VLS_0({
        collapse: (__VLS_ctx.isCollapse),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
const __VLS_3 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
    ref: "scrollbarRef",
    ...{ class: "sidebar-scrollbar" },
    ScrollWidth: "8px",
    thumbColor: "#444a59",
    trackColor: "transparent",
}));
const __VLS_5 = __VLS_4({
    ref: "scrollbarRef",
    ...{ class: "sidebar-scrollbar" },
    ScrollWidth: "8px",
    thumbColor: "#444a59",
    trackColor: "transparent",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {typeof __VLS_ctx.scrollbarRef} */ ;
var __VLS_7 = {};
__VLS_6.slots.default;
const __VLS_9 = {}.MYMenu;
/** @type {[typeof __VLS_components.MYMenu, typeof __VLS_components.MYMenu, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onSelect': {} },
    ...{ 'onClose': {} },
    ...{ class: "" },
    defaultActive: __VLS_ctx.activeMenu,
    defaultOpeneds: (__VLS_ctx.defaultOpeneds),
    collapse: (__VLS_ctx.isCollapse),
    backgroundColor: (__VLS_ctx.getMenuBackground),
    textColor: (__VLS_ctx.getMenuTextColor),
    uniqueOpened: (true),
    activeTextColor: (__VLS_ctx.theme),
    collapseTransition: (false),
    mode: "vertical",
    ...{ class: (__VLS_ctx.sideTheme) },
}));
const __VLS_11 = __VLS_10({
    ...{ 'onSelect': {} },
    ...{ 'onClose': {} },
    ...{ class: "" },
    defaultActive: __VLS_ctx.activeMenu,
    defaultOpeneds: (__VLS_ctx.defaultOpeneds),
    collapse: (__VLS_ctx.isCollapse),
    backgroundColor: (__VLS_ctx.getMenuBackground),
    textColor: (__VLS_ctx.getMenuTextColor),
    uniqueOpened: (true),
    activeTextColor: (__VLS_ctx.theme),
    collapseTransition: (false),
    mode: "vertical",
    ...{ class: (__VLS_ctx.sideTheme) },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onSelect: (__VLS_ctx.handleSelect)
};
const __VLS_17 = {
    onClose: (__VLS_ctx.handleMenuClose)
};
__VLS_12.slots.default;
for (const [route, index] of __VLS_getVForSourceType((__VLS_ctx.sidebarRouters))) {
    /** @type {[typeof SidebarItem, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(SidebarItem, new SidebarItem({
        key: (route.path + index),
        item: (route),
        basePath: (route.path),
    }));
    const __VLS_19 = __VLS_18({
        key: (route.path + index),
        item: (route),
        basePath: (route.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
var __VLS_12;
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['has-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['is-collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-scrollbar']} */ ;
// @ts-ignore
var __VLS_8 = __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Logo: Logo,
            SidebarItem: SidebarItem,
            sidebarRouters: sidebarRouters,
            showLogo: showLogo,
            sideTheme: sideTheme,
            theme: theme,
            isCollapse: isCollapse,
            isFullscreen: isFullscreen,
            getMenuBackground: getMenuBackground,
            getMenuTextColor: getMenuTextColor,
            activeMenu: activeMenu,
            defaultOpeneds: defaultOpeneds,
            handleMenuClose: handleMenuClose,
            handleSelect: handleSelect,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
