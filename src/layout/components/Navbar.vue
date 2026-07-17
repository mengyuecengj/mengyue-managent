<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSidebar"
    />

    <breadcrumb
      v-if="settingsStore.breadcrumb && !settingsStore.topNav"
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <!-- 搜索 -->
        <header-search id="header-search" class="right-menu-item" />

        <!-- 全屏 -->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!-- 主题切换 -->
        <div
          class="right-menu-item hover-effect theme-switch-wrapper"
          @click="toggleTheme"
        >
          <svg-icon
            v-if="settingsStore.isDark"
            icon-class="sunny"
            style="width: 16px; height: 16px"
          />
          <svg-icon v-else icon-class="moon" />
        </div>

        <!-- <size-select id="size-select" /> -->

        <div class="right-menu-item hover-effect">
          <MYDropdown
            trigger="click"
            placement="bottom-end"
            @command="changeLanguage"
            textColor="var(--navbar-text)"
            backgroundColor="var(--navbar-bg) !important"
            noCaret
          >
            <template #default>
              <MYText size="16px" color="var(--navbar-text)">中/A</MYText>
            </template>

            <template #dropdown>
              <MYDropdown-item command="zh-CN">简体中文</MYDropdown-item>
              <MYDropdown-item command="en-US">English</MYDropdown-item>
            </template>
          </MYDropdown>
        </div>
      </template>

      <!-- 用户头像 + 下拉菜单 -->
      <div class="avatar-container">
        <MYDropdown
          @command="handleCommand"
          class="right-menu-item"
          trigger="click"
          placement="bottom-end"
          textColor="var(--navbar-text)"
          backgroundColor="var(--navbar-bg)"
          noCaret
        >
          <template #default>
            <img :src="userStore.avatar" class="user-avatar" />
          </template>

          <template #dropdown>
            <router-link to="/user/profile" class="a_link">
              <MYDropdown-item>{{ $t('person.personCenter') }}</MYDropdown-item>
            </router-link>

            <MYDropdown-item
              command="setLayout"
              v-if="settingsStore.showSettings"
            >
              <span>{{ $t('person.layoutSettings') }}</span>
            </MYDropdown-item>

            <MYDropdown-item divided command="logout">
              <span>{{ $t('person.logout') }}</span>
            </MYDropdown-item>
          </template>
        </MYDropdown>
      </div>
    </div>
  </div>

  <SettingsDrawer v-model="showSettingsDrawer" />
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus"
import { useI18n } from "vue-i18n"

import Breadcrumb from "@/components/Breadcrumb/index.vue"
import Hamburger from "@/components/Hamburger/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import SizeSelect from "@/components/SizeSelect/index.vue"
import SettingsDrawer from "@/layout/components/Settings/index.vue"

import useAppStore from "@/store/modules/app"
import useUserStore from "@/store/modules/user"
import useSettingsStore from "@/store/modules/settings"

import svgIcon from "@/components/SvgIcon/index.vue"

const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const router = useRouter()

const showSettingsDrawer = ref(false)

/* i18n */
const { locale } = useI18n()

/* sidebar */
function toggleSidebar() {
  appStore.toggleSidebar()
}

/* dropdown command */
function handleCommand(command: any) {
  switch (command) {
    case "setLayout":
      setLayout()
      break
    case "logout":
      logout()
      break
  }
}

/* 退出登录 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const currentPath = router.currentRoute.value.fullPath

      userStore.logOut().then(() => {
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
      })
    })
    .catch(() => {})
}

/* 布局设置 */
function setLayout() {
  showSettingsDrawer.value = true
}

/* 主题切换 */
function toggleTheme() {
  settingsStore.toggleTheme()
}

/* 🌐 切换语言 */
function changeLanguage(lang: string) {
  locale.value = lang
  localStorage.setItem("lang", lang)

  // 强制刷新确保菜单/组件刷新
  location.reload()
}
</script>

<style lang="scss" scoped>
.my-dropdown-item:hover {
  background: #414857;
}
</style>
