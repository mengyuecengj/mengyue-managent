import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import useTagsViewStore from '@/store/modules/tagsView';
// Initialize ref with proper typing
const tagAndTagSpacing = ref(4);
const showScrollbar = ref(false);
const scrollContainer = ref(null);
const scrollWrapper = computed(() => scrollContainer.value?.$el);
onMounted(() => {
    const wrapper = scrollWrapper.value;
    if (wrapper) {
        wrapper.addEventListener('scroll', emitScroll, true);
        wrapper.addEventListener('mouseenter', () => {
            showScrollbar.value = true;
        });
        wrapper.addEventListener('click', () => {
            showScrollbar.value = true;
        });
        wrapper.addEventListener('mouseleave', () => {
            showScrollbar.value = false;
        });
    }
});
onBeforeUnmount(() => {
    const wrapper = scrollWrapper.value;
    if (wrapper) {
        wrapper.removeEventListener('scroll', emitScroll);
        wrapper.removeEventListener('mouseenter', () => {
            showScrollbar.value = true;
        });
        wrapper.removeEventListener('click', () => {
            showScrollbar.value = true;
        });
        wrapper.removeEventListener('mouseleave', () => {
            showScrollbar.value = false;
        });
    }
});
function handleScroll(e) {
    e.preventDefault();
    const $scrollWrapper = scrollWrapper.value;
    if ($scrollWrapper) {
        const delta = e.deltaY || e.wheelDelta / 120;
        const newScrollLeft = $scrollWrapper.scrollLeft + delta * 40;
        const maxScrollLeft = $scrollWrapper.scrollWidth - $scrollWrapper.offsetWidth;
        $scrollWrapper.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    }
}
const emits = defineEmits();
const emitScroll = () => {
    emits('scroll');
};
const tagsViewStore = useTagsViewStore();
const visitedViews = computed(() => tagsViewStore.visitedViews);
function moveToTarget(currentTag) {
    const $container = scrollContainer.value?.$el;
    const $scrollWrapper = scrollWrapper.value;
    if (!$container || !$scrollWrapper)
        return;
    const $containerWidth = $container.offsetWidth;
    let firstTag = null;
    let lastTag = null;
    if (visitedViews.value.length > 0) {
        firstTag = visitedViews.value[0];
        lastTag = visitedViews.value[visitedViews.value.length - 1];
    }
    if (firstTag?.path === currentTag.path) {
        $scrollWrapper.scrollLeft = 0;
    }
    else if (lastTag?.path === currentTag.path) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
    }
    else {
        const tagListDom = document.getElementsByClassName('tags-view-item');
        const currentIndex = visitedViews.value.findIndex(item => item.path === currentTag.path);
        let prevTag = null;
        let nextTag = null;
        for (let i = 0; i < tagListDom.length; i++) {
            const element = tagListDom[i];
            if (element.dataset.path === visitedViews.value[currentIndex - 1]?.path) {
                prevTag = element;
            }
            if (element.dataset.path === visitedViews.value[currentIndex + 1]?.path) {
                nextTag = element;
            }
        }
        if (!prevTag || !nextTag)
            return;
        const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value;
        const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value;
        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        }
        else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
    }
}
const __VLS_exposed = {
    moveToTarget,
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onWheel': {} },
    ref: "scrollContainer",
    vertical: (false),
    ...{ class: ({ 'show-scrollbar': __VLS_ctx.showScrollbar }) },
    ...{ class: "scroll-container" },
    ScrollWidth: ('5px'),
    thumbColor: "#666",
    thumbHoverColor: "#555",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onWheel': {} },
    ref: "scrollContainer",
    vertical: (false),
    ...{ class: ({ 'show-scrollbar': __VLS_ctx.showScrollbar }) },
    ...{ class: "scroll-container" },
    ScrollWidth: ('5px'),
    thumbColor: "#666",
    thumbHoverColor: "#555",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onWheel: (__VLS_ctx.handleScroll)
};
/** @type {typeof __VLS_ctx.scrollContainer} */ ;
var __VLS_8 = {};
__VLS_3.slots.default;
var __VLS_10 = {};
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['show-scrollbar']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_11 = __VLS_10;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            showScrollbar: showScrollbar,
            scrollContainer: scrollContainer,
            handleScroll: handleScroll,
        };
    },
    __typeEmits: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
