import { useRouter } from 'vue-router';
import Fuse from 'fuse.js';
import { getNormalPath } from '@/utils/general';
import { isHttp } from '@/utils/validate';
import usePermissionStore from '@/store/modules/permission';
// 引入拼音库
import { pinyin } from 'pinyin-pro';
const search = ref('');
const options = ref([]);
const searchPool = ref([]);
const show = ref(false);
const fuse = ref(undefined);
// script setup 父组件
const headerSearchSelectRef = ref(null);
const router = useRouter();
const routes = computed(() => usePermissionStore().defaultRoutes);
function click() {
    show.value = !show.value;
    if (show.value) {
        headerSearchSelectRef.value && headerSearchSelectRef.value.focus();
        options.value = searchPool.value;
    }
}
function close() {
    headerSearchSelectRef.value && headerSearchSelectRef.value.blur();
    search.value = '';
    options.value = [];
    show.value = false;
}
function change(val) {
    const path = val.path;
    const query = val.query;
    if (isHttp(path)) {
        const pindex = path.indexOf('http');
        window.open(path.substr(pindex, path.length), '_blank');
    }
    else {
        if (query) {
            router.push({ path, query: JSON.parse(query) });
        }
        else {
            router.push(path);
        }
    }
    search.value = '';
    options.value = [];
    nextTick(() => {
        show.value = false;
    });
}
function initFuse(list) {
    fuse.value = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
            { name: 'title', weight: 0.5 },
            { name: 'path', weight: 0.3 },
            { name: 'pinyinTitle', weight: 0.2 } // 添加拼音搜索权重
        ]
    });
}
// 修改 generateRoutes 函数，添加拼音支持
function generateRoutes(routes, basePath = '', prefixTitle = []) {
    let res = [];
    for (const r of routes) {
        if (r.hidden)
            continue;
        const p = r.path.length > 0 && r.path[0] === '/' ? r.path : '/' + r.path;
        const data = {
            path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path,
            title: [...prefixTitle],
            icon: '',
            pinyinTitle: ''
        };
        if (r.meta && r.meta.title) {
            data.title = [...data.title, r.meta.title];
            data.icon = r.meta.icon || '';
            // 添加拼音字段
            data.pinyinTitle = pinyin(data.title.join(''), { toneType: 'none', type: 'array' }).join('');
            if (r.redirect !== 'noRedirect') {
                res.push(data);
            }
        }
        if (r.query) {
            data.query = r.query;
        }
        if (r.children) {
            const tempRoutes = generateRoutes(r.children, data.path, data.title);
            if (tempRoutes.length >= 1) {
                res = [...res, ...tempRoutes];
            }
        }
    }
    return res;
}
function querySearch(query) {
    if (query !== '') {
        if (fuse.value) {
            options.value = fuse.value.search(query).map((item) => item.item);
        }
        else {
            console.error('Fuse is not initialized');
            options.value = searchPool.value;
        }
    }
    else {
        options.value = searchPool.value;
    }
}
onMounted(() => {
    searchPool.value = generateRoutes(routes.value);
});
watch(searchPool, (list) => {
    initFuse(list);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['menu-path']} */ ;
/** @type {__VLS_StyleScopedClasses['search-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-search" },
});
const __VLS_0 = {}.SvgIcon;
/** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    className: "search-icon",
    iconClass: "search",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    className: "search-icon",
    iconClass: "search",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.click)
};
var __VLS_3;
const __VLS_8 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClose': {} },
    title: "搜索",
    modelValue: (__VLS_ctx.show),
    width: "600px",
    height: "420px",
    backgroundColor: "var(--navbar-bg)",
    textColor: "var(--navbar-text)",
    showClose: (false),
    appendToBody: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClose': {} },
    title: "搜索",
    modelValue: (__VLS_ctx.show),
    width: "600px",
    height: "420px",
    backgroundColor: "var(--navbar-bg)",
    textColor: "var(--navbar-text)",
    showClose: (false),
    appendToBody: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClose: (__VLS_ctx.close)
};
__VLS_11.slots.default;
const __VLS_16 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.search),
    ref: "headerSearchSelectRef",
    size: "large",
    prefixIcon: "Search",
    placeholder: "菜单搜索，支持标题、URL模糊查询",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text) !important",
    clearable: true,
    ...{ class: "search-input" },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.search),
    ref: "headerSearchSelectRef",
    size: "large",
    prefixIcon: "Search",
    placeholder: "菜单搜索，支持标题、URL模糊查询",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text) !important",
    clearable: true,
    ...{ class: "search-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onInput: (__VLS_ctx.querySearch)
};
/** @type {typeof __VLS_ctx.headerSearchSelectRef} */ ;
var __VLS_24 = {};
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "result-wrap" },
});
const __VLS_26 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ScrollWidth: "8px",
    trackColor: "var(--track-color)",
}));
const __VLS_28 = __VLS_27({
    ScrollWidth: "8px",
    trackColor: "var(--track-color)",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.options))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "search-item" },
        tabindex: "1",
        key: (item.path),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "left" },
    });
    const __VLS_30 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        ...{ class: "menu-icon" },
        iconClass: (item.icon),
    }));
    const __VLS_32 = __VLS_31({
        ...{ class: "menu-icon" },
        iconClass: (item.icon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.change(item);
            } },
        ...{ class: "search-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "menu-title" },
    });
    (item.title.join(" / "));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "menu-path" },
    });
    (item.path);
}
var __VLS_29;
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['header-search']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['result-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['search-item']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-info']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-path']} */ ;
// @ts-ignore
var __VLS_25 = __VLS_24;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            search: search,
            options: options,
            show: show,
            headerSearchSelectRef: headerSearchSelectRef,
            click: click,
            close: close,
            change: change,
            querySearch: querySearch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
