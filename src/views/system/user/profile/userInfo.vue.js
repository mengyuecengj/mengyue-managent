import modal from "@/plugins/modal";
import tab from '@/plugins/tab';
import { updateUserProfile } from "@/api/system/user";
import { useDict } from '@/utils/dict';
const { proxy } = getCurrentInstance();
const { sys_user_sex } = useDict("sys_normal_disable", "sys_user_sex");
const __VLS_props = defineProps({
    user: {
        type: Object,
        phonenumber: "",
        email: "",
    }
});
const props = __VLS_props;
const form = ref({
    nickName: "",
    phonenumber: "",
    email: "",
    sex: "0",
});
const rules = ref({
    nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    email: [{ required: true, message: "邮箱地址不能为空", trigger: "blur" }, { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phonenumber: [{ required: true, message: "手机号码不能为空", trigger: "blur" }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
});
/** 提交按钮 */
function submit() {
    (proxy?.$refs.userRef).validate((valid) => {
        if (valid) {
            updateUserProfile(form.value).then(response => {
                modal.msgSuccess("修改成功");
                props.user.phonenumber = form.value.phonenumber;
                props.user.email = form.value.email;
            });
        }
    });
}
;
/** 关闭按钮 */
function close() {
    // tab.closePage();
    // 返回上一个页面或首页
    if (history.length > 1) {
        window.history.back();
    }
    else {
        tab.closePage('/'); // 或指定你想返回的页面
    }
}
;
// 回显当前登录用户信息
watch(() => props.user, user => {
    if (user) {
        form.value = { nickName: user.nickName, phonenumber: user.phonenumber, email: user.email, sex: user.sex };
    }
}, { immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "userRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}));
const __VLS_2 = __VLS_1({
    ref: "userRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.userRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    label: "用户昵称",
    prop: "nickName",
}));
const __VLS_8 = __VLS_7({
    label: "用户昵称",
    prop: "nickName",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.form.nickName),
    maxlength: "30",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.form.nickName),
    maxlength: "30",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_9;
const __VLS_14 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "手机号码",
    prop: "phonenumber",
}));
const __VLS_16 = __VLS_15({
    label: "手机号码",
    prop: "phonenumber",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    modelValue: (__VLS_ctx.form.phonenumber),
    maxlength: "11",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_20 = __VLS_19({
    modelValue: (__VLS_ctx.form.phonenumber),
    maxlength: "11",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
var __VLS_17;
const __VLS_22 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    label: "邮箱",
    prop: "email",
}));
const __VLS_24 = __VLS_23({
    label: "邮箱",
    prop: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.form.email),
    maxlength: "50",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_28 = __VLS_27({
    modelValue: (__VLS_ctx.form.email),
    maxlength: "50",
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
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
    ...{ style: {} },
    type: "danger",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    ...{ style: {} },
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
            form: form,
            rules: rules,
            submit: submit,
            close: close,
        };
    },
    props: {
        user: {
            type: Object,
            phonenumber: "",
            email: "",
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        user: {
            type: Object,
            phonenumber: "",
            email: "",
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
