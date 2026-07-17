import { onMounted } from 'vue';
import useSettingStore from '@/store/modules/settings';
const settingsStore = useSettingStore();
const systemLight = [
    '#409EFF', '#5B7CFF', '#13C2C2', '#4CAF50', '#1890FF', '#FF9800',
    '#E91E63', '#00BCD4', '#8BC34A', '#FF5722', '#9C27B0', '#03A9F4',
    '#00C853', '#B2FF59', '#FFEB3B', '#FFC107', '#FF5252', '#D500F9',
    '#2E7D32', '#1E88E5'
];
const systemDark = [
    '#1E4A8C', '#722ED1', '#2C5AA0', '#0A3D62', '#304156', '#5C6BC0',
    '#880E4F', '#37474F', '#263238', '#311B92', '#01579B', '#33691E',
    '#BF360C', '#4A148C', '#006064', '#827717', '#B71C1C', '#1A237E',
    '#3E2723', '#0D47A1'
];
const topbarColors = [
    '#FFFFFF', '#F5F7FA', '#EEF1F6', '#E8EAF6', '#E3F2FD', '#E0F2F1',
    '#E8F5E9', '#FFF3E0', '#FFEBEE', '#081018', '#0a1017', '#1F2A44',
    '#26334A', '#304156', '#2C3E50', '#37474F', '#424242', '#212121',
    '#546E7A', '#455A64'
];
const menuColors = [
    '#001529', '#0a1017', '#1F2D3D', '#26334A', '#304156', '#2C3E50',
    '#37474F', '#000000', '#0D1117', '#161B22', '#21252B', '#282C34',
    '#1C1F23', '#24292E', '#2F3640', '#353B48', '#404A59', '#4C566A',
    '#434C5E', '#5E81AC'
];
const THEME_KEY = 'app-theme-settings';
const changeTheme = (type, color) => {
    if (type === 'system') {
        settingsStore.theme = color;
    }
    else if (type === 'topbar') {
        settingsStore.topbarTheme = color;
    }
    else if (type === 'menu') {
        settingsStore.menuTheme = color;
    }
    settingsStore.applyTheme();
    saveThemeToStorage();
};
// 存储
const saveThemeToStorage = () => {
    localStorage.setItem(THEME_KEY, JSON.stringify({
        theme: settingsStore.theme,
        topbarTheme: settingsStore.topbarTheme,
        menuTheme: settingsStore.menuTheme
    }));
};
const loadThemeFromStorage = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (!saved)
        return;
    try {
        const data = JSON.parse(saved);
        if (data.theme)
            changeTheme('system', data.theme);
        if (data.topbarTheme)
            changeTheme('topbar', data.topbarTheme);
        if (data.menuTheme)
            changeTheme('menu', data.menuTheme);
    }
    catch (e) { }
};
onMounted(() => {
    loadThemeFromStorage();
    settingsStore.applyTheme();
});
const lightDefaults = {
    theme: '#409EFF',
    topbarTheme: '#ffffff',
    menuTheme: '#304156'
};
const darkDefaults = {
    theme: '#409EFF',
    topbarTheme: '#081018',
    menuTheme: '#0a1017'
};
function toggleTheme() {
    settingsStore.toggleTheme();
    settingsStore.applyTheme();
    saveThemeToStorage();
}
const resetThemeConfig = () => {
    const defaults = settingsStore.isDark
        ? darkDefaults
        : lightDefaults;
    settingsStore.theme = defaults.theme;
    settingsStore.topbarTheme = defaults.topbarTheme;
    settingsStore.menuTheme = defaults.menuTheme;
    settingsStore.applyTheme();
    saveThemeToStorage();
};
const contrastFor = (hex) => {
    // settingsStore.shouldUseWhiteText 是 store 的方法，直接调用
    return settingsStore.shouldUseWhiteText(hex) ? '#ffffff' : '#000000';
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['drawer-header']} */ ;
/** @type {__VLS_StyleScopedClasses['setting-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['color-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-item']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['action-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.MYDrawer;
/** @type {[typeof __VLS_components.MYDrawer, typeof __VLS_components.MYDrawer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "setting-drawer" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "setting-drawer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.$t('settings.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "desc" },
});
(__VLS_ctx.$t('settings.desc'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "setting-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('settings.defaultThemeToggle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.toggleTheme) },
    ...{ class: "theme-switch-wrapper" },
});
if (__VLS_ctx.settingsStore.isDark) {
    const __VLS_5 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        iconClass: "sunny",
        ...{ style: {} },
    }));
    const __VLS_7 = __VLS_6({
        iconClass: "sunny",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
else {
    const __VLS_9 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        iconClass: "moon",
    }));
    const __VLS_11 = __VLS_10({
        iconClass: "moon",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "setting-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-title" },
});
(__VLS_ctx.$t('settings.primaryColor'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "color-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "group-title" },
});
(__VLS_ctx.$t('settings.lightRecommend'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "theme-colors" },
});
for (const [color] of __VLS_getVForSourceType((__VLS_ctx.systemLight))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeTheme('system', color);
            } },
        key: (color),
        ...{ class: "color-item" },
        ...{ style: ({ backgroundColor: color, '--check-color': __VLS_ctx.contrastFor(color) }) },
        ...{ class: ({ active: __VLS_ctx.settingsStore.theme === color }) },
    });
    if (__VLS_ctx.settingsStore.theme === color) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "check" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "color-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "group-title" },
});
(__VLS_ctx.$t('settings.darkRecommend'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "theme-colors" },
});
for (const [color] of __VLS_getVForSourceType((__VLS_ctx.systemDark))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeTheme('system', color);
            } },
        key: (color),
        ...{ class: "color-item" },
        ...{ style: ({ backgroundColor: color, '--check-color': __VLS_ctx.contrastFor(color) }) },
        ...{ class: ({ active: __VLS_ctx.settingsStore.theme === color }) },
    });
    if (__VLS_ctx.settingsStore.theme === color) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "check" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "setting-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-title" },
});
(__VLS_ctx.$t('settings.topbarTheme'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "theme-colors" },
});
for (const [color] of __VLS_getVForSourceType((__VLS_ctx.topbarColors))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeTheme('topbar', color);
            } },
        key: (color),
        ...{ class: "color-item" },
        ...{ style: ({ backgroundColor: color, '--check-color': __VLS_ctx.contrastFor(color) }) },
        ...{ class: ({ active: __VLS_ctx.settingsStore.topbarTheme === color }) },
    });
    if (__VLS_ctx.settingsStore.topbarTheme === color) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "check" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "setting-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-title" },
});
(__VLS_ctx.$t('settings.menuTheme'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "theme-colors" },
});
for (const [color] of __VLS_getVForSourceType((__VLS_ctx.menuColors))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeTheme('menu', color);
            } },
        key: (color),
        ...{ class: "color-item" },
        ...{ style: ({ backgroundColor: color, '--check-color': __VLS_ctx.contrastFor(color) }) },
        ...{ class: ({ active: __VLS_ctx.settingsStore.menuTheme === color }) },
    });
    if (__VLS_ctx.settingsStore.menuTheme === color) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "check" },
        });
    }
}
const __VLS_13 = {}.MYBorder;
/** @type {[typeof __VLS_components.MYBorder, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    borderColor: "#000",
}));
const __VLS_15 = __VLS_14({
    borderColor: "#000",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-header small" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.$t('settings.interfaceSettings'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('settings.enableTagsView'));
const __VLS_17 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.tagsView),
}));
const __VLS_19 = __VLS_18({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.tagsView),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('settings.showLogo'));
const __VLS_21 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.sidebarLogo),
}));
const __VLS_23 = __VLS_22({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.sidebarLogo),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('settings.showBreadcrumb'));
const __VLS_25 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.breadcrumb),
}));
const __VLS_27 = __VLS_26({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.breadcrumb),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('settings.compactMode'));
const __VLS_29 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.compactMode),
}));
const __VLS_31 = __VLS_30({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.compactMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drawer-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('settings.pageAnimation'));
const __VLS_33 = {}.MYSwitch;
/** @type {[typeof __VLS_components.MYSwitch, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.pageAnimation),
}));
const __VLS_35 = __VLS_34({
    size: "supersmall",
    modelValue: (__VLS_ctx.settingsStore.pageAnimation),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-group" },
});
const __VLS_37 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    type: "info",
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_41;
let __VLS_42;
let __VLS_43;
const __VLS_44 = {
    onClick: (__VLS_ctx.resetThemeConfig)
};
__VLS_40.slots.default;
(__VLS_ctx.$t('settings.resetConfig'));
var __VLS_40;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['setting-drawer']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-header']} */ ;
/** @type {__VLS_StyleScopedClasses['desc']} */ ;
/** @type {__VLS_StyleScopedClasses['setting-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-switch-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['setting-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['color-group']} */ ;
/** @type {__VLS_StyleScopedClasses['group-title']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['color-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['check']} */ ;
/** @type {__VLS_StyleScopedClasses['color-group']} */ ;
/** @type {__VLS_StyleScopedClasses['group-title']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['color-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['check']} */ ;
/** @type {__VLS_StyleScopedClasses['setting-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['color-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['check']} */ ;
/** @type {__VLS_StyleScopedClasses['setting-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['color-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['check']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-header']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['action-group']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            settingsStore: settingsStore,
            systemLight: systemLight,
            systemDark: systemDark,
            topbarColors: topbarColors,
            menuColors: menuColors,
            changeTheme: changeTheme,
            toggleTheme: toggleTheme,
            resetThemeConfig: resetThemeConfig,
            contrastFor: contrastFor,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
