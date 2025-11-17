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
                <SmoothDndContainer class="block-group" behaviour="copy" group-name="blocks" tag="div"
                    :get-child-payload="(index: number) => materialList[index]">
                    <SmoothDndDraggable v-for="m in materialList" :key="m.type">
                        <div class="block-left-item">{{ m.label }}</div>
                    </SmoothDndDraggable>
                </SmoothDndContainer>
            </div>
            <div class="build-center">
                <MYScrollbar height="100vh" ScrollWidth="4px" trackColor="transparent">
                    <SmoothDndContainer class="block-group" group-name="blocks" orientation="vertical" tag="div" @drop="(payload) => {
                        const newBlocks = applyDrag(blocks, payload)
                        editorStore.updateBlock(newBlocks)
                    }">
                        <SmoothDndDraggable v-for="(block, index) in blocks" :key="index">
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
import { onMounted, toRefs } from 'vue';  // 修正导入 toRefs

const editorStore = useEditorStore();
const { blocks } = toRefs(editorStore);

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
.builder-container {

    .top-builder {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);

        .top-title {
            display: flex;
            justify-content: space-between;
            width: 80%;

            .top-title-left {
                .text-left {
                    font-weight: 700;
                }
            }

            .top-title-right {
                display: flex;
                gap: 20px;
                margin-bottom: 10px;
                margin-right: 10px;
            }
        }

        .top-components {
            border-left: 1px solid var(--border-color);
            width: 268px;

            .attribute {
                font-weight: 700;
                margin-left: 50%;
            }
        }
    }

    .bottom-builder {
        display: flex;
        justify-content: flex-start;

        .build-left {
            width: 200px;
            height: calc(100% - 50px);
            height: 78vh;
            border-right: 1px solid var(--border-color);

            .block-group {
                padding: 10px;

                .smooth-dnd-draggable-wrapper {
                    width: calc(50% - 10px);
                    margin: 5px;
                    display: inline-block;
                }

                .block-left-item {
                    width: 60px;
                    height: 40px;
                    background: var(--table-border-color);
                    color:var(--general);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                }
            }
        }

        .build-center {
            width: calc(100% - 300px);
            height: 77vh;
            margin-top: 10px;

            .smooth-dnd-draggable-wrapper {
                transition: all 0.2s;
                /* 默认状态 */
                background-color: transparent;
                height: auto;

                & .active {
                    background-color: var(--table-border-color);
                    height: 70px;
                    border: 1px solid #409EFF;
                    border-radius: 4px;
                    padding: 10px;
                }

                .content-container {
                    margin: 0 auto;
                    width: 96%;
                    height: auto;


                    .content-item {
                        display: flex;
                        gap: 10px;
                        margin-top: 20px;
                    }
                }
            }
        }

        .build-right {
            width: 305px;
            height: calc(100% - 50px);
            height: 78vh;
            border-left: 1px solid var(--border-color);
            overflow: auto;
        }
    }
}
</style>