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
  // 直接使用最新配置，不再依赖初始化时保存的引用
  const baseOptions = props.config?.options
  if (!baseOptions) return null

  // 如果没有颜色变化，直接返回配置的深拷贝
  if (!props.color || !isHexString(props.color)) {
    return JSON.parse(JSON.stringify(baseOptions))
  }

  // 创建配置的深拷贝，避免修改原始数据
  const options = JSON.parse(JSON.stringify(baseOptions))
  const color = props.color

  if (options.series) {
    options.series = options.series.map((series: any) => {
      const newSeries = { ...series }

      // 处理 itemStyle
      if (newSeries.itemStyle) {
        newSeries.itemStyle = { ...newSeries.itemStyle }

        // 如果是字符串颜色
        if (typeof newSeries.itemStyle.color === 'string') {
          newSeries.itemStyle.color = color
        }
        // 如果是 ECharts 的 LinearGradient 对象
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
        // 如果是其他类型（比如函数），直接忽略或重置
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

  // 获取应用颜色后的配置
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
      
      // 先清除图表
      chartInstance.value.clear()
      // 重新设置选项
      chartInstance.value.setOption(options, true)
      // 重绘图表
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