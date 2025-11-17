import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import { getUserProfile } from "@/api/system/user";
const activeTab = ref("userinfo");
const state = reactive({
    user: {
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "",
        avatar: "",
        dept: {
            deptName: ""
        },
        createTime: ""
    },
    roleGroup: {},
    postGroup: {}
});
function getUser() {
    getUserProfile().then((response) => {
        state.user = response.data;
        state.roleGroup = response.roleGroup;
        state.postGroup = response.postGroup;
    });
}
;
getUser();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
});
const __VLS_0 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    span: (6),
    xs: (24),
}));
const __VLS_6 = __VLS_5({
    span: (6),
    xs: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "box-card" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "box-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_11.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "clearfix" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "person" },
    });
    const __VLS_12 = {}.MYBorder;
    /** @type {[typeof __VLS_components.MYBorder, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
    }));
    const __VLS_14 = __VLS_13({
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
{
    const { body: __VLS_thisSlot } = __VLS_11.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center" },
    });
    /** @type {[typeof userAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(userAvatar, new userAvatar({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "list-group list-group-striped" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list-group-item" },
    });
    const __VLS_19 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        iconClass: "user",
    }));
    const __VLS_21 = __VLS_20({
        iconClass: "user",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pull-right" },
    });
    (__VLS_ctx.state.user.userName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list-group-item" },
    });
    const __VLS_23 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        iconClass: "phone",
    }));
    const __VLS_25 = __VLS_24({
        iconClass: "phone",
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pull-right" },
    });
    (__VLS_ctx.state.user.phonenumber);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list-group-item" },
    });
    const __VLS_27 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        iconClass: "email",
    }));
    const __VLS_29 = __VLS_28({
        iconClass: "email",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pull-right" },
    });
    (__VLS_ctx.state.user.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list-group-item" },
    });
    const __VLS_31 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        iconClass: "tree",
    }));
    const __VLS_33 = __VLS_32({
        iconClass: "tree",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.state.user.dept) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "pull-right" },
        });
        (__VLS_ctx.state.user.dept.deptName);
        (__VLS_ctx.state.postGroup);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list-group-item" },
    });
    const __VLS_35 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        iconClass: "peoples",
    }));
    const __VLS_37 = __VLS_36({
        iconClass: "peoples",
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pull-right" },
    });
    (__VLS_ctx.state.roleGroup);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list-group-item" },
    });
    const __VLS_39 = {}.SvgIcon;
    /** @type {[typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ]} */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
        iconClass: "date",
    }));
    const __VLS_41 = __VLS_40({
        iconClass: "date",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pull-right" },
    });
    (__VLS_ctx.state.user.createTime);
}
var __VLS_11;
var __VLS_7;
const __VLS_43 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    span: (18),
    xs: (24),
}));
const __VLS_45 = __VLS_44({
    span: (18),
    xs: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
__VLS_46.slots.default;
const __VLS_47 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    ...{ class: "box-card" },
}));
const __VLS_49 = __VLS_48({
    ...{ class: "box-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
__VLS_50.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_50.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "clearfix" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "person" },
    });
    const __VLS_51 = {}.MYBorder;
    /** @type {[typeof __VLS_components.MYBorder, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
    }));
    const __VLS_53 = __VLS_52({
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
}
{
    const { body: __VLS_thisSlot } = __VLS_50.slots;
    /** @type {[typeof userInfo, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(userInfo, new userInfo({
        user: (__VLS_ctx.state.user),
    }));
    const __VLS_56 = __VLS_55({
        user: (__VLS_ctx.state.user),
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
}
var __VLS_50;
var __VLS_46;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
/** @type {__VLS_StyleScopedClasses['clearfix']} */ ;
/** @type {__VLS_StyleScopedClasses['person']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-striped']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pull-right']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pull-right']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pull-right']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pull-right']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pull-right']} */ ;
/** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pull-right']} */ ;
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
/** @type {__VLS_StyleScopedClasses['clearfix']} */ ;
/** @type {__VLS_StyleScopedClasses['person']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            userAvatar: userAvatar,
            userInfo: userInfo,
            state: state,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
