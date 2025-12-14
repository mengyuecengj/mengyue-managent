<template>
  <div>
    <!-- 1. 最高优先级：noLayout 路由（大屏编辑器）→ 完全裸渲染 -->
    <template v-if="isNoLayoutRoute">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </template>

    <!-- 2. 次高优先级：fullscreen 路由（你原来那种带标题栏的全屏大屏） -->
    <template v-else-if="isFullscreen">
      <div class="fullscreen-wrapper">
        <MYMain class="main-content main-content--fullscreen">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </MYMain>
      </div>
    </template>

    <!-- 3. 普通后台页面布局 -->
    <template v-else>
      <div class="layout-container">
        <MYScroll class="layout-scrollbar" thumbColor="#454a58" thumbHoverColor="#454a58"
          trackColor="var(--track-color)">
          <MYAside class="aside" :class="{ collapsed: !sidebarOpened }" :width="sidebarWidth" height="100vh">
            <Sidebar />
          </MYAside>

          <div class="content-wrapper">
            <MYHeader class="header" height="50px" fixed>
              <Navbar @setLayout="showSettings = true" />
            </MYHeader>

            <TagsView class="tags-view" />

            <MYMain class="main-content">
              <router-view v-slot="{ Component }">
                <transition name="slide-fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </MYMain>
          </div>
        </MYScroll>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useAppStore from '@/store/modules/app'
import Sidebar from './components/Sidebar/index.vue'
import { Navbar, TagsView } from './components/index'

const route = useRoute()
const appStore = useAppStore()

// 1. 大屏编辑器专用：完全不走任何 Layout
const isNoLayoutRoute = computed(() => route.meta?.noLayout === true)

// 2. 你原来支持的伪全屏大屏（有标题栏、控制按钮等）
const isFullscreen = computed(() => !!route.meta?.fullscreen)

// 侧边栏逻辑保持不变
const sidebarOpened = computed(() => appStore.sidebar.opened)
const sidebarWidth = computed(() => (sidebarOpened.value ? '220px' : '54px'))

const showSettings = ref(false)
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
}

/* 原有样式的细节可按你项目微调 */
.layout-scrollbar {
  height: 100vh;
}

/* fullscreen 分支样式：覆盖整个视口 */
.fullscreen-wrapper {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--dashboard-bg, #0b1220);
  display: flex;
  flex-direction: column;
}

/* 保证 main 在 fullscreen 时铺满 */
.main-content--fullscreen {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: auto;
}

/* 你原有的 .content-wrapper/.header/.tags-view 等样式保持不变（若需可继续放在这里） */
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
