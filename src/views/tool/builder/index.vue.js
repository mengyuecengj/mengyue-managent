import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
import Renderer from '@/DataBlocks/Renderer.vue';
import RightPanel from './RightPanel.vue';
import { materialList } from '@/data/builder/form';
import { useEditorStore } from '@/store/modules/editor';
import { moveArray } from '@/utils/general';
import { onMounted, toRefs } from 'vue'; // 修正导入 toRefs
const editorStore = useEditorStore();
const { blocks } = toRefs(editorStore);
const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    const result = [...arr];
    if (addedIndex === null)
        return result;
    // add
    if (addedIndex !== null && removedIndex === null) {
        result.splice(addedIndex, 0, payload);
    }
    // move
    if (addedIndex !== null && removedIndex !== null) {
        return moveArray(result, removedIndex, addedIndex);
    }
    return result;
};
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
};
// 新增：复制代码
const copyCode = async () => {
    const code = generateVueCode();
    try {
        await navigator.clipboard.writeText(code);
        alert('代码已复制到剪贴板！');
    }
    catch (err) {
        console.error('复制失败:', err);
    }
};
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
};
// 新增：清空画布
const clearCanvas = () => {
    if (confirm('确定清空所有组件吗？')) {
        editorStore.clearAll();
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['smooth-dnd-draggable-wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "builder-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-builder" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-title-left" },
});
const __VLS_0 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "text-left" },
    type: "primary",
    size: "16px",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "text-left" },
    type: "primary",
    size: "16px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-title-right" },
});
const __VLS_4 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onClick': {} },
    type: "primary",
    size: "16px",
    underline: true,
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    type: "primary",
    size: "16px",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.exportVueFile)
};
__VLS_7.slots.default;
const __VLS_12 = {}.MYDownload;
/** @type {[typeof __VLS_components.MYDownload, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    size: "16px",
}));
const __VLS_14 = __VLS_13({
    size: "16px",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_7;
const __VLS_16 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    ...{ class: "text-right" },
    type: "primary",
    size: "16px",
    underline: true,
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    ...{ class: "text-right" },
    type: "primary",
    size: "16px",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.copyCode)
};
__VLS_19.slots.default;
const __VLS_24 = {}.MYOdometerText;
/** @type {[typeof __VLS_components.MYOdometerText, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    color: "#409EFF",
    size: "16px",
}));
const __VLS_26 = __VLS_25({
    color: "#409EFF",
    size: "16px",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_19;
const __VLS_28 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    ...{ class: "text-right" },
    type: "danger",
    size: "16px",
    underline: true,
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    ...{ class: "text-right" },
    type: "danger",
    size: "16px",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.clearCanvas)
};
__VLS_31.slots.default;
const __VLS_36 = {}.MYDelete;
/** @type {[typeof __VLS_components.MYDelete, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    size: "16px",
}));
const __VLS_38 = __VLS_37({
    size: "16px",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
var __VLS_31;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-components" },
});
const __VLS_40 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ class: "attribute" },
    type: "primary",
    size: "18px",
}));
const __VLS_42 = __VLS_41({
    ...{ class: "attribute" },
    type: "primary",
    size: "18px",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
var __VLS_43;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bottom-builder" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "build-left" },
});
const __VLS_44 = {}.SmoothDndContainer;
/** @type {[typeof __VLS_components.SmoothDndContainer, typeof __VLS_components.SmoothDndContainer, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ class: "block-group" },
    behaviour: "copy",
    groupName: "blocks",
    tag: "div",
    getChildPayload: ((index) => __VLS_ctx.materialList[index]),
}));
const __VLS_46 = __VLS_45({
    ...{ class: "block-group" },
    behaviour: "copy",
    groupName: "blocks",
    tag: "div",
    getChildPayload: ((index) => __VLS_ctx.materialList[index]),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
for (const [m] of __VLS_getVForSourceType((__VLS_ctx.materialList))) {
    const __VLS_48 = {}.SmoothDndDraggable;
    /** @type {[typeof __VLS_components.SmoothDndDraggable, typeof __VLS_components.SmoothDndDraggable, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        key: (m.type),
    }));
    const __VLS_50 = __VLS_49({
        key: (m.type),
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "block-left-item" },
    });
    (m.label);
    var __VLS_51;
}
var __VLS_47;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "build-center" },
});
const __VLS_52 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    height: "100vh",
    ScrollWidth: "4px",
    trackColor: "transparent",
}));
const __VLS_54 = __VLS_53({
    height: "100vh",
    ScrollWidth: "4px",
    trackColor: "transparent",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
const __VLS_56 = {}.SmoothDndContainer;
/** @type {[typeof __VLS_components.SmoothDndContainer, typeof __VLS_components.SmoothDndContainer, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ 'onDrop': {} },
    ...{ class: "block-group" },
    groupName: "blocks",
    orientation: "vertical",
    tag: "div",
}));
const __VLS_58 = __VLS_57({
    ...{ 'onDrop': {} },
    ...{ class: "block-group" },
    groupName: "blocks",
    orientation: "vertical",
    tag: "div",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_60;
let __VLS_61;
let __VLS_62;
const __VLS_63 = {
    onDrop: ((payload) => {
        const newBlocks = __VLS_ctx.applyDrag(__VLS_ctx.blocks, payload);
        __VLS_ctx.editorStore.updateBlock(newBlocks);
    })
};
__VLS_59.slots.default;
for (const [block, index] of __VLS_getVForSourceType((__VLS_ctx.blocks))) {
    const __VLS_64 = {}.SmoothDndDraggable;
    /** @type {[typeof __VLS_components.SmoothDndDraggable, typeof __VLS_components.SmoothDndDraggable, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        key: (index),
    }));
    const __VLS_66 = __VLS_65({
        key: (index),
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    __VLS_67.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.editorStore.selectBlock(index);
            } },
        ...{ class: "content-container" },
        ...{ class: ({ active: __VLS_ctx.editorStore.currentBlock === index }) },
    });
    /** @type {[typeof Renderer, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(Renderer, new Renderer({
        ...{ class: "content-item" },
        config: (block),
    }));
    const __VLS_69 = __VLS_68({
        ...{ class: "content-item" },
        config: (block),
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    var __VLS_67;
}
var __VLS_59;
var __VLS_55;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "build-right" },
});
const __VLS_71 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    ScrollWidth: "4px",
    height: "100vh",
    trackColor: "transparent",
}));
const __VLS_73 = __VLS_72({
    ScrollWidth: "4px",
    height: "100vh",
    trackColor: "transparent",
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
__VLS_74.slots.default;
/** @type {[typeof RightPanel, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(RightPanel, new RightPanel({}));
const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
var __VLS_74;
/** @type {__VLS_StyleScopedClasses['builder-container']} */ ;
/** @type {__VLS_StyleScopedClasses['top-builder']} */ ;
/** @type {__VLS_StyleScopedClasses['top-title']} */ ;
/** @type {__VLS_StyleScopedClasses['top-title-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['top-title-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['top-components']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-builder']} */ ;
/** @type {__VLS_StyleScopedClasses['build-left']} */ ;
/** @type {__VLS_StyleScopedClasses['block-group']} */ ;
/** @type {__VLS_StyleScopedClasses['block-left-item']} */ ;
/** @type {__VLS_StyleScopedClasses['build-center']} */ ;
/** @type {__VLS_StyleScopedClasses['block-group']} */ ;
/** @type {__VLS_StyleScopedClasses['content-container']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['content-item']} */ ;
/** @type {__VLS_StyleScopedClasses['build-right']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SmoothDndContainer: SmoothDndContainer,
            SmoothDndDraggable: SmoothDndDraggable,
            Renderer: Renderer,
            RightPanel: RightPanel,
            materialList: materialList,
            editorStore: editorStore,
            blocks: blocks,
            applyDrag: applyDrag,
            copyCode: copyCode,
            exportVueFile: exportVueFile,
            clearCanvas: clearCanvas,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
