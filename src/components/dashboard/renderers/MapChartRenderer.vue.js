import * as echarts from 'echarts';
import worldMapData from '~/geo-coordinate/map-JsonData/MapWorld.json';
import chinaMapData from '~/geo-coordinate/map-JsonData/china.json';
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
const props = defineProps();
const chartContainer = ref(null);
let chartInstance = null;
let ro = null;
// 地图注册配置映射，便于扩展多个地图类型，而无需多个if语句
const mapRegistry = {
    'map-china': { mapName: 'china', mapData: chinaMapData },
    'map-province': { mapName: 'province', mapData: chinaMapData },
};
const initChart = () => {
    if (!chartContainer.value)
        return;
    if (chartInstance)
        chartInstance.dispose();
    chartInstance = echarts.init(chartContainer.value);
    try {
        // 根据 config.type 获取注册配置，默认使用世界地图
        const registry = mapRegistry[props.config.type] || { mapName: 'world', mapData: worldMapData };
        const { mapName, mapData } = registry;
        echarts.registerMap(mapName, mapData);
        if (props.config?.options) {
            const options = { ...props.config.options };
            if (options.geo) {
                if (!options.geo.map) {
                    options.geo.map = mapName;
                }
            }
            if (options.series && Array.isArray(options.series)) {
                options.series.forEach((s) => {
                    if (s.type === 'map') {
                        if (!s.map) {
                            s.map = mapName;
                        }
                    }
                });
            }
            chartInstance.setOption(options);
        }
    }
    catch (err) {
        console.error('地图初始化失败:', err);
    }
};
const handleResize = () => chartInstance?.resize();
onMounted(() => {
    nextTick(() => {
        initChart();
        window.addEventListener('resize', handleResize);
        if (chartContainer.value) {
            ro = new ResizeObserver(() => chartInstance?.resize());
            ro.observe(chartContainer.value);
        }
    });
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (ro && chartContainer.value)
        ro.unobserve(chartContainer.value);
    if (chartInstance)
        chartInstance.dispose();
    ro = null;
    chartInstance = null;
});
watch(() => props.config, () => nextTick(() => chartInstance?.setOption({ ...props.config.options }, { notMerge: true })), { deep: true });
const __VLS_exposed = { resize: handleResize };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "chartContainer",
    ...{ style: ({ width: '100%', height: '100%' }) },
});
/** @type {typeof __VLS_ctx.chartContainer} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            chartContainer: chartContainer,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
