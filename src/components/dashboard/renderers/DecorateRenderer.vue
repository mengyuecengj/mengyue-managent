<template>
  <component 
    :is="component" 
    :width="width" 
    :height="height" 
    :config="config" 
  />
</template>

<script setup lang="ts">
defineProps<{
  component: any;
  config: any;
  width: number;
  height: number;
}>();
</script>