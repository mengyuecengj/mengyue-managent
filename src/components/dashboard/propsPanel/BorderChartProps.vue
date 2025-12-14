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
          <MYInput v-model="borderName" placeholder="请输入图层名称" />
        </MYForm-item>
        <MYForm-item label="隐藏">
          <MYSwitch v-model="selectedBlock.visible" />
        </MYForm-item>

        <!-- ✅ 合并为主副颜色输入框 -->
        <!-- <MYForm-item label="边框颜色">
          <MYInput
            v-model="colorString"
            placeholder="请输入颜色数组，如：['#4fd2dd', '#235fa7']"
            type="textarea"
            :rows="2"
          />
        </MYForm-item> -->

        <MYForm-item label="背景颜色">
          <MYInput v-model="backgroundColor" placeholder="请输入背景颜色" />
        </MYForm-item>
      </MYScrollbar>
    </MYForm>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/store/modules/dashboard'

const dashboardStore = useDashboardStore()

const modelForm = reactive({})

const selectedBlock = computed(() => {
  if (!dashboardStore.selectedId) return null
  return dashboardStore.blocks.find((b: any) => b.id === dashboardStore.selectedId) || null
})

// 图层名称
const borderName = computed({
  get() {
    return selectedBlock.value?.borderName ?? ''
  },
  set(val: string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    dashboardStore.updateBlock(id, { borderName: val })
    dashboardStore.renameBlock(id, val)
  }
})

// 背景颜色
const backgroundColor = computed({
  get() {
    return selectedBlock.value?.backgroundColor ?? ''
  },
  set(val: string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    dashboardStore.updateBlock(id, { backgroundColor: val })
  }
})

// ✅ 边框颜色（合并输入）
const colorString = computed({
  get() {
    const block = selectedBlock.value
    if (!block || !block.config?.color) return '[]'
    return JSON.stringify(block.config.color)
  },
  set(val: string) {
    if (!selectedBlock.value) return

    try {
      const colors = JSON.parse(val)
      if (!Array.isArray(colors) || colors.length !== 2) {
        console.warn('颜色必须是两个十六进制字符串组成的数组')
        return
      }

      const [masterColor, slaveColor] = colors
      const id = selectedBlock.value.id

      // 更新 block 属性
      dashboardStore.updateBlock(id, {
        borderMasterColor: masterColor,
        borderSlaveColor: slaveColor
      })

      // 同步到 config.color
      if (!selectedBlock.value.config) selectedBlock.value.config = {}
      selectedBlock.value.config.color = colors

    } catch (e) {
      console.error('解析颜色失败，请检查格式：["#4fd2dd", "#235fa7"]', e)
    }
  }
})
</script>