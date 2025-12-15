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
          <MYInput v-model="textName" placeholder="请输入图层名称" />
        </MYForm-item>
        <MYForm-item label="隐藏">
          <MYSwitch v-model="selectedBlock.visible" />
        </MYForm-item>
        <MYForm-item label="文本内容">
          <MYSwitch v-model="selectedBlock.textVisible" />
        </MYForm-item>
        <div v-if="selectedBlock.textVisible">
            <MYForm-item label="文本内容">
              <MYInput v-model="textContainer" placeholder="请输入文本内容" />
            </MYForm-item>
            <MYForm-item label="文本颜色">
              <MYInput v-model="textColor" placeholder="请输入文本颜色" />
            </MYForm-item>
            <MYForm-item label="文本大小">
              <MYInput v-model="textSize" placeholder="请输入文本大小" />
            </MYForm-item>
            <MYForm-item label="文本粗细">
              <MYInput v-model="textWeight" placeholder="请输入文本粗细" />
            </MYForm-item>
        </div>
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
const textName = computed({
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

// 文本内容
const textContainer = computed({
  get() {
    return selectedBlock.value?.textContainer ?? ''
  },
  set(val: string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    dashboardStore.updateBlock(id, { textContainer: val })
  }
})

// 文本颜色
const textColor = computed({
  get() {
    return selectedBlock.value?.textColor ?? ''
  },
  set(val: string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    dashboardStore.updateBlock(id, { textColor: val })
  }
})

// 文本大小
const textSize = computed({
  get() {
    // 提供默认值 16
    return selectedBlock.value?.textSize ?? ""
  },
  set(val: number | string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    const numVal = typeof val === 'string' ? parseInt(val) || "" : val
    dashboardStore.updateBlock(id, { textSize: String(numVal) })
  }
})

// 文本粗细
const textWeight = computed({
  get() {
    return selectedBlock.value?.textWeight ?? ""
  },
  set(val: number | string) {
    if (!selectedBlock.value) return
    const id = selectedBlock.value.id
    const numVal = typeof val === 'string' ? parseInt(val) || "" : val
    dashboardStore.updateBlock(id, { textWeight: String(numVal) })
  }
})
</script>
