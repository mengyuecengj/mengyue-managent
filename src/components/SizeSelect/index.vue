<template>
  <MYDropdown trigger="click" @command="handleSetSize" class="size-dropdown" noCaret textColor="var(--navbar-text)" backgroundColor="var(--navbar-bg)">
    <template #default>
      <svg-icon icon-class="size" class="size-icon" />
    </template>
    <template #dropdown>
      <MYDropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value"
        :command="item.value">
        {{ $t(item.label) }}
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
  { label: "selectSize.large", value: "large" },
  { label: "selectSize.medium", value: "default" },
  { label: "selectSize.small", value: "small" },
]);

function handleSetSize(size: string) {
  modal.loading("正在设置布局大小，请稍候...");
  appStore.setSize(size);
  setTimeout("window.location.reload()", 1000);
}
</script>
