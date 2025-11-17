<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <MYMenu-item v-if="onlyOneChild.meta" :index="resolvePath(onlyOneChild.path ?? '')"
        :class="getMenuItemClass(onlyOneChild)">
        <template #icon>
          <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon) || ''" />
        </template>
        <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
      </MYMenu-item>
    </template>

    <MYMenu-submenu v-else ref="subMenu" :index="resolvePath(item.path ?? '')"
                   :class="getMenuItemClass(item)">
      <template #icon>
        <svg-icon :icon-class="item.meta?.icon || ''" />
      </template>
      <template v-if="item.meta" #title>
        <span class="menu-title" :title="hasTitle(item.meta.title)">
          {{ item.meta.title }}
        </span>
      </template>
        <sidebar-item v-for="(child, index) in item.children" :key="child.path + index" :is-nest="true" :item="child"
          :base-path="resolvePath(child.path ?? '')" class="nest-menu" />
    </MYMenu-submenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isExternal } from '@/utils/validate';
import { getNormalPath } from '@/utils/general';
import { RouteItem } from '@/types/layout/sidebarItem';

const props = defineProps<{
  item: RouteItem;
  isNest?: boolean;
  basePath?: string;
}>();

const onlyOneChild = ref<Partial<RouteItem>>({});

// 获取菜单项类名
function getMenuItemClass(route: Partial<RouteItem>): string {
  const classes = [];
  
  if (!props.isNest) {
    classes.push('submenu-title-noDropdown');
  }
  
  // 如果是首页，添加特殊 class
  if (route.path === '/index' || route.meta?.title === '首页') {
    classes.push('home-menu-item');
  }
  
  return classes.join(' ');
}

// 其他函数保持不变...
function hasOneShowingChild(children: RouteItem[] = [], parent: RouteItem): boolean {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false;
    }
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
}

function resolvePath(routePath: string): string {
  if (isExternal(routePath)) {
    return routePath;
  }
  const basePath = props.basePath ?? '';
  if (isExternal(basePath)) {
    return basePath;
  }

  if (!basePath) {
    return getNormalPath(routePath);
  }

  const resolvedPath = getNormalPath(basePath + '/' + routePath);
  return resolvedPath;
}

function hasTitle(title: string = ''): string {
  return title.length > 5 ? title : '';
}
</script>

<style scoped lang="scss">

</style>