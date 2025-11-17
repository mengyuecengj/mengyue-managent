<template>
  <div class="custom-number-input">
    <div class="input-container">
      <button 
        class="control-btn decrease-btn" 
        @click="decrease"
        :disabled="isMin"
        type="button"
      >
        <span class="btn-icon">-</span>
      </button>
      
      <input
        ref="inputRef"
        v-model="displayValue"
        type="text"
        class="number-input"
        :style="inputStyle"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @keydown="handleKeydown"
      />
      
      <button 
        class="control-btn increase-btn" 
        @click="increase"
        :disabled="isMax"
        type="button"
      >
        <span class="btn-icon">+</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'

interface Props {
  modelValue?: string | number
  min?: number
  max?: number
  step?: number
  width?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '0',
  min: 0,
  max: 9999,
  step: 1,
  width: '80px',
  placeholder: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const inputRef = ref<HTMLInputElement>()
const displayValue = ref(props.modelValue.toString())
const isFocused = ref(false)

// 计算属性
const isMin = computed(() => Number(displayValue.value) <= props.min)
const isMax = computed(() => Number(displayValue.value) >= props.max)
const inputStyle = computed(() => ({
  width: props.width
}))

// 格式化数值
const formatValue = (value: string | number): string => {
  const num = Number(value)
  if (isNaN(num)) return props.min.toString()
  
  // 限制在 min 和 max 之间
  const clamped = Math.max(props.min, Math.min(props.max, num))
  
  // 如果是整数，返回整数形式
  return Number.isInteger(clamped) ? clamped.toString() : clamped.toFixed(1)
}

// 增加数值
const increase = () => {
  if (props.disabled) return
  
  const current = Number(displayValue.value)
  const newValue = current + props.step
  const formattedValue = formatValue(newValue)
  
  displayValue.value = formattedValue
  emit('update:modelValue', formattedValue)
  emit('change', formattedValue)
}

// 减少数值
const decrease = () => {
  if (props.disabled) return
  
  const current = Number(displayValue.value)
  const newValue = current - props.step
  const formattedValue = formatValue(newValue)
  
  displayValue.value = formattedValue
  emit('update:modelValue', formattedValue)
  emit('change', formattedValue)
}

// 输入处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  // 只允许数字和小数点
  const cleaned = value.replace(/[^\d.]/g, '')
  
  // 处理多个小数点
  const parts = cleaned.split('.')
  if (parts.length > 2) {
    displayValue.value = parts[0] + '.' + parts.slice(1).join('')
  } else {
    displayValue.value = cleaned
  }
}

// 失去焦点时格式化
const handleBlur = () => {
  isFocused.value = false
  const formattedValue = formatValue(displayValue.value)
  displayValue.value = formattedValue
  emit('update:modelValue', formattedValue)
  emit('change', formattedValue)
}

// 获得焦点时
const handleFocus = () => {
  isFocused.value = true
}

// 键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key
  
  // 上下箭头控制数值
  if (key === 'ArrowUp') {
    event.preventDefault()
    increase()
  } else if (key === 'ArrowDown') {
    event.preventDefault()
    decrease()
  }
  
  // Enter 键确认
  if (key === 'Enter') {
    inputRef.value?.blur()
  }
}

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (!isFocused.value) {
    displayValue.value = newValue.toString()
  }
})

// 初始化
displayValue.value = formatValue(props.modelValue)
</script>

<style scoped lang="scss">
.custom-number-input {
  display: inline-block;
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  background-color: var(--table-header-bg);
  transition: border-color 0.2s;
}

.input-container:hover {
  border-color: #c0c4cc;
}

.input-container:focus-within {
  border-color: #409eff;
  outline: none;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: var(--table-stripe-bg);
  color: #606266;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.control-btn:hover:not(:disabled) {
//   background: #ecf5ff;
  color: #409eff;
}

.control-btn:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background: var(--table-stripe-bg);
}

.decrease-btn {
//   border-right: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
}

.increase-btn {
//   border-left: 1px solid #dcdfe6;
  border-radius: 0 4px 4px 0;
}

.btn-icon {
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

.number-input {
  flex: 1;
  border: none;
  outline: none;
  text-align: center;
  padding: 0 8px;
  height: 32px;
  background: transparent;
  color: var(--general);
  font-size: 14px;
}

.number-input:focus {
  outline: none;
}

.number-input:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}

/* 暗色主题支持 */
:root[data-theme="dark"] .input-container {
  border-color: #434343;
  background-color: #141414;
}

:root[data-theme="dark"] .number-input {
  background-color: #141414;
  color: #c9d1d9;
}

:root[data-theme="dark"] .control-btn {
  background: #1f1f1f;
  color: #8b949e;
}

:root[data-theme="dark"] .control-btn:hover:not(:disabled) {
  background: #2a2a2a;
  color: #409eff;
}

:root[data-theme="dark"] .control-btn:disabled {
  color: #434343;
  background: #1f1f1f;
}
</style>