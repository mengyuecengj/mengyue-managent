import defaultSettings from '@/settings';
import { useDark, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { useDynamicTitle } from '@/utils/dynamicTitle';
const isDark = useDark();
const toggleDark = useToggle(isDark);
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTtile } = defaultSettings;
const layoutSettingStr = localStorage.getItem('layoutSetting');
const storageSetting = layoutSettingStr ? JSON.parse(layoutSettingStr) : '';
const useSettingStore = defineStore('settings', {
    state: () => ({
        title: '',
        theme: storageSetting.them || '#409eff',
        sideTheme: storageSetting.sideTheme || sideTheme,
        showSettings: showSettings,
        topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
        tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
        fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
        sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
        dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTtile : storageSetting.dynamicTitle,
        isDark: isDark.value
    }),
    actions: {
        // 修改布局设置
        changeSetting(data) {
            Object.entries(data).forEach(([key, value]) => {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    this[key] = value;
                }
            });
        },
        setTtile(title) {
            this.title = title;
            useDynamicTitle();
        },
        // 切换黑暗模式
        toggleTheme() {
            this.isDark = !this.isDark;
            toggleDark();
        }
    }
});
export default useSettingStore;
