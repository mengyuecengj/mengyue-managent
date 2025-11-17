import modal from '@/plugins/modal';
import { useRoute } from 'vue-router';
import { parseTime } from '@/utils/general';
import { getAuthRole, updateAuthRole } from '@/api/system/user';
import { useRouter } from 'vue-router';
import { MYInput } from 'mengyue-plus';
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const pageNum = ref(1);
const pageSize = ref(10);
const roleIds = ref([]);
const roles = ref([]);
const total = ref(0);
const form = ref({
    nickName: undefined,
    userName: undefined,
    userId: undefined
});
// 单机选中的行数
// function clickRow(row: Role): void {
//   if(checkSelectable(row)) {
//     refs["roleRef"].toggleRowSelection(row);
//   }
// }
// 多选框选中的数据
function handleSelectionChange(selection) {
    roleIds.value = selection.map(item => item.roleId);
}
// 保存选中的数据编号
function getRowKey(row) {
    return row.roleId.toString();
}
// 检查角色状态
function checkSelectable(row) {
    return row.status === '0';
}
// 关闭按钮
function close() {
    modal.msgSuccess("返回用户管理页");
    router.push("/system/user");
    // const obj = { path: "/system/user" };
    // tab.closeOpenPage(obj.path);
}
// 提交按钮
function submitForm() {
    const userId = form.value.userId;
    const rIds = roleIds.value.join(",");
    updateAuthRole({ userId: userId, roleIds: rIds }).then((res) => {
        modal.msgSuccess("授权成功");
        close();
    });
}
;
// 初始化加载数据
(() => {
    const userId = route.params?.userId;
    if (userId) {
        loading.value = true;
        getAuthRole(userId).then((response) => {
            form.value = response.user;
            roles.value = response.roles;
            total.value = roles.value.length;
            // nextTick(() => {
            //   roles.value.forEach((row: Role) => {
            //     if(row.flag) {
            //       proxy.$refs["roleRef"].toggleRowSelection(row);
            //     }
            //   });
            // });
            loading.value = false;
        });
    }
})();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ style: {} },
});
const __VLS_0 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.form),
    labelWidth: "80",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.form),
    labelWidth: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    span: (8),
    offset: (2),
}));
const __VLS_10 = __VLS_9({
    span: (8),
    offset: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "用户昵称",
    prop: "nickName",
}));
const __VLS_14 = __VLS_13({
    label: "用户昵称",
    prop: "nickName",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    modelValue: (__VLS_ctx.form.nickName),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_18 = __VLS_17({
    modelValue: (__VLS_ctx.form.nickName),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
var __VLS_15;
var __VLS_11;
const __VLS_20 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    span: (8),
    offset: (2),
}));
const __VLS_22 = __VLS_21({
    span: (8),
    offset: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "登录账号",
    prop: "userName",
}));
const __VLS_26 = __VLS_25({
    label: "登录账号",
    prop: "userName",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    modelValue: (__VLS_ctx.form.userName),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_30 = __VLS_29({
    modelValue: (__VLS_ctx.form.userName),
    disabled: true,
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
var __VLS_23;
var __VLS_7;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ style: {} },
});
const __VLS_32 = {}.MYTable;
/** @type {[typeof __VLS_components.MYTable, typeof __VLS_components.MYTable, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onSelectionChange': {} },
    rowKey: "roleId",
    ref: "roleRef",
    data: (__VLS_ctx.roles.slice((__VLS_ctx.pageNum - 1) * __VLS_ctx.pageSize, __VLS_ctx.pageNum * __VLS_ctx.pageSize)),
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
}));
const __VLS_34 = __VLS_33({
    ...{ 'onSelectionChange': {} },
    rowKey: "roleId",
    ref: "roleRef",
    data: (__VLS_ctx.roles.slice((__VLS_ctx.pageNum - 1) * __VLS_ctx.pageSize, __VLS_ctx.pageNum * __VLS_ctx.pageSize)),
    headerBackgroundColor: "var(--table-header-bg)",
    borderColor: "var(--table-border-color)",
    bodyBackgroundColor: "var(--table-body-bg)",
    headerTextColor: "var(--general)",
    bodyTextColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
let __VLS_38;
const __VLS_39 = {
    onSelectionChange: (__VLS_ctx.handleSelectionChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {typeof __VLS_ctx.roleRef} */ ;
var __VLS_40 = {};
__VLS_35.slots.default;
const __VLS_42 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    label: "序号",
    width: "55",
    type: "index",
    align: "center",
}));
const __VLS_44 = __VLS_43({
    label: "序号",
    width: "55",
    type: "index",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_45.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    ((__VLS_ctx.pageNum - 1) * __VLS_ctx.pageSize + scope.$index + 1);
}
var __VLS_45;
const __VLS_46 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    type: "selection",
    reserveSelection: (true),
    selectable: (__VLS_ctx.checkSelectable),
    width: "55",
}));
const __VLS_48 = __VLS_47({
    type: "selection",
    reserveSelection: (true),
    selectable: (__VLS_ctx.checkSelectable),
    width: "55",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const __VLS_50 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    label: "角色编号",
    align: "center",
    prop: "roleId",
}));
const __VLS_52 = __VLS_51({
    label: "角色编号",
    align: "center",
    prop: "roleId",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const __VLS_54 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    label: "角色名称",
    align: "center",
    prop: "roleName",
}));
const __VLS_56 = __VLS_55({
    label: "角色名称",
    align: "center",
    prop: "roleName",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const __VLS_58 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    label: "权限字符",
    align: "center",
    prop: "roleKey",
}));
const __VLS_60 = __VLS_59({
    label: "权限字符",
    align: "center",
    prop: "roleKey",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const __VLS_62 = {}.MYTableColumn;
/** @type {[typeof __VLS_components.MYTableColumn, typeof __VLS_components.MYTableColumn, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}));
const __VLS_64 = __VLS_63({
    label: "创建时间",
    align: "center",
    prop: "createTime",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
__VLS_65.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_65.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.parseTime(scope.row.createTime));
}
var __VLS_65;
var __VLS_35;
const __VLS_66 = {}.pagination;
/** @type {[typeof __VLS_components.Pagination, typeof __VLS_components.pagination, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.pageNum),
    limit: (__VLS_ctx.pageSize),
}));
const __VLS_68 = __VLS_67({
    ...{ class: "pagination-container" },
    total: (__VLS_ctx.total),
    page: (__VLS_ctx.pageNum),
    limit: (__VLS_ctx.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.total > 0) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
const __VLS_70 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_72 = __VLS_71({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_74;
let __VLS_75;
let __VLS_76;
const __VLS_77 = {
    onClick: (...[$event]) => {
        __VLS_ctx.submitForm();
    }
};
__VLS_73.slots.default;
var __VLS_73;
const __VLS_78 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    ...{ 'onClick': {} },
    type: "info",
    ...{ style: {} },
}));
const __VLS_80 = __VLS_79({
    ...{ 'onClick': {} },
    type: "info",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
let __VLS_82;
let __VLS_83;
let __VLS_84;
const __VLS_85 = {
    onClick: (...[$event]) => {
        __VLS_ctx.close();
    }
};
__VLS_81.slots.default;
var __VLS_81;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
// @ts-ignore
var __VLS_41 = __VLS_40;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            parseTime: parseTime,
            MYInput: MYInput,
            loading: loading,
            pageNum: pageNum,
            pageSize: pageSize,
            roles: roles,
            total: total,
            form: form,
            handleSelectionChange: handleSelectionChange,
            checkSelectable: checkSelectable,
            close: close,
            submitForm: submitForm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
