<script setup lang="ts">
import BaseBorder from './BaseBorder.vue'
import { Decoration4 } from '@kjgl77/datav-vue3'

// 定义组件需要的 props
const props = defineProps<{
  width?: number
  height?: number
}>()
</script>

<template>
  <BaseBorder 
    :width="width" 
    :height="height" 
    :component="Decoration4"
    :config="{ reverse: true }"
  />
</template>