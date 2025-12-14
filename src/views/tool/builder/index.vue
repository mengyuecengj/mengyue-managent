<template>
    <div class="builder-container">
        <div class="top-builder">
            <div class="top-title">
                <div class="top-title-left">
                    <MYText class="text-left" type="primary" size="16px">Form Build</MYText>
                </div>
                <div class="top-title-right">
                    <MYa type="primary" size="16px" @click="exportVueFile" underline>
                        <MYDownload size="16px" /> 导出vue文件
                    </MYa>
                    <MYa class="text-right" type="primary" size="16px" underline @click="copyCode">
                        <MYOdometerText color="#409EFF" size="16px" />复制代码
                    </MYa>
                    <MYa class="text-right" type="danger" size="16px" underline @click="clearCanvas">
                        <MYDelete size="16px" />清空
                    </MYa>
                </div>
            </div>
            <div class="top-components">
                <MYText class="attribute" type="primary" size="18px">属性</MYText>
            </div>
        </div>
        <div class="bottom-builder">
            <div class="build-left">
                <MYScrollbar height="100vh" ScrollWidth="4px" trackColor="transparent">
                    <div v-for="category in categorizedMaterialList" :key="category.title">
                        <!-- 分类标题 -->
                        <div class="category-title">
                            <MYText type="primary" size="14px"
                                style="display: flex; justify-self: center; margin-top: 30px;">{{ category.title }}
                            </MYText>
                        </div>
                        <!-- 该分类下的组件列表 -->
                        <SmoothDndContainer class="block-group" behaviour="copy" group-name="blocks" tag="div"
                            :get-child-payload="(index: number) => getChildPayload(category.components[index])">
                            <SmoothDndDraggable v-for="m in category.components" :key="m.type">
                                <div class="block-left-item">{{ m.label }}</div>
                            </SmoothDndDraggable>
                        </SmoothDndContainer>
                    </div>
                </MYScrollbar>
            </div>
            <div class="build-center">
                <MYScrollbar height="100vh" ScrollWidth="4px" trackColor="transparent">
                    <SmoothDndContainer class="block-group" group-name="blocks" orientation="vertical" tag="div"
                        @drop="handleDrop">
                        <SmoothDndDraggable v-for="(block, index) in blocks" :key="block.label">
                            <div class="content-container" @click="editorStore.selectBlock(index)"
                                :class="{ active: editorStore.currentBlock === index }">
                                <Renderer class="content-item" :config="block" />
                            </div>
                        </SmoothDndDraggable>
                    </SmoothDndContainer>
                </MYScrollbar>
            </div>
            <div class="build-right">
                <MYScrollbar ScrollWidth="4px" height="100vh" trackColor="transparent">
                    <RightPanel />
                </MYScrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
import Renderer from '@/DataBlocks/Renderer.vue';
import RightPanel from './RightPanel.vue';
import { materialList } from '@/data/builder/form'
import { useEditorStore } from '@/store/modules/editor';
import { DropResult } from 'smooth-dnd';
import { moveArray } from '@/utils/general';
import { onMounted, toRefs, computed } from 'vue';

const editorStore = useEditorStore();
const { blocks } = toRefs(editorStore);

// 生成唯一ID
const generateUniqueId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 深度克隆对象，确保每个组件都是独立的
const deepClone = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const clonedObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

// 将原始组件列表转换为分类结构
const categorizedMaterialList = computed(() => {
    const categories = [
        {
            title: '基础组件',
            components: materialList.filter(item => ['button', 'border'].includes(item.type))
        },
        {
            title: '表单组件',
            components: materialList.filter(item => ['input', 'select', 'radio', 'checkbox', 'switch', 'rate', 'colorPicker', 'slidebar'].includes(item.type))
        },
        {
            title: '数据展示组件',
            components: materialList.filter(item => ['badge', 'progress', 'result', 'timeline'].includes(item.type))
        },
        {
            title: '其他组件',
            components: materialList.filter(item => ['pagination', 'collapse'].includes(item.type))
        },
    ];
    return categories;
});

// 修改 getChildPayload 方法，为每个拖拽的组件添加唯一ID并深度克隆
const getChildPayload = (component: any) => {
    const clonedComponent = deepClone(component);
    return {
        ...clonedComponent,
        id: generateUniqueId()
    };
}

// 处理拖拽完成事件
const handleDrop = (payload: DropResult) => {
    const { removedIndex, addedIndex } = payload;
    const newBlocks = applyDrag(blocks.value, payload);
    editorStore.updateBlock(newBlocks);

    // 更新选中的索引
    if (removedIndex !== null && addedIndex !== null) {
        // 移动操作
        const currentSelectedIndex = editorStore.currentBlock;

        if (currentSelectedIndex === removedIndex) {
            // 如果选中的是移动的项，则更新选中索引到新位置
            editorStore.selectBlock(addedIndex);
        } else if (currentSelectedIndex !== null && currentSelectedIndex < removedIndex && currentSelectedIndex >= addedIndex) {            // 如果选中的项在移动项之后且在目标位置之前，需要减1
            editorStore.selectBlock(currentSelectedIndex - 1);
        } else if (currentSelectedIndex !== null && currentSelectedIndex < removedIndex && currentSelectedIndex >= addedIndex) {
            // 如果选中的项在移动项之前且在目标位置之后，需要加1
            editorStore.selectBlock(currentSelectedIndex + 1);
        }
        // 其他情况，选中的索引保持不变
    } else if (addedIndex !== null && removedIndex === null) {
        // 添加操作，选中新添加的项
        editorStore.selectBlock(addedIndex);
    }
}

const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    const result = [...arr];
    if (addedIndex === null) return result;

    // add
    if (addedIndex !== null && removedIndex === null) {
        result.splice(addedIndex, 0, payload);
    }

    // move
    if (addedIndex !== null && removedIndex !== null) {
        return moveArray(result, removedIndex, addedIndex);
    }

    return result;
}

// 可选：默认选中第一个
onMounted(() => {
    if (blocks.value.length > 0) {
        editorStore.selectBlock(0);
    }
});

// 新增：生成Vue代码的辅助函数（修复模板字符串，确保闭合）
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

// 新增：复制代码
const copyCode = async () => {
    const code = generateVueCode();
    try {
        await navigator.clipboard.writeText(code);
        alert('代码已复制到剪贴板！');
    } catch (err) {
        console.error('复制失败:', err);
    }
}

// 新增：导出Vue文件
const exportVueFile = () => {
    const code = generateVueCode();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GeneratedForm.vue';
    link.click();
    URL.revokeObjectURL(url);
}

// 新增：清空画布
const clearCanvas = () => {
    if (confirm('确定清空所有组件吗？')) {
        editorStore.clearAll();
    }
}
</script>

<style lang="scss" scoped>

</style>