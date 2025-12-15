<template>
  <div class="text-renderer" :style="{
    width: width + 'px',
    height: height + 'px',
    display: 'flex',
    alignItems: config.alignItems || 'center',
    justifyContent: config.justifyContent || 'center',
    backgroundColor: config.backgroundColor || 'transparent',
    padding: config.padding || '10px'
  }">
    <div class="text-content" :style="{
      fontSize: config.fontSize + 'px',
      color: config.color,
      fontWeight: config.fontWeight,
      textAlign: config.textAlign,
      lineHeight: config.lineHeight,
      whiteSpace: 'pre-wrap'
    }">
      {{ config.text || '请设置文本内容' }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  config: any,
  width: number,
  height: number
}>()
</script>

<style scoped>
.text-renderer {
  overflow: hidden;
}

.text-content {
  word-break: break-all;
  overflow-wrap: break-word;
  width: 100%;
  min-height: 100%;
}
</style>