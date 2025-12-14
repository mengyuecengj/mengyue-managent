<template>
  <div class="chart-block" 
    :style="{
      position: 'absolute',
      left: block.x + 'px',
      top: block.y + 'px',
      width: block.width + 'px',
      height: block.height + 'px',
      zIndex: block.zIndex,
    }" 
    :class="{ 
      active: isSelected,
      'border-type': block.rendererType === 'border'
    }"
    v-if="block.visible"
    @mousedown.stop="startDrag"
  >
    <TextRenderer v-if="block.rendererType === 'text'" 
      :config="block.config" 
      :width="parseInt(block.width)" 
      :height="parseInt(block.height)"
    />
    
    <BarChartRenderer v-else-if="block.rendererType === 'chart'" :config="block.config" :color="block.color" />
    <BorderRenderer v-else-if="block.rendererType === 'border'" 
      :component="block.component" 
      :config="block.config" 
      :width="parseInt(block.width)" 
      :height="parseInt(block.height)"
      :color="block.config.color"
      :backgroundColor="block.backgroundColor"
    />
    <MapChartRenderer 
      v-else-if="block.rendererType === 'map'" 
      :config="block.config"
      :width="parseInt(block.width)" 
      :height="parseInt(block.height)"
      :component="block.component"
    />

    <DecorateRenderer
      v-else-if="block.rendererType === 'decoration'"
      :config="block.config"
      :component="block.component"
      :width="parseInt(block.width)"
      :height="parseInt(block.height)" 
    />
    <div class="resize-handle" @mousedown.stop="startResize" />
  </div>
</template>
<script setup lang="ts">
import BarChartRenderer from '@/components/dashboard/renderers/BarChartRenderer.vue'
import BorderRenderer from '@/components/dashboard/renderers/BorderRenderer.vue'
import TextRenderer from '@/components/dashboard/renderers/TextRenderer.vue'
import MapChartRenderer from '@/components/dashboard/renderers/MapChartRenderer.vue';
import DecorateRenderer from '@/components/dashboard/renderers/DecorateRenderer.vue';
import { useDashboardStore } from '@/store/modules/dashboard'

const props = defineProps<{ block: any }>()
const store = useDashboardStore()

const isSelected = computed(() => store.selectedId === props.block.id)
const previewMode = computed(() => store.previewMode)

// 拖拽
const startDrag = (e: MouseEvent) => {
  if (previewMode.value) return;

  // ⭐ 点击 block 时选中它
  store.selectBlock(props.block.id)

  // 避免点击 resize handle 时触发选中
  if ((e.target as HTMLElement).closest('.resize-handle')) return

  const startX = e.clientX - props.block.x
  const startY = e.clientY - props.block.y

  const move = (e: MouseEvent) => {
    store.updateBlock(props.block.id, {
      x: e.clientX - startX,
      y: e.clientY - startY
    })
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}


// 缩放
const startResize = (e: MouseEvent) => {
  if (previewMode.value) return

  const startX = e.clientX
  const startY = e.clientY
  const startW = parseInt(props.block.width)
  const startH = parseInt(props.block.height)

  const move = (e: MouseEvent) => {
    const w = startW + (e.clientX - startX)
    const h = startH + (e.clientY - startY)
    store.updateBlock(props.block.id, {
      width: Math.max(200, w).toString(),
      height: Math.max(100, h).toString()
    })
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>

<style scoped>
.chart-block {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  /* box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4); */
  cursor: move;
  user-select: none;
  height: fit-content; /* 新增：适应内容高度 */
}

.chart-block.active {
  border-color: #409eff;
  /* box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.3), 0 8px 30px rgba(0, 0, 0, 0.6); */
  height: fit-content; /* 适应内容 */
}

/* 边框特定样式：更小 min-height，避免过高 */
.chart-block.border-type {
  min-height: 100px; /* 调整为边框期望最小高，根据您的图片约 100-150px */
}

.chart-block.border-type.active {
  min-height: 100px;
}

.resize-handle {
  position: absolute;
  right: -10px;
  /* 扩大点击区域 */
  bottom: -10px;
  width: 30px;
  /* 更大的透明触发区 */
  height: 30px;
  cursor: se-resize;
}

.resize-handle::after {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 8px;
  height: 8px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
}
</style>