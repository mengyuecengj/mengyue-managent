import modal from '@/plugins/modal';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import { handleThemeStyle } from '@/utils/theme';
import { MYSwitch } from 'mengyue-plus';
import { onMounted, ref, computed } from 'vue';
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const showSettings = ref(false);
const theme = ref('#409EFF'); // 初始值先设默认蓝色
const sideTheme = ref(settingsStore.sideTheme);
const storeSettings = computed(() => settingsStore);
const predefineColors = ref([
    '#409EFF',
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585'
]);
// ✅ 从 localStorage 恢复主题（避免刷新后被重置）
onMounted(() => {
    try {
        const layoutSetting = localStorage.getItem('layout-setting');
        if (layoutSetting) {
            const settings = JSON.parse(layoutSetting);
            if (settings.theme) {
                theme.value = settings.theme;
                settingsStore.theme = settings.theme;
                handleThemeStyle(settings.theme);
            }
        }
        else {
            // 如果没有缓存，使用 store 默认值
            theme.value = settingsStore.theme;
            handleThemeStyle(settingsStore.theme);
        }
    }
    catch (e) {
        console.error('Failed to load theme from localStorage', e);
    }
});
/** 是否需要topnav */
function topNavChange(val) {
    if (!val) {
        appStore.toggleSideBarHide(false);
        permissionStore.setSidebarRouters(permissionStore.defaultRoutes);
    }
}
function themeChange(val) {
    settingsStore.theme = val;
    handleThemeStyle(val);
}
function handleTheme(val) {
    settingsStore.sideTheme = val;
    sideTheme.value = val;
}
function saveSetting() {
    modal.loading('正在保存到本地，请稍候...');
    const layoutSetting = {
        topNav: storeSettings.value.topNav,
        tagsView: storeSettings.value.tagsView,
        fixedHeader: storeSettings.value.fixedHeader,
        sidebarLogo: storeSettings.value.sidebarLogo,
        dynamicTitle: storeSettings.value.dynamicTitle,
        sideTheme: storeSettings.value.sideTheme,
        theme: storeSettings.value.theme
    };
    localStorage.setItem('layout-setting', JSON.stringify(layoutSetting));
    setTimeout(() => modal.closeLoading(), 1000);
}
function resetSetting() {
    modal.loading('正在清除设置缓存并刷新，请稍候...');
    localStorage.removeItem('layout-setting');
    setTimeout('window.location.reload()', 1000);
}
function openSetting() {
    showSettings.value = true;
}
const __VLS_exposed = {
    openSetting
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.MYDrawer;
/** @type {[typeof __VLS_components.MYDrawer, typeof __VLS_components.MYDrawer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.showSettings),
    withHeader: (false),
    direction: "rtl",
    size: "300px",
    backgroundColor: "var(--general-two)",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.showSettings),
    withHeader: (false),
    direction: "rtl",
    size: "300px",
    backgroundColor: "var(--general-two)",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "setting-drawer-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "drawer-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "comp-style" },
});
const __VLS_4 = {}.MYSelectColor;
/** @type {[typeof __VLS_components.MYSelectColor, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.theme),
    predefine: (__VLS_ctx.predefineColors),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.theme),
    predefine: (__VLS_ctx.predefineColors),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onChange: (__VLS_ctx.themeChange)
};
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "comp-style" },
});
const __VLS_12 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onChange': {} },
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.topNav),
}));
const __VLS_14 = __VLS_13({
    ...{ 'onChange': {} },
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.topNav),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onChange: (__VLS_ctx.topNavChange)
};
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "comp-style" },
});
const __VLS_20 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.tagsView),
}));
const __VLS_22 = __VLS_21({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.tagsView),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "comp-style" },
});
const __VLS_24 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.fixedHeader),
}));
const __VLS_26 = __VLS_25({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.fixedHeader),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "comp-style" },
});
const __VLS_28 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.sidebarLogo),
}));
const __VLS_30 = __VLS_29({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.sidebarLogo),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.MYBorder;
/** @type {[typeof __VLS_components.MYBorder, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    borderColor: "#434343",
}));
const __VLS_34 = __VLS_33({
    borderColor: "#434343",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
const __VLS_36 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    ...{ style: {} },
    type: "primary",
    icon: "MYOdometerText",
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    ...{ style: {} },
    type: "primary",
    icon: "MYOdometerText",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (__VLS_ctx.saveSetting)
};
__VLS_39.slots.default;
var __VLS_39;
const __VLS_44 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYLoadingA",
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    type: "info",
    icon: "MYLoadingA",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onClick: (__VLS_ctx.resetSetting)
};
__VLS_47.slots.default;
var __VLS_47;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['setting-drawer-title']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-title']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-style']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-style']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-style']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-style']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-style']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MYSwitch: MYSwitch,
            settingsStore: settingsStore,
            showSettings: showSettings,
            theme: theme,
            predefineColors: predefineColors,
            topNavChange: topNavChange,
            themeChange: themeChange,
            saveSetting: saveSetting,
            resetSetting: resetSetting,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
