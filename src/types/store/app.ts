export interface SidebarState {
    opened: boolean;
    withoutAnimation: boolean;
    hide: boolean;
}

// @/types/store/app.ts
export interface AppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    hide: boolean;
  };
  device: 'desktop' | 'mobile';
  size: string;
  // 新增：保存打开的 submenu 的 index 数组
  openedSubmenus: string[];
}