<template>
  <div>
    <template v-if="isFullscreen">
      <div class="fullscreen-wrapper">
        <!-- 这里只渲染主内容区域，使其覆盖整个视口 -->
        <MYMain class="main-content main-content--fullscreen">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </MYMain>
      </div>
    </template>

    <!-- 非 fullscreen 原始布局（保持你现有结构） -->
    <template v-else>
      <div class="layout-container">
        <MYScroll class="layout-scrollbar" thumbColor="#454a58" thumbHoverColor="#454a58" trackColor="var(--track-color)">
          <MYAside class="aside" :class="{ collapsed: !sidebarOpened }" :width="sidebarWidth" height="100vh">
            <Sidebar />
          </MYAside>

          <div class="content-wrapper">
            <MYHeader class="header" height="50px" fixed>
              <!-- 监听 Navbar 发出的 setLayout 事件 -->
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

            <!-- 改成 v-model 控制 Settings 抽屉 -->
            <!-- <Settings v-model="showSettings" /> -->
          </div>
        </MYScroll>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import useAppStore from '@/store/modules/app'
import Sidebar from './components/Sidebar/index.vue'
import { Navbar, TagsView } from './components/index'
// import Settings from './components/Settings/index.vue'

const route = useRoute()
const appStore = useAppStore()

// 根据 route.meta.fullscreen 决定是否进入伪全屏分支
const isFullscreen = computed(() => !!route.meta?.fullscreen)

// 侧边栏开关与宽度（保持你原有逻辑）
const sidebarOpened = computed(() => appStore.sidebar.opened)
const sidebarWidth = computed(() => (sidebarOpened.value ? '220px' : '54px'))

// settings 抽屉显示控制
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
