<script setup lang="ts">
import BaseBorder from './BaseBorder.vue'
import { BorderBox7 as DvBorderBox7 } from '@kjgl77/datav-vue3'

// 接收 props
const props = defineProps<{
  width: number
  height: number
}>()
</script>

<template>
  <BaseBorder 
    :width="props.width" 
    :height="props.height" 
    :component="DvBorderBox7" 
  />
</template>
