const unmatchArray = ref([]);
const props = defineProps({
    // 数据
    options: {
        type: Array,
        default: null,
    },
    // 当前的值
    value: [Number, String, Array],
    // 当未找到匹配的数据时，显示value
    showValue: {
        type: Boolean,
        default: true,
    },
    separator: {
        type: String,
        default: ",",
    }
});
const values = computed(() => {
    if (props.value === null || typeof props.value === 'undefined' || props.value === '')
        return [];
    return Array.isArray(props.value) ? props.value.map(item => '' + item) : String(props.value).split(props.separator);
});
const unmatch = computed(() => {
    unmatchArray.value = [];
    // 没有value不显示
    if (props.value === null || typeof props.value === 'undefined' || props.value === '' || !Array.isArray(props.options) || props.options.length === 0)
        return false;
    // 传入值为数组
    let unmatch = false; // 添加一个标志来判断是否有未匹配项
    values.value.forEach(item => {
        if (!props.options.some(v => v.value === item)) {
            unmatchArray.value.push(item);
            unmatch = true; // 如果有未匹配项，将标志设置为true
        }
    });
    return unmatch; // 返回标志的值
});
function handleArray(array) {
    if (array.length === 0)
        return "";
    return array.reduce((pre, cur) => {
        return pre + " " + cur;
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-tag']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.options))) {
    if (__VLS_ctx.values.includes(item.value)) {
        if ((item.elTagType == 'default' || item.elTagType == '') && (item.elTagClass == '' || item.elTagClass == null)) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                key: (item.value),
                index: (index),
                ...{ class: (item.elTagClass) },
            });
            (item.label + " ");
        }
        else {
            const __VLS_0 = {}.ElTag;
            /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                disableTransitions: (true),
                key: (item.value + ''),
                index: (index),
                type: (item.elTagType),
                ...{ class: (item.elTagClass) },
            }));
            const __VLS_2 = __VLS_1({
                disableTransitions: (true),
                key: (item.value + ''),
                index: (index),
                type: (item.elTagType),
                ...{ class: (item.elTagClass) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            __VLS_3.slots.default;
            (item.label + " ");
            var __VLS_3;
        }
    }
}
if (__VLS_ctx.unmatch && __VLS_ctx.showValue) {
    (__VLS_ctx.unmatchArray | __VLS_ctx.handleArray);
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            unmatchArray: unmatchArray,
            values: values,
            unmatch: unmatch,
            handleArray: handleArray,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
