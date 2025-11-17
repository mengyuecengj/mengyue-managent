<template>
  <!-- 打开抽屉 -->
  <MYDrawer v-model="showSettings" :withHeader="false" direction="rtl" size="300px" backgroundColor="var(--general-two)">
    <div class="setting-drawer-title">
      <h3 class="drawer-title">主题风格设置</h3>
    </div>
    <div class="drawer-item">
      <span>主题颜色</span>
      <span class="comp-style">
        <MYSelect-color v-model="theme" :predefine="predefineColors" @change="themeChange" />
      </span>
    </div>

    <span class="drawer-item">
      <h3>系统布局配置</h3>
    </span>

    <div class="drawer-item">
      <span>开启 TopNav</span>
      <span class="comp-style">
        <MYSwitch size="supersmall" :modelValue="settingsStore.topNav" @change="topNavChange" />
      </span>
    </div>

    <div class="drawer-item">
      <span>开启 Tags-Views</span>
      <span class="comp-style">
        <MYSwitch size="supersmall" v-model="settingsStore.tagsView" />
      </span>
    </div>

    <div class="drawer-item">
      <span>固定 Header</span>
      <span class="comp-style">
        <MYSwitch size="supersmall" v-model="settingsStore.fixedHeader" />
      </span>
    </div>

    <div class="drawer-item">
      <span>显示 Logo</span>
      <span class="comp-style">
        <MYSwitch size="supersmall" v-model="settingsStore.sidebarLogo" />
      </span>
    </div>

    <MYBorder borderColor="#434343" />

    <div style="margin-top: 10px; display: flex; justify-content: center;">
      <MYButton style="margin-right: 10px;" type="primary" icon="MYOdometerText" @click="saveSetting">保存配置</MYButton>
      <MYButton type="info" icon="MYLoadingA" @click="resetSetting">重置配置</MYButton>
    </div>
  </MYDrawer>
</template>

<script setup lang="ts">
import modal from '@/plugins/modal'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'
import { handleThemeStyle } from '@/utils/theme'
import { MYSwitch } from 'mengyue-plus'
import { onMounted, ref, computed } from 'vue'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const showSettings = ref(false)
const theme = ref('#409EFF') // 初始值先设默认蓝色
const sideTheme = ref(settingsStore.sideTheme)
const storeSettings = computed(() => settingsStore)
const predefineColors = ref([
  '#409EFF',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])

// ✅ 从 localStorage 恢复主题（避免刷新后被重置）
onMounted(() => {
  try {
    const layoutSetting = localStorage.getItem('layout-setting')
    if (layoutSetting) {
      const settings = JSON.parse(layoutSetting)
      if (settings.theme) {
        theme.value = settings.theme
        settingsStore.theme = settings.theme
        handleThemeStyle(settings.theme)
      }
    } else {
      // 如果没有缓存，使用 store 默认值
      theme.value = settingsStore.theme
      handleThemeStyle(settingsStore.theme)
    }
  } catch (e) {
    console.error('Failed to load theme from localStorage', e)
  }
})

/** 是否需要topnav */
function topNavChange(val: any) {
  if (!val) {
    appStore.toggleSideBarHide(false)
    permissionStore.setSidebarRouters(permissionStore.defaultRoutes)
  }
}

function themeChange(val: any) {
  settingsStore.theme = val
  handleThemeStyle(val)
}

function handleTheme(val: any) {
  settingsStore.sideTheme = val
  sideTheme.value = val
}

function saveSetting() {
  modal.loading('正在保存到本地，请稍候...')
  const layoutSetting = {
    topNav: storeSettings.value.topNav,
    tagsView: storeSettings.value.tagsView,
    fixedHeader: storeSettings.value.fixedHeader,
    sidebarLogo: storeSettings.value.sidebarLogo,
    dynamicTitle: storeSettings.value.dynamicTitle,
    sideTheme: storeSettings.value.sideTheme,
    theme: storeSettings.value.theme
  }
  localStorage.setItem('layout-setting', JSON.stringify(layoutSetting))
  setTimeout(() => modal.closeLoading(), 1000)
}

function resetSetting() {
  modal.loading('正在清除设置缓存并刷新，请稍候...')
  localStorage.removeItem('layout-setting')
  setTimeout('window.location.reload()', 1000)
}

function openSetting() {
  showSettings.value = true
}

defineExpose({
  openSetting
})
</script>

<style lang="scss" scoped>
.setting-drawer-title {


  .drawer-title {
    font-size: 20px;
    color: var(--general);
  }
}

.setting-drawer-block-checbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;

  .setting-drawer-block-checbox-item {
    position: relative;
    margin-right: 16px;
    border-radius: 2px;
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
    }

    .setting-drawer-block-checbox-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      padding-left: 24px;
      color: #1890ff;
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.drawer-item {
  color: var(--general);
  // color: var(--el-text-color-regular, rgba(0, 0, 0, 0.65));
  padding: 12px 0;


  .comp-style {
    float: right;
    margin: -3px 8px 0px 0px;
  }
}
</style>
