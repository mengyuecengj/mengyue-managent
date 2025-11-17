<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <MYExpand color="var(--navbar-hamburger)" :class="{ 'is-active': isActive }" v-if="toggleFold" />
    <MYFold v-else color="var(--navbar-hamburger)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

const toggleFold = ref(true);

const emit = defineEmits();
const toggleClick = () => {
  toggleFold.value = !toggleFold.value;
  emit('toggleClick');
};
</script>

<style scoped lang="scss">
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
