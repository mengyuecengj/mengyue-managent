<template>
  <component :is="iconComponent" :class="svgClass" />
</template>

<script setup lang="ts">
const svgModules = import.meta.glob('@/assets/svg/*.svg', { eager: true }) as Record<string, { default: any }>

const props = defineProps<{
  iconClass: string
  className?: string
}>()

const svgClass = computed(() => `svg-icon ${props.className || ''}`.trim())

const iconComponent = computed(() => {
  const path = `/src/assets/svg/${props.iconClass}.svg`
  return svgModules[path]?.default || null
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  margin-left: 3px;
}
</style>
