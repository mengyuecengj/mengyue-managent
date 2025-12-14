<template>
  <div class="right-panel">
    <MYForm class="dialog_form" v-if="selectedBlock" :modelValue="formModel">
      <!-- 标题 -->
      <MYForm-item label="标题">
        <MYInput
          placeholder-color="var(--navbar-text)"
          text-color="var(--navbar-text)"
          v-model="selectedBlock.label"
          placeholder="请输入标题"
        />
      </MYForm-item>

      <!-- 动态属性（来自 attribute.ts 配置） -->
      <template v-for="prop in propertiesConfig" :key="prop.key">
        <MYForm-item :label="prop.label">
          <MYInput
            v-if="prop.type === 'input'"
            placeholder-color="var(--navbar-text)"
            text-color="var(--navbar-text)"
            v-model="selectedBlock.options[prop.key]"
            :placeholder="prop.placeholder"
            :type="prop.inputType || 'text'"
          />
          <MYSwitch size="small" v-else-if="prop.type === 'switch'" v-model="selectedBlock.options[prop.key]" />
          <MYSelect v-else-if="prop.type === 'select'" v-model="selectedBlock.options[prop.key]">
            <MYOption v-for="opt in prop.options" :key="opt.value" :value="opt.value" :label="opt.label" />
          </MYSelect>
        </MYForm-item>
      </template>

      <!-- 默认值 - 关键修复：支持 checkbox 数组输入 -->
      <MYForm-item label="默认值">
        <MYInput
          placeholder-color="var(--navbar-text)"
          text-color="var(--navbar-text)"
          :modelValue="defaultValueStr"
          @update:modelValue="updateDefaultValue"
          :placeholder="defaultValuePlaceholder"
        />
      </MYForm-item>
    </MYForm>

    <div v-else class="no-selection">
      <MYText>请选择一个组件进行编辑</MYText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/modules/editor'
import { propertiesConfig } from '@/data/builder/attribute'

const editorStore = useEditorStore()
const selectedBlock = computed(() => editorStore.selectedBlock)
const formModel = ref({})

// 默认值显示：数组 → 逗号字符串
const defaultValueStr = computed((): string => {
  if (!selectedBlock.value || selectedBlock.value.options?.modelValue === undefined) {
    return ''
  }
  const val = selectedBlock.value.options.modelValue
  if (Array.isArray(val)) {
    return val.join(',')
  }
  return String(val)
})

// 更新默认值：字符串 → 对应类型
const updateDefaultValue = (newVal: string) => {
  if (!selectedBlock.value) return

  const type = selectedBlock.value.type
  let parsed: any

  if (type === 'checkbox') {
    // checkbox 支持 "1,2,3"
    parsed = newVal
      ? newVal.split(',').map(v => v.trim()).filter(Boolean)
      : []
  } else if (type === 'radio') {
    parsed = newVal.trim()
  } else {
    // 其他组件直接字符串
    parsed = newVal
  }

  // 直接修改响应式对象
  selectedBlock.value.options.modelValue = parsed
}

// 动态 placeholder
const defaultValuePlaceholder = computed((): string => {
  if (!selectedBlock.value) return '请输入默认值'
  if (selectedBlock.value.type === 'checkbox') {
    return '多选用逗号分隔，如：1,2'
  }
  if (selectedBlock.value.type === 'radio') {
    return '请输入选项值，如：1'
  }
  return '请输入默认值'
})
</script>
