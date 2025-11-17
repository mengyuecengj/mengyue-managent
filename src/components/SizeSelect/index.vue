<template>
  <MYDropdown trigger="click" @command="handleSetSize" class="size-dropdown" noCaret textColor="var(--navbar-text)" backGroundColor="var(--navbar-bg)">
    <template #default>
      <svg-icon icon-class="size" class="size-icon" />
    </template>
    <template #dropdown>
      <MYDropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value"
        :command="item.value">
        {{ item.label }}
      </MYDropdown-item>
    </template>
  </MYDropdown>
</template>

<script setup lang="ts">
import useAppStore from "@/store/modules/app";
import modal from "@/plugins/modal";

const appStore = useAppStore();
const size = computed(() => appStore.size);
const sizeOptions = ref([
  { label: "较大", value: "large" },
  { label: "默认", value: "default" },
  { label: "稍小", value: "small" },
]);

function handleSetSize(size: string) {
  modal.loading("正在设置布局大小，请稍候...");
  appStore.setSize(size);
  setTimeout("window.location.reload()", 1000);
}
</script>
