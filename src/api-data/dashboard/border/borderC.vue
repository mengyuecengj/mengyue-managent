<script setup lang="ts">
import BaseBorder from './BaseBorder.vue'
import { BorderBox3 as DvBorderBox3 } from '@kjgl77/datav-vue3'

const rawDvBorderBox3 = markRaw(DvBorderBox3)

const props = defineProps<{
  width: number
  height: number
  config?: Record<string, any>
}>()

</script>

<template>
  <BaseBorder
    :width="props.width"
    :height="props.height"
    :component="rawDvBorderBox3"
  />
</template>
