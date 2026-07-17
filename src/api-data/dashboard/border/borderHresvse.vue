<script setup lang="ts">
import BaseBorder from './BaseBorder.vue'
import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3'

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
    :component="DvBorderBox8"
    :config="{ reverse: true }"
  />
</template>
