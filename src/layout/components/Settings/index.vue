<template>
  <MYDrawer class="setting-drawer">
    <!-- 标题 -->
    <div class="drawer-header">
      <h2>{{ $t('settings.title') }}</h2>
      <p class="desc">{{ $t('settings.desc') }}</p>
    </div>

    <!-- 默认主题切换 -->
    <div class="setting-card">
      <div class="card-title">
        <span>🌗 {{ $t('settings.defaultThemeToggle') }}</span>
        <div class="theme-switch-wrapper" @click="toggleTheme">
          <svg-icon v-if="settingsStore.isDark" icon-class="sunny" style="width: 18px; height: 18px" />
          <svg-icon v-else icon-class="moon" />
        </div>
      </div>
    </div>

    <!-- 系统主色 -->
    <div class="setting-card">
      <div class="card-title">🎨 {{ $t('settings.primaryColor') }}</div>

      <div class="color-group">
        <div class="group-title">{{ $t('settings.lightRecommend') }}</div>
        <div class="theme-colors">
          <div v-for="color in systemLight" :key="color" class="color-item" :style="{ backgroundColor: color, '--check-color': contrastFor(color) }"
            :class="{ active: settingsStore.theme === color }" @click="changeTheme('system', color)">
            <span v-if="settingsStore.theme === color" class="check">✓</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <div class="group-title">{{ $t('settings.darkRecommend') }}</div>
        <div class="theme-colors">
          <div v-for="color in systemDark" :key="color" class="color-item" :style="{ backgroundColor: color, '--check-color': contrastFor(color) }"
            :class="{ active: settingsStore.theme === color }" @click="changeTheme('system', color)">
            <span v-if="settingsStore.theme === color" class="check">✓</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧背景主题 -->
    <div class="setting-card">
      <div class="card-title">🖼 {{ $t('settings.topbarTheme') }}</div>
      <div class="theme-colors">
        <div v-for="color in topbarColors" :key="color" class="color-item" :style="{ backgroundColor: color, '--check-color': contrastFor(color) }"
          :class="{ active: settingsStore.topbarTheme === color }" @click="changeTheme('topbar', color)">
          <span v-if="settingsStore.topbarTheme === color" class="check">✓</span>
        </div>
      </div>
    </div>

    <!-- 菜单主题 -->
    <div class="setting-card">
      <div class="card-title">📂 {{ $t('settings.menuTheme') }}</div>
      <div class="theme-colors">
        <div v-for="color in menuColors" :key="color" class="color-item" :style="{ backgroundColor: color, '--check-color': contrastFor(color) }"
          :class="{ active: settingsStore.menuTheme === color }" @click="changeTheme('menu', color)">
          <span v-if="settingsStore.menuTheme === color" class="check">✓</span>
        </div>
      </div>
    </div>

    <MYBorder borderColor="#000" />

    <!-- 界面设置 -->
    <div class="drawer-header small">
      <h2>{{ $t('settings.interfaceSettings') }}</h2>
    </div>
    <div class="drawer-item">
      <span>{{ $t('settings.enableTagsView') }}</span>
      <MYSwitch size="supersmall" v-model="settingsStore.tagsView" />
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.showLogo') }}</span>
      <MYSwitch size="supersmall" v-model="settingsStore.sidebarLogo" />
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.showBreadcrumb') }}</span>
      <MYSwitch size="supersmall" v-model="settingsStore.breadcrumb" />
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.compactMode') }}</span>
      <MYSwitch size="supersmall" v-model="settingsStore.compactMode" />
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.pageAnimation') }}</span>
      <MYSwitch size="supersmall" v-model="settingsStore.pageAnimation" />
    </div>

    <div class="action-group">
      <MYButton type="info" @click="resetThemeConfig">
        {{ $t('settings.resetConfig') }}
      </MYButton>
    </div>
  </MYDrawer>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import useSettingStore from '@/store/modules/settings'

const settingsStore = useSettingStore()


const systemLight = [
  '#409EFF', '#5B7CFF', '#13C2C2', '#4CAF50', '#1890FF', '#FF9800',
  '#E91E63', '#00BCD4', '#8BC34A', '#FF5722', '#9C27B0', '#03A9F4',
  '#00C853', '#B2FF59', '#FFEB3B', '#FFC107', '#FF5252', '#D500F9',
  '#2E7D32', '#1E88E5'
]

const systemDark = [
  '#1E4A8C', '#722ED1', '#2C5AA0', '#0A3D62', '#304156', '#5C6BC0',
  '#880E4F', '#37474F', '#263238', '#311B92', '#01579B', '#33691E',
  '#BF360C', '#4A148C', '#006064', '#827717', '#B71C1C', '#1A237E',
  '#3E2723', '#0D47A1'
]

const topbarColors = [
  '#FFFFFF', '#F5F7FA', '#EEF1F6', '#E8EAF6', '#E3F2FD', '#E0F2F1',
  '#E8F5E9', '#FFF3E0', '#FFEBEE', '#081018', '#0a1017', '#1F2A44',
  '#26334A', '#304156', '#2C3E50', '#37474F', '#424242', '#212121',
  '#546E7A', '#455A64'
]

const menuColors = [
  '#001529', '#0a1017', '#1F2D3D', '#26334A', '#304156', '#2C3E50',
  '#37474F', '#000000', '#0D1117', '#161B22', '#21252B', '#282C34',
  '#1C1F23', '#24292E', '#2F3640', '#353B48', '#404A59', '#4C566A',
  '#434C5E', '#5E81AC'
]

const THEME_KEY = 'app-theme-settings'

const changeTheme = (
  type: 'system' | 'topbar' | 'menu',
  color: string
) => {
  if (type === 'system') {
    settingsStore.theme = color;
  } else if (type === 'topbar') {
    settingsStore.topbarTheme = color;
  } else if (type === 'menu') {
    settingsStore.menuTheme = color;
  }
  settingsStore.applyTheme();
  saveThemeToStorage()
}

// 存储
const saveThemeToStorage = () => {
  localStorage.setItem(
    THEME_KEY,
    JSON.stringify({
      theme: settingsStore.theme,
      topbarTheme: settingsStore.topbarTheme,
      menuTheme: settingsStore.menuTheme
    })
  )
}

const loadThemeFromStorage = () => {
  const saved = localStorage.getItem(THEME_KEY)
  if (!saved) return
  try {
    const data = JSON.parse(saved)
    if (data.theme) changeTheme('system', data.theme)
    if (data.topbarTheme) changeTheme('topbar', data.topbarTheme)
    if (data.menuTheme) changeTheme('menu', data.menuTheme)
  } catch (e) { }
}

onMounted(() => {
  loadThemeFromStorage()
  settingsStore.applyTheme()
})

const lightDefaults = {
  theme: '#409EFF',
  topbarTheme: '#ffffff',
  menuTheme: '#304156'
}

const darkDefaults = {
  theme: '#409EFF',
  topbarTheme: '#081018',
  menuTheme: '#0a1017'
}

function toggleTheme() {
  settingsStore.toggleTheme()
  settingsStore.applyTheme()
  saveThemeToStorage()
}

const resetThemeConfig = () => {
  const defaults = settingsStore.isDark
    ? darkDefaults
    : lightDefaults

  settingsStore.theme = defaults.theme
  settingsStore.topbarTheme = defaults.topbarTheme
  settingsStore.menuTheme = defaults.menuTheme
  settingsStore.applyTheme()
  saveThemeToStorage()
}

const contrastFor = (hex: string) => {
  // settingsStore.shouldUseWhiteText 是 store 的方法，直接调用
  return settingsStore.shouldUseWhiteText(hex) ? '#ffffff' : '#000000'
}
</script>

<style scoped>
.setting-drawer {
  padding: 24px;
}

.drawer-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-content);
}

.drawer-header.small h2 {
  font-size: 16px;
}

.desc {
  font-size: 13px;
  color: var(--text-color-content);
  margin-top: 4px;
  opacity: 0.7;
}

.setting-card {
  background: var(--content-bg, #fff);
  padding: 18px;
  border-radius: 14px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all .25s ease;
}

.setting-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, .06);
}

.card-title {
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color-content)
}

.card-title span {
  color: var(--text-color-content)
}

.group-title {
  font-size: 13px;
  color: var(--text-color-content);
  opacity: 0.7;
  margin: 12px 0 8px;
}

.theme-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.color-item {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  position: relative;
}

.color-item:hover {
  transform: translateY(-3px);
}

.color-item.active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.2);
}

.check {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
}

.drawer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.drawer-item span {
  color: var(--text-color-content);
}

.action-group {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-group .my-button {
  width: 100%;
}
</style>