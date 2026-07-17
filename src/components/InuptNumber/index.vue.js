import { computed, ref, watch } from 'vue';
const props = withDefaults(defineProps(), {
    modelValue: '0',
    min: 0,
    max: 9999,
    step: 1,
    width: '80px',
    placeholder: '',
    disabled: false
});
const emit = defineEmits();
const inputRef = ref();
const displayValue = ref(props.modelValue.toString());
const isFocused = ref(false);
// 计算属性
const isMin = computed(() => Number(displayValue.value) <= props.min);
const isMax = computed(() => Number(displayValue.value) >= props.max);
const inputStyle = computed(() => ({
    width: props.width
}));
// 格式化数值
const formatValue = (value) => {
    const num = Number(value);
    if (isNaN(num))
        return props.min.toString();
    // 限制在 min 和 max 之间
    const clamped = Math.max(props.min, Math.min(props.max, num));
    // 如果是整数，返回整数形式
    return Number.isInteger(clamped) ? clamped.toString() : clamped.toFixed(1);
};
// 增加数值
const increase = () => {
    if (props.disabled)
        return;
    const current = Number(displayValue.value);
    const newValue = current + props.step;
    const formattedValue = formatValue(newValue);
    displayValue.value = formattedValue;
    emit('update:modelValue', formattedValue);
    emit('change', formattedValue);
};
// 减少数值
const decrease = () => {
    if (props.disabled)
        return;
    const current = Number(displayValue.value);
    const newValue = current - props.step;
    const formattedValue = formatValue(newValue);
    displayValue.value = formattedValue;
    emit('update:modelValue', formattedValue);
    emit('change', formattedValue);
};
// 输入处理
const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    // 只允许数字和小数点
    const cleaned = value.replace(/[^\d.]/g, '');
    // 处理多个小数点
    const parts = cleaned.split('.');
    if (parts.length > 2) {
        displayValue.value = parts[0] + '.' + parts.slice(1).join('');
    }
    else {
        displayValue.value = cleaned;
    }
};
// 失去焦点时格式化
const handleBlur = () => {
    isFocused.value = false;
    const formattedValue = formatValue(displayValue.value);
    displayValue.value = formattedValue;
    emit('update:modelValue', formattedValue);
    emit('change', formattedValue);
};
// 获得焦点时
const handleFocus = () => {
    isFocused.value = true;
};
// 键盘事件
const handleKeydown = (event) => {
    const key = event.key;
    // 上下箭头控制数值
    if (key === 'ArrowUp') {
        event.preventDefault();
        increase();
    }
    else if (key === 'ArrowDown') {
        event.preventDefault();
        decrease();
    }
    // Enter 键确认
    if (key === 'Enter') {
        inputRef.value?.blur();
    }
};
// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
    if (!isFocused.value) {
        displayValue.value = newValue.toString();
    }
});
// 初始化
displayValue.value = formatValue(props.modelValue);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    modelValue: '0',
    min: 0,
    max: 9999,
    step: 1,
    width: '80px',
    placeholder: '',
    disabled: false
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['number-input']} */ ;
/** @type {__VLS_StyleScopedClasses['number-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['number-input']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "custom-number-input" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.decrease) },
    ...{ class: "control-btn decrease-btn" },
    disabled: (__VLS_ctx.isMin),
    type: "button",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "btn-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onBlur: (__VLS_ctx.handleBlur) },
    ...{ onFocus: (__VLS_ctx.handleFocus) },
    ...{ onInput: (__VLS_ctx.handleInput) },
    ...{ onKeydown: (__VLS_ctx.handleKeydown) },
    ref: "inputRef",
    value: (__VLS_ctx.displayValue),
    type: "text",
    ...{ class: "number-input" },
    ...{ style: (__VLS_ctx.inputStyle) },
});
/** @type {typeof __VLS_ctx.inputRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.increase) },
    ...{ class: "control-btn increase-btn" },
    disabled: (__VLS_ctx.isMax),
    type: "button",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "btn-icon" },
});
/** @type {__VLS_StyleScopedClasses['custom-number-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['decrease-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['number-input']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['increase-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            inputRef: inputRef,
            displayValue: displayValue,
            isMin: isMin,
            isMax: isMax,
            inputStyle: inputStyle,
            increase: increase,
            decrease: decrease,
            handleInput: handleInput,
            handleBlur: handleBlur,
            handleFocus: handleFocus,
            handleKeydown: handleKeydown,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
