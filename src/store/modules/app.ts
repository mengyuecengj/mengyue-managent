import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { AppState } from '@/types/store/app';

const useAppStore = defineStore("app", {
    state: (): AppState => ({
        sidebar: {
            opened: Cookies.get('sidebarStatus') !== '0', // 默认展开
            withoutAnimation: false,
            hide: false,
        },
        device: 'desktop',
        size: Cookies.get('size') || 'default',
        // 新增：从 Cookies 中读取打开的 submenu 状态
        openedSubmenus: JSON.parse(Cookies.get('openedSubmenus') || '[]')
    }),
    actions: {
        toggleSidebar(): boolean {
            if (this.sidebar.hide) {
                return false;
            }
            this.sidebar.opened = !this.sidebar.opened;
            if (this.sidebar.opened) {
                Cookies.set('sidebarStatus', '1');
            } else {
                Cookies.set('sidebarStatus', '0');
            }
            return true;
        },
        toggleDevice(device: 'desktop' | 'mobile'): void {
            this.device = device;
        },
        closeSidebar(withoutAnimation: boolean): void {
            Cookies.set('sidebarStatus', '0');
            this.sidebar.opened = false;
            this.sidebar.withoutAnimation = withoutAnimation;
        },
        setSize(size: string): void {
            this.size = size;
            Cookies.set('size', size);
        },
        toggleSideBarHide(status: boolean): void {
            this.sidebar.hide = status;
        },
        // 新增：添加打开的 submenu
        addOpenedSubmenu(index: string): void {
            if (!this.openedSubmenus.includes(index)) {
                this.openedSubmenus.push(index);
                Cookies.set('openedSubmenus', JSON.stringify(this.openedSubmenus));
            }
        },
        // 新增：移除关闭的 submenu
        removeOpenedSubmenu(index: string): void {
            const idx = this.openedSubmenus.indexOf(index);
            if (idx > -1) {
                this.openedSubmenus.splice(idx, 1);
                Cookies.set('openedSubmenus', JSON.stringify(this.openedSubmenus));
            }
        },
        // 新增：设置打开的 submenus
        setOpenedSubmenus(submenus: string[]): void {
            this.openedSubmenus = submenus;
            Cookies.set('openedSubmenus', JSON.stringify(this.openedSubmenus));
        },
        // 新增：清空打开的 submenus
        clearOpenedSubmenus(): void {
            this.openedSubmenus = [];
            Cookies.set('openedSubmenus', '[]');
        }
    }
});

export default useAppStore;