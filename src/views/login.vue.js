import useUserStore from '@/store/modules/user';
const route = useRoute();
const router = useRouter();
const formRef = ref();
const loading = ref(false);
const redirect = ref(undefined);
const loginStore = useUserStore();
const formData = ref({
    username: "",
    password: "",
    code: "",
    uuid: "", // 模拟 mock 返回的 uuid
});
const loginrules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
};
async function login() {
    if (!formRef.value)
        return;
    try {
        await formRef.value.validate();
        // 验证通过后的逻辑
        loading.value = true;
        loginStore.login(formData.value)
            .then(() => {
            const redirectPath = route.query.redirect;
            if (redirectPath && redirectPath !== '/logout') {
                router.push(redirectPath);
            }
            else {
                router.push("/");
            }
        })
            .catch((error) => {
            console.error('Login error:', error);
            loading.value = false;
        });
    }
    catch (error) {
        // 验证失败的处理
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-app" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "background-decor" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "grid" },
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.defs, __VLS_intrinsicElements.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pattern, __VLS_intrinsicElements.pattern)({
    id: "smallGrid",
    width: "40",
    height: "40",
    patternUnits: "userSpaceOnUse",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M 40 0 L 0 0 0 40",
    fill: "none",
    stroke: "rgba(255,255,255,0.05)",
    'stroke-width': "1",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.rect)({
    width: "100%",
    height: "100%",
    fill: "url(#smallGrid)",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "left-container" },
});
const __VLS_0 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: "info",
    size: "36px",
    ...{ class: "brand-title" },
}));
const __VLS_2 = __VLS_1({
    type: "info",
    size: "36px",
    ...{ class: "brand-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
const __VLS_4 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    type: "default",
    size: "20px",
    ...{ class: "brand-subtitle" },
}));
const __VLS_6 = __VLS_5({
    type: "default",
    size: "20px",
    ...{ class: "brand-subtitle" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
var __VLS_7;
const __VLS_8 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    type: "default",
    size: "16px",
    ...{ class: "brand-desc" },
}));
const __VLS_10 = __VLS_9({
    type: "default",
    size: "16px",
    ...{ class: "brand-desc" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-title" },
});
const __VLS_12 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    type: "default",
    size: "24px",
}));
const __VLS_14 = __VLS_13({
    type: "default",
    size: "24px",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
const __VLS_16 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "form" },
    ref: "formRef",
    rules: (__VLS_ctx.loginrules),
    modelValue: (__VLS_ctx.formData),
}));
const __VLS_18 = __VLS_17({
    ...{ class: "form" },
    ref: "formRef",
    rules: (__VLS_ctx.loginrules),
    modelValue: (__VLS_ctx.formData),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_20 = {};
__VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item" },
});
const __VLS_22 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    prop: "username",
    ...{ class: "horizontal-item" },
}));
const __VLS_24 = __VLS_23({
    prop: "username",
    ...{ class: "horizontal-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-row" },
});
const __VLS_26 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    type: "default",
    ...{ class: "form-label" },
}));
const __VLS_28 = __VLS_27({
    type: "default",
    ...{ class: "form-label" },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
var __VLS_29;
const __VLS_30 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ 'onBlur': {} },
    placeholder: "请输入用户名",
    width: "100%",
    ...{ class: "form-input" },
    autoComplete: "off",
    modelValue: (__VLS_ctx.formData.username),
}));
const __VLS_32 = __VLS_31({
    ...{ 'onBlur': {} },
    placeholder: "请输入用户名",
    width: "100%",
    ...{ class: "form-input" },
    autoComplete: "off",
    modelValue: (__VLS_ctx.formData.username),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
let __VLS_36;
const __VLS_37 = {
    onBlur: (() => __VLS_ctx.formRef?.validateField('username'))
};
var __VLS_33;
var __VLS_25;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item" },
});
const __VLS_38 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    prop: "password",
    ...{ class: "horizontal-item" },
}));
const __VLS_40 = __VLS_39({
    prop: "password",
    ...{ class: "horizontal-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-row" },
});
const __VLS_42 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    type: "default",
    ...{ class: "form-label" },
}));
const __VLS_44 = __VLS_43({
    type: "default",
    ...{ class: "form-label" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
var __VLS_45;
const __VLS_46 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ 'onBlur': {} },
    placeholder: "请输入密码",
    type: "password",
    width: "100%",
    ...{ class: "form-input" },
    autoComplete: "off",
    modelValue: (__VLS_ctx.formData.password),
}));
const __VLS_48 = __VLS_47({
    ...{ 'onBlur': {} },
    placeholder: "请输入密码",
    type: "password",
    width: "100%",
    ...{ class: "form-input" },
    autoComplete: "off",
    modelValue: (__VLS_ctx.formData.password),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_50;
let __VLS_51;
let __VLS_52;
const __VLS_53 = {
    onBlur: (() => __VLS_ctx.formRef?.validateField('password'))
};
var __VLS_49;
var __VLS_41;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item" },
});
const __VLS_54 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    prop: "code",
    ...{ class: "horizontal-item" },
}));
const __VLS_56 = __VLS_55({
    prop: "code",
    ...{ class: "horizontal-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-row" },
});
const __VLS_58 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    type: "default",
    ...{ class: "form-label" },
}));
const __VLS_60 = __VLS_59({
    type: "default",
    ...{ class: "form-label" },
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
__VLS_61.slots.default;
var __VLS_61;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "code-wrapper" },
});
const __VLS_62 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    ...{ 'onKeyup': {} },
    ...{ 'onBlur': {} },
    placeholder: "请输入验证码",
    width: "100%",
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.formData.code),
    autoComplete: "off",
}));
const __VLS_64 = __VLS_63({
    ...{ 'onKeyup': {} },
    ...{ 'onBlur': {} },
    placeholder: "请输入验证码",
    width: "100%",
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.formData.code),
    autoComplete: "off",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
let __VLS_66;
let __VLS_67;
let __VLS_68;
const __VLS_69 = {
    onKeyup: (__VLS_ctx.login)
};
const __VLS_70 = {
    onBlur: (() => __VLS_ctx.formRef?.validateField('code'))
};
var __VLS_65;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "code-img" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_57;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item" },
});
const __VLS_71 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "login-button-style" },
}));
const __VLS_73 = __VLS_72({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "login-button-style" },
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
let __VLS_75;
let __VLS_76;
let __VLS_77;
const __VLS_78 = {
    onClick: (__VLS_ctx.login)
};
__VLS_74.slots.default;
var __VLS_74;
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "particles" },
});
for (const [n] of __VLS_getVForSourceType((15))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (n),
    });
}
/** @type {__VLS_StyleScopedClasses['login-app']} */ ;
/** @type {__VLS_StyleScopedClasses['background-decor']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['left-container']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-title']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['right-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login-box']} */ ;
/** @type {__VLS_StyleScopedClasses['login-title']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['horizontal-item']} */ ;
/** @type {__VLS_StyleScopedClasses['input-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['horizontal-item']} */ ;
/** @type {__VLS_StyleScopedClasses['input-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['horizontal-item']} */ ;
/** @type {__VLS_StyleScopedClasses['input-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['code-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['code-img']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['login-button-style']} */ ;
/** @type {__VLS_StyleScopedClasses['particles']} */ ;
// @ts-ignore
var __VLS_21 = __VLS_20;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formRef: formRef,
            formData: formData,
            loginrules: loginrules,
            login: login,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
