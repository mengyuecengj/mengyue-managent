<template>
  <div class="tags-view-container">
    <!-- 横向滚动容器：渲染标签 -->
    <ScrollTags ref="scrollPaneRef">
      <!-- Vue 模板自动解包顶层 refs，所以直接使用 tags -->
      <div v-if="tags.length === 0" class="tags-empty">无标签</div>

      <router-link
        v-for="tag in tags"
        :key="tag.fullPath"
        :to="{ path: tag.path, query: tag.query, hash: tag.hash }"
        class="tag-item"
        :class="{ active: isActive(tag) }"
        :data-path="tag.fullPath"
        @click.middle.prevent="onMiddleClick(tag)"
        @contextmenu.prevent="openContextMenu(tag, $event)"
      >
        <span class="tag-indicator" />
        <span class="tag-content">{{ tag.title }}</span>
        <MYButton class="close-btn" @click.stop.prevent="onClose(tag)">×</MYButton>
      </router-link>
    </ScrollTags>

    <!-- 右键菜单（Teleport 到 body） -->
    <Teleport to="body">
      <Transition name="fade">
        <ul
          v-show="menuVisible"
          class="context-menu"
          :style="{ left: `${menuLeft}px`, top: `${menuTop}px` }"
          role="menu"
          @keydown.esc="contextClose()"
        >
          <li role="menuitem" @click.prevent.stop="handleRefresh">
            <MYLoadingA class="li-icon"></MYLoadingA>
            <span>刷新页面</span>
          </li>
          <li role="menuitem" @click.prevent.stop="onCloseSelected">
            <MYClose class="li-icon"></MYClose>
            <span>关闭当前</span>
          </li>
          <li role="menuitem" @click.prevent.stop="closeOthers">
            <MYCircleXmark class="li-icon"></MYCircleXmark>
            <span>关闭其他</span>
          </li>
          <li role="menuitem" @click.prevent.stop="closeLeft">
            <MYArrowLeft class="li-icon"></MYArrowLeft>
            <span>关闭左侧</span>
          </li>
          <li role="menuitem" @click.prevent.stop="closeRight">
            <MYArrowRight class="li-icon"></MYArrowRight>
            <span>关闭右侧</span>
          </li>
          <li role="menuitem" @click.prevent.stop="closeAll">
            <MYClose class="li-icon"></MYClose>
            <span>全部关闭</span>
          </li>
        </ul>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/**
 * 完整 TagsView.vue
 * 修复说明：
 * - 确保从 hook 导入路径正确（@/hooks/useTags）
 * - 将 context 内部的 refs 解构为组件顶层变量（menuVisible/menuLeft/menuTop/selectedTag）
 * - 使用 wrapper 方法（handleRefresh/contextClose）确保传入正确值并与 hook API 对齐
 */
import ScrollTags from './ScrollPane.vue'
import { useTags } from '@/hooks/useViewTags'

// useTags 返回一个对象（不要一次性解构以保留类型），然后我们把需要的字段提取为顶层变量
const tagsCtx = useTags()

// 提取常用 API / 数据
const tags = tagsCtx.tags
const isActive = tagsCtx.isActive
const onClose = tagsCtx.onClose
const onMiddleClick = tagsCtx.onMiddleClick
const onRefresh = tagsCtx.onRefresh
const onCloseSelected = tagsCtx.onCloseSelected
const closeOthers = tagsCtx.closeOthers
const closeLeft = tagsCtx.closeLeft
const closeRight = tagsCtx.closeRight
const closeAll = tagsCtx.closeAll
const openContextMenu = tagsCtx.openContextMenu
const registerScrollRef = tagsCtx.registerScrollRef

// 把 context 的内部 refs 解构为组件顶层变量，这样模板会自动解包（无需 .value）
const menuVisible = tagsCtx.context.visible
const menuLeft = tagsCtx.context.left
const menuTop = tagsCtx.context.top
const selectedTag = tagsCtx.context.selectedTag

// ScrollTags 组件引用（注册给 hook 以便 hook 在路由变化时滚动到当前标签）
const scrollPaneRef = ref<any>(null)

// wrappers
function handleRefresh() {
  // selectedTag 是一个 ref（顶层），传入实际值给 hook 的 onRefresh
  onRefresh(selectedTag.value ?? null)
}

function contextClose() {
  // 调用 hook 暴露的 close 方法（若 hook 里有单独 close 函数也可直接调用）
  // tagsCtx.context.close() 也是可行，但我们做一层 wrapper 更直观
  tagsCtx.context.close()
}

onMounted(() => {
  registerScrollRef(scrollPaneRef)
})
</script>
