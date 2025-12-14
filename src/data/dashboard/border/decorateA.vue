<!-- <template>
  <div 
    class="decoration-container" 
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <dv-decoration1 style="width: 100%; height: 100%;" />
  </div>
</template>

<script setup lang="ts">
// defineProps<{
//   width: number;
//   height: number;
// }>();

const width = ref(200)
const height = ref(50)
</script>

<style scoped>
.decoration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  /* 移除固定尺寸，使用动态尺寸 */
}
</style> -->
<template>
  <div w50rem h18rem flex justify-center items-center bg-dark>
    <BaseBorder 
      :width="props.width" 
      :height="props.height" 
      :component="Decoration1" 
    />
  </div>
</template>

<script setup lang="ts">
import BaseBorder from '@/data/dashboard/border/BaseBorder.vue'
import { Decoration1 } from '@kjgl77/datav-vue3'

const props = defineProps<{
  width: number
  height: number
}>()
</script>