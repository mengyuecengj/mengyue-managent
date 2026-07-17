import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
import Renderer from '@/DataBlocks/Renderer.vue';
import RightPanel from './RightPanel.vue';
import { materialList } from '@/api-data/builder/form';
import { useEditorStore } from '@/store/modules/editor';
import { moveArray } from '@/utils/general';
import { onMounted, toRefs, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const editorStore = useEditorStore();
const { blocks } = toRefs(editorStore);
const generateUniqueId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj);
    if (obj instanceof Array)
        return obj.map(deepClone);
    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
};
const categorizedMaterialList = computed(() => [
    { title: '基础组件', components: materialList.filter(item => ['button', 'border'].includes(item.type)) },
    { title: '表单组件', components: materialList.filter(item => ['input', 'select', 'radio', 'checkbox', 'switch', 'rate', 'colorPicker', 'slidebar'].includes(item.type)) },
    { title: '数据展示组件', components: materialList.filter(item => ['badge', 'progress', 'result', 'timeline'].includes(item.type)) },
    { title: '其他组件', components: materialList.filter(item => ['pagination', 'collapse'].includes(item.type)) }
]);
const getChildPayload = (component) => {
    const cloned = deepClone(component);
    // 翻译 label（组件标题）
    const labelKey = `system.builder.components.${cloned.type}`;
    cloned.label = t(labelKey) || cloned.label; // 如果找不到 key，就用原中文 fallback
    // 翻译 placeholder（如果有）
    if (cloned.options?.placeholder) {
        const placeholderKey = `system.builder.props.placeholder`;
        cloned.options.placeholder = t(placeholderKey) || cloned.options.placeholder;
    }
    // 如果你的组件还有其他需要翻译的字段（如 button 的文字、select 的选项等），在这里加
    // 示例：如果 button 有 text
    if (cloned.type === 'button' && cloned.options?.label) {
        cloned.options.label = t('system.builder.components.button') || cloned.options.label;
    }
    return {
        ...cloned,
        id: generateUniqueId()
    };
};
const handleDrop = (payload) => {
    const { removedIndex, addedIndex } = payload;
    const newBlocks = applyDrag(blocks.value, payload);
    editorStore.updateBlock(newBlocks);
    if (removedIndex !== null && addedIndex !== null) {
        const current = editorStore.currentBlock;
        if (current === removedIndex) {
            editorStore.selectBlock(addedIndex);
        }
        else if (current !== null && current < removedIndex && current >= addedIndex) {
            editorStore.selectBlock(current - 1);
        }
        else if (current !== null && current > removedIndex && current <= addedIndex) {
            editorStore.selectBlock(current + 1);
        }
    }
    else if (addedIndex !== null && removedIndex === null) {
        editorStore.selectBlock(addedIndex);
    }
};
const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    const result = [...arr];
    if (addedIndex === null)
        return result;
    if (addedIndex !== null && removedIndex === null) {
        result.splice(addedIndex, 0, payload);
    }
    if (addedIndex !== null && removedIndex !== null) {
        return moveArray(result, removedIndex, addedIndex);
    }
    return result;
};
onMounted(() => {
    if (blocks.value.length > 0) {
        editorStore.selectBlock(0);
    }
});
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
const copyCode = async () => {
    const code = generateVueCode();
    try {
        await navigator.clipboard.writeText(code);
        alert(t('system.builder.codeCopiedSuccess') || '代码已复制到剪贴板！');
    }
    catch (err) {
        console.error('复制失败:', err);
        alert(t('system.builder.copyFailed') || '复制失败');
    }
};
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
const clearCanvas = () => {
    if (confirm(t('system.builder.confirmClearAll') || '确定清空所有组件吗？')) {
        editorStore.clearAll();
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
(__VLS_ctx.t('system.builder.formGenerator'));
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
(__VLS_ctx.t('system.builder.exportVueFile'));
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
(__VLS_ctx.t('system.builder.copyCode'));
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
(__VLS_ctx.t('system.builder.clearCanvas'));
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
(__VLS_ctx.t('system.builder.properties'));
var __VLS_43;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bottom-builder" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "build-left" },
});
const __VLS_44 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    height: "100vh",
    scrollWidth: "4px",
    trackColor: "transparent",
}));
const __VLS_46 = __VLS_45({
    height: "100vh",
    scrollWidth: "4px",
    trackColor: "transparent",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categorizedMaterialList))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (category.title),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "category-title" },
    });
    const __VLS_48 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        type: "primary",
        size: "14px",
        ...{ style: {} },
    }));
    const __VLS_50 = __VLS_49({
        type: "primary",
        size: "14px",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    (__VLS_ctx.t(`system.builder.categories.${category.title}`) || category.title);
    var __VLS_51;
    const __VLS_52 = {}.SmoothDndContainer;
    /** @type {[typeof __VLS_components.SmoothDndContainer, typeof __VLS_components.SmoothDndContainer, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ class: "block-group" },
        behaviour: "copy",
        groupName: "blocks",
        tag: "div",
        getChildPayload: ((index) => __VLS_ctx.getChildPayload(category.components[index])),
    }));
    const __VLS_54 = __VLS_53({
        ...{ class: "block-group" },
        behaviour: "copy",
        groupName: "blocks",
        tag: "div",
        getChildPayload: ((index) => __VLS_ctx.getChildPayload(category.components[index])),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    for (const [m] of __VLS_getVForSourceType((category.components))) {
        const __VLS_56 = {}.SmoothDndDraggable;
        /** @type {[typeof __VLS_components.SmoothDndDraggable, typeof __VLS_components.SmoothDndDraggable, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            key: (m.type),
        }));
        const __VLS_58 = __VLS_57({
            key: (m.type),
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        __VLS_59.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "block-left-item" },
        });
        (__VLS_ctx.t(`system.builder.components.${m.type}`) || m.label);
        var __VLS_59;
    }
    var __VLS_55;
}
var __VLS_47;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "build-center" },
});
const __VLS_60 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    height: "100vh",
    scrollWidth: "4px",
    trackColor: "transparent",
}));
const __VLS_62 = __VLS_61({
    height: "100vh",
    scrollWidth: "4px",
    trackColor: "transparent",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
const __VLS_64 = {}.SmoothDndContainer;
/** @type {[typeof __VLS_components.SmoothDndContainer, typeof __VLS_components.SmoothDndContainer, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onDrop': {} },
    ...{ class: "block-group" },
    groupName: "blocks",
    orientation: "vertical",
    tag: "div",
}));
const __VLS_66 = __VLS_65({
    ...{ 'onDrop': {} },
    ...{ class: "block-group" },
    groupName: "blocks",
    orientation: "vertical",
    tag: "div",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onDrop: (__VLS_ctx.handleDrop)
};
__VLS_67.slots.default;
for (const [block, index] of __VLS_getVForSourceType((__VLS_ctx.blocks))) {
    const __VLS_72 = {}.SmoothDndDraggable;
    /** @type {[typeof __VLS_components.SmoothDndDraggable, typeof __VLS_components.SmoothDndDraggable, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        key: (block.id || index),
    }));
    const __VLS_74 = __VLS_73({
        key: (block.id || index),
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    __VLS_75.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.editorStore.selectBlock(index);
            } },
        ...{ class: "content-container" },
        ...{ class: ({ active: __VLS_ctx.editorStore.currentBlock === index }) },
    });
    /** @type {[typeof Renderer, ]} */ ;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(Renderer, new Renderer({
        ...{ class: "content-item" },
        config: (block),
    }));
    const __VLS_77 = __VLS_76({
        ...{ class: "content-item" },
        config: (block),
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    var __VLS_75;
}
var __VLS_67;
var __VLS_63;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "build-right" },
});
const __VLS_79 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    scrollWidth: "4px",
    height: "100vh",
    trackColor: "transparent",
}));
const __VLS_81 = __VLS_80({
    scrollWidth: "4px",
    height: "100vh",
    trackColor: "transparent",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
__VLS_82.slots.default;
/** @type {[typeof RightPanel, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(RightPanel, new RightPanel({}));
const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
var __VLS_82;
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
/** @type {__VLS_StyleScopedClasses['category-title']} */ ;
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
            t: t,
            editorStore: editorStore,
            blocks: blocks,
            categorizedMaterialList: categorizedMaterialList,
            getChildPayload: getChildPayload,
            handleDrop: handleDrop,
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
