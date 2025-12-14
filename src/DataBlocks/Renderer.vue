<template>
  <div :class="{ active: isActive }" @click.stop="onSelect" class="renderer-wrapper">
    <!-- 手动渲染标题 + 组件 -->
    <span class="custom-label" :style="{ width: config.options.labelWidth || '100px' }">
      {{ config.label }}:
    </span>

    <!-- 处理 select 组件，需要特殊处理 options -->
    <MYSelect v-if="config.type === 'select'" v-bind="config.options" v-model="config.options.modelValue"
      class="custom-component">
      <MYOption v-for="option in config.options.options" :key="option.value" :label="option.label"
        :value="option.value" />
    </MYSelect>

    <MYBadge v-else-if="config.type === 'badge'" v-bind="config.options" class="custom-component">
      <!-- 默认给一个带文字的按钮，你可以后期在右侧属性面板里改 -->
      <MYButton size="medium" type="primary">
        {{ config.options.buttonText || '操作' }}
      </MYButton>
    </MYBadge>

    <MYResult v-else-if="config.type === 'result'" v-bind="config.options" class="custom-component"
      :icon="config.options.icon" :key="config.options.icon" />

    <MYPagination v-else-if="config.type === 'pagination'"
      :key="config.id || config.type + Number(config.options.currentPage)" v-bind="config.options"
      :current-page="Number(config.options.currentPage)" class="custom-component" />

    <MYRadioGroup v-else-if="config.type === 'radio'" v-model="config.options.modelValue"
      :size="config.options.size || 'default'" class="custom-component"
      :direction="config.options.direction || 'horizontal'">
      <MYRadio v-for="item in config.options.optionList" :key="item.value" :value="item.value"
        :border="config.options.border">
        {{ item.label }}
      </MYRadio>
    </MYRadioGroup>

    <MYBorder v-else-if="config.type === 'border'" v-bind="config.options" class="custom-component" />

    <MYTimeline v-else-if="config.type === 'timeline'" v-bind="config.options" class="custom-component"
      :timestamp="config.options.timestamp">
      <template v-if="config.children && config.children.length > 0">
        <Renderer v-for="(child, index) in config.children" :key="index" :config="child" />
      </template>
    </MYTimeline>

    <MYCheckboxGroup v-else-if="config.type === 'checkbox'" v-model="config.options.modelValue"
      :size="config.options.size || 'default'" class="custom-component"
      :direction="config.options.direction || 'horizontal'" :gap="config.options.gap">
      <MYCheckbox v-for="item in config.options.optionList" :key="item.value" :value="item.value"
        :border="config.options.border">
        {{ item.label }}
      </MYCheckbox>
    </MYCheckboxGroup>

    <MYCheckboxGroup v-else-if="config.type === 'checkbox'" v-model="config.options.modelValue"
      :size="config.options.size || 'default'" class="custom-component"
      :direction="config.options.direction || 'horizontal'" :gap="config.options.gap">
      <MYCheckbox v-for="item in config.options.optionList" :key="item.value" :value="item.value"
        :border="config.options.border">
        {{ item.label }}
      </MYCheckbox>
    </MYCheckboxGroup>

    <MYCollapse v-else-if="config.type === 'collapse'" v-bind="config.options" v-model="config.options.modelValue"
      class="custom-component">
      <MYCollapse-item v-for="(item, index) in config.children" :key="index" :title="item.options?.title || item.label"
        :name="item.options?.name || index.toString()">
        <!-- 渲染 collapseItem 的内容 -->
        <template v-if="item.children && item.children.length > 0">
          <Renderer v-for="(child, childIndex) in item.children" :key="childIndex" :config="child" />
        </template>
        <!-- 如果没有显式定义 children，则检查是否有 slot 内容 -->
        <template v-else-if="item.type === 'collapseItem' && !item.children">
          <div>{{ item.content || '折叠内容' }}</div>
        </template>
      </MYCollapse-item>
    </MYCollapse>

    <div v-if="config.type === 'progress'" class="progress-container">
      <MYProgress v-bind="config.options" :status="config.options.status" class="custom-component"
        style="width: 100%; min-width: 200px;" />
    </div>

    <!-- 非 button 和非 select 组件：保持原样 -->
    <component v-else-if="config.type !== 'button'" :is="myMap[config.type]" v-bind="config.options"
      v-model="config.options.modelValue" :class="`my-switch--${config.options.size || 'medium'}`"
      class="custom-component" />

    <!-- button 组件特殊处理 -->
    <MYButton v-else v-bind="config.options" class="custom-component" :style="getButtonStyle(config.options)">
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
  MYCheckboxGroup,
  MYCheckbox,
  MYRadioGroup,
  MYRadio,
  MYButton,
  MYCollapse,
  MYCollapseItem,
  MYPickColor,
  MYSlidebar,
  MYPagination,
  MYBadge,
  MYProgress,
  MYTimeline,
  MYTimelineItem  
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
  // select: MYSelect,
  // options: MYOption,
  // checkbox: MYCheckbox,
  // radio: MYRadio,
  button: MYButton,
  colorPicker: MYPickColor,
  slidebar: MYSlidebar,
  timeline: MYTimeline,
  timelineItem: MYTimelineItem
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
