<template>
  <div
    :class="{ active: isActive }"
    @click.stop="onSelect"
    class="renderer-wrapper"
  >
    <!-- 手动渲染标题 + 组件 -->
    <span class="custom-label" :style="{ width: config.options.labelWidth || '100px' }">
      {{ config.label }}:
    </span>
    <!-- 非 button 组件：保持原样 -->
    <component
      v-if="config.type !== 'button'"
      :is="myMap[config.type]"
      v-bind="config.options"
      v-model="config.options.modelValue"
      class="custom-component"
    />
    <MYButton
      v-else
      v-bind="config.options"
      class="custom-component"
      :style="getButtonStyle(config.options)"
    >
      {{ config.options.label || '按钮' }}
    </MYButton>
  </div>
</template>

<script setup>
import { 
  MYInput,
  MYRate, 
  MYSelect,
  MYOption,
  MYSwitch,
  MYCheckbox,
  MYRadio,
  MYButton,
  MYPickColor,
  MYSlidebar,
  MYPagination
} from 'mengyue-plus';

import { useEditorStore } from '@/store/modules/editor'
import { computed } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const editorStore = useEditorStore()

const onSelect = () => {
  editorStore.selectBlock(props.config)
}

const isActive = computed(() => editorStore.currentBlock === props.config)

// 如果 colorText/colorBg 不是 prop，而是 style，计算 style 对象
const getButtonStyle = (options) => {
  const style = {}
  if (options.colorText) style.color = options.colorText
  if (options.colorBg) style.backgroundColor = options.colorBg
  return style
}

const myMap = {
  input: MYInput,
  rate: MYRate,
  switch: MYSwitch,
  select: MYSelect,
  options: MYOption,
  checkbox: MYCheckbox,
  // radioGroup: MYRadioGroup,
  radio: MYRadio,
  button: MYButton,
  colorPicker: MYPickColor,
  slidebar: MYSlidebar,
  pagination: MYPagination
}
</script>

<style lang="scss" scoped>
.renderer-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-label {
  font-size: 14px;
  color: var(--general);
  white-space: nowrap;
  text-align: right;
  min-width: 80px;
}
</style>