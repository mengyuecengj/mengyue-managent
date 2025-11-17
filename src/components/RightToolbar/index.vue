<template>
  <div class="top-right-btn">
    <MYButton circle type="primary" plain @click="refresh()" icon="MYLoadingA" style="margin-right: 10px;" />
    <!-- <MYButton circle></MYButton> -->
    <MYButton size="small" circle icon="Menu" @click="showColumn()" v-if="showColumnsType === 'transfer'" />
    <MYDropdown trigger="click" :hide-on-click="false" style="padding-left: 12px"
      v-else-if="showColumnsType === 'checkbox'">
      <MYButton circle>
        <MYOdometer />
      </MYButton>
      <template #dropdown>
        <MYDropdown-menu>
          <MYDropdown-item>
            <MYCheckbox :indeterminate="isIndeterminate" :checked="isChecked" @change="toggleCheckAll">
              列展示
            </MYCheckbox>
          </MYDropdown-item>
          <div class="check-line"></div>
          <template v-for="col in columns" :key="col.key">
            <MYDropdown-item>
              <MYCheckbox :checked="col.visible" @change="(val: string) => checkboxChange(val, col.key)">
                {{ col.label }}
              </MYCheckbox>
            </MYDropdown-item>
          </template>
        </MYDropdown-menu>
      </template>
    </MYDropdown>
    <MYButton circle type="info" plain @click="showColumn()" v-else>
      <MYOdometerText color="var(--general)" />
    </MYButton>
    <!-- <MYOdometerText color="var(--general-text)" /> -->
    <MYDialog title="列展示" v-model="open" width="600px" height="600px" backgroundColor="#0F1115" :show-close="false"
      append-to-body>
      <MYTransfer :titles="['显示', '隐藏']" :model-value="value" :data="transferData" @update:model-value="dataChange"
        hoverBackground="transparent" colorText="var(--general)" />
    </MYDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { Props, Emits } from '@/types/components/rightToolbar';

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式变量
const isChecked = ref(false);
const isIndeterminate = ref(false);
const value = ref<number[]>([]);
const open = ref(false);
const title = ref('列设置');

// 转换 columns 为 transfer 所需格式
const transferData = computed(() => {
  return (props.columns || []).map(col => ({
    key: col.key,
    label: col.label,
    disabled: false
  }));
});

// 监听 columns 变化
watch(
  () => props.columns,
  (newColumns) => {
    if (newColumns && newColumns.length) {
      isChecked.value = newColumns.every((col) => col.visible);
      isIndeterminate.value =
        newColumns.some((col) => col.visible) &&
        !newColumns.every((col) => col.visible);

      value.value = newColumns
        .filter(col => !col.visible)
        .map(col => col.key);
    } else {
      isChecked.value = false;
      isIndeterminate.value = false;
      value.value = [];
    }
  },
  { immediate: true }
);

const toggleSearch = () => {
  emit('update:showSearch', !props.showSearch);
};

const refresh = () => {
  emit('queryTable');
};

const showColumn = () => {
  open.value = true;
  title.value = '列设置';
};

const toggleCheckAll = (val: string) => {
  if (props.columns) {
    props.columns.forEach((col) => {
      col.visible = !!val;
    });
  }
  isIndeterminate.value = false;
};

const checkboxChange = (val: string, key: number) => {
  if (props.columns) {
    const targetCol = props.columns.find(col => col.key === key);
    if (targetCol) {
      targetCol.visible = !!val;
    }

    const checkedCount = props.columns.filter((col) => col.visible).length;
    isChecked.value = checkedCount === props.columns.length;
    isIndeterminate.value =
      checkedCount > 0 && checkedCount < props.columns.length;
  }
};

const dataChange = (newModelValue: number[]) => {
  if (props.columns) {
    props.columns.forEach((col) => {
      col.visible = !newModelValue.includes(col.key);
    });
    value.value = newModelValue;
  }
};
</script>
<style scoped lang="scss">
.top-right-btn {
  display: flex;
  align-items: center;
  margin-left: auto;
}
</style>
