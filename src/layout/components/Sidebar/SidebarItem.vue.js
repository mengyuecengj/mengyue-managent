import { ref } from 'vue';
import { isExternal } from '@/utils/validate';
import { getNormalPath } from '@/utils/general';
const props = defineProps();
const onlyOneChild = ref({});
// 获取菜单项类名
function getMenuItemClass(route) {
    const classes = [];
    if (!props.isNest) {
        classes.push('submenu-title-noDropdown');
    }
    // 如果是首页，添加特殊 class
    if (route.path === '/index' || route.meta?.title === '首页') {
        classes.push('home-menu-item');
    }
    return classes.join(' ');
}
// 其他函数保持不变...
function hasOneShowingChild(children = [], parent) {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false;
        }
        onlyOneChild.value = item;
        return true;
    });
    if (showingChildren.length === 1) {
        return true;
    }
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
        return true;
    }
    return false;
}
function resolvePath(routePath) {
    if (isExternal(routePath)) {
        return routePath;
    }
    const basePath = props.basePath ?? '';
    if (isExternal(basePath)) {
        return basePath;
    }
    if (!basePath) {
        return getNormalPath(routePath);
    }
    const resolvedPath = getNormalPath(basePath + '/' + routePath);
    return resolvedPath;
}
function hasTitle(title = '') {
    return title.length > 5 ? title : '';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (!__VLS_ctx.item.hidden) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (__VLS_ctx.hasOneShowingChild(__VLS_ctx.item.children, __VLS_ctx.item) && (!__VLS_ctx.onlyOneChild.children || __VLS_ctx.onlyOneChild.noShowingChildren) && !__VLS_ctx.item.alwaysShow) {
        if (__VLS_ctx.onlyOneChild.meta) {
            const __VLS_0 = {}.MYMenuItem;
            /** @type {[typeof __VLS_components.MYMenuItem, typeof __VLS_components.MYMenuItem, ]} */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                index: (__VLS_ctx.resolvePath(__VLS_ctx.onlyOneChild.path ?? '')),
                ...{ class: (__VLS_ctx.getMenuItemClass(__VLS_ctx.onlyOneChild)) },
            }));
            const __VLS_2 = __VLS_1({
                index: (__VLS_ctx.resolvePath(__VLS_ctx.onlyOneChild.path ?? '')),
                ...{ class: (__VLS_ctx.getMenuItemClass(__VLS_ctx.onlyOneChild)) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            __VLS_3.slots.default;
            {
                const { icon: __VLS_thisSlot } = __VLS_3.slots;
                const __VLS_4 = {}.SvgIcon;
                /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
                // @ts-ignore
                const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
                    iconClass: (__VLS_ctx.onlyOneChild.meta.icon || (__VLS_ctx.item.meta && __VLS_ctx.item.meta.icon) || ''),
                }));
                const __VLS_6 = __VLS_5({
                    iconClass: (__VLS_ctx.onlyOneChild.meta.icon || (__VLS_ctx.item.meta && __VLS_ctx.item.meta.icon) || ''),
                }, ...__VLS_functionalComponentArgsRest(__VLS_5));
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "menu-title" },
                title: (__VLS_ctx.hasTitle(__VLS_ctx.onlyOneChild.meta.title)),
            });
            (__VLS_ctx.onlyOneChild.meta.title);
            var __VLS_3;
        }
    }
    else {
        const __VLS_8 = {}.MYMenuSubmenu;
        /** @type {[typeof __VLS_components.MYMenuSubmenu, typeof __VLS_components.MYMenuSubmenu, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            ref: "subMenu",
            index: (__VLS_ctx.resolvePath(__VLS_ctx.item.path ?? '')),
            ...{ class: (__VLS_ctx.getMenuItemClass(__VLS_ctx.item)) },
        }));
        const __VLS_10 = __VLS_9({
            ref: "subMenu",
            index: (__VLS_ctx.resolvePath(__VLS_ctx.item.path ?? '')),
            ...{ class: (__VLS_ctx.getMenuItemClass(__VLS_ctx.item)) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        /** @type {typeof __VLS_ctx.subMenu} */ ;
        var __VLS_12 = {};
        __VLS_11.slots.default;
        {
            const { icon: __VLS_thisSlot } = __VLS_11.slots;
            const __VLS_14 = {}.SvgIcon;
            /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
            // @ts-ignore
            const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
                iconClass: (__VLS_ctx.item.meta?.icon || ''),
            }));
            const __VLS_16 = __VLS_15({
                iconClass: (__VLS_ctx.item.meta?.icon || ''),
            }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        }
        if (__VLS_ctx.item.meta) {
            {
                const { title: __VLS_thisSlot } = __VLS_11.slots;
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "menu-title" },
                    title: (__VLS_ctx.hasTitle(__VLS_ctx.item.meta.title)),
                });
                (__VLS_ctx.item.meta.title);
            }
        }
        for (const [child, index] of __VLS_getVForSourceType((__VLS_ctx.item.children))) {
            const __VLS_18 = {}.SidebarItem;
            /** @type {[typeof __VLS_components.SidebarItem, typeof __VLS_components.sidebarItem, ]} */ ;
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
                key: (child.path + index),
                isNest: (true),
                item: (child),
                basePath: (__VLS_ctx.resolvePath(child.path ?? '')),
                ...{ class: "nest-menu" },
            }));
            const __VLS_20 = __VLS_19({
                key: (child.path + index),
                isNest: (true),
                item: (child),
                basePath: (__VLS_ctx.resolvePath(child.path ?? '')),
                ...{ class: "nest-menu" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        }
        var __VLS_11;
    }
}
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
/** @type {__VLS_StyleScopedClasses['nest-menu']} */ ;
// @ts-ignore
var __VLS_13 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            onlyOneChild: onlyOneChild,
            getMenuItemClass: getMenuItemClass,
            hasOneShowingChild: hasOneShowingChild,
            resolvePath: resolvePath,
            hasTitle: hasTitle,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
