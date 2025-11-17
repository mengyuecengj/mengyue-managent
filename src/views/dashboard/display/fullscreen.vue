<template>
    <div class="indicator-left">
        <div class="indicator-left-top panel-card">
            <div class="panel-header">
                <div class="header-title">数据概览</div>
                <div class="header-icon">📊</div>
            </div>
            <div class="panel-content">
                <div class="data-display">
                    <div class="data-item">
                        <div class="data-value">12.8K</div>
                        <div class="data-label">访问量</div>
                    </div>
                    <div class="data-item">
                        <div class="data-value">86%</div>
                        <div class="data-label">增长率</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="indicator-left-top panel-card">
            <div class="panel-header">
                <div class="header-title">用户分布</div>
                <div class="header-icon">👥</div>
            </div>
            <div class="panel-content">
                <div class="user-distribution-container">
                    <div class="user-distribution-list" ref="distributionList">
                        <div class="distribution-item" v-for="(item, index) in userDistributionData" :key="index">
                            <div class="location">{{ item.location }}</div>
                            <div class="address">{{ item.address }}</div>
                            <div class="ip">{{ item.ip }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="indicator-left-top panel-card">
            <div class="panel-header">
                <div class="header-title">系统状态</div>
                <div class="header-icon">⚙️</div>
            </div>
            <div class="panel-content">
                <div class="status-container">
                    <div class="status-item">
                        <div class="status-indicator online"></div>
                        <div class="status-label">在线</div>
                    </div>
                    <div class="status-item">
                        <div class="status-indicator warning"></div>
                        <div class="status-label">警告</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="indicator">
        <div class="indicator-top panel-card">
            <div class="panel-header">
                <div class="header-title">全球分布图</div>
                <div class="header-icon">🌍</div>
            </div>
            <div class="panel-content">
                <div ref="container" class="world-map-container"></div>
            </div>
        </div>
        <div class="indicator-bottom panel-card">
            <div class="panel-header">
                <div class="header-title">实时数据</div>
                <div class="header-icon">📈</div>
            </div>
            <div class="panel-content">
                <div class="realtime-data">
                    <div class="data-stream">
                        <div class="stream-item" v-for="i in 5" :key="i"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="indicator-right">
        <div class="indicator-right-top panel-card">
            <div class="panel-header">
                <div class="header-title">性能指标</div>
                <div class="header-icon">⚡</div>
            </div>
            <div class="panel-content">
                <div class="performance-meter">
                    <div class="meter-bar">
                        <div class="meter-fill"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="indicator-right-top panel-card">
            <div class="panel-header">
                <div class="header-title">资源使用</div>
                <div class="header-icon">💾</div>
            </div>
            <div class="panel-content">
                <div class="resource-chart">
                    <div class="chart-circle">
                        <div class="circle-fill"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="indicator-right-top panel-card">
            <div class="panel-header">
                <div class="header-title">告警信息</div>
                <div class="header-icon">🔔</div>
            </div>
            <div class="panel-content">
                <div class="alert-list">
                    <div class="alert-item">
                        <div class="alert-dot"></div>
                        <div class="alert-text">暂无系统告警</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import { MapChart, ScatterChart, EffectScatterChart } from 'echarts/charts';
import { GeoComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

echarts.use([MapChart, ScatterChart, EffectScatterChart, GeoComponent, TooltipComponent, CanvasRenderer]);

import world from '~/MapWorld.json';

type UserItem = { location: string; address: string; ip: string };

const container = ref<HTMLElement | null>(null);
const distributionList = ref<HTMLElement | null>(null);

let chart: echarts.ECharts | null = null;
let animationFrameId: number | null = null;

// 示例数据
const userDistributionData = ref<UserItem[]>([
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
const coordsMap: Record<string, [number, number]> = {
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
    if (!distributionList.value) return;
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
            if (!coord) return null;
            return {
                name: item.address,
                value: [coord[0], coord[1], 1],
                extra: item
            };
        })
        .filter(Boolean) as any[];
}

function makeTooltipHtmlFromItem(it: UserItem) {
    return `
    <div class="tooltip-card">
      <div class="tooltip-title">${it.location}</div>
      <div class="tooltip-line">地址：${it.address}</div>
      <div class="tooltip-line">IP：<span class="ip-code">${it.ip}</span></div>
    </div>
  `;
}

function makeTooltipHtmlFromItems(items: UserItem[]) {
    return `
    <div class="tooltip-card">
      <div class="tooltip-title">中国 (${items.length} 条)</div>
      ${items.map((it) => `<div class="tooltip-line">• ${it.address} — <span class="ip-code">${it.ip}</span></div>`).join('')}
    </div>
  `;
}

function showDomTooltipAt(x: number, y: number, html: string) {
    tooltipHtml.value = html;
    tooltipPos.value = { x: x + 8, y: y + 8 };
    tooltipVisible.value = true;
}
function hideDomTooltip() {
    tooltipVisible.value = false;
}

function resizeChart() {
    if (chart) chart.resize();
}

onMounted(() => {
    echarts.registerMap('world', world as any);
    if (!container.value) return;
    chart = echarts.init(container.value);

    if (distributionList.value) animationFrameId = requestAnimationFrame(autoScroll);

    const scatterData = buildScatterData();

    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(10,18,30,0.96)',
            borderColor: HIGHLIGHT_COLOR,
            borderWidth: 1,
            padding: 10,
            textStyle: { color: '#fff' },
            formatter: function (params: any) {
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
                    period: 3,   // 缩短周期，更灵动
                    scale: 2.5,  // 减少扩散倍数
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
    chart.setOption(option as any);

    chart.on('click', function (params: any) {
        const rawEvent = params.event && (params.event.event || params.event);
        const rect = container.value!.getBoundingClientRect();
        const clientX = rawEvent?.clientX ?? rect.left + 100;
        const clientY = rawEvent?.clientY ?? rect.top + 100;
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;

        // 点击点（effectScatter 或 scatter）
        if (params.componentType === 'series' && (params.seriesType === 'scatter' || params.seriesType === 'effectScatter')) {
            chart!.dispatchAction({
                type: 'showTip',
                seriesIndex: params.seriesIndex,
                dataIndex: params.dataIndex
            });
            const extra = params.data?.extra as UserItem | undefined;
            if (extra) showDomTooltipAt(localX, localY, makeTooltipHtmlFromItem(extra));
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
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped lang="scss">
@use "sass:math";
// 定义主要颜色变量
$primary-color: rgba(43, 196, 255, 1);
$secondary-color: rgba(43, 196, 255, 0.5);
$background-color: linear-gradient(135deg, #0a1a2f, #0d1b2a);
$card-bg: rgba(10, 18, 30, 0.9); // 更深，增强对比
$card-border: linear-gradient(135deg,
        rgba(43, 196, 255, 0.9),
        rgba(43, 196, 255, 0.3),
        rgba(43, 196, 255, 0.9),
        rgba(43, 196, 255, 0.3));
$border-highlight: rgba(43, 196, 255, 0.8);

.indicator-left {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 90px;
    left: 20px;
    gap: 15px;

    .indicator-left-top {
        width: 350px;
        height: 27vh;
    }
}

.indicator {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 90px;

    .indicator-top {
        width: 600px;
        height: 54vh;
    }

    .indicator-bottom {
        width: 600px;
        height: 29vh;
    }

    .world-map-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50vh;
    }
}

.indicator-right {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 90px;
    right: 15px;
    gap: 20px;

    .indicator-right-top {
        width: 350px;
        height: 27vh;
    }
}

// 高级面板卡片样式
.panel-card {
    position: relative;
    background: $card-bg;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: inset 0 0 20px rgba(43, 196, 255, 0.1), 0 0 15px rgba(43, 196, 255, 0.1);
    transition: all 0.3s ease;
    animation: breathe 4s ease-in-out infinite;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 8px;
        padding: 1px;
        background: $card-border;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        z-index: 1;
        pointer-events: none;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(circle at 0 0, rgba(43, 196, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 100% 0, rgba(43, 196, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 0 100%, rgba(43, 196, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 100% 100%, rgba(43, 196, 255, 0.4) 1px, transparent 1px);
        background-size: 15px 15px;
        background-position: 0 0, 100% 0, 0 100%, 100% 100%;
        background-repeat: no-repeat;
        z-index: 2;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: inset 0 0 25px rgba(43, 196, 255, 0.2), 0 0 25px rgba(43, 196, 255, 0.4);

        &::before {
            background: linear-gradient(135deg, $primary-color, rgba(43, 196, 255, 0.5), $primary-color);
        }
    }
}

// 面板头部样式
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 5px;
    border-bottom: 1px solid rgba(43, 196, 255, 0.3);
    position: relative;
    z-index: 3;

    .header-title {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
    }

    .header-icon {
        font-size: 18px;
        color: $primary-color;
        text-shadow: 0 0 5px rgba(43, 196, 255, 0.5);
    }
}

// 内容区域样式
.panel-content {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    padding: 10px 15px;
    z-index: 3;
    box-sizing: border-box;
}

// 数据展示样式
.data-display {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .data-item {
        text-align: center;

        .data-value {
            font-size: 24px;
            font-weight: bold;
            color: #2bc4ff;
            text-shadow: 0 0 10px rgba(43, 196, 255, 0.5), 0 0 2px rgba(0, 0, 0, 0.5);
        }

        .data-label {
            font-size: 12px;
            color: #aaa;
            margin-top: 5px;
        }
    }
}

// 图表占位符
.chart-placeholder {
    width: 100%;
    height: 100%;
    position: relative;
}

// 状态指示器
.status-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .status-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .status-label {
            color: #aaa;
            font-size: 12px;
            margin-top: 5px;
        }
    }

    .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &.online {
            background: #00ff00;
            box-shadow: 0 0 10px #00ff00;
        }

        &.warning {
            background: #ffcc00;
            box-shadow: 0 0 10px #ffcc00;
        }
    }
}

// 用户分布样式
.user-distribution-container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .user-distribution-list {
        height: 100%;
        overflow: hidden;

        .distribution-item {
            padding: 12px 8px;
            border-bottom: 1px solid rgba(43, 196, 255, 0.2);
            animation: fadeIn 0.5s ease-in;

            &:last-child {
                border-bottom: none;
            }

            .location {
                color: #2bc4ff;
                font-weight: 500;
                font-size: 14px;
                margin-bottom: 4px;
            }

            .address {
                color: #ddd;
                font-size: 12px;
                margin-bottom: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .ip {
                color: #aaa;
                font-family: monospace;
                font-size: 11px;
            }
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


// 实时数据流
.realtime-data {
    height: 100%;

    .data-stream {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        height: 100%;

        .stream-item {
            width: 8px;
            background: linear-gradient(to top, #2bc4ff, transparent);
            border-radius: 4px 4px 0 0;
            animation: streamAnimation 1.5s infinite ease-in-out;

            @for $i from 1 through 5 {
                &:nth-child(#{$i}) {
                    height: #{20 + math.random(60)}px;
                    animation-delay: #{$i * 0.1}s;
                }
            }
        }
    }
}

// 性能仪表
.performance-meter {
    height: 100%;
    display: flex;
    align-items: center;

    .meter-bar {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        overflow: hidden;
        position: relative;

        .meter-fill {
            height: 100%;
            width: 75%;
            background: linear-gradient(90deg, #00c853, #2bc4ff);
            border-radius: 6px;
            animation: meterPulse 2s infinite;
        }
    }
}

// 资源图表
.resource-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .chart-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .circle-fill {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: conic-gradient(#2bc4ff 0deg, #00c853 120deg, #ffcc00 240deg, #2bc4ff 360deg);
            position: relative;

            &::after {
                content: '';
                position: absolute;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: $card-bg;
                top: 5px;
                left: 5px;
            }
        }

        &::before {
            content: '65%';
            position: absolute;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            z-index: 2;
        }
    }
}

// 告警列表
.alert-list {
    .alert-item {
        display: flex;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

        &:last-child {
            border-bottom: none;
        }

        .alert-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #15ff00;
            margin-right: 10px;
            box-shadow: 0 0 5px #ff5252;
        }

        .alert-text {
            color: #ddd;
            font-size: 13px;
        }
    }
}

// 动画效果
@keyframes streamAnimation {

    0%,
    100% {
        transform: scaleY(1);
    }

    50% {
        transform: scaleY(0.5);
    }
}

@keyframes meterPulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

@keyframes breathe {

    0%,
    100% {
        box-shadow: inset 0 0 20px rgba(43, 196, 255, 0.1), 0 0 15px rgba(43, 196, 255, 0.1);
    }

    50% {
        box-shadow: inset 0 0 25px rgba(43, 196, 255, 0.2), 0 0 25px rgba(43, 196, 255, 0.4);
    }
}

@keyframes border-glow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.panel-card.glow-animation::before {
    background: linear-gradient(135deg, $primary-color, rgba(43, 196, 255, 0.3), $primary-color, rgba(43, 196, 255, 0.3));
    background-size: 400% 400%;
    animation: border-glow 3s ease infinite;
}
</style>