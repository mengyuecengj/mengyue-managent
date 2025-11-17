<!-- DnButton.vue -->
<template>
  <button 
    :class="['dn-button', type]"
    :style="computedStyles"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  type?: 'primary' | 'secondary'
  styles?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  text: '按钮',
  type: 'primary'
})

const computedStyles = computed(() => props.styles || {})
</script>

<style scoped>
.dn-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dn-button.primary {
  background: #1890ff;
  color: white;
}

.dn-button.secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
}
</style>