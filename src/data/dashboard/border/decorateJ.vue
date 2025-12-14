<template>
  <div w50rem h18rem flex justify-center items-center bg-dark>
    <BaseBorder 
      :width="props.width" 
      :height="props.height" 
      :component="Decoration11" 
    />
  </div>
</template>

<script setup lang="ts">
import BaseBorder from '@/data/dashboard/border/BaseBorder.vue'
import { Decoration11 } from '@kjgl77/datav-vue3'

const props = defineProps<{
  width: number
  height: number
}>()
</script>
