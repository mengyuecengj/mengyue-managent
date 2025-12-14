<script setup lang="ts">
import { markRaw, ref, watch, onMounted } from 'vue'
import type { Component } from 'vue'

interface Props {
  component: Component
  config?: Record<string, any>
  width: number
  height: number
  color?: string[]
  backgroundColor?: string
}

const props = defineProps<Props>()

const borderRef = ref<any>(null)
const keyRef = ref(0)

const rawComponent = markRaw(props.component)

const safeResize = () => {
  const comp = borderRef.value
  if (!comp) return

  if (typeof comp.resize === 'function') {
    comp.resize()
  } else if (typeof comp.initWH === 'function') {
    comp.initWH()
  }
}

onMounted(safeResize)

watch(
  [() => props.width, () => props.height],
  safeResize,
)

watch(
  () => props.config,
  (newVal) => {
    console.log('config changed', newVal)
    keyRef.value++
  },
  { deep: true }
)

// 监听颜色变化
watch(
  () => props.color,
  (newVal) => {
    if (newVal) {
      keyRef.value++
    }
  },
  { deep: true }
)
</script>

<template>
  <div 
    class="border-renderer" 
    :style="{ 
      width: props.width + 'px', 
      height: props.height + 'px',
      backgroundColor: props.backgroundColor || 'transparent'
    }"
  >
    <component 
      :is="rawComponent"
      :key="`${props.color?.join('') || 'default'}`"
      ref="borderRef"
      :width="props.width"
      :height="props.height"
      v-bind="props.config"
      style="width: 100%; height: 100%;"
    >
      <slot></slot>
    </component>
  </div>
</template>

<style scoped>
.border-renderer {
  position: relative;
  overflow: hidden;
}
</style>