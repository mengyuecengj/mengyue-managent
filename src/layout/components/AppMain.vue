<template>
    <section class="app-main">
        <router-view v-slot="{ Component, route }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="tagsViewStore.cachedViews">
                    <component v-if="!route.meta.link" :is="Component" :key="route.path" />
                </keep-alive>
            </transition>
        </router-view>
        <iframe-toggle />
    </section>
</template>

<script setup lang="ts">
import iframeToggle from '@/layout/components/IframeToggle/index.vue';
import useTagsViewStore from '@/store/modules/tagsView';
const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
.app-main {
    // 跟随右侧背景主题
    background: var(--content-bg);
    transition: background 0.3s ease;

    min-height: calc(100% - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        min-height: calc(100vh - 84px);
    }
    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 6px;
    }
}
</style>