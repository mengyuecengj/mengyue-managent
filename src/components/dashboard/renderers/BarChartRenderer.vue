<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, shallowRef, nextTick } from 'vue'
import * as echarts from 'echarts'
import type { ChartConfig } from '@/data/dashboard/barChart'

interface Props {
  config: ChartConfig
  color?: string
}

const props = defineProps<Props>()

// DOM
const chartEl = ref<HTMLDivElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

let resizeObserver: ResizeObserver | null = null

// 颜色处理辅助函数
function isHexString(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

function darkenColor(color: string, percent: number): string {
  if (!isHexString(color)) return color

  let r = parseInt(color.slice(1, 3), 16)
  let g = parseInt(color.slice(3, 5), 16)
  let b = parseInt(color.slice(5, 7), 16)

  r = Math.max(0, Math.floor(r * (100 - percent) / 100))
  g = Math.max(0, Math.floor(g * (100 - percent) / 100))
  b = Math.max(0, Math.floor(b * (100 - percent) / 100))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

// 获取应用颜色后的配置
function getOptionsWithColor() {
  const baseOptions = props.config?.options
  if (!baseOptions) return null

  if (!props.color || !isHexString(props.color)) {
    return JSON.parse(JSON.stringify(baseOptions))
  }

  const options = JSON.parse(JSON.stringify(baseOptions))
  const color = props.color

  if (options.series) {
    options.series = options.series.map((series: any) => {
      const newSeries = { ...series }

      if (newSeries.itemStyle) {
        newSeries.itemStyle = { ...newSeries.itemStyle }

        if (typeof newSeries.itemStyle.color === 'string') {
          newSeries.itemStyle.color = color
        }
        else if (newSeries.itemStyle.color && newSeries.itemStyle.color.type === 'linear') {
          const gradient = newSeries.itemStyle.color
          const newColorStops = gradient.colorStops.map((stop: any) => ({
            ...stop,
            color: isHexString(stop.color) ? stop.color : color
          }))
          newSeries.itemStyle.color = {
            ...gradient,
            colorStops: newColorStops
          }
        }
        else {
          newSeries.itemStyle.color = color
        }
      }

      // 处理 emphasis
      if (newSeries.emphasis && newSeries.emphasis.itemStyle) {
        newSeries.emphasis = { ...newSeries.emphasis }
        newSeries.emphasis.itemStyle = { ...newSeries.emphasis.itemStyle }

        if (typeof newSeries.emphasis.itemStyle.color === 'string') {
          newSeries.emphasis.itemStyle.color = darkenColor(color, 10)
        } else if (newSeries.emphasis.itemStyle.color && newSeries.emphasis.itemStyle.color.type === 'linear') {
          newSeries.emphasis.itemStyle.color = {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: darkenColor(color, 10) },
              { offset: 1, color: darkenColor(color, 30) }
            ]
          }
        }
      }

      return newSeries
    })
  }

  return options
}

onMounted(() => {
  if (!chartEl.value) return

  const options = getOptionsWithColor()
  if (options) {
    chartInstance.value = echarts.init(chartEl.value)
    chartInstance.value.setOption(options)
  }

  window.addEventListener('resize', resizeChart)

  resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      chartInstance.value?.resize()
    })
  })

  resizeObserver.observe(chartEl.value)
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  window.removeEventListener('resize', resizeChart)
  chartInstance.value?.dispose()
})

const resizeChart = () => {
  chartInstance.value?.resize()
}

// 同时监听 config.options 和 color 变化
watch(
  () => [props.config?.options, props.color],
  () => {
    
    if (!props.config?.options) return
    
    const options = getOptionsWithColor()
    
    if (options && chartInstance.value) {
      
      chartInstance.value.clear()
      chartInstance.value.setOption(options, true)
      chartInstance.value.resize()
    }
  },
  { 
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <div class="bar-chart-renderer" ref="chartEl"></div>
</template>

<style scoped>
.bar-chart-renderer {
  width: 100%;
  height: 100%;
  min-height: 100px;
}
</style>