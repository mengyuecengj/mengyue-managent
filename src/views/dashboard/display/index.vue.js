import fullscreen from './fullscreen.vue';
import gsap from 'gsap';
import dayjs from 'dayjs';
// 面板参数
const panelX = 500;
const panelY = 10;
const panelW = 400;
const panelH = 60;
const chamfer = 30;
const panelCenterX = panelX + panelW / 2;
// 六边形坐标点
const A = `${panelX + chamfer},${panelY}`;
const B = `${panelX + panelW - chamfer},${panelY}`;
const C = `${panelX + panelW + chamfer},${panelY + panelH / 2}`;
const D = `${panelX + panelW - chamfer},${panelY + panelH}`;
const E = `${panelX + chamfer},${panelY + panelH}`;
const F = `${panelX - chamfer},${panelY + panelH / 2}`;
const polyPointsString = `${A} ${B} ${C} ${D} ${E} ${F}`;
// 扫描条
const scanner = ref(null);
const svgRoot = ref(null);
const scannerWidth = 180;
const scanStartX = panelX - scannerWidth - 6;
// 时间
const timeStr = ref('');
const weekdayStr = ref('');
let timer = null;
function updateTime() {
    const now = dayjs();
    timeStr.value = now.format('YYYY年MM月DD日 HH:mm:ss');
    const map = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    weekdayStr.value = map[now.day()];
}
onMounted(() => {
    updateTime();
    timer = window.setInterval(updateTime, 1000);
    const fromX = panelX - scannerWidth - 10;
    const toX = panelX + panelW + scannerWidth + 10;
    // 扫描条动画
    gsap.timeline({ repeat: -1 })
        .fromTo(scanner.value, { attr: { x: fromX } }, { attr: { x: toX }, duration: 3.2, ease: 'power1.inOut' });
    // 入场动画
    gsap.from(svgRoot.value, { opacity: 0, y: -8, duration: 0.8, ease: 'power2.out' });
});
onBeforeUnmount(() => {
    if (timer)
        clearInterval(timer);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
// 全屏逻辑
const dashboardContainer = ref(null);
const router = useRouter();
const browserFullscreen = ref(false);
const showControls = ref(true);
function toggleBrowserFullscreen() {
    const el = dashboardContainer.value ?? document.documentElement;
    if (!document.fullscreenElement) {
        el.requestFullscreen?.().catch(err => {
            console.warn('requestFullscreen 被浏览器拦截或失败:', err);
        });
    }
    else {
        document.exitFullscreen?.();
    }
}
function handleFullscreenChange() {
    browserFullscreen.value = !!document.fullscreenElement;
}
async function exitAndBack() {
    if (document.fullscreenElement) {
        await document.exitFullscreen();
    }
    router.back();
}
onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-fullscreen" },
    ref: "dashboardContainer",
});
/** @type {typeof __VLS_ctx.dashboardContainer} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "time-box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "date" },
});
(__VLS_ctx.timeStr);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "weekday" },
});
(__VLS_ctx.weekdayStr);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-controls" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showControls) }, null, null);
const __VLS_0 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "control-button" },
    plain: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "control-button" },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.toggleBrowserFullscreen)
};
__VLS_3.slots.default;
(__VLS_ctx.browserFullscreen ? '退出可视化全屏' : '进入可视化全屏');
var __VLS_3;
const __VLS_8 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "danger",
    ...{ class: "control-button" },
    ...{ style: {} },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "danger",
    ...{ class: "control-button" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.exitAndBack)
};
__VLS_11.slots.default;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    viewBox: "0 0 1400 110",
    preserveAspectRatio: "xMidYMid meet",
    ...{ class: "header-svg" },
    ref: "svgRoot",
});
/** @type {typeof __VLS_ctx.svgRoot} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.defs, __VLS_intrinsicElements.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.filter, __VLS_intrinsicElements.filter)({
    id: "glow",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.feGaussianBlur)({
    stdDeviation: "4",
    result: "b",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.feMerge, __VLS_intrinsicElements.feMerge)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.feMergeNode)({
    in: "b",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.feMergeNode)({
    in: "SourceGraphic",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.linearGradient, __VLS_intrinsicElements.linearGradient)({
    id: "scanGrad",
    x1: "0",
    x2: "1",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0",
    'stop-color': "rgba(255,255,255,0)",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0.45",
    'stop-color': "rgba(255,255,255,0.22)",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0.75",
    'stop-color': "rgba(255,255,255,0.08)",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "1",
    'stop-color': "rgba(255,255,255,0)",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.linearGradient, __VLS_intrinsicElements.linearGradient)({
    id: "panelFill",
    x1: "0",
    x2: "1",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0",
    'stop-color': "#031726",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "1",
    'stop-color': "#052a3a",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.clipPath, __VLS_intrinsicElements.clipPath)({
    id: "panelClip",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.polygon)({
    points: (__VLS_ctx.polyPointsString),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    'stroke-linecap': "round",
    'stroke-width': "2",
    opacity: "0.95",
    stroke: "#2f9cff",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M20 40 H480",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M20 55 H420",
    opacity: "0.35",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    'stroke-linecap': "round",
    'stroke-width': "2",
    opacity: "0.95",
    stroke: "#2f9cff",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M1380 40 H920",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M1380 55 H980",
    opacity: "0.35",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.polygon)({
    points: (__VLS_ctx.polyPointsString),
    fill: "url(#panelFill)",
    opacity: "0.98",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.polygon)({
    points: (__VLS_ctx.polyPointsString),
    fill: "none",
    stroke: "#2bc4ff",
    'stroke-width': "2",
    filter: "url(#glow)",
    opacity: "0.68",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    'clip-path': "url(#panelClip)",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.rect)({
    ref: "scanner",
    x: (__VLS_ctx.scanStartX),
    y: (__VLS_ctx.panelY),
    width: (__VLS_ctx.scannerWidth),
    height: (__VLS_ctx.panelH),
    fill: "url(#scanGrad)",
    opacity: "0.7",
});
/** @type {typeof __VLS_ctx.scanner} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: (__VLS_ctx.panelCenterX),
    y: (__VLS_ctx.panelY + 28),
    'text-anchor': "middle",
    'font-size': "20",
    fill: "#e8fbff",
    'font-family': "PingFang SC, 'Microsoft Yahei', Arial",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: (__VLS_ctx.panelCenterX),
    y: (__VLS_ctx.panelY + 48),
    'text-anchor': "middle",
    'font-size': "12",
    fill: "#9fd4ee",
    'font-family': "PingFang SC, 'Microsoft Yahei', Arial",
});
/** @type {[typeof fullscreen, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(fullscreen, new fullscreen({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {__VLS_StyleScopedClasses['dashboard-fullscreen']} */ ;
/** @type {__VLS_StyleScopedClasses['header-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['time-box']} */ ;
/** @type {__VLS_StyleScopedClasses['date']} */ ;
/** @type {__VLS_StyleScopedClasses['weekday']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-button']} */ ;
/** @type {__VLS_StyleScopedClasses['control-button']} */ ;
/** @type {__VLS_StyleScopedClasses['header-svg']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            fullscreen: fullscreen,
            panelY: panelY,
            panelH: panelH,
            panelCenterX: panelCenterX,
            polyPointsString: polyPointsString,
            scanner: scanner,
            svgRoot: svgRoot,
            scannerWidth: scannerWidth,
            scanStartX: scanStartX,
            timeStr: timeStr,
            weekdayStr: weekdayStr,
            dashboardContainer: dashboardContainer,
            browserFullscreen: browserFullscreen,
            showControls: showControls,
            toggleBrowserFullscreen: toggleBrowserFullscreen,
            exitAndBack: exitAndBack,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
