// src/store/modules/settings.ts
import { defineStore } from 'pinia';
import defaultSettings from '@/settings';
import { useDark, useToggle } from '@vueuse/core';
import { useDynamicTitle } from '@/utils/dynamicTitle';
const isDark = useDark();
const toggleDark = useToggle(isDark);
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTtile } = defaultSettings;
const layoutSettingStr = localStorage.getItem('layoutSetting');
const storageSetting = layoutSettingStr ? JSON.parse(layoutSettingStr) : {};
const themeKey = 'app-theme-settings';
const savedThemeStr = localStorage.getItem(themeKey);
const savedTheme = savedThemeStr ? JSON.parse(savedThemeStr) : null;
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
// 颜色工具函数
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};
const lighten = (hex, percent) => {
    const { r, g, b } = hexToRgb(hex);
    const amt = Math.round(255 * percent);
    const newR = Math.min(255, r + amt);
    const newG = Math.min(255, g + amt);
    const newB = Math.min(255, b + amt);
    return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB)
        .toString(16)
        .slice(1)}`;
};
const darken = (hex, percent) => {
    const { r, g, b } = hexToRgb(hex);
    const amt = Math.round(255 * percent);
    const newR = Math.max(0, r - amt);
    const newG = Math.max(0, g - amt);
    const newB = Math.max(0, b - amt);
    return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB)
        .toString(16)
        .slice(1)}`;
};
// 计算两个颜色的对比度比率（WCAG标准）
const getContrastRatio = (bgHex, textHex) => {
    const rgb1 = hexToRgb(bgHex);
    const rgb2 = hexToRgb(textHex);
    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
};
// 计算颜色的相对亮度
const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const initialIsDark = savedTheme?.isDark ?? isDark.value;
const useSettingStore = defineStore('settings', {
    state: () => {
        const defaults = isDark.value ? darkDefaults : lightDefaults;
        return {
            title: '',
            theme: savedTheme?.theme || defaults.theme,
            topbarTheme: savedTheme?.topbarTheme || defaults.topbarTheme,
            menuTheme: savedTheme?.menuTheme || defaults.menuTheme,
            sideTheme: storageSetting.sideTheme || sideTheme,
            showSettings: showSettings,
            topNav: storageSetting.topNav === undefined
                ? topNav
                : storageSetting.topNav,
            tagsView: storageSetting.tagsView === undefined
                ? tagsView
                : storageSetting.tagsView,
            fixedHeader: storageSetting.fixedHeader === undefined
                ? fixedHeader
                : storageSetting.fixedHeader,
            sidebarLogo: storageSetting.sidebarLogo === undefined
                ? sidebarLogo
                : storageSetting.sidebarLogo,
            dynamicTitle: storageSetting.dynamicTitle === undefined
                ? dynamicTtile
                : storageSetting.dynamicTitle,
            breadcrumb: storageSetting.breadcrumb ?? true,
            sidebarCollapse: storageSetting.sidebarCollapse ?? false,
            compactMode: storageSetting.compactMode ?? false,
            pageAnimation: storageSetting.pageAnimation ?? true,
            enableShadow: storageSetting.enableShadow ?? true,
            enableRadius: storageSetting.enableRadius ?? true,
            isDark: initialIsDark,
        };
    },
    getters: {
        shouldUseWhiteText: () => (bgHex) => {
            const ratioWhite = getContrastRatio(bgHex, '#FFFFFF');
            const ratioBlack = getContrastRatio(bgHex, '#000000');
            return ratioWhite > ratioBlack;
        }
    },
    actions: {
        applyTheme() {
            const root = document.documentElement;
            // 系统主色
            root.style.setProperty('--color-primary', this.theme);
            root.style.setProperty('--color-primary-hover', lighten(this.theme, 0.18));
            root.style.setProperty('--color-primary-active', darken(this.theme, 0.1));
            root.style.setProperty('--btn-color-primary', this.theme);
            root.style.setProperty('--btn-color-primary-hover', lighten(this.theme, 0.18));
            // 菜单主题
            root.style.setProperty('--sidebar-bg', this.menuTheme);
            root.style.setProperty('--menu-bg', this.menuTheme);
            const isMenuDark = this.isDarkColor(this.menuTheme);
            const menuSubColor = isMenuDark ? lighten(this.menuTheme, 0.045) : darken(this.menuTheme, 0.06);
            const menuHoverColor = isMenuDark ? lighten(this.menuTheme, 0.11) : darken(this.menuTheme, 0.11);
            root.style.setProperty('--sidebar-two-bg', menuSubColor);
            root.style.setProperty('--menu-hover-bg', menuHoverColor);
            const menuTextColor = isMenuDark ? '#ffffff' : '#000000';
            root.style.setProperty('--text-color-menu', menuTextColor);
            // 右侧/内容主题（topbar）
            root.style.setProperty('--navbar-bg', this.topbarTheme);
            root.style.setProperty('--content-bg', this.topbarTheme);
            root.style.setProperty('--index-bg-color', this.topbarTheme);
            root.style.setProperty('--table-bg', this.topbarTheme);
            root.style.setProperty('--table-body-bg', this.topbarTheme);
            root.style.setProperty('--table-stripe-bg', this.topbarTheme);
            const isTopbarDark = this.isDarkColor(this.topbarTheme);
            const tableHeaderBg = isTopbarDark ? lighten(this.topbarTheme, 0.04) : darken(this.topbarTheme, 0.05);
            const tableHoverBg = isTopbarDark ? lighten(this.topbarTheme, 0.12) : darken(this.topbarTheme, 0.08);
            root.style.setProperty('--table-header-bg', tableHeaderBg);
            root.style.setProperty('--table-hover-bg', tableHoverBg);
            // 使用对比度算法决定文本颜色
            const contentTextColor = this.shouldUseWhiteText(this.topbarTheme) ? '#ffffff' : '#000000';
            root.style.setProperty('--text-color-content', contentTextColor);
            root.style.setProperty('--navbar-text', contentTextColor);
            root.style.setProperty('--tags-item-text', contentTextColor);
            root.style.setProperty('--check-color', contentTextColor);
            root.style.setProperty('--general', contentTextColor);
            // 背景相关
            root.style.setProperty('--general-two', this.topbarTheme);
            // 边框颜色
            const borderColor = this.shouldUseWhiteText(this.topbarTheme)
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(0,0,0,0.2)';
            root.style.setProperty('--border-color', borderColor);
            // hover颜色
            const hoverBg = this.shouldUseWhiteText(this.topbarTheme)
                ? lighten(this.topbarTheme, 0.08)
                : darken(this.topbarTheme, 0.05);
            root.style.setProperty('--navbar-hover-bg', hoverBg);
        },
        // 保留原方法，用于菜单等其他部分
        isDarkColor(hex) {
            const { r, g, b } = hexToRgb(hex);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance < 0.5;
        },
        changeSetting(data) {
            Object.entries(data).forEach(([key, value]) => {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    ;
                    this[key] = value;
                }
            });
        },
        setTtile(title) {
            this.title = title;
            useDynamicTitle();
        },
        toggleTheme() {
            this.isDark = !this.isDark;
            toggleDark();
            const defaults = this.isDark ? darkDefaults : lightDefaults;
            this.theme = defaults.theme;
            this.topbarTheme = defaults.topbarTheme;
            this.menuTheme = defaults.menuTheme;
            this.applyTheme();
            localStorage.setItem(themeKey, JSON.stringify({
                theme: this.theme,
                topbarTheme: this.topbarTheme,
                menuTheme: this.menuTheme,
                isDark: this.isDark
            }));
        },
        resetTheme() {
            const defaults = this.isDark
                ? darkDefaults
                : lightDefaults;
            this.theme = defaults.theme;
            this.topbarTheme = defaults.topbarTheme;
            this.menuTheme = defaults.menuTheme;
            localStorage.setItem(themeKey, JSON.stringify(defaults));
        },
        clearAllSettings() {
            localStorage.removeItem(themeKey);
            localStorage.removeItem('layoutSetting');
            this.$reset();
        }
    }
});
export default useSettingStore;
