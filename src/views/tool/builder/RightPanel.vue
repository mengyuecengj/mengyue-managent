<template>
  <div class="right-panel">
    <MYForm class="dialog_form" v-if="selectedBlock" :modelValue="formModel">
      <MYForm-item :label="t('system.builder.label')">
        <MYInput v-model="selectedBlock.label" :placeholder="t('system.builder.pleaseEnterLabel')" />
      </MYForm-item>

      <template v-for="prop in propertiesConfig" :key="prop.key">
        <MYForm-item :label="t(`system.builder.props.${prop.label}`) || prop.label">
          <MYInput v-if="prop.type === 'input'" v-model="selectedBlock.options[prop.key]"
            :placeholder="prop.placeholderKey ? t(prop.placeholderKey) : (prop.placeholderKey || '')" />
          <MYSwitch size="small" v-else-if="prop.type === 'switch'" v-model="selectedBlock.options[prop.key]" />
          <MYSelect v-else-if="prop.type === 'select'" v-model="selectedBlock.options[prop.key]">
            <MYOption v-for="opt in prop.options" :key="opt.value" :value="opt.value"
              :label="t(opt.label) || opt.label" />
          </MYSelect>
        </MYForm-item>
      </template>

      <MYForm-item :label="t('system.builder.defaultValue')">
        <MYInput :modelValue="defaultValueStr" @update:modelValue="updateDefaultValue"
          :placeholder="defaultValuePlaceholder" />
      </MYForm-item>
    </MYForm>

    <div v-else class="no-selection">
      <MYText>{{ t('system.builder.noComponentSelected') }}</MYText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/modules/editor'
import { propertiesConfig } from '@/api-data/builder/attribute'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const editorStore = useEditorStore()
const selectedBlock = computed(() => editorStore.selectedBlock)
const formModel = ref({})

const defaultValueStr = computed(() => {
  if (!selectedBlock.value?.options?.modelValue) return ''
  const val = selectedBlock.value.options.modelValue
  return Array.isArray(val) ? val.join(',') : String(val)
})

const updateDefaultValue = (newVal: string) => {
  if (!selectedBlock.value) return
  selectedBlock.value.options.modelValue = newVal
}

const defaultValuePlaceholder = computed(() => t('system.builder.enterDefaultValue'))
</script>