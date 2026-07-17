import { getDashboardList, addDashboard, deleteDashboard } from '@/api/dashboard/dashboard';
import { useDashboardStore } from '@/store/modules/dashboard';
import modal from '@/plugins/modal';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const open = ref(false);
const loading = ref(false);
const router = useRouter();
const dashboardData = ref({
    list: [],
    total: 0
});
const dashbaordStore = useDashboardStore();
const route = useRoute();
const form = reactive({
    dashboardName: '',
    dashboardDesc: ''
});
const dashboardList = async (params = {}) => {
    try {
        loading.value = true;
        const res = await getDashboardList(params);
        if (res.code === 200) {
            dashboardData.value.list = res.rows;
            dashboardData.value.total = res.total;
        }
    }
    catch (e) {
        ElMessage.error(t('message.getListFailed'));
    }
    finally {
        loading.value = false;
    }
};
dashboardList();
const addhandle = async () => {
    if (!form.dashboardName.trim()) {
        ElMessage.warning(t('message.pleaseFillName'));
        return;
    }
    try {
        const res = await addDashboard({
            dashboardName: form.dashboardName.trim(),
            dashboardDesc: form.dashboardDesc
        });
        if (res.code === 200) {
            ElMessage.success(t('message.createSuccess'));
            await dashboardList();
            open.value = false;
            form.dashboardName = '';
            form.dashboardDesc = '';
        }
    }
    catch (err) {
        ElMessage.error(t('message.createFailed'));
    }
};
const delDashboard = (row) => {
    if (loading.value)
        return;
    loading.value = true;
    try {
        const dashboardId = row?.id;
        modal.confirm(`是否确认删除编号为"${dashboardId}"的数据项?`).then(() => {
            return deleteDashboard(dashboardId);
        }).then(() => {
            dashboardList();
            modal.msgSuccess(t('message.deleteSuccess'));
        }).catch(() => { });
    }
    finally {
        setTimeout(() => {
            loading.value = false;
        }, 500);
    }
};
const gotoEditor = (id) => {
    const dashboardId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    dashbaordStore.loadDashboard(dashboardId);
    dashbaordStore.restoreDashboard(dashboardId);
    router.push({
        name: 'DashboardEditor',
        params: { id: id.toString() }
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-description" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.open = true;
        } },
    ...{ class: "create-dashboard" },
});
const __VLS_0 = {}.MYPlus;
/** @type {[typeof __VLS_components.MYPlus, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: "30px",
    color: "#8EEEFF",
}));
const __VLS_2 = __VLS_1({
    size: "30px",
    color: "#8EEEFF",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    textColor: "#8EEEFF",
}));
const __VLS_6 = __VLS_5({
    textColor: "#8EEEFF",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
(__VLS_ctx.$t('dashboard.design.newDashboard'));
var __VLS_7;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.dashboardData.list))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-list" },
        key: (item.id),
    });
    const __VLS_8 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        ...{ class: "dashboard-button" },
        type: "primary",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        ...{ class: "dashboard-button" },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (...[$event]) => {
            __VLS_ctx.gotoEditor(item.id);
        }
    };
    __VLS_11.slots.default;
    (__VLS_ctx.$t('dashboard.design.edit'));
    var __VLS_11;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-list-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-item-left" },
    });
    const __VLS_16 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        textColor: "var(--general)",
    }));
    const __VLS_18 = __VLS_17({
        textColor: "var(--general)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    (item.name);
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-item-right" },
    });
    const __VLS_20 = {}.MYDelete;
    /** @type {[typeof __VLS_components.MYDelete, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        size: "16px",
        color: "var(--general)",
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        size: "16px",
        color: "var(--general)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = {
        onClick: (...[$event]) => {
            __VLS_ctx.delDashboard(item);
        }
    };
    var __VLS_23;
}
const __VLS_28 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    title: (__VLS_ctx.$t('dashboard.design.newDashboard')),
    modelValue: (__VLS_ctx.open),
    height: "350px",
    width: "450px",
    backgroundColor: "#0c1115 !important",
}));
const __VLS_30 = __VLS_29({
    title: (__VLS_ctx.$t('dashboard.design.newDashboard')),
    modelValue: (__VLS_ctx.open),
    height: "350px",
    width: "450px",
    backgroundColor: "#0c1115 !important",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.MYForm;
/** @type {[typeof __VLS_components.MYForm, typeof __VLS_components.MYForm, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.form),
    ...{ class: "dialog_form" },
    labelWidth: "80",
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.form),
    ...{ class: "dialog_form" },
    labelWidth: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
const __VLS_40 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    textColor: "var(--general)",
}));
const __VLS_42 = __VLS_41({
    textColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
(__VLS_ctx.$t('dashboard.design.dashboardName'));
var __VLS_43;
const __VLS_44 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.form.dashboardName),
    ...{ class: "dashboard-input" },
    width: "300px",
    placeholder: (__VLS_ctx.$t('dashboard.design.placeholderName')),
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.form.dashboardName),
    ...{ class: "dashboard-input" },
    width: "300px",
    placeholder: (__VLS_ctx.$t('dashboard.design.placeholderName')),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
var __VLS_39;
const __VLS_48 = {}.MYFormItem;
/** @type {[typeof __VLS_components.MYFormItem, typeof __VLS_components.MYFormItem, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    textColor: "var(--general)",
}));
const __VLS_54 = __VLS_53({
    textColor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
(__VLS_ctx.$t('dashboard.design.dashboardDesc'));
var __VLS_55;
const __VLS_56 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    modelValue: (__VLS_ctx.form.dashboardDesc),
    ...{ class: "dashboard-input" },
    width: "300px",
    placeholder: (__VLS_ctx.$t('dashboard.design.placeholderDesc')),
}));
const __VLS_58 = __VLS_57({
    modelValue: (__VLS_ctx.form.dashboardDesc),
    ...{ class: "dashboard-input" },
    width: "300px",
    placeholder: (__VLS_ctx.$t('dashboard.design.placeholderDesc')),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
var __VLS_51;
var __VLS_35;
{
    const { footer: __VLS_thisSlot } = __VLS_31.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-dialog-button" },
    });
    const __VLS_60 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    let __VLS_66;
    const __VLS_67 = {
        onClick: (__VLS_ctx.addhandle)
    };
    __VLS_63.slots.default;
    (__VLS_ctx.$t('dashboard.design.confirm'));
    var __VLS_63;
    const __VLS_68 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        ...{ 'onClick': {} },
        type: "info",
    }));
    const __VLS_70 = __VLS_69({
        ...{ 'onClick': {} },
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    let __VLS_72;
    let __VLS_73;
    let __VLS_74;
    const __VLS_75 = {
        onClick: (...[$event]) => {
            __VLS_ctx.open = false;
        }
    };
    __VLS_71.slots.default;
    (__VLS_ctx.$t('dashboard.design.cancel'));
    var __VLS_71;
}
var __VLS_31;
/** @type {__VLS_StyleScopedClasses['dashboard-description']} */ ;
/** @type {__VLS_StyleScopedClasses['create-dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-list']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item-left']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item-right']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog_form']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-input']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-input']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-dialog-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            open: open,
            dashboardData: dashboardData,
            form: form,
            addhandle: addhandle,
            delDashboard: delDashboard,
            gotoEditor: gotoEditor,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
