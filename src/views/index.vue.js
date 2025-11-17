import { getCache } from '@/api/monitor/cache';
import modal from '@/plugins/modal';
import * as echarts from 'echarts';
const cache = ref([]);
const commandstats = ref(null);
const usedmemory = ref(null);
function getList() {
    modal.loading("正在加载缓存监控数据，请稍候！");
    getCache().then(response => {
        modal.closeLoading();
        cache.value = response.data;
        const commandstatsIntance = echarts.init(commandstats.value, "macarons");
        commandstatsIntance.setOption({
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: "命令",
                    type: "pie",
                    roseType: "radius",
                    radius: [15, 95],
                    center: ["50%", "38%"],
                    data: response.data.commandStats,
                    animationEasing: "cubicInOut",
                    animationDuration: 1000
                }
            ]
        });
        const usedmemoryInstance = echarts.init(usedmemory.value, "macarons");
        usedmemoryInstance.setOption({
            tooltip: {
                formatter: "{b} <br/>{a} : " + cache.value.info.used_memory_human
            },
            series: [
                {
                    name: "峰值",
                    type: "gauge",
                    min: 0,
                    max: 1000,
                    detail: {
                        formatter: cache.value.info.used_memory_human
                    },
                    data: [
                        {
                            value: parseFloat(cache.value.info.used_memory_human),
                            name: "内存消耗"
                        }
                    ]
                }
            ]
        });
        window.addEventListener("resize", () => {
            commandstatsIntance.resize();
            usedmemoryInstance.resize();
        });
    });
}
getList();
const data = reactive({
    appList: [
        {
            name: '路由数量',
            total: '32',
            num: '+100%',
            type: "primary",
            context: '活跃项目',
        },
        {
            name: '在线用户',
            total: '1',
            num: '+0%',
            type: "primary",
            context: '当前登录人数',
        },
        {
            name: '登录失败',
            total: '0',
            num: '+0%',
            type: "success",
            context: '登录失败IP',
        },
        {
            name: '登录日志',
            total: '1',
            num: '100%',
            type: "danger",
            context: '当前登录日志',
        }
    ]
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['fast-title']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-container" },
});
const __VLS_0 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: (20),
    ...{ class: "app-row" },
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
    ...{ class: "app-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.data.appList))) {
    const __VLS_4 = {}.MYCol;
    /** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        span: (6),
        key: (item.name),
    }));
    const __VLS_6 = __VLS_5({
        span: (6),
        key: (item.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "app-list" },
    });
    const __VLS_8 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        Tecolor: "var(--navbar-text)",
        ...{ class: "name" },
    }));
    const __VLS_10 = __VLS_9({
        Tecolor: "var(--navbar-text)",
        ...{ class: "name" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    (item.name);
    var __VLS_11;
    const __VLS_12 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        TTecolor: "var(--navbar-text)",
        ...{ class: "total" },
    }));
    const __VLS_14 = __VLS_13({
        TTecolor: "var(--navbar-text)",
        ...{ class: "total" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    (item.total);
    var __VLS_15;
    const __VLS_16 = {}.MYButton;
    /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        type: (item.type),
        round: true,
        ...{ class: "num" },
        colorText: "#fff",
    }));
    const __VLS_18 = __VLS_17({
        type: (item.type),
        round: true,
        ...{ class: "num" },
        colorText: "#fff",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    (item.num);
    var __VLS_19;
    const __VLS_20 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        Tecolor: "var(--navbar-text)",
        ...{ class: "context" },
    }));
    const __VLS_22 = __VLS_21({
        Tecolor: "var(--navbar-text)",
        ...{ class: "context" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    (item.context);
    var __VLS_23;
    var __VLS_7;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "template-container" },
});
const __VLS_24 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    Tecolor: "var(--navbar-text)",
    ...{ class: "template-title" },
}));
const __VLS_26 = __VLS_25({
    Tecolor: "var(--navbar-text)",
    ...{ class: "template-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
var __VLS_27;
const __VLS_28 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    gutter: (20),
    ...{ class: "template-row" },
    justify: "space-between",
}));
const __VLS_30 = __VLS_29({
    gutter: (20),
    ...{ class: "template-row" },
    justify: "space-between",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    span: (11),
    ...{ class: "card-box" },
}));
const __VLS_34 = __VLS_33({
    span: (11),
    ...{ class: "card-box" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ class: "chart-card" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "chart-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_39.slots;
    const __VLS_40 = {}.PieChart;
    /** @type {[typeof __VLS_components.PieChart, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ style: {} },
    }));
    const __VLS_42 = __VLS_41({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
}
{
    const { body: __VLS_thisSlot } = __VLS_39.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-table custom-table--enable-row-hover custom-table--medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ref: "commandstats",
        ...{ style: {} },
    });
    /** @type {typeof __VLS_ctx.commandstats} */ ;
}
var __VLS_39;
var __VLS_35;
const __VLS_44 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    span: (11),
    ...{ class: "card-box" },
}));
const __VLS_46 = __VLS_45({
    span: (11),
    ...{ class: "card-box" },
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
const __VLS_48 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ class: "chart-card" },
}));
const __VLS_50 = __VLS_49({
    ...{ class: "chart-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_51.slots;
    const __VLS_52 = {}.Odometer;
    /** @type {[typeof __VLS_components.Odometer, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ style: {} },
    }));
    const __VLS_54 = __VLS_53({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
}
{
    const { body: __VLS_thisSlot } = __VLS_51.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-table custom-table--enable-row-hover custom-table--medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ref: "usedmemory",
        ...{ style: {} },
    });
    /** @type {typeof __VLS_ctx.usedmemory} */ ;
}
var __VLS_51;
var __VLS_47;
var __VLS_31;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "template-master" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "template-slave" },
});
const __VLS_56 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    Tecolor: "var(--navbar-text)",
    ...{ class: "fast-title" },
}));
const __VLS_58 = __VLS_57({
    Tecolor: "var(--navbar-text)",
    ...{ class: "fast-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
var __VLS_59;
const __VLS_60 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    type: "primary",
    ...{ class: "document" },
}));
const __VLS_62 = __VLS_61({
    type: "primary",
    ...{ class: "document" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
const __VLS_64 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    href: "/api/leading",
    color: "#fff",
    underline: true,
}));
const __VLS_66 = __VLS_65({
    href: "/api/leading",
    color: "#fff",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
var __VLS_67;
var __VLS_63;
const __VLS_68 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    type: "primary",
    colorText: "#fff",
    ...{ class: "document" },
}));
const __VLS_70 = __VLS_69({
    type: "primary",
    colorText: "#fff",
    ...{ class: "document" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_71.slots.default;
const __VLS_72 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    href: "/tool/build",
    color: "#fff",
    underline: true,
}));
const __VLS_74 = __VLS_73({
    href: "/tool/build",
    color: "#fff",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
var __VLS_75;
var __VLS_71;
const __VLS_76 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    type: "primary",
    colorText: "#fff",
    ...{ class: "document" },
}));
const __VLS_78 = __VLS_77({
    type: "primary",
    colorText: "#fff",
    ...{ class: "document" },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
const __VLS_80 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    href: "/system/user",
    color: "#fff",
    underline: true,
}));
const __VLS_82 = __VLS_81({
    href: "/system/user",
    color: "#fff",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_83.slots.default;
var __VLS_83;
var __VLS_79;
const __VLS_84 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    type: "primary",
    colorText: "#fff",
    ...{ class: "document" },
}));
const __VLS_86 = __VLS_85({
    type: "primary",
    colorText: "#fff",
    ...{ class: "document" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
const __VLS_88 = {}.MYa;
/** @type {[typeof __VLS_components.MYa, typeof __VLS_components.MYa, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    href: "/monitor/online",
    color: "#fff",
    underline: true,
}));
const __VLS_90 = __VLS_89({
    href: "/monitor/online",
    color: "#fff",
    underline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
__VLS_91.slots.default;
var __VLS_91;
var __VLS_87;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "template-notice" },
});
const __VLS_92 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    Tecolor: "var(--navbar-text)",
    ...{ class: "fast-title" },
}));
const __VLS_94 = __VLS_93({
    Tecolor: "var(--navbar-text)",
    ...{ class: "fast-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_95.slots.default;
var __VLS_95;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "timeline-container" },
});
const __VLS_96 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    Tecolor: "var(--general)",
}));
const __VLS_98 = __VLS_97({
    Tecolor: "var(--general)",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_99.slots.default;
var __VLS_99;
/** @type {__VLS_StyleScopedClasses['dashboard-container']} */ ;
/** @type {__VLS_StyleScopedClasses['app-row']} */ ;
/** @type {__VLS_StyleScopedClasses['app-list']} */ ;
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
/** @type {__VLS_StyleScopedClasses['num']} */ ;
/** @type {__VLS_StyleScopedClasses['context']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['template-container']} */ ;
/** @type {__VLS_StyleScopedClasses['template-title']} */ ;
/** @type {__VLS_StyleScopedClasses['template-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-box']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-card']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--enable-row-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--medium']} */ ;
/** @type {__VLS_StyleScopedClasses['card-box']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-card']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--enable-row-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--medium']} */ ;
/** @type {__VLS_StyleScopedClasses['template-master']} */ ;
/** @type {__VLS_StyleScopedClasses['template-slave']} */ ;
/** @type {__VLS_StyleScopedClasses['fast-title']} */ ;
/** @type {__VLS_StyleScopedClasses['document']} */ ;
/** @type {__VLS_StyleScopedClasses['document']} */ ;
/** @type {__VLS_StyleScopedClasses['document']} */ ;
/** @type {__VLS_StyleScopedClasses['document']} */ ;
/** @type {__VLS_StyleScopedClasses['template-notice']} */ ;
/** @type {__VLS_StyleScopedClasses['fast-title']} */ ;
/** @type {__VLS_StyleScopedClasses['timeline-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            commandstats: commandstats,
            usedmemory: usedmemory,
            data: data,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
