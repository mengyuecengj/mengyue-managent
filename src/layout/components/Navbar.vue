<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="appStore.sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSidebar" />

    <breadcrumb v-if="!settingsStore.topNav" id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <header-search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <div class="right-menu-item hover-effect theme-switch-wrapper" @click="toggleTheme">
          <svg-icon v-if="settingsStore.isDark" icon-class="sunny" style="width: 16px; height: 16px" />
          <svg-icon v-else icon-class="moon" />
        </div>

        <size-select id="size-select" />
      </template>

      <!-- 用户头像 + 下拉菜单 -->
      <div class="avatar-container">
        <MYDropdown @command="handleCommand" class="right-menu-item" trigger="click" placement="bottom-end"
          textColor="var(--navbar-text)" backGroundColor="var(--navbar-bg)" noCaret>
          <template #default>
            <img :src="userStore.avatar" class="user-avatar" />
            <!-- caret-bottom -->
          </template>
          <template #dropdown>
            <router-link to="/user/profile" class="a_link">
              <MYDropdown-item>个人中心</MYDropdown-item>
            </router-link>
            <!-- 布局设置 -->
            <!-- <MYDropdown-item command="setLayout" v-if="settingsStore.showSettings">
              <span>布局设置</span>
            </MYDropdown-item> -->
            <MYDropdown-item divided command="logout">
              <span>退出登录</span>
            </MYDropdown-item>
          </template>
        </MYDropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import svgIcon from '@/components/SvgIcon/index.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const router = useRouter()

function toggleSidebar() {
  appStore.toggleSidebar()
}

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

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const currentPath = router.currentRoute.value.fullPath;
    userStore.logOut().then(() => {
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`); // encode 以防特殊字符
    })
  }).catch(() => { })
}

// 触发父组件事件
const emit = defineEmits(['setLayout'])
function setLayout() {
  emit('setLayout')
}

function toggleTheme() {
  settingsStore.toggleTheme()
}
</script>

<style lang="scss" scoped>
.my-dropdown-item:hover {
  background: #414857;
}
</style>
