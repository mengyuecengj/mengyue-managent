// dashboard about utils
export function toggleBrowserFullscreen() {
    const dashboardContainer = ref<HTMLElement | null>(null)
    const el = dashboardContainer.value ?? document.documentElement
    if (!document.fullscreenElement) {
        el.requestFullscreen?.().catch(err => {
            console.warn('requestFullscreen 被浏览器拦截或失败:', err)
        })
    } else {
        document.exitFullscreen?.()
    }
}
