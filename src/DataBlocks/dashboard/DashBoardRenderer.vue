<script setup lang="ts">
import BarChartRenderer from '@/components/dashboard/renderers/BarChartRenderer.vue'

import type { ChartConfig } from '@/data/dashboard/barChart'

interface BlockItem {
  id: string
  type: string 
  config: ChartConfig
}

const props = defineProps<{
  blocks: BlockItem[]
}>()


const rendererMap: Record<string, any> = {
  'basic-bar': BarChartRenderer,
  'horizontal-bar': BarChartRenderer,
  'stacked-bar': BarChartRenderer,
  'capsule-bar': BarChartRenderer,
  'line-bar': BarChartRenderer,
  'percent-bar': BarChartRenderer
}
</script>

<template>
  <div class="dashboard-renderer">
    <component v-for="block in blocks" :key="block.id" :is="rendererMap[block.type]" :config="block.config"
      class="renderer-item" />
  </div>
</template>

<style scoped>
.dashboard-renderer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.renderer-item {
  width: 100%;
  height: 300px;
  background-color: #0f0f0f;
  border: 1px solid #1b1f27;
  border-radius: 6px;
}
</style>
