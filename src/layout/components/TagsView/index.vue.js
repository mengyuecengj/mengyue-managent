import ScrollTags from './ScrollPane.vue';
import { useTags } from '@/hooks/useViewTags';
// useTags 返回一个对象（不要一次性解构以保留类型），然后我们把需要的字段提取为顶层变量
const tagsCtx = useTags();
// 提取常用 API / 数据
const tags = tagsCtx.tags;
const isActive = tagsCtx.isActive;
const onClose = tagsCtx.onClose;
const onMiddleClick = tagsCtx.onMiddleClick;
const onRefresh = tagsCtx.onRefresh;
const onCloseSelected = tagsCtx.onCloseSelected;
const closeOthers = tagsCtx.closeOthers;
const closeLeft = tagsCtx.closeLeft;
const closeRight = tagsCtx.closeRight;
const closeAll = tagsCtx.closeAll;
const openContextMenu = tagsCtx.openContextMenu;
const registerScrollRef = tagsCtx.registerScrollRef;
// 把 context 的内部 refs 解构为组件顶层变量，这样模板会自动解包（无需 .value）
const menuVisible = tagsCtx.context.visible;
const menuLeft = tagsCtx.context.left;
const menuTop = tagsCtx.context.top;
const selectedTag = tagsCtx.context.selectedTag;
// ScrollTags 组件引用（注册给 hook 以便 hook 在路由变化时滚动到当前标签）
const scrollPaneRef = ref(null);
// wrappers
function handleRefresh() {
    // selectedTag 是一个 ref（顶层），传入实际值给 hook 的 onRefresh
    onRefresh(selectedTag.value ?? null);
}
function contextClose() {
    // 调用 hook 暴露的 close 方法（若 hook 里有单独 close 函数也可直接调用）
    // tagsCtx.context.close() 也是可行，但我们做一层 wrapper 更直观
    tagsCtx.context.close();
}
onMounted(() => {
    registerScrollRef(scrollPaneRef);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tags-view-container" },
});
/** @type {[typeof ScrollTags, typeof ScrollTags, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ScrollTags, new ScrollTags({
    ref: "scrollPaneRef",
}));
const __VLS_1 = __VLS_0({
    ref: "scrollPaneRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {typeof __VLS_ctx.scrollPaneRef} */ ;
var __VLS_3 = {};
__VLS_2.slots.default;
if (__VLS_ctx.tags.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tags-empty" },
    });
}
for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.tags))) {
    const __VLS_5 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ 'onClick': {} },
        ...{ 'onContextmenu': {} },
        key: (tag.fullPath),
        to: ({ path: tag.path, query: tag.query, hash: tag.hash }),
        ...{ class: "tag-item" },
        ...{ class: ({ active: __VLS_ctx.isActive(tag) }) },
        dataPath: (tag.fullPath),
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onClick': {} },
        ...{ 'onContextmenu': {} },
        key: (tag.fullPath),
        to: ({ path: tag.path, query: tag.query, hash: tag.hash }),
        ...{ class: "tag-item" },
        ...{ class: ({ active: __VLS_ctx.isActive(tag) }) },
        dataPath: (tag.fullPath),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_9;
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = {
        onClick: (...[$event]) => {
            __VLS_ctx.onMiddleClick(tag);
        }
    };
    const __VLS_13 = {
        onContextmenu: (...[$event]) => {
            __VLS_ctx.openContextMenu(tag, $event);
        }
    };
    __VLS_8.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
        ...{ class: "tag-indicator" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tag-content" },
    });
    (tag.title);
    const __VLS_14 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        ...{ 'onClick': {} },
        ...{ class: "close-btn" },
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClick': {} },
        ...{ class: "close-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_18;
    let __VLS_19;
    let __VLS_20;
    const __VLS_21 = {
        onClick: (...[$event]) => {
            __VLS_ctx.onClose(tag);
        }
    };
    __VLS_17.slots.default;
    var __VLS_17;
    var __VLS_8;
}
var __VLS_2;
const __VLS_22 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    to: "body",
}));
const __VLS_24 = __VLS_23({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    name: "fade",
    persisted: true,
}));
const __VLS_28 = __VLS_27({
    name: "fade",
    persisted: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ onKeydown: (...[$event]) => {
            __VLS_ctx.contextClose();
        } },
    ...{ class: "context-menu" },
    ...{ style: ({ left: `${__VLS_ctx.menuLeft}px`, top: `${__VLS_ctx.menuTop}px` }) },
    role: "menu",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.menuVisible) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (__VLS_ctx.handleRefresh) },
    role: "menuitem",
});
const __VLS_30 = {}.MYLoadingA;
/** @type {[typeof __VLS_components.MYLoadingA, typeof __VLS_components.MYLoadingA, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ class: "li-icon" },
}));
const __VLS_32 = __VLS_31({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (__VLS_ctx.onCloseSelected) },
    role: "menuitem",
});
const __VLS_34 = {}.MYClose;
/** @type {[typeof __VLS_components.MYClose, typeof __VLS_components.MYClose, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ class: "li-icon" },
}));
const __VLS_36 = __VLS_35({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (__VLS_ctx.closeOthers) },
    role: "menuitem",
});
const __VLS_38 = {}.MYCircleXmark;
/** @type {[typeof __VLS_components.MYCircleXmark, typeof __VLS_components.MYCircleXmark, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ class: "li-icon" },
}));
const __VLS_40 = __VLS_39({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (__VLS_ctx.closeLeft) },
    role: "menuitem",
});
const __VLS_42 = {}.MYArrowLeft;
/** @type {[typeof __VLS_components.MYArrowLeft, typeof __VLS_components.MYArrowLeft, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ class: "li-icon" },
}));
const __VLS_44 = __VLS_43({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (__VLS_ctx.closeRight) },
    role: "menuitem",
});
const __VLS_46 = {}.MYArrowRight;
/** @type {[typeof __VLS_components.MYArrowRight, typeof __VLS_components.MYArrowRight, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ class: "li-icon" },
}));
const __VLS_48 = __VLS_47({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (__VLS_ctx.closeAll) },
    role: "menuitem",
});
const __VLS_50 = {}.MYClose;
/** @type {[typeof __VLS_components.MYClose, typeof __VLS_components.MYClose, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ class: "li-icon" },
}));
const __VLS_52 = __VLS_51({
    ...{ class: "li-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_29;
var __VLS_25;
/** @type {__VLS_StyleScopedClasses['tags-view-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tags-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-content']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['context-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['li-icon']} */ ;
// @ts-ignore
var __VLS_4 = __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ScrollTags: ScrollTags,
            tags: tags,
            isActive: isActive,
            onClose: onClose,
            onMiddleClick: onMiddleClick,
            onCloseSelected: onCloseSelected,
            closeOthers: closeOthers,
            closeLeft: closeLeft,
            closeRight: closeRight,
            closeAll: closeAll,
            openContextMenu: openContextMenu,
            menuVisible: menuVisible,
            menuLeft: menuLeft,
            menuTop: menuTop,
            scrollPaneRef: scrollPaneRef,
            handleRefresh: handleRefresh,
            contextClose: contextClose,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
