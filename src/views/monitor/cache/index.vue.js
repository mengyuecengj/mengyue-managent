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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
});
const __VLS_0 = {}.MYRow;
/** @type {[typeof __VLS_components.MYRow, typeof __VLS_components.MYRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: (10),
}));
const __VLS_2 = __VLS_1({
    gutter: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    span: (24),
    ...{ class: "card-box" },
}));
const __VLS_6 = __VLS_5({
    span: (24),
    ...{ class: "card-box" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_11.slots;
    const __VLS_12 = {}.Monitor;
    /** @type {[typeof __VLS_components.Monitor, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ style: {} },
    }));
    const __VLS_14 = __VLS_13({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
}
{
    const { body: __VLS_thisSlot } = __VLS_11.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-table custom-table--enable-row-hover custom-table--medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        cellspacing: "0",
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.redis_version);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.redis_mode == "standalone" ? "单机" : "集群");
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.tcp_port);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.connected_clients);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.uptime_in_days);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.used_memory_human);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (parseFloat(__VLS_ctx.cache.info.used_cpu_user_children).toFixed(2));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.maxmemory_human);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.aof_enabled == "0" ? "否" : "是");
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.rdb_last_bgsave_status);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.dbSize) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.dbSize);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "custom-cell leaf" },
    });
    if (__VLS_ctx.cache.info) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell" },
        });
        (__VLS_ctx.cache.info.instantaneous_input_kbps);
        (__VLS_ctx.cache.info.instantaneous_output_kbps);
    }
}
var __VLS_11;
var __VLS_7;
const __VLS_16 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    span: (12),
    ...{ class: "card-box" },
}));
const __VLS_18 = __VLS_17({
    span: (12),
    ...{ class: "card-box" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ style: {} },
}));
const __VLS_22 = __VLS_21({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_23.slots;
    const __VLS_24 = {}.PieChart;
    /** @type {[typeof __VLS_components.PieChart, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ style: {} },
    }));
    const __VLS_26 = __VLS_25({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
}
{
    const { body: __VLS_thisSlot } = __VLS_23.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-table custom-table--enable-row-hover custom-table--medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ref: "commandstats",
        ...{ style: {} },
    });
    /** @type {typeof __VLS_ctx.commandstats} */ ;
}
var __VLS_23;
var __VLS_19;
const __VLS_28 = {}.MYCol;
/** @type {[typeof __VLS_components.MYCol, typeof __VLS_components.MYCol, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    span: (12),
    ...{ class: "card-box" },
}));
const __VLS_30 = __VLS_29({
    span: (12),
    ...{ class: "card-box" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.MYCard;
/** @type {[typeof __VLS_components.MYCard, typeof __VLS_components.MYCard, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ style: {} },
}));
const __VLS_34 = __VLS_33({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_35.slots;
    const __VLS_36 = {}.Odometer;
    /** @type {[typeof __VLS_components.Odometer, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ style: {} },
    }));
    const __VLS_38 = __VLS_37({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
}
{
    const { body: __VLS_thisSlot } = __VLS_35.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-table custom-table--enable-row-hover custom-table--medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ref: "usedmemory",
        ...{ style: {} },
    });
    /** @type {typeof __VLS_ctx.usedmemory} */ ;
}
var __VLS_35;
var __VLS_31;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['card-box']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--enable-row-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--medium']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['card-box']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--enable-row-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--medium']} */ ;
/** @type {__VLS_StyleScopedClasses['card-box']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--enable-row-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table--medium']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cache: cache,
            commandstats: commandstats,
            usedmemory: usedmemory,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
