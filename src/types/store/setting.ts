/**
 * 布局设置类型定义
 */

export interface LayoutSetting {
    theme?: string
    sideTheme?: string
    showSettings?: boolean
    topNav?: boolean
    tagsView?: boolean
    fixedHeader?: boolean
    sidebarLogo?: boolean
    dynamicTitle?: boolean
    isDark?: boolean
}

export interface DefaultSettings {
    sideTheme: string
    showSettings: boolean
    topNav: boolean
    tagsView: boolean
    fixedHeader: boolean
    sidebarLogo: boolean
    dynamicTtile: boolean
}