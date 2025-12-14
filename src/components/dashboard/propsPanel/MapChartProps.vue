<template>
  <div v-if="selectedBlock" class="props-panel">
    <div class="back-btn">
      <MYButton type="info" size="small" @click="dashboardStore.selectBlock(null)">
        返回上一层操作
      </MYButton>
    </div>

    <MYForm v-model="modelForm" class="operation-list" :label-width="60">
      <MYScrollbar ScrollWidth="4px" height="100%">
        <MYForm-item label="图层名称">
          <MYInput v-model="mapName" placeholder="请输入图层名称" />
        </MYForm-item>
        <MYForm-item label="隐藏">
          <MYSwitch v-model="selectedBlock.visible" />
        </MYForm-item>
        <MYForm-item label="地图设置">
          <MYSwitch v-model="selectedBlock.mapSetting" />
        </MYForm-item>
        <div v-if="selectedBlock.mapSetting">
          <MYForm-item label="地图缩放">
            <MYSlidebar v-model="mapZoom" :max="100" thumbColor="#409EFF" style="width: 100px;" />
          </MYForm-item>
          <MYForm-item label="悬浮地名">
            <MYSwitch v-model="visibleName" />
          </MYForm-item>
          <div v-if="visibleName">
            <MYForm-item label="文字大小">
              <MYInput v-model="mapNameSize" placeholder="请输入文字大小" />
            </MYForm-item>
            <MYForm-item label="文字颜色">
              <MYInput v-model="mapNameColor" placeholder="请输入文字颜色" />
            </MYForm-item>
            <MYForm-item label="高亮颜色">
              <MYInput v-model="mapNameColorHover" placeholder="请输入文字高亮颜色" />
            </MYForm-item>
          </div>
          <MYForm-item label="边框线宽">
            <MYSlidebar v-model="borderWidth" :max="100" thumbColor="#409EFF" style="width: 100px;" />
          </MYForm-item>
          <MYForm-item label="边框颜色">
            <MYInput v-model="borderColor" placeholder="请输入边框颜色" />
          </MYForm-item>
          <MYForm-item label="区域颜色">
            <MYInput v-model="areaColor" placeholder="请输入区域颜色" />
          </MYForm-item>
          <MYForm-item label="高亮颜色">
            <MYInput v-model="mapNameColorHover" placeholder="请输入区域高亮颜色" />
          </MYForm-item>
        </div>
      </MYScrollbar>
    </MYForm>
  </div>
</template>
<script setup lang="ts">
import { useDashboardStore } from '@/store/modules/dashboard'
const dashboardStore = useDashboardStore()
const modelForm = ref({})

const selectedBlock = computed(() => {
  if (!dashboardStore.selectedId) return null
  return dashboardStore.blocks.find((b: any) => b.id === dashboardStore.selectedId) || null
})

const mapName = computed({
  get() {
    return selectedBlock.value?.textName ?? ''
  },
  set(val: string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    dashboardStore.updateBlock(id, { textName: val })
    dashboardStore.renameBlock(id, val)
  }
})

// 地图缩放
const mapZoom = computed({
  get() {
    return selectedBlock.value?.config.options.series?.[0]?.zoom || 1.2
  },
  set(val) {
    const series = selectedBlock.value!.config.options.series[0]
    dashboardStore.updateBlock(selectedBlock.value!.id, {
      config: {
        ...selectedBlock.value!.config,
        options: {
          ...selectedBlock.value!.config.options,
          series: [{
            ...series,
            zoom: val,
            aspectScale: 1
          }]
        }
      }
    })
  }
})

// 悬浮地名
const visibleName = computed({
  get() {
    const tooltip = selectedBlock.value?.config.options?.tooltip
    return tooltip ? tooltip.trigger !== undefined : false
  },
  set(val) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    const config = { ...selectedBlock.value.config }

    // 确保 options 存在
    if (!config.options) {
      config.options = {}
    }

    if (val) {
      config.options.tooltip = {
        trigger: 'item',
        formatter: function (params: any) {
          if (params.value) {
            return `${params.name}: ${params.value}`
          }
          return params.name
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#fff'
        }
      },
        config.options.series[0].emphasis = {
          itemStyle: {
            areaColor: '#3bb8c7'
          }
        }
    } else {
      delete config.options.tooltip
    }

    dashboardStore.updateBlock(id, {
      config,
      mapNameVisible: val
    })
  }
})

// 悬浮地名文字大小
const mapNameSize = computed({
  get() {
    const tooltip = selectedBlock.value?.config.options?.tooltip
    return tooltip?.textStyle?.fontSize || "12"
  },
  set(val) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    const config = { ...selectedBlock.value.config }
    
    // 确保 options 和 tooltip 结构完整
    if (!config.options) {
      config.options = {}
    }
    
    if (!config.options.tooltip) {
      config.options.tooltip = {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: { color: '#fff' }
      }
    }
    
    if (!config.options.tooltip.textStyle) {
      config.options.tooltip.textStyle = {}
    }
    
    // 更新 fontSize
    config.options.tooltip.textStyle.fontSize = val
    
    // 关键：调用 updateBlock 保存修改
    dashboardStore.updateBlock(id, {
      config
    })
  }
})

// 悬浮地名文字颜色
const mapNameColor = computed({
  get() {
    const tooltip = selectedBlock.value?.config.options?.tooltip
    return tooltip?.textStyle?.color || ''
  },
  set(val) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    const config = { ...selectedBlock.value.config }
    
    // 确保 options 和 tooltip 结构完整
    if (!config.options) {
      config.options = {}
    }
    
    if (!config.options.tooltip) {
      config.options.tooltip = {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: { fontSize: '12' }
      }
    }
    
    if (!config.options.tooltip.textStyle) {
      config.options.tooltip.textStyle = {}
    }
    
    // 更新 color
    config.options.tooltip.textStyle.color = val
    
    // 关键：调用 updateBlock 保存修改
    dashboardStore.updateBlock(id, {
      config
    })
  }
})

// 悬浮地名高亮颜色
const mapNameColorHover = computed({
  get() {
    const series = selectedBlock.value?.config.options?.series?.[0]
    return series ? series.emphasis.itemStyle.areaColor : ''
  },
  set(val) {
    if (!selectedBlock.value) return
    const config = { ...selectedBlock.value.config }

    if (!config.options) {
      config.options = {}
    }

    if (val) {
      config.options.series[0].emphasis = {
        itemStyle: {
          areaColor: val
        }
      }
    }
  }
})

// 边框线宽
const borderWidth = computed({
  get() {
    const series = selectedBlock.value?.config.options?.series?.[0]
    return series ? series.itemStyle.borderWidth : 0
  },
  set(val) {
    if (!selectedBlock.value) return
    const config = { ...selectedBlock.value.config }

    if (!config.options) {
      config.options = {}
    }

    config.options.series[0].itemStyle = {
      ...config.options.series[0].itemStyle,
      borderWidth: val
    }
    dashboardStore.updateBlock(selectedBlock.value.id, {
      config
    })
  }
})

// 边框颜色
const borderColor = computed({
  get() {
    const series = selectedBlock.value?.config.options?.series?.[0]
    return series ? series.itemStyle.borderColor : ''
  },
  set(val) {
    if (!selectedBlock.value) return
    const config = { ...selectedBlock.value.config }

    if (!config.options) {
      config.options = {}
    }
    config.options.series[0].itemStyle = {
      ...config.options.series[0].itemStyle,
      borderColor: val
    }
  }
})

// 区域颜色
const areaColor = computed({
  get() {
    const series = selectedBlock.value?.config.options?.series?.[0]
    return series ? series.itemStyle.areaColor : ''
  },
  set(val) {
    if (!selectedBlock.value) return
    const config = { ...selectedBlock.value.config }

    if (!config.options) {
      config.options = {}
    }
    config.options.series[0].itemStyle = {
      ...config.options.series[0].itemStyle,
      areaColor: val
    }
  }
})
</script>
