<template>
  <MYScrollbar
    ref="scrollContainer"
    :vertical="false"
    :class="{ 'show-scrollbar': showScrollbar }"
    class="scroll-container"
    @wheel="handleScroll"
    :ScrollWidth="'5px'"
    thumbColor="#666"
    thumbHoverColor="#555"
  >
    <slot />
  </MYScrollbar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import useTagsViewStore from '@/store/modules/tagsView';
import { View } from '@/types/layout/ScrollPane';
import type { ComponentPublicInstance } from 'vue';

// Define the type for MYScrollbar component instance
interface ScrollbarInstance extends ComponentPublicInstance {
  $el: HTMLElement;
}

// Initialize ref with proper typing
const tagAndTagSpacing = ref(4);
const showScrollbar = ref(false);
const scrollContainer = ref<ScrollbarInstance | null>(null);

const scrollWrapper = computed(() => scrollContainer.value?.$el as HTMLElement | null);

onMounted(() => {
  const wrapper = scrollWrapper.value;
  if (wrapper) {
    wrapper.addEventListener('scroll', emitScroll, true);
    wrapper.addEventListener('mouseenter', () => {
      showScrollbar.value = true;
    });
    wrapper.addEventListener('click', () => {
      showScrollbar.value = true;
    });
    wrapper.addEventListener('mouseleave', () => {
      showScrollbar.value = false;
    });
  }
});

onBeforeUnmount(() => {
  const wrapper = scrollWrapper.value;
  if (wrapper) {
    wrapper.removeEventListener('scroll', emitScroll);
    wrapper.removeEventListener('mouseenter', () => {
      showScrollbar.value = true;
    });
    wrapper.removeEventListener('click', () => {
      showScrollbar.value = true;
    });
    wrapper.removeEventListener('mouseleave', () => {
      showScrollbar.value = false;
    });
  }
});

function handleScroll(e: WheelEvent) {
  e.preventDefault();
  const $scrollWrapper = scrollWrapper.value;
  if ($scrollWrapper) {
    const delta = e.deltaY || (e as any).wheelDelta / 120;
    const newScrollLeft = $scrollWrapper.scrollLeft + delta * 40;
    const maxScrollLeft = $scrollWrapper.scrollWidth - $scrollWrapper.offsetWidth;
    $scrollWrapper.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
  }
}

const emits = defineEmits<{
  (e: 'scroll'): void;
}>();

const emitScroll = () => {
  emits('scroll');
};

const tagsViewStore = useTagsViewStore();
const visitedViews = computed<View[]>(() => tagsViewStore.visitedViews);

function moveToTarget(currentTag: View) {
  const $container = scrollContainer.value?.$el as HTMLElement | null;
  const $scrollWrapper = scrollWrapper.value;
  if (!$container || !$scrollWrapper) return;

  const $containerWidth = $container.offsetWidth;
  let firstTag: View | null = null;
  let lastTag: View | null = null;

  if (visitedViews.value.length > 0) {
    firstTag = visitedViews.value[0];
    lastTag = visitedViews.value[visitedViews.value.length - 1];
  }

  if (firstTag?.path === currentTag.path) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag?.path === currentTag.path) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    const tagListDom = document.getElementsByClassName('tags-view-item') as HTMLCollectionOf<HTMLElement>;
    const currentIndex = visitedViews.value.findIndex(item => item.path === currentTag.path);
    let prevTag: HTMLElement | null = null;
    let nextTag: HTMLElement | null = null;

    for (let i = 0; i < tagListDom.length; i++) {
      const element = tagListDom[i];
      if (element.dataset.path === visitedViews.value[currentIndex - 1]?.path) {
        prevTag = element;
      }
      if (element.dataset.path === visitedViews.value[currentIndex + 1]?.path) {
        nextTag = element;
      }
    }

    if (!prevTag || !nextTag) return;

    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value;
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value;

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
}

defineExpose({
  moveToTarget,
});
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  overflow-x: auto !important;
  overflow-y: hidden !important;
}

.scroll-container:not(.show-scrollbar) {
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>