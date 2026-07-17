<template>
  <div v-if="selectedBlock" class="props-panel">
    <div class="back-btn">
      <MYButton type="info" size="small" @click="dashboardStore.selectBlock(null)">
        {{ t('dashboard.props.backToParent') }}
      </MYButton>
    </div>

    <MYForm v-model="modelForm" class="operation-list" :label-width="60">
      <MYScrollbar ScrollWidth="4px" height="100%">
        <MYForm-item :label="$t('dashboard.props.layerName')">
          <MYInput v-model="borderName" :placeholder="t('dashboard.props.layerNamePlaceholder')" />
        </MYForm-item>
        <MYForm-item :label="t('dashboard.props.hidden')">
          <MYSwitch v-model="selectedBlock.visible" />
        </MYForm-item>

        <MYForm-item :label="t('dashboard.props.backgroundColor')">
          <MYInput v-model="backgroundColor" :placeholder="t('dashboard.props.backgroundColorPlaceholder')" />
        </MYForm-item>
      </MYScrollbar>
    </MYForm>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/store/modules/dashboard'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()

const selectedBlock = computed(() => {
  return dashboardStore.blocks.find(b => b.id === dashboardStore.selectedId)
})

const borderName = computed({
  get: () => selectedBlock.value?.name || '',
  set: (val) => {
    if (selectedBlock.value) {
      dashboardStore.renameBlock(selectedBlock.value.id, val)
    }
  }
})

const backgroundColor = computed({
  get: () => selectedBlock.value?.backgroundColor || '',
  set: (val) => {
    if (selectedBlock.value) {
      dashboardStore.updateBlock(selectedBlock.value.id, { backgroundColor: val })
    }
  }
})

const modelForm = reactive({})
</script>