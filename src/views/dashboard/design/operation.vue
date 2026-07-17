<template>
  <div class="props-panel">
    <div v-if="!selectedBlock" class="global-props">
      <div class="prop-group">
        <MYForm class="operation-list" v-model="screen">
          <MYForm-item :label="$t('dashboard.operation.screenWidth')">
            <MYInput
              v-model="screen.width"
              :placeholder="$t('dashboard.operation.screenWidth')"
              type="number"
            />
          </MYForm-item>
          
          <MYForm-item :label="$t('dashboard.operation.screenHeight')">
            <MYInput
              v-model="screen.height"
              :placeholder="$t('dashboard.operation.screenHeight')"
              type="number"
            />
          </MYForm-item>
          
          <MYForm-item :label="$t('dashboard.operation.screenTitle')">
            <MYInput
              v-model="screen.title"
              :placeholder="$t('dashboard.operation.screenTitle')"
            />
          </MYForm-item>
          
          <MYForm-item :label="$t('dashboard.operation.backgroundColor')">
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