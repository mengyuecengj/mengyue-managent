<template>
    <div class="dashboard-fullscreen" ref="dashboardContainer">
        <div class="header-wrap">
            <div class="time-box">
                <div class="date">{{ timeStr }}</div>
                <div class="weekday">{{ weekdayStr }}</div>
            </div>
            <div class="dashboard-controls" v-show="showControls">
                <MYButton @click="toggleBrowserFullscreen" class="control-button" plain>
                    {{ browserFullscreen ? '退出可视化全屏' : '进入可视化全屏' }}
                </MYButton>
                <MYButton @click="exitAndBack" type="danger" class="control-button" style="margin-left: 8px">
                    退出可视化系统
                </MYButton>
            </div>
            <svg viewBox="0 0 1400 110" preserveAspectRatio="xMidYMid meet" class="header-svg" ref="svgRoot">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <linearGradient id="scanGrad" x1="0" x2="1">
                        <stop offset="0" stop-color="rgba(255,255,255,0)" />
                        <stop offset="0.45" stop-color="rgba(255,255,255,0.22)" />
                        <stop offset="0.75" stop-color="rgba(255,255,255,0.08)" />
                        <stop offset="1" stop-color="rgba(255,255,255,0)" />
                    </linearGradient>

                    <linearGradient id="panelFill" x1="0" x2="1">
                        <stop offset="0" stop-color="#031726" />
                        <stop offset="1" stop-color="#052a3a" />
                    </linearGradient>

                    <clipPath id="panelClip">
                        <polygon :points="polyPointsString" />
                    </clipPath>
                </defs>

                <!-- 左侧延伸线 -->
                <g stroke-linecap="round" stroke-width="2" opacity="0.95" stroke="#2f9cff">
                    <path d="M20 40 H480" />
                    <path d="M20 55 H420" opacity="0.35" />
                </g>

                <!-- 右侧延伸线 -->
                <g stroke-linecap="round" stroke-width="2" opacity="0.95" stroke="#2f9cff">
                    <path d="M1380 40 H920" />
                    <path d="M1380 55 H980" opacity="0.35" />
                </g>

                <!-- 中间内容 -->
                <g>
                    <polygon :points="polyPointsString" fill="url(#panelFill)" opacity="0.98" />
                    <polygon :points="polyPointsString" fill="none" stroke="#2bc4ff" stroke-width="2"
                        filter="url(#glow)" opacity="0.68" />

                    <g clip-path="url(#panelClip)">
                        <rect ref="scanner" :x="scanStartX" :y="panelY" :width="scannerWidth" :height="panelH"
                            fill="url(#scanGrad)" opacity="0.7" />
                    </g>

                    <text :x="panelCenterX" :y="panelY + 28" text-anchor="middle" font-size="20" fill="#e8fbff"
                        font-family="PingFang SC, 'Microsoft Yahei', Arial">
                        低代码企业全球分布
                    </text>
                    <text :x="panelCenterX" :y="panelY + 48" text-anchor="middle" font-size="12" fill="#9fd4ee"
                        font-family="PingFang SC, 'Microsoft Yahei', Arial">
                        Global distribution of low-code enterprises
                    </text>
                </g>
            </svg>
        </div>
        <fullscreen />
    </div>
</template>

<script setup lang="ts">
import fullscreen from './fullscreen.vue'
import gsap from 'gsap'
import dayjs from 'dayjs'

// 面板参数
const panelX = 500
const panelY = 10
const panelW = 400
const panelH = 60
const chamfer = 30
const panelCenterX = panelX + panelW / 2

// 六边形坐标点
const A = `${panelX + chamfer},${panelY}`
const B = `${panelX + panelW - chamfer},${panelY}`
const C = `${panelX + panelW + chamfer},${panelY + panelH / 2}`
const D = `${panelX + panelW - chamfer},${panelY + panelH}`
const E = `${panelX + chamfer},${panelY + panelH}`
const F = `${panelX - chamfer},${panelY + panelH / 2}`
const polyPointsString = `${A} ${B} ${C} ${D} ${E} ${F}`

// 扫描条
const scanner = ref<SVGRectElement | null>(null)
const svgRoot = ref<SVGSVGElement | null>(null)
const scannerWidth = 180
const scanStartX = panelX - scannerWidth - 6

// 时间
const timeStr = ref('')
const weekdayStr = ref('')
let timer: number | null = null

function updateTime() {
    const now = dayjs()
    timeStr.value = now.format('YYYY年MM月DD日 HH:mm:ss')
    const map = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    weekdayStr.value = map[now.day()]
}

onMounted(() => {
    updateTime()
    timer = window.setInterval(updateTime, 1000)

    const fromX = panelX - scannerWidth - 10
    const toX = panelX + panelW + scannerWidth + 10

    // 扫描条动画
    gsap.timeline({ repeat: -1 })
        .fromTo(scanner.value, { attr: { x: fromX } }, { attr: { x: toX }, duration: 3.2, ease: 'power1.inOut' })

    // 入场动画
    gsap.from(svgRoot.value, { opacity: 0, y: -8, duration: 0.8, ease: 'power2.out' })
})

onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

// 全屏逻辑
const dashboardContainer = ref<HTMLElement | null>(null)
const router = useRouter()
const browserFullscreen = ref(false)
const showControls = ref(true)

function toggleBrowserFullscreen() {
    const el = dashboardContainer.value ?? document.documentElement
    if (!document.fullscreenElement) {
        el.requestFullscreen?.().catch(err => {
            console.warn('requestFullscreen 被浏览器拦截或失败:', err)
        })
    } else {
        document.exitFullscreen?.()
    }
}

function handleFullscreenChange() {
    browserFullscreen.value = !!document.fullscreenElement
}

async function exitAndBack() {
    if (document.fullscreenElement) {
        await document.exitFullscreen()
    }
    router.back()
}

onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
})
</script>


<style scoped lang="scss">
@use '@/scss/variables.base.scss' as *;

.dashboard-fullscreen {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // background: $color-background-primary;
}

.header-wrap {
    position: relative;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
}

.dashboard-controls {
    position: absolute;
    right: 40px;
    top: 7px;
    z-index: 10;

    .control-button {
        background: rgba(5, 42, 58, 0.7);
        border: 1px solid rgba(43, 196, 255, 0.5);
        color: #2bc4ff;

        &:hover {
            background: rgba(43, 196, 255, 0.2);
            border-color: rgba(43, 196, 255, 0.8);
            color: #e8fbff;
        }
    }
}

.header-svg {
    width: 100%;
    height: 120px;
    display: block;

    text {
        paint-order: stroke fill;
        shape-rendering: geometricPrecision;
        text-rendering: optimizeLegibility;
    }
}

.time-box {
    display: flex;
    justify-content: space-between;
    width: 200px;
    position: absolute;
    left: 40px;
    top: 7px;
    color: #bfeaff;
    font-family: 'Segoe UI', 'PingFang SC', 'Microsoft Yahei', Arial;
    text-align: left;
    background: rgba(0, 0, 0, 0.10);
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid rgba(47, 156, 255, 0.12);
    box-shadow: 0 0 8px rgba(47, 156, 255, 0.04);

    .date {
        font-size: 13px;
        font-weight: 600;
    }

    .weekday {
        font-size: 12px;
        color: #88c4e6;
        margin-top: 2px;
    }
}
</style>
