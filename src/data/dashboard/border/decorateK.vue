<template>
  <div 
    ref="containerRef" 
    class="decoration-container" 
    small-bg
  >
    <div class="decoration-wrapper" :style="{ transform: `scale(${scale})` }">
      <dv-decoration-12 />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const containerRef = ref<HTMLElement | null>(null);
const scale = ref(1);
let resizeObserver: ResizeObserver | null = null;

const updateScale = () => {
  if (!containerRef.value) return;
  
  const { width, height } = containerRef.value.getBoundingClientRect();
  const baseSize = 150; // 原始尺寸
  const targetSize = Math.min(width, height);
  
  // 计算缩放比例，保持1:1宽高比
  scale.value = targetSize / baseSize;
};

onMounted(() => {
  if (containerRef.value) {
    // 初始化尺寸
    updateScale();
    
    // 监听尺寸变化
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateScale);
      resizeObserver.observe(containerRef.value);
    } else {
      window.addEventListener('resize', updateScale);
    }
  }
});

onUnmounted(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
    resizeObserver.disconnect();
  } else {
    window.removeEventListener('resize', updateScale);
  }
});
</script>

<style scoped>
.decoration-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.decoration-wrapper {
  width: 150px;
  height: 150px;
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>