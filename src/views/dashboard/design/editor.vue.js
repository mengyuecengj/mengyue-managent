import { useRouter } from 'vue-router';
import { createDropdownConfigs, getAllFlatItems, findComponentConfig } from '@/api-data/dashboard/dropdownTop';
import { toggleBrowserFullscreen } from '@/utils/dashboard';
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
import { useDashboardStore } from '@/store/modules/dashboard';
import DraggableResizableBlock from '@/components/dashboard/blocks/DraggableResizableBlock.vue';
import operation from './operation.vue';
import { getPropsPanel } from '@/components/dashboard/propsPanel';
import { resolveComponentByType } from '@/utils/resolveComponentByType';
import { cloneDeep } from 'lodash-es';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const dashboardStore = useDashboardStore();
const { blocks: chartBlocks, screen } = storeToRefs(dashboardStore);
const router = useRouter();
const browserFullscreen = ref(false);
const activeChildren = ref([]);
const menuVisible = ref(false);
const menuLeft = ref(0);
const menuTop = ref(0);
const currentRightClickBlockId = ref(null);
// 动态生成下拉配置
const dropdownConfigs = computed(() => createDropdownConfigs(t));
// 获取所有扁平化的项，用于查找组件配置
const allFlatItems = computed(() => getAllFlatItems(t));
const cancelSelect = (e) => {
    const target = e.target;
    if (target && target.closest && target.closest('.chart-block')) {
        return;
    }
    if (typeof dashboardStore.selectBlock === 'function') {
        dashboardStore.selectBlock(null);
    }
    else {
        dashboardStore.selectedId = null;
    }
};
const handleContextMenu = (e, block) => {
    e.preventDefault();
    currentRightClickBlockId.value = block.id;
    menuVisible.value = true;
    menuLeft.value = e.clientX;
    menuTop.value = e.clientY;
    const closeMenu = () => {
        menuVisible.value = false;
        document.removeEventListener('click', closeMenu);
    };
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 100);
};
const getDefaultTitle = () => t('dashboard.defaultTitle');
const selectBlock = computed(() => {
    return chartBlocks.value.find(item => item.id === dashboardStore.selectedId);
});
const propsPanelComponent = computed(() => {
    if (!selectBlock.value)
        return null;
    return getPropsPanel(selectBlock.value.type) || 'div';
});
const handleHover = (item) => {
    activeChildren.value = item.children || [];
};
const layersSorted = computed(() => {
    return [...chartBlocks.value].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
});
const editingId = ref(null);
const editngName = ref('');
const startRename = async (block) => {
    editingId.value = block.id;
    editngName.value = block.name;
    await nextTick();
    document.querySelector('.rename-input')?.focus();
};
const finishRename = (id) => {
    if (editngName.value.trim()) {
        dashboardStore.renameBlock(id, editngName.value.trim());
    }
    editingId.value = null;
};
const canvasStyle = computed(() => ({
    width: `${screen.value.width}px`,
    height: `${screen.value.height}px`,
    backgroundColor: screen.value.backgroundColor,
    backgroundImage: screen.value.backgroundImage ? `url(${screen.value.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}));
const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj);
    if (obj instanceof Array)
        return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
};
const mouseX = ref(0);
const mouseY = ref(0);
const updateMousePosition = (e) => {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
};
const handleDrop = (dropResult) => {
    const { payload, addedIndex } = dropResult;
    if (!payload || addedIndex === null)
        return;
    const canvas = document.querySelector('.canvas-placeholder');
    const rect = canvas?.getBoundingClientRect();
    const x = mouseX.value - (rect?.left || 0) - 200 || 200;
    const y = mouseY.value - (rect?.top || 0) - 150 || 200;
    dashboardStore.addBlock(payload.type, payload.component || payload.config, x, y, payload.name);
};
const getChildPayload = (index) => {
    const child = activeChildren.value[index];
    if (!child?.componentConfig)
        return null;
    const payload = {
        type: child.value,
        name: child.label,
    };
    if (child.type === 'decoration') {
        payload.component = child.componentConfig;
    }
    else {
        payload.config = cloneDeep(child.componentConfig);
    }
    return payload;
};
const handleCommand = (command) => {
    const componentConfig = findComponentConfig(command, allFlatItems.value);
    if (!componentConfig)
        return;
};
const contextDelete = () => {
    if (!currentRightClickBlockId.value)
        true;
    if (currentRightClickBlockId.value) {
        dashboardStore.removeBlock(currentRightClickBlockId.value);
        menuVisible.value = false;
    }
    menuVisible.value = false;
};
const contextCopy = () => {
    if (!currentRightClickBlockId.value)
        true;
    if (currentRightClickBlockId.value) {
        dashboardStore.copyBlock(currentRightClickBlockId.value);
        menuVisible.value = false;
    }
    menuVisible.value = false;
};
const handleFullscreenChange = () => {
    browserFullscreen.value = !!document.fullscreenElement;
};
const gotoexit = () => {
    router.push("/dashboard/design/list");
};
const togglePreview = () => {
    dashboardStore.togglePreview();
};
const handleSave = () => {
    dashboardStore.saveCurrentDashboard();
};
onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    const saved = localStorage.getItem('dashboard-screen');
    if (!saved)
        return;
    const data = JSON.parse(saved);
    dashboardStore.screen = data.screen;
    dashboardStore.blocks = data.blocks.map((b) => ({
        ...b,
        component: resolveComponentByType(b)
    }));
    // 添加键盘快捷键监听
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            dashboardStore.undo();
        }
        else if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            dashboardStore.redo();
        }
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-top" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-nav" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-left" },
});
for (const [config, index] of __VLS_getVForSourceType((__VLS_ctx.dropdownConfigs))) {
    const __VLS_0 = {}.MYDropdown;
    /** @type {[typeof __VLS_components.MYDropdown, typeof __VLS_components.MYDropdown, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onCommand': {} },
        key: (index),
        trigger: "click",
        placement: "bottom-end",
        backGroundColor: "var(--sidebar-bg)",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onCommand': {} },
        key: (index),
        trigger: "click",
        placement: "bottom-end",
        backGroundColor: "var(--sidebar-bg)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onCommand: (__VLS_ctx.handleCommand)
    };
    __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "my-dropdown-link" },
    });
    const __VLS_8 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "content" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "content" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    (config.title);
    var __VLS_11;
    {
        const { dropdown: __VLS_thisSlot } = __VLS_3.slots;
        const __VLS_12 = {}.MYScrollbar;
        /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            ...{ class: "scrollbar-containers" },
            ScrollWidth: "4px",
            trackColor: "transparent",
        }));
        const __VLS_14 = __VLS_13({
            ...{ class: "scrollbar-containers" },
            ScrollWidth: "4px",
            trackColor: "transparent",
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_15.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "dropdown-columns" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "column" },
        });
        for (const [item] of __VLS_getVForSourceType((config.items))) {
            const __VLS_16 = {}.MYDropdownItem;
            /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                ...{ 'onMouseenter': {} },
                key: (item.value),
                command: (item),
            }));
            const __VLS_18 = __VLS_17({
                ...{ 'onMouseenter': {} },
                key: (item.value),
                command: (item),
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            let __VLS_20;
            let __VLS_21;
            let __VLS_22;
            const __VLS_23 = {
                onMouseenter: (...[$event]) => {
                    __VLS_ctx.handleHover(item);
                }
            };
            __VLS_19.slots.default;
            (item.label);
            var __VLS_19;
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "column" },
        });
        const __VLS_24 = {}.SmoothDndContainer;
        /** @type {[typeof __VLS_components.SmoothDndContainer, typeof __VLS_components.SmoothDndContainer, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ class: "dropdown-container" },
            behaviour: "copy",
            groupName: "components",
            tag: "div",
            getChildPayload: ((index) => __VLS_ctx.getChildPayload(index)),
        }));
        const __VLS_26 = __VLS_25({
            ...{ class: "dropdown-container" },
            behaviour: "copy",
            groupName: "components",
            tag: "div",
            getChildPayload: ((index) => __VLS_ctx.getChildPayload(index)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_27.slots.default;
        for (const [child] of __VLS_getVForSourceType((__VLS_ctx.activeChildren))) {
            const __VLS_28 = {}.SmoothDndDraggable;
            /** @type {[typeof __VLS_components.SmoothDndDraggable, typeof __VLS_components.SmoothDndDraggable, ]} */ ;
            // @ts-ignore
            const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
                key: (child.value),
            }));
            const __VLS_30 = __VLS_29({
                key: (child.value),
            }, ...__VLS_functionalComponentArgsRest(__VLS_29));
            __VLS_31.slots.default;
            const __VLS_32 = {}.MYDropdownItem;
            /** @type {[typeof __VLS_components.MYDropdownItem, typeof __VLS_components.MYDropdownItem, ]} */ ;
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
                command: (child.value),
            }));
            const __VLS_34 = __VLS_33({
                command: (child.value),
            }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            __VLS_35.slots.default;
            (child.label);
            var __VLS_35;
            var __VLS_31;
        }
        var __VLS_27;
        var __VLS_15;
    }
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "my-dropdown-link" },
});
const __VLS_36 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (__VLS_ctx.togglePreview)
};
__VLS_39.slots.default;
(__VLS_ctx.dashboardStore.previewMode ? __VLS_ctx.$t('dashboard.editor.exitPreview') : __VLS_ctx.$t('dashboard.editor.preview'));
var __VLS_39;
const __VLS_44 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onClick: (__VLS_ctx.handleSave)
};
__VLS_47.slots.default;
(__VLS_ctx.$t('dashboard.editor.save'));
var __VLS_47;
const __VLS_52 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onClick: (...[$event]) => {
        __VLS_ctx.dashboardStore.undo();
    }
};
__VLS_55.slots.default;
(__VLS_ctx.$t('dashboard.editor.undo'));
var __VLS_55;
const __VLS_60 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}));
const __VLS_62 = __VLS_61({
    ...{ 'onClick': {} },
    textColor: "#fff",
    size: "large",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_64;
let __VLS_65;
let __VLS_66;
const __VLS_67 = {
    onClick: (...[$event]) => {
        __VLS_ctx.dashboardStore.redo();
    }
};
__VLS_63.slots.default;
(__VLS_ctx.$t('dashboard.editor.redo'));
var __VLS_63;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-right" },
});
const __VLS_68 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_70 = __VLS_69({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_72;
let __VLS_73;
let __VLS_74;
const __VLS_75 = {
    onClick: (__VLS_ctx.toggleBrowserFullscreen)
};
__VLS_71.slots.default;
(__VLS_ctx.browserFullscreen ? __VLS_ctx.$t('dashboard.editor.exitFullscreen') : __VLS_ctx.$t('dashboard.editor.enterFullscreen'));
var __VLS_71;
const __VLS_76 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ 'onClick': {} },
    ...{ style: {} },
    type: "danger",
    plain: true,
}));
const __VLS_78 = __VLS_77({
    ...{ 'onClick': {} },
    ...{ style: {} },
    type: "danger",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_80;
let __VLS_81;
let __VLS_82;
const __VLS_83 = {
    onClick: (__VLS_ctx.gotoexit)
};
__VLS_79.slots.default;
(__VLS_ctx.$t('dashboard.editor.exitSystem'));
var __VLS_79;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-content" },
});
if (!__VLS_ctx.dashboardStore.previewMode) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-left" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-title" },
    });
    const __VLS_84 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
        textColor: "var(--general)",
        size: "20px",
    }));
    const __VLS_86 = __VLS_85({
        textColor: "var(--general)",
        size: "20px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    __VLS_87.slots.default;
    (__VLS_ctx.$t('dashboard.editor.layer'));
    var __VLS_87;
    const __VLS_88 = {}.MYScrollbar;
    /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        height: "calc(100vh - 53px)",
        ScrollWidth: "4px",
    }));
    const __VLS_90 = __VLS_89({
        height: "calc(100vh - 53px)",
        ScrollWidth: "4px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    __VLS_91.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layers-list" },
    });
    for (const [block] of __VLS_getVForSourceType((__VLS_ctx.layersSorted))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.dashboardStore.previewMode))
                        return;
                    __VLS_ctx.dashboardStore.selectBlock(block.id);
                } },
            ...{ onDblclick: (...[$event]) => {
                    if (!(!__VLS_ctx.dashboardStore.previewMode))
                        return;
                    __VLS_ctx.startRename(block);
                } },
            ...{ onContextmenu: (...[$event]) => {
                    if (!(!__VLS_ctx.dashboardStore.previewMode))
                        return;
                    __VLS_ctx.handleContextMenu($event, block);
                } },
            key: (block.id),
            ...{ class: "layer-item" },
            ...{ class: ({ active: __VLS_ctx.dashboardStore.selectedId === block.id }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "layer-name" },
        });
        (__VLS_ctx.editingId === block.id ? '' : block.name);
        if (__VLS_ctx.editingId === block.id) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                ...{ onBlur: (...[$event]) => {
                        if (!(!__VLS_ctx.dashboardStore.previewMode))
                            return;
                        if (!(__VLS_ctx.editingId === block.id))
                            return;
                        __VLS_ctx.finishRename(block.id);
                    } },
                ...{ onKeyup: (...[$event]) => {
                        if (!(!__VLS_ctx.dashboardStore.previewMode))
                            return;
                        if (!(__VLS_ctx.editingId === block.id))
                            return;
                        __VLS_ctx.finishRename(block.id);
                    } },
                ...{ onClick: () => { } },
                ref: "renameInput",
                ...{ class: "rename-input" },
            });
            (__VLS_ctx.editngName);
            /** @type {typeof __VLS_ctx.renameInput} */ ;
        }
    }
    var __VLS_91;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-center" },
});
const __VLS_92 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    ...{ 'onMouse': {} },
    height: "100vh",
    ScrollWidth: "4px",
}));
const __VLS_94 = __VLS_93({
    ...{ 'onMouse': {} },
    height: "100vh",
    ScrollWidth: "4px",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_96;
let __VLS_97;
let __VLS_98;
const __VLS_99 = {
    onMouse: (__VLS_ctx.cancelSelect)
};
__VLS_95.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMousemove: (__VLS_ctx.updateMousePosition) },
    ...{ class: (['canvas-outer', { 'preview-fullscreen': __VLS_ctx.dashboardStore.previewMode }]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "canvas-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMousedown: (__VLS_ctx.cancelSelect) },
    ...{ class: "canvas-placeholder" },
    ...{ style: (__VLS_ctx.canvasStyle) },
});
const __VLS_100 = {}.SmoothDndContainer;
/** @type {[typeof __VLS_components.SmoothDndContainer, typeof __VLS_components.SmoothDndContainer, ]} */ ;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    ...{ 'onDrop': {} },
    ...{ class: "block-group" },
    groupName: "components",
}));
const __VLS_102 = __VLS_101({
    ...{ 'onDrop': {} },
    ...{ class: "block-group" },
    groupName: "components",
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_104;
let __VLS_105;
let __VLS_106;
const __VLS_107 = {
    onDrop: (__VLS_ctx.handleDrop)
};
__VLS_103.slots.default;
for (const [block] of __VLS_getVForSourceType((__VLS_ctx.chartBlocks))) {
    const __VLS_108 = {}.SmoothDndDraggable;
    /** @type {[typeof __VLS_components.SmoothDndDraggable, typeof __VLS_components.SmoothDndDraggable, ]} */ ;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
        key: (block.id),
    }));
    const __VLS_110 = __VLS_109({
        key: (block.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    __VLS_111.slots.default;
    /** @type {[typeof DraggableResizableBlock, ]} */ ;
    // @ts-ignore
    const __VLS_112 = __VLS_asFunctionalComponent(DraggableResizableBlock, new DraggableResizableBlock({
        block: (block),
    }));
    const __VLS_113 = __VLS_112({
        block: (block),
    }, ...__VLS_functionalComponentArgsRest(__VLS_112));
    var __VLS_111;
}
var __VLS_103;
if (!__VLS_ctx.chartBlocks.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-hint" },
    });
    (__VLS_ctx.$t('dashboard.editor.emptyHint'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "size-tag" },
});
(__VLS_ctx.screen.width);
(__VLS_ctx.screen.height);
var __VLS_95;
const __VLS_115 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    to: "body",
}));
const __VLS_117 = __VLS_116({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
__VLS_118.slots.default;
const __VLS_119 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    name: "fade",
    persisted: true,
}));
const __VLS_121 = __VLS_120({
    name: "fade",
    persisted: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
__VLS_122.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "context-menu" },
    ...{ style: ({ left: `${__VLS_ctx.menuLeft}px`, top: `${__VLS_ctx.menuTop}px` }) },
    role: "menu",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.menuVisible) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.contextDelete();
        } },
    role: "menuitem",
});
const __VLS_123 = {}.MYClose;
/** @type {[typeof __VLS_components.MYClose, typeof __VLS_components.MYClose, ]} */ ;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
    ...{ class: "li-icon" },
}));
const __VLS_125 = __VLS_124({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('dashboard.editor.deleteLayer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.contextCopy();
        } },
    role: "menuitem",
});
const __VLS_127 = {}.MYOdometerText;
/** @type {[typeof __VLS_components.MYOdometerText, typeof __VLS_components.MYOdometerText, ]} */ ;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
    ...{ class: "li-icon" },
}));
const __VLS_129 = __VLS_128({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.$t('dashboard.editor.copyLayer'));
var __VLS_122;
var __VLS_118;
if (!__VLS_ctx.dashboardStore.previewMode) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-right" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-title" },
    });
    const __VLS_131 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
        textColor: "var(--general)",
        size: "20px",
    }));
    const __VLS_133 = __VLS_132({
        textColor: "var(--general)",
        size: "20px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    __VLS_134.slots.default;
    (__VLS_ctx.$t('dashboard.editor.layer'));
    var __VLS_134;
    const __VLS_135 = {}.MYScrollbar;
    /** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
        height: "calc(100vh - 53px)",
        ScrollWidth: "4px",
    }));
    const __VLS_137 = __VLS_136({
        height: "calc(100vh - 53px)",
        ScrollWidth: "4px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    __VLS_138.slots.default;
    if (!__VLS_ctx.selectBlock) {
        /** @type {[typeof operation, ]} */ ;
        // @ts-ignore
        const __VLS_139 = __VLS_asFunctionalComponent(operation, new operation({}));
        const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
    }
    else {
        const __VLS_142 = ((__VLS_ctx.propsPanelComponent));
        // @ts-ignore
        const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
            config: (__VLS_ctx.selectBlock.config),
            block: (__VLS_ctx.selectBlock),
        }));
        const __VLS_144 = __VLS_143({
            config: (__VLS_ctx.selectBlock.config),
            block: (__VLS_ctx.selectBlock),
        }, ...__VLS_functionalComponentArgsRest(__VLS_143));
    }
    var __VLS_138;
}
/** @type {__VLS_StyleScopedClasses['dashboard-top']} */ ;
/** @type {__VLS_StyleScopedClasses['top-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-left']} */ ;
/** @type {__VLS_StyleScopedClasses['my-dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['scrollbar-containers']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-columns']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-container']} */ ;
/** @type {__VLS_StyleScopedClasses['my-dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-right']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-left']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-title']} */ ;
/** @type {__VLS_StyleScopedClasses['layers-list']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-name']} */ ;
/** @type {__VLS_StyleScopedClasses['rename-input']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-center']} */ ;
/** @type {__VLS_StyleScopedClasses['canvas-outer']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-fullscreen']} */ ;
/** @type {__VLS_StyleScopedClasses['canvas-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['canvas-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['block-group']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['size-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['context-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-right']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-title']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            toggleBrowserFullscreen: toggleBrowserFullscreen,
            SmoothDndContainer: SmoothDndContainer,
            SmoothDndDraggable: SmoothDndDraggable,
            DraggableResizableBlock: DraggableResizableBlock,
            operation: operation,
            dashboardStore: dashboardStore,
            chartBlocks: chartBlocks,
            screen: screen,
            browserFullscreen: browserFullscreen,
            activeChildren: activeChildren,
            menuVisible: menuVisible,
            menuLeft: menuLeft,
            menuTop: menuTop,
            dropdownConfigs: dropdownConfigs,
            cancelSelect: cancelSelect,
            handleContextMenu: handleContextMenu,
            selectBlock: selectBlock,
            propsPanelComponent: propsPanelComponent,
            handleHover: handleHover,
            layersSorted: layersSorted,
            editingId: editingId,
            editngName: editngName,
            startRename: startRename,
            finishRename: finishRename,
            canvasStyle: canvasStyle,
            updateMousePosition: updateMousePosition,
            handleDrop: handleDrop,
            getChildPayload: getChildPayload,
            handleCommand: handleCommand,
            contextDelete: contextDelete,
            contextCopy: contextCopy,
            gotoexit: gotoexit,
            togglePreview: togglePreview,
            handleSave: handleSave,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
