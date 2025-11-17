<template>
    <div class="right-panel">
        <MYForm class="dialog_form" v-if="selectedBlock" :modelValue="formModel">
            <!-- 通用属性：不变 -->
            <MYForm-item label="标题">
                <MYInput placeholder-color="var(--navbar-text)" text-color="var(--navbar-text)"
                    v-model="selectedBlock.label" placeholder="请输入标题" />
            </MYForm-item>

            <!-- 动态渲染类型特有属性 -->
            <template v-for="prop in propertiesConfig" :key="prop.key">
                <MYForm-item :label="prop.label">
                    <MYInput placeholder-color="var(--navbar-text)" text-color="var(--navbar-text)"
                        v-if="prop.type === 'input'" v-model="selectedBlock.options[prop.key]"
                        :placeholder="prop.placeholder" :type="prop.inputType || 'text'" />
                    <MYSwitch v-else-if="prop.type === 'switch'" v-model="selectedBlock.options[prop.key]" />
                    <MYSelect v-else-if="prop.type === 'select'" v-model="selectedBlock.options[prop.key]">
                        <MYOption v-for="opt in prop.options" :key="opt.value" :value="opt.value" :label="opt.label" />
                    </MYSelect>
                </MYForm-item>
            </template>

            <!-- 特殊：radio/checkbox 的选项编辑（如果选中这些类型） -->
            <!-- <template v-if="['radio', 'checkbox'].includes(selectedBlock.type)">
                <MYForm-item label="选项列表">
                    <div v-for="(opt, index) in selectedBlock.options.options" :key="index" class="option-item">
                        <MYInput v-model="opt.label" placeholder="选项标签" style="width: 150px; margin-right: 10px;" />
                        <MYInput v-model="opt.value" placeholder="选项值" style="width: 100px; margin-right: 10px;" />
                        <MYButton type="danger" size="small" @click="removeOption(index)">删除</MYButton>
                    </div>
                    <MYButton type="primary" size="small" @click="addOption">添加选项</MYButton>
                </MYForm-item>
            </template> -->

            <!-- 默认值：不变 -->
            <MYForm-item label="默认值">
                <MYInput placeholder-color="var(--navbar-text)" text-color="var(--navbar-text)"
                    v-model="selectedBlock.options.modelValue" placeholder="请输入默认值" />
            </MYForm-item>
        </MYForm>
        <div v-else class="no-selection">
            <MYText>请选择一个组件进行编辑</MYText>
        </div>
    </div>
</template>

<script setup>
import { propertiesConfig } from '@/data/builder/attribute'
import { useEditorStore } from '@/store/modules/editor'
const editorStore = useEditorStore()
const selectedBlock = computed(() => editorStore.selectedBlock)
const formModel = ref({})
</script>
<style scoped>
.no-selection {
    text-align: center;
    padding: 20px;
    color: white;
}
</style>