<template>
  <div class="props-panel">
    <div v-if="!selectedBlock" class="global-props">
      <div class="prop-group">
        <MYForm class="operation-list" v-model="screen">
          <MYForm-item label="大屏宽度">
            <MYInput
              v-model="screen.width"
              placeholder="请输入宽度"
              type="number"
            />
          </MYForm-item>
          
          <MYForm-item label="大屏高度">
            <MYInput
              v-model="screen.height"
              placeholder="请输入高度"
              type="number"
            />
          </MYForm-item>
          
          <MYForm-item label="大屏标题">
            <MYInput
              v-model="screen.title"
              placeholder="请输入标题"
            />
          </MYForm-item>
          
          <MYForm-item label="背景颜色">
            <MYSelect-color v-model="screen.backgroundColor" />
          </MYForm-item>
        </MYForm>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDashboardStore } from '@/store/modules/dashboard'

const dashboardStore = useDashboardStore()
const { screen, blocks, selectedId } = storeToRefs(dashboardStore)

const selectedBlock = computed(() => {
  return selectedId.value ? blocks.value.find(b => b.id === selectedId.value) : null
})

watch(screen, (val) => {
  const canvas = document.querySelector('.canvas-placeholder') as HTMLElement | null
  if (!canvas) return

  canvas.style.backgroundColor = val.backgroundColor
  canvas.style.backgroundImage = val.backgroundImage ? `url(${val.backgroundImage})` : 'none'
  canvas.style.backgroundSize = 'cover'
  canvas.style.backgroundPosition = 'center'
  
  canvas.style.width = `${val.width}px`
  canvas.style.height = `${val.height}px`
}, { deep: true })
</script>
