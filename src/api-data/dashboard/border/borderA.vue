<script setup lang="ts">
import BaseBorder from './BaseBorder.vue'
import { BorderBox1 as DvBorderBox1 } from '@kjgl77/datav-vue3'

const rawDvBorderBox1 = markRaw(DvBorderBox1)

const props = defineProps<{
  width: number
  height: number
  config?: Record<string, any>
}>()

const forceConfig = computed(() => {
  return {
    ...props.config,
    color: props.config?.color ? [...props.config.color] : ['#4fd2dd', '#235fa7'],
    backgroundColor: props.config?.backgroundColor || 'transparent'
  }
})

</script>

<template>
  <BaseBorder
    :width="props.width"
    :height="props.height"
    :component="rawDvBorderBox1"
    :config="forceConfig"
    :key="forceConfig.color?.join('') || 'default'"
  />
</template>
