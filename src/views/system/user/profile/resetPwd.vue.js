import tab from '@/plugins/tab';
import modal from '@/plugins/modal';
import { updateUserPwd } from "@/api/system/user";
import { getCurrentInstance, reactive, ref } from 'vue';
const { proxy } = getCurrentInstance();
const user = reactive({
    oldPassword: undefined,
    newPassword: undefined,
    confirmPassword: undefined
});
const equalToPassword = (rule, value, callback) => {
    if (user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
    }
    else {
        callback();
    }
};
const rules = ref({
    oldPassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
    newPassword: [{ required: true, message: "新密码不能为空", trigger: "blur" }, { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }, { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }],
    confirmPassword: [{ required: true, message: "确认密码不能为空", trigger: "blur" }, { required: true, validator: equalToPassword, trigger: "blur" }]
});
/** 提交按钮 */
function submit() {
    proxy.$refs.pwdRef.validate((valid) => {
        if (valid) {
            updateUserPwd(user.oldPassword, user.newPassword).then(response => {
                modal.msgSuccess("修改成功");
            });
        }
    });
}
;
/** 关闭按钮 */
function close() {
    if (history.length > 1) {
        window.history.back();
    }
    else {
        tab.closePage('/');
    }
}
;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "pwdRef",
    model: (__VLS_ctx.user),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}));
const __VLS_2 = __VLS_1({
    ref: "pwdRef",
    model: (__VLS_ctx.user),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.pwdRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    label: "旧密码",
    prop: "oldPassword",
}));
const __VLS_8 = __VLS_7({
    label: "旧密码",
    prop: "oldPassword",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.user.oldPassword),
    placeholder: "请输入旧密码",
    type: "password",
    showPassword: true,
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.user.oldPassword),
    placeholder: "请输入旧密码",
    type: "password",
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_9;
const __VLS_14 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "新密码",
    prop: "newPassword",
}));
const __VLS_16 = __VLS_15({
    label: "新密码",
    prop: "newPassword",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    modelValue: (__VLS_ctx.user.newPassword),
    placeholder: "请输入新密码",
    type: "password",
    showPassword: true,
}));
const __VLS_20 = __VLS_19({
    modelValue: (__VLS_ctx.user.newPassword),
    placeholder: "请输入新密码",
    type: "password",
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
var __VLS_17;
const __VLS_22 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    label: "确认密码",
    prop: "confirmPassword",
}));
const __VLS_24 = __VLS_23({
    label: "确认密码",
    prop: "confirmPassword",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.user.confirmPassword),
    placeholder: "请确认新密码",
    type: "password",
    showPassword: true,
}));
const __VLS_28 = __VLS_27({
    modelValue: (__VLS_ctx.user.confirmPassword),
    placeholder: "请确认新密码",
    type: "password",
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_25;
const __VLS_30 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
const __VLS_34 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onClick: (__VLS_ctx.submit)
};
__VLS_37.slots.default;
var __VLS_37;
const __VLS_42 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    type: "danger",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    type: "danger",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_46;
let __VLS_47;
let __VLS_48;
const __VLS_49 = {
    onClick: (__VLS_ctx.close)
};
__VLS_45.slots.default;
var __VLS_45;
var __VLS_33;
var __VLS_3;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            user: user,
            rules: rules,
            submit: submit,
            close: close,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
