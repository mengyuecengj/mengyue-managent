<script setup lang="ts">
import { watch, nextTick, ref, markRaw, onMounted } from 'vue'
import type { Component } from 'vue'

interface Props {
  component: Component
  config?: Record<string, any>
  width:  string | number | undefined
  height: string | number | undefined
}

const props = defineProps<Props>()

const borderRef = ref<any>(null)
const key = ref(0) // 用于强制重新渲染
const rawComponent = markRaw(props.component)

// 尝试调用组件的各种更新方法
const updateComponent = () => {
  const comp = borderRef.value
  if (!comp) return false
  
  let updated = false
  
  // 尝试调用各种可能的更新方法
  if (typeof comp.mergeConfig === 'function') {
    comp.mergeConfig(props.config || {})
    updated = true
  }
  
  if (typeof comp.updateBegin === 'function') {
    comp.updateBegin()
    updated = true
  }
  
  if (typeof comp.update === 'function') {
    comp.update()
    updated = true
  }
  
  if (typeof comp.resize === 'function') {
    comp.resize()
    updated = true
  }
  
  if (typeof comp.initWH === 'function') {
    comp.initWH()
    updated = true
  }
  
  // 对于没有任何更新方法的组件，返回false表示需要强制重新渲染
  return updated
}

// 处理配置变化
watch(
  () => props.config,
  async (newConfig) => {
    if (!newConfig) return
    
    await nextTick()
    
    // 尝试更新组件
    const updated = updateComponent()
    
    // 如果组件没有提供更新方法，强制重新渲染
    if (!updated) {
      key.value += 1
    }
  },
  { deep: true, immediate: true }
)

// 处理尺寸变化
watch(
  [() => props.width, () => props.height],
  async () => {
    await nextTick()
    
    // 尝试更新组件
    const updated = updateComponent()
    
    // 如果组件没有提供更新方法，强制重新渲染
    if (!updated) {
      key.value += 1
    }
  },
  { immediate: true }
)

// 组件挂载时初始化
onMounted(() => {
  nextTick(() => {
    updateComponent()
  })
})
</script>

<template>
  <div
    class="border-renderer"
    :style="{ width: props.width + 'px', height: props.height + 'px' }"
  >
    <component
      :is="rawComponent"
      :key="key"
      ref="borderRef"
      v-bind="props.config || {}"
      :width="props.width"
      :height="props.height"
      style="width: 100%; height: 100%; display: block;"
    >
      <slot />
    </component>
  </div>
</template>

<style scoped>
.border-renderer {
  position: relative;
  overflow: hidden;
}
</style>