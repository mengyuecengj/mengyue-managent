<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { nextTick } from 'vue'

const route = useRoute()
const router = useRouter()

// 在 redirect 页面中解析参数并跳转
nextTick(() => {
  const { params, query } = route
  let path = Array.isArray(params.path) ? params.path.join('/') : params.path
  if (path && path.startsWith('/')) {
    router.replace({ path, query })
  } else {
    router.push('/')
  }
})
</script>