import { scrollTo } from '@/utils/scroll-to';
const props = defineProps({
    total: {
        required: true,
        type: Number
    },
    page: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 20
    },
    pageSizes: {
        type: Array,
        default() {
            return [10, 20, 30, 50];
        }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
        type: Number,
        default: document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
        type: Boolean,
        default: true
    },
    autoScroll: {
        type: Boolean,
        default: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits();
const currentPage = computed({
    get() {
        return props.page;
    },
    set(val) {
        emit('update:page', val);
    }
});
const pageSize = computed({
    get() {
        return props.limit;
    },
    set(val) {
        emit('update:limit', val);
    }
});
function handleSizeChange(val) {
    if (currentPage.value * val > props.total) {
        currentPage.value = 1;
    }
    emit('pagination', { page: currentPage.value, limit: val });
    if (props.autoScroll) {
        scrollTo(0, 800);
    }
}
function handleCurrentChange(val) {
    emit('pagination', { page: val, limit: pageSize.value });
    if (props.autoScroll) {
        scrollTo(0, 800);
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ({ 'hidden': __VLS_ctx.hidden }) },
});
const __VLS_0 = {}.MYPagination;
/** @type {[typeof __VLS_components.MYPagination, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    background: (__VLS_ctx.background),
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    layout: (__VLS_ctx.layout),
    pageSizes: (__VLS_ctx.pageSizes),
    pagerCount: (__VLS_ctx.pagerCount),
    total: (__VLS_ctx.total),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    background: (__VLS_ctx.background),
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    layout: (__VLS_ctx.layout),
    pageSizes: (__VLS_ctx.pageSizes),
    pagerCount: (__VLS_ctx.pagerCount),
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSizeChange: (__VLS_ctx.handleSizeChange)
};
const __VLS_8 = {
    onCurrentChange: (__VLS_ctx.handleCurrentChange)
};
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            currentPage: currentPage,
            pageSize: pageSize,
            handleSizeChange: handleSizeChange,
            handleCurrentChange: handleCurrentChange,
        };
    },
    emits: {},
    props: {
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 50];
            }
        },
        // 移动端页码按钮的数量端默认值5
        pagerCount: {
            type: Number,
            default: document.body.clientWidth < 992 ? 5 : 7
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 50];
            }
        },
        // 移动端页码按钮的数量端默认值5
        pagerCount: {
            type: Number,
            default: document.body.clientWidth < 992 ? 5 : 7
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
