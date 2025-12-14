<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import worldMapData from '~/MapWorld.json'
import chinaMapData from '~/china.json'  // 新增导入中国地图数据
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

interface Props {
  config: any
}
const props = defineProps<Props>()

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let ro: ResizeObserver | null = null

// 地图注册配置映射，便于扩展多个地图类型，而无需多个if语句
const mapRegistry: Record<string, { mapName: string; mapData: any }> = {
  'map-china': { mapName: 'china', mapData: chinaMapData },
  'map-province': { mapName: 'province', mapData: chinaMapData },
  // 如果后续添加更多省份地图，例如北京：
  // 'map-beijing': { mapName: 'beijing', mapData: import('~/beijing.json') }, // 假设有单独的beijing.json
  // 'map-shanghai': { mapName: 'shanghai', mapData: import('~/shanghai.json') },
  // ... 可以轻松添加30多个省份，而不改动逻辑代码
}

const initChart = () => {
  if (!chartContainer.value) return
  if (chartInstance) chartInstance.dispose()
  chartInstance = echarts.init(chartContainer.value)

  try {
    // 根据 config.type 获取注册配置，默认使用世界地图
    const registry = mapRegistry[props.config.type] || { mapName: 'world', mapData: worldMapData }
    const { mapName, mapData } = registry

    echarts.registerMap(mapName, mapData as any)

    if (props.config?.options) {
      const options = { ...props.config.options }
      if (options.geo) {
        if (!options.geo.map) {
          options.geo.map = mapName // 只在未设置时覆盖
        }
      }
      if (options.series && Array.isArray(options.series)) {
        options.series.forEach((s: any) => {
          if (s.type === 'map') {
            if (!s.map) {
              s.map = mapName // 只在未设置时覆盖，避免覆盖原配置
            }
          }
        })
      }
      chartInstance.setOption(options)
    }
  } catch (err) {
    console.error('地图初始化失败:', err)
  }
}

const handleResize = () => chartInstance?.resize()

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', handleResize)
    if (chartContainer.value) {
      ro = new ResizeObserver(() => chartInstance?.resize())
      ro.observe(chartContainer.value)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (ro && chartContainer.value) ro.unobserve(chartContainer.value)
  if (chartInstance) chartInstance.dispose()
  ro = null
  chartInstance = null
})

watch(
  () => props.config,
  () => nextTick(() => chartInstance?.setOption({ ...props.config.options }, { notMerge: true })),
  { deep: true }
)

defineExpose({ resize: handleResize })
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>