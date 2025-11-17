import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import { MapChart, ScatterChart, EffectScatterChart } from 'echarts/charts';
import { GeoComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([MapChart, ScatterChart, EffectScatterChart, GeoComponent, TooltipComponent, CanvasRenderer]);
import world from '~/MapWorld.json';
const container = ref(null);
const distributionList = ref(null);
let chart = null;
let animationFrameId = null;
// 示例数据
const userDistributionData = ref([
    { location: '亚洲', address: '中国广东省深圳市', ip: '192.168.1.101' },
    { location: '北美洲', address: '美国加利福尼亚州洛杉矶', ip: '10.0.0.52' },
    { location: '欧洲', address: '德国柏林', ip: '172.16.32.45' },
    { location: '南美洲', address: '巴西圣保罗', ip: '192.168.200.78' },
    { location: '大洋洲', address: '澳大利亚悉尼', ip: '10.10.10.10' },
    { location: '非洲', address: '南非开普敦', ip: '172.20.45.112' },
    { location: '亚洲', address: '日本东京', ip: '192.168.10.205' },
    { location: '北美洲', address: '加拿大温哥华', ip: '10.20.30.40' },
    { location: '欧洲', address: '法国巴黎', ip: '172.18.90.67' },
    { location: '亚洲', address: '中国北京', ip: '192.168.30.15' }
]);
// 地址 -> 经纬度 映射（建议后端直接返回 lng/lat）
const coordsMap = {
    '中国广东省深圳市': [114.0579, 22.5431],
    '中国北京': [116.4074, 39.9042],
    '美国加利福尼亚州洛杉矶': [-118.2437, 34.0522],
    '德国柏林': [13.4050, 52.5200],
    '巴西圣保罗': [-46.6333, -23.5505],
    '澳大利亚悉尼': [151.2093, -33.8688],
    '南非开普敦': [18.4241, -33.9249],
    '日本东京': [139.6917, 35.6895],
    '加拿大温哥华': [-123.1207, 49.2827],
    '法国巴黎': [2.3522, 48.8566]
};
// 新颜色（橙色）—— 如需其它颜色直接替换这个值
const HIGHLIGHT_COLOR = '#ff8c42';
const HIGHLIGHT_RGBA = 'rgba(255,140,66,0.12)'; // 扩散填充（半透明）
// DOM tooltip 状态（点击显示）
const tooltipVisible = ref(false);
const tooltipHtml = ref('');
const tooltipPos = ref({ x: 0, y: 0 });
let scrollPosition = 0;
const autoScroll = () => {
    if (!distributionList.value)
        return;
    const listHeight = distributionList.value.scrollHeight;
    const containerHeight = distributionList.value.clientHeight;
    scrollPosition += 1;
    if (scrollPosition > listHeight - containerHeight) {
        scrollPosition = 0;
    }
    distributionList.value.scrollTop = scrollPosition;
    animationFrameId = requestAnimationFrame(autoScroll);
};
function buildScatterData() {
    return userDistributionData.value
        .map((item) => {
        const coord = coordsMap[item.address];
        if (!coord)
            return null;
        return {
            name: item.address,
            value: [coord[0], coord[1], 1],
            extra: item
        };
    })
        .filter(Boolean);
}
function makeTooltipHtmlFromItem(it) {
    return `
    <div class="tooltip-card">
      <div class="tooltip-title">${it.location}</div>
      <div class="tooltip-line">地址：${it.address}</div>
      <div class="tooltip-line">IP：<span class="ip-code">${it.ip}</span></div>
    </div>
  `;
}
function makeTooltipHtmlFromItems(items) {
    return `
    <div class="tooltip-card">
      <div class="tooltip-title">中国 (${items.length} 条)</div>
      ${items.map((it) => `<div class="tooltip-line">• ${it.address} — <span class="ip-code">${it.ip}</span></div>`).join('')}
    </div>
  `;
}
function showDomTooltipAt(x, y, html) {
    tooltipHtml.value = html;
    tooltipPos.value = { x: x + 8, y: y + 8 };
    tooltipVisible.value = true;
}
function hideDomTooltip() {
    tooltipVisible.value = false;
}
function resizeChart() {
    if (chart)
        chart.resize();
}
onMounted(() => {
    echarts.registerMap('world', world);
    if (!container.value)
        return;
    chart = echarts.init(container.value);
    if (distributionList.value)
        animationFrameId = requestAnimationFrame(autoScroll);
    const scatterData = buildScatterData();
    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(10,18,30,0.96)',
            borderColor: HIGHLIGHT_COLOR,
            borderWidth: 1,
            padding: 10,
            textStyle: { color: '#fff' },
            formatter: function (params) {
                const d = params.data && params.data.extra ? params.data.extra : null;
                if (d) {
                    return `
            <div style="min-width:160px;">
              <div style="font-weight:600;margin-bottom:6px;color:${HIGHLIGHT_COLOR}">${d.location}</div>
              <div style="font-size:12px;color:#e6f7ff;margin-bottom:4px;">地址：${d.address}</div>
              <div style="font-size:12px;color:#cbeefc">IP：<span style="font-family:monospace">${d.ip}</span></div>
            </div>
          `;
                }
                return params.name || '';
            }
        },
        geo: {
            map: 'world',
            roam: true,
            zoom: 1.2,
            itemStyle: {
                areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#0a1a2f' },
                        { offset: 1, color: '#0d1b2a' }
                    ]
                },
                borderColor: 'rgba(43,196,255,0.6)',
                borderWidth: 0.6,
                shadowColor: 'rgba(43,196,255,0.3)',
                shadowBlur: 8
            },
            label: { show: false },
            // 添加这一部分来禁用高亮效果
            emphasis: {
                disabled: true
            }
        },
        series: [
            // 只有：波纹扩散（effectScatter） + 中心实心点（scatter）
            {
                name: 'ripple',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbol: 'circle',
                symbolSize: 20, // 缩小波纹尺寸
                showEffectOn: 'render',
                rippleEffect: {
                    period: 3, // 缩短周期，更灵动
                    scale: 2.5, // 减少扩散倍数
                    brushType: 'stroke'
                },
                itemStyle: {
                    color: HIGHLIGHT_RGBA,
                    borderColor: HIGHLIGHT_COLOR,
                    borderWidth: 1.2,
                    shadowBlur: 14,
                    shadowColor: 'rgba(255,140,66,0.35)'
                },
                data: scatterData
            },
            {
                name: 'center',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'circle',
                symbolSize: 12, // 中心点缩小到 12px
                label: { show: false },
                itemStyle: {
                    color: HIGHLIGHT_COLOR, // 实心点颜色
                    borderColor: 'rgba(0,0,0,0.6)',
                    borderWidth: 1.2,
                    shadowBlur: 10,
                    shadowColor: 'rgba(255,140,66,0.35)'
                },
                data: scatterData
            }
        ]
    };
    // 避免 TS 严格类型问题，setOption 时断言为 any（常见做法）
    chart.setOption(option);
    chart.on('click', function (params) {
        const rawEvent = params.event && (params.event.event || params.event);
        const rect = container.value.getBoundingClientRect();
        const clientX = rawEvent?.clientX ?? rect.left + 100;
        const clientY = rawEvent?.clientY ?? rect.top + 100;
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;
        // 点击点（effectScatter 或 scatter）
        if (params.componentType === 'series' && (params.seriesType === 'scatter' || params.seriesType === 'effectScatter')) {
            chart.dispatchAction({
                type: 'showTip',
                seriesIndex: params.seriesIndex,
                dataIndex: params.dataIndex
            });
            const extra = params.data?.extra;
            if (extra)
                showDomTooltipAt(localX, localY, makeTooltipHtmlFromItem(extra));
            return;
        }
        // 点击国家（如中国）
        if ((params.componentType === 'geo' || (params.componentType === 'series' && params.seriesType === 'map')) && params.name) {
            const name = String(params.name || '').toLowerCase();
            if (name.includes('china') || name.includes('中国')) {
                const chinaItems = userDistributionData.value.filter((it) => it.address.includes('中国'));
                if (chinaItems.length) {
                    showDomTooltipAt(localX, localY, makeTooltipHtmlFromItems(chinaItems));
                    return;
                }
            }
        }
        hideDomTooltip();
    });
    chart.on('mouseout', () => {
        hideDomTooltip();
    });
    window.addEventListener('resize', resizeChart);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
    if (chart) {
        chart.dispose();
        chart = null;
    }
    if (animationFrameId)
        cancelAnimationFrame(animationFrameId);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-left" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-left-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-display" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-left-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "user-distribution-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "user-distribution-list" },
    ref: "distributionList",
});
/** @type {typeof __VLS_ctx.distributionList} */ ;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.userDistributionData))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "distribution-item" },
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "location" },
    });
    (item.location);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "address" },
    });
    (item.address);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ip" },
    });
    (item.ip);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-left-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-indicator online" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-indicator warning" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "container",
    ...{ class: "world-map-container" },
});
/** @type {typeof __VLS_ctx.container} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-bottom panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "realtime-data" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "data-stream" },
});
for (const [i] of __VLS_getVForSourceType((5))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stream-item" },
        key: (i),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-right" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-right-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "performance-meter" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "meter-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "meter-fill" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-right-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "resource-chart" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chart-circle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "circle-fill" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "indicator-right-top panel-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "alert-list" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "alert-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "alert-dot" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "alert-text" },
});
/** @type {__VLS_StyleScopedClasses['indicator-left']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-left-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-display']} */ ;
/** @type {__VLS_StyleScopedClasses['data-item']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['data-item']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-left-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['user-distribution-container']} */ ;
/** @type {__VLS_StyleScopedClasses['user-distribution-list']} */ ;
/** @type {__VLS_StyleScopedClasses['distribution-item']} */ ;
/** @type {__VLS_StyleScopedClasses['location']} */ ;
/** @type {__VLS_StyleScopedClasses['address']} */ ;
/** @type {__VLS_StyleScopedClasses['ip']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-left-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['status-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['online']} */ ;
/** @type {__VLS_StyleScopedClasses['status-label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['warning']} */ ;
/** @type {__VLS_StyleScopedClasses['status-label']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['world-map-container']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['realtime-data']} */ ;
/** @type {__VLS_StyleScopedClasses['data-stream']} */ ;
/** @type {__VLS_StyleScopedClasses['stream-item']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-right']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-right-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['performance-meter']} */ ;
/** @type {__VLS_StyleScopedClasses['meter-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['meter-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-right-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['circle-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-right-top']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-list']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            container: container,
            distributionList: distributionList,
            userDistributionData: userDistributionData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
