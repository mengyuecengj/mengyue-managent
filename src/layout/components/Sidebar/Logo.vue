<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <transition name="sidebarLogoFade">
      <!-- 展开状态：图片 + 文字始终显示 -->
      <router-link v-if="!collapse" key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title" :key="titleKey">{{ title }}</h1>
      </router-link>

      <!-- 收起状态：只显示图片（文字自动被 CSS 隐藏） -->
      <router-link v-else key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/images/gou.png'
import useSettingsStore from '@/store/modules/settings'

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})

const { t, locale } = useI18n()

const title = computed(() => t('app.title')) // eslint-disable-line

const titleKey = computed(() => {
  return typeof locale === 'string' ? locale : locale.value || 'zh-CN'
})

const settingsStore = useSettingsStore()
const sideTheme = computed(() => settingsStore.sideTheme)

const getLogoBackground = computed(() => {
  if (settingsStore.isDark) return 'var(--sidebar-bg)'
  return sideTheme.value === 'theme-dark' ? 'var(--menu-bg)' : 'var(--menu-light-bg)'
})

const getLogoTextColor = computed(() => {
  if (settingsStore.isDark) return 'var(--sidebar-logo-text)'
  return sideTheme.value === 'theme-dark' ? '#fff' : 'var(--menu-light-text)'
})
</script>

<style lang="scss" scoped>
@use '@/scss/variables.base.scss';

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: v-bind(getLogoBackground);
  text-align: center;
  overflow: hidden;


  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }

    & .sidebar-title {
      margin: 0;
      color: v-bind(getLogoTextColor);
      font-weight: 600;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      white-space: nowrap;
    }
  }

  &.collapse {
    .sidebar-logo-link {
      justify-content: center;
      gap: 0;
    }

    .sidebar-title {
      display: none;
    }
  }
}
</style>