<template>
    <div class="builder-container">
        <div class="top-builder">
            <div class="top-title">
                <div class="top-title-left">
                    <MYText class="text-left" type="primary" size="16px">{{ t('system.builder.formGenerator') }}
                    </MYText>
                </div>
                <div class="top-title-right">
                    <MYa type="primary" size="16px" @click="exportVueFile" underline>
                        <MYDownload size="16px" /> {{ t('system.builder.exportVueFile') }}
                    </MYa>
                    <MYa class="text-right" type="primary" size="16px" underline @click="copyCode">
                        <MYOdometerText color="#409EFF" size="16px" /> {{ t('system.builder.copyCode') }}
                    </MYa>
                    <MYa class="text-right" type="danger" size="16px" underline @click="clearCanvas">
                        <MYDelete size="16px" /> {{ t('system.builder.clearCanvas') }}
                    </MYa>
                </div>
            </div>
            <div class="top-components">
                <MYText class="attribute" type="primary" size="18px">{{ t('system.builder.properties') }}</MYText>
            </div>
        </div>

        <div class="bottom-builder">
            <div class="build-left">
                <MYScrollbar height="100vh" scrollWidth="4px" trackColor="transparent">
                    <div v-for="category in categorizedMaterialList" :key="category.title">
                        <div class="category-title">
                            <MYText type="primary" size="14px"
                                style="display: flex; justify-self: center; margin-top: 30px;">
                                {{ t(`system.builder.categories.${category.title}`) || category.title }}
                            </MYText>
                        </div>
                        <SmoothDndContainer class="block-group" behaviour="copy" group-name="blocks" tag="div"
                            :get-child-payload="(index: number) => getChildPayload(category.components[index])">
                            <SmoothDndDraggable v-for="m in category.components" :key="m.type">
                                <div class="block-left-item">
                                    {{ t(`system.builder.components.${m.type}`) || m.label }}
                                </div>
                            </SmoothDndDraggable>
                        </SmoothDndContainer>
                    </div>
                </MYScrollbar>
            </div>

            <div class="build-center">
                <MYScrollbar height="100vh" scrollWidth="4px" trackColor="transparent">
                    <SmoothDndContainer class="block-group" group-name="blocks" orientation="vertical" tag="div"
                        @drop="handleDrop">
                        <SmoothDndDraggable v-for="(block, index) in blocks" :key="block.id || index">
                            <div class="content-container" @click="editorStore.selectBlock(index)"
                                :class="{ active: editorStore.currentBlock === index }">
                                <Renderer class="content-item" :config="block" />
                            </div>
                        </SmoothDndDraggable>
                    </SmoothDndContainer>
                </MYScrollbar>
            </div>

            <div class="build-right">
                <MYScrollbar scrollWidth="4px" height="100vh" trackColor="transparent">
                    <RightPanel />
                </MYScrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable'
import Renderer from '@/DataBlocks/Renderer.vue'
import RightPanel from './RightPanel.vue'
import { materialList } from '@/api-data/builder/form'
import { useEditorStore } from '@/store/modules/editor'
import { DropResult } from 'smooth-dnd'
import { moveArray } from '@/utils/general'
import { onMounted, toRefs, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const editorStore = useEditorStore()
const { blocks } = toRefs(editorStore)

const generateUniqueId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

const deepClone = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof Array) return obj.map(deepClone)
    const cloned: Record<string, any> = {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key])
        }
    }
    return cloned
}

const categorizedMaterialList = computed(() => [
    { title: '基础组件', components: materialList.filter(item => ['button', 'border'].includes(item.type)) },
    { title: '表单组件', components: materialList.filter(item => ['input', 'select', 'radio', 'checkbox', 'switch', 'rate', 'colorPicker', 'slidebar'].includes(item.type)) },
    { title: '数据展示组件', components: materialList.filter(item => ['badge', 'progress', 'result', 'timeline'].includes(item.type)) },
    { title: '其他组件', components: materialList.filter(item => ['pagination', 'collapse'].includes(item.type)) }
])

const getChildPayload = (component: any) => {
    const cloned = deepClone(component)

    // 翻译 label（组件标题）
    const labelKey = `system.builder.components.${cloned.type}`
    cloned.label = t(labelKey) || cloned.label  // 如果找不到 key，就用原中文 fallback

    // 翻译 placeholder（如果有）
    if (cloned.options?.placeholder) {
        const placeholderKey = `system.builder.props.placeholder`
        cloned.options.placeholder = t(placeholderKey) || cloned.options.placeholder
    }

    // 如果你的组件还有其他需要翻译的字段（如 button 的文字、select 的选项等），在这里加
    // 示例：如果 button 有 text
    if (cloned.type === 'button' && cloned.options?.label) {
        cloned.options.label = t('system.builder.components.button') || cloned.options.label
    }

    return {
        ...cloned,
        id: generateUniqueId()
    }
}

const handleDrop = (payload: DropResult) => {
    const { removedIndex, addedIndex } = payload
    const newBlocks = applyDrag(blocks.value, payload)
    editorStore.updateBlock(newBlocks)

    if (removedIndex !== null && addedIndex !== null) {
        const current = editorStore.currentBlock
        if (current === removedIndex) {
            editorStore.selectBlock(addedIndex)
        } else if (current !== null && current < removedIndex && current >= addedIndex) {
            editorStore.selectBlock(current - 1)
        } else if (current !== null && current > removedIndex && current <= addedIndex) {
            editorStore.selectBlock(current + 1)
        }
    } else if (addedIndex !== null && removedIndex === null) {
        editorStore.selectBlock(addedIndex)
    }
}

const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    const result = [...arr]
    if (addedIndex === null) return result

    if (addedIndex !== null && removedIndex === null) {
        result.splice(addedIndex, 0, payload)
    }

    if (addedIndex !== null && removedIndex !== null) {
        return moveArray(result, removedIndex, addedIndex)
    }

    return result
}

onMounted(() => {
    if (blocks.value.length > 0) {
        editorStore.selectBlock(0)
    }
})

const generateVueCode = () => {
    const uniqueTypes = [...new Set(blocks.value.map(b => b.type))];
    const imports = uniqueTypes.map(type => {
        const componentName = `MY${type.charAt(0).toUpperCase() + type.slice(1)}`;
        return `${componentName}`;
    }).join(', ');

    const formDataFields = blocks.value.length > 0
        ? blocks.value.map((_, index) => `field${index}: ''`).join(', ')
        : '// 无字段';

    let templateContent = blocks.value.map((block, index) => {
        const componentName = `MY${block.type.charAt(0).toUpperCase() + block.type.slice(1)}`;
        const optionsStr = JSON.stringify(block.options, null, 0).replace(/"/g, "'");
        return `<MYFormItem label="${block.label}" label-width="${block.options.labelWidth || '100px'}"><${componentName} v-model="formData.field${index}" v-bind="${optionsStr}" /></MYFormItem>`;
    }).join('');

    if (blocks.value.length === 0) {
        templateContent = '<!-- 无组件 -->';
    }

    const vueCode = `<template>
  <MYForm ref="formRef" :model="formData" :rules="rules">
    ${templateContent}
    <MYFormItem>
      <MYButton type="primary" @click="submitForm">提交</MYButton>
    </MYFormItem>
  </MYForm>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { MYForm, MYFormItem, MYButton${imports ? `, ${imports}` : ''} } from 'mengyue-plus';

const formRef = ref(null);
const formData = reactive({ ${formDataFields} });

const rules = reactive({});

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('表单提交:', formData);
    } else {
      console.log('验证失败');
    }
  });
};
<\/script>

<style lang="scss" scoped>
/* 你的样式 */
</style>`;

    return vueCode;
}


const copyCode = async () => {
    const code = generateVueCode()
    try {
        await navigator.clipboard.writeText(code)
        alert(t('system.builder.codeCopiedSuccess') || '代码已复制到剪贴板！')
    } catch (err) {
        console.error('复制失败:', err)
        alert(t('system.builder.copyFailed') || '复制失败')
    }
}

const exportVueFile = () => {
    const code = generateVueCode()
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'GeneratedForm.vue'
    link.click()
    URL.revokeObjectURL(url)
}

const clearCanvas = () => {
    if (confirm(t('system.builder.confirmClearAll') || '确定清空所有组件吗？')) {
        editorStore.clearAll()
    }
}
</script>

<style lang="scss" scoped>
/* 你的样式 */
</style>