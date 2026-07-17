<template>
  <div>
    <!-- 1. 最高优先级：noLayout 路由（大屏编辑器）→ 完全裸渲染 -->
    <template v-if="isNoLayoutRoute">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </template>

    <!-- 2. 次高优先级：fullscreen 路由 -->
    <template v-else-if="isFullscreen">
      <div
        class="fullscreen-wrapper"
        :class="layoutClasses"
      >
        <MYMain class="main-content main-content--fullscreen">
          <router-view v-slot="{ Component }">

            <!-- 页面动画控制 -->
            <transition
              v-if="settingsStore.pageAnimation"
              name="slide-fade"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>

            <component
              v-else
              :is="Component"
            />

          </router-view>
        </MYMain>
      </div>
    </template>

    <!-- 3. 普通后台页面布局 -->
    <template v-else>
      <div
        class="layout-container"
        :class="layoutClasses"
      >
        <MYScroll
          class="layout-scrollbar"
          thumbColor="#454a58"
          thumbHoverColor="#454a58"
          trackColor="var(--track-color)"
        >

          <MYAside
            class="aside"
            :class="{ collapsed: !sidebarOpened }"
            :width="sidebarWidth"
            height="100vh"
          >
            <Sidebar />
          </MYAside>

          <div class="content-wrapper">

            <MYHeader
              class="header"
              height="50px"
              fixed
            >
              <Navbar @setLayout="showSettings = true" />
            </MYHeader>

            <TagsView
              class="tags-view"
              v-show="settingsStore.tagsView"
            />

            <MYMain class="main-content">

              <router-view v-slot="{ Component }">

                <!-- 页面动画控制 -->
                <transition
                  v-if="settingsStore.pageAnimation"
                  name="slide-fade"
                  mode="out-in"
                >
                  <component :is="Component" />
                </transition>

                <component
                  v-else
                  :is="Component"
                />

              </router-view>

            </MYMain>

          </div>

        </MYScroll>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import useAppStore from '@/store/modules/app'
import Sidebar from './components/Sidebar/index.vue'
import { Navbar, TagsView } from './components/index'
import useSettingStore from '@/store/modules/settings'

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingStore()

const isNoLayoutRoute = computed(() => route.meta?.noLayout === true)
const isFullscreen = computed(() => !!route.meta?.fullscreen)

const sidebarOpened = computed(() => appStore.sidebar.opened)

const sidebarWidth = computed(() =>
  sidebarOpened.value ? '220px' : '54px'
)

const showSettings = ref(false)

/* =============================
   新增：布局模式 class 控制
   ============================= */

const layoutClasses = computed(() => {
  return {
    'compact-mode': settingsStore.compactMode,
    'shadow-mode': settingsStore.enableShadow,
    'radius-mode': settingsStore.enableRadius
  }
})
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
}

.layout-scrollbar {
  height: 100vh;
}

/* ==================== 核心修改：内容区域背景同步右侧主题 ==================== */

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--content-bg);
  transition: background 0.3s ease;
}

.main-content {
  background: var(--content-bg);
  transition: background 0.3s ease;
}

/* fullscreen 模式也同步 */

.fullscreen-wrapper {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--content-bg);
  display: flex;
  flex-direction: column;
}

.main-content--fullscreen {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: auto;
  background: var(--content-bg);
  transition: background 0.3s ease;
}
</style>

<style lang="scss">
.compact-mode {

  .my-form {
    --form-item-margin-bottom: 12px;
  }

  .my-table td,
  .my-table th {
    padding: 6px 10px;
  }

  .my-button {
    padding: 4px 10px;
  }

  .my-card {
    padding: 12px;
  }

}

.slide-fade-enter-active {
  transition: all .25s ease;
}

.slide-fade-leave-active {
  transition: all .2s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}


.my-form {
  background-color: var(--content-bg) !important;
  box-shadow: none !important;
}


.my-table {
  background-color: var(--table-bg) !important;
}

.my-table thead,
.my-table thead tr {
  background-color: var(--table-header-bg) !important;
}

.my-table tbody tr,
.my-table .my-table-row,
.my-table tr {
  background-color: var(--table-stripe-bg) !important;
}

.my-table tbody tr:hover,
.my-table .my-table-row:hover {
  background-color: var(--table-hover-bg) !important;
}


.my-pagination,
.my-pagination.has-background {
  background-color: var(--content-bg) !important;
}


.app-container,
.my-row,
.my-col {
  background-color: var(--content-bg) !important;
}

</style>