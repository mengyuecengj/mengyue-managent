<template>
  <div :class="{ 'has-logo': showLogo, hidden: isFullscreen, 'is-collapse': isCollapse }" class="sidebar-container">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <MYScrollbar ref="scrollbarRef" class="sidebar-scrollbar" ScrollWidth="8px" thumbColor="#444a59" trackColor="transparent">
      <MYMenu class="" :default-active="activeMenu as string" :default-openeds="defaultOpeneds" :collapse="isCollapse"
        :background-color="getMenuBackground" :text-color="getMenuTextColor" :unique-opened="true"
        :active-text-color="theme" :collapse-transition="false" mode="vertical" :class="sideTheme"
        @select="handleSelect" @close="handleMenuClose">
        <sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route"
          :base-path="route.path" />
      </MYMenu>
    </MYScrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import Logo from '@/layout/components/Sidebar/Logo.vue';
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue';
import variables from '@/scss/variables.base.scss';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import { RouteItem } from '@/types/layout/sidebarItem';
import { isExternal } from '@/utils/validate';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarRouters = computed(() => permissionStore.sidebarRouters as RouteItem[]);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);
const isFullscreen = computed(() => !!route.meta.fullscreen);

// 替换原代码中的 variables.xxx 为 CSS 变量
const getMenuBackground = computed(() =>
  settingsStore.isDark
    ? 'var(--sidebar-bg)'
    : sideTheme.value === 'theme-dark'
      ? 'var(--menu-bg)'
      : 'var(--menu-light-bg)'
);

const getMenuTextColor = computed(() =>
  settingsStore.isDark
    ? 'var(--sidebar-logo-text)'
    : sideTheme.value === 'theme-dark'
      ? 'var(--menu-text)'
      : 'var(--menu-light-text)'
);
const activeMenu = computed(() => {
  const path = route.meta.activeMenu || route.path;
  return typeof path === 'string' ? (path.startsWith('/') ? path : `/${path}`) : '/';
});

// 默认展开的菜单
const defaultOpeneds = ref<string[]>([]);

// 获取主菜单的索引（第一级菜单）
const getMainMenuIndex = (menuKey: string): string => {
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
  } catch (error) {
    console.error('加载菜单状态失败:', error);
  }
};

// 保存状态
const saveMenuState = () => {
  try {
    localStorage.setItem('test_menu_openeds', JSON.stringify(defaultOpeneds.value));
  } catch (error) {
    console.error('保存菜单状态失败:', error);
  }
};

// 菜单展开事件处理 - 修复 unique-opened 逻辑
const handleMenuOpen = (key: string, keyPath: string[]) => {

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
  } else {
    // 非 unique-opened 模式，简单添加
    if (!defaultOpeneds.value.includes(key)) {
      defaultOpeneds.value.push(key);
    }
  }

  saveMenuState();
};

// 菜单关闭事件处理
const handleMenuClose = (key: string, keyPath: string[]) => {

  const index = defaultOpeneds.value.indexOf(key);
  if (index > -1) {
    defaultOpeneds.value.splice(index, 1);
    saveMenuState();
  }
};

// 菜单选择处理
function handleSelect(index: string, indexPath: string[]) {
  if (index === route.path) return;

  if (isExternal(index)) {
    window.open(index, '_blank');
    return;
  }

  // 在选择菜单时，确保其所有父级菜单都是展开状态
  const parentMenus = indexPath.slice(0, -1); // 移除最后一个元素（当前菜单）

  if (uniqueOpened.value) {
    // 在 unique-opened 模式下，只保留当前主菜单路径
    const mainMenuIndex = getMainMenuIndex(index);
    const currentMainMenuMenus = defaultOpeneds.value.filter(menuKey =>
      getMainMenuIndex(menuKey) === mainMenuIndex
    );

    // 添加缺失的父级菜单
    parentMenus.forEach(menuKey => {
      if (!currentMainMenuMenus.includes(menuKey)) {
        currentMainMenuMenus.push(menuKey);
      }
    });

    defaultOpeneds.value = currentMainMenuMenus;
  } else {
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
</script>
<style lang="scss" scoped>
.sidebar-container {
  background-color: v-bind(getMenuBackground);
  position: relative;
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;

  // 新增：菜单折叠时的样式
  &.is-collapse {
    .sidebar-scrollbar {
      :deep(.MYScrollbar__wrap) {
        overflow-x: hidden !important;
        overflow-y: hidden !important;
      }

      :deep(.MYScrollbar__bar) {
        display: none !important;
      }
    }
  }

  // 左侧导航栏整体高度
  .sidebar-scrollbar {
    flex: 1;
    height: 100%;

    :deep(.MYScrollbar) {
      height: 100%;

      .MYScrollbar__wrap {
        // 允许内容高度小于容器时隐藏滚动条
        overflow: hidden !important;

        // 当内容超出时显示滚动条
        &:hover {
          overflow: auto !important;
        }
      }
    }
  }

  // 左侧导航最小高度
  .my-menu {
    border: none;
    width: 100% !important;
    // 确保菜单高度自适应内容
    min-height: auto;
    height: auto !important;
    background-color: v-bind(getMenuBackground);
  }
}
</style>