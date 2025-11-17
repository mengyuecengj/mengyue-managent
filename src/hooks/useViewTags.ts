import { ref, computed, watch, nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useTagsViewStore from '@/store/modules/tagsView'
import type { View } from '@/types/store/tagsView'
import { getNormalPath } from '@/utils/general'
import { ElMessage, ElLoading } from 'element-plus'

/**
 * useTags - 单文件 hook
 * - 集中管理 tags 相关逻辑：store 交互、右键菜单、滚动注册、路由监听
 * - 返回给组件使用的响应式数据与方法（不拆分成太多小 hook，便于管理）
 */
export function useTags() {
    const store = useTagsViewStore()
    const route = useRoute()
    const router = useRouter()

    // visited tags 列表（响应式 computed）
    const tags = computed(() => store.visitedViews)

    // 操作防重 loading 状态
    const loading = ref(false)

    // 暴露给 hook 的 scroll 组件引用（父组件通过 registerScrollRef 注入）
    // 支持注入：ref(componentInstance) 或 直接 componentInstance
    const scrollRef: Ref<any | null> = ref(null)

    /** context - 右键菜单状态与 API（模板中直接使用 context.visible/context.left/context.top） */
    const context = {
        visible: ref(false),
        left: ref(0),
        top: ref(0),
        selectedTag: ref<View | null>(null),

        /**
         * openPlaceholder: 先把菜单显示在鼠标位置（占位），随后会通过 openContextMenu 精确定位
         * 说明：不要在此处做边界检测，真实测量需要在 DOM 渲染后拿到菜单元素尺寸
         */
        openPlaceholder(tag: View, clientX: number, clientY: number) {
            this.selectedTag.value = tag
            this.left.value = clientX
            this.top.value = clientY
            this.visible.value = true
        },

        close() {
            this.visible.value = false
            this.selectedTag.value = null
        },
    }

    // 点击菜单项或右键时，外部可能存在阻塞或事件冒泡，确保先 preventDefault/stopPropagation
    async function openContextMenu(tag: View, e: MouseEvent) {
        // 阻止默认浏览器菜单与冒泡
        e.preventDefault()
        e.stopPropagation()

        // 先显示占位菜单，给用户即时反馈
        context.openPlaceholder(tag, e.clientX, e.clientY)

        // 等待 DOM 渲染（Teleport 会把菜单渲染到 body），才能测量真实尺寸
        await nextTick()

        const menuEl = document.querySelector('.context-menu') as HTMLElement | null
        if (!menuEl) {
            // 若未找到菜单 DOM，则保持占位位置
            return
        }

        // 基于真实尺寸做边界检测（视口为基准）
        const menuW = menuEl.offsetWidth
        const menuH = menuEl.offsetHeight
        const vw = document.documentElement.clientWidth
        const vh = document.documentElement.clientHeight

        let left = e.clientX
        let top = e.clientY

        // 如果右边不足，左移到能显示的位置
        if (left + menuW > vw) left = Math.max(8, vw - menuW - 8)
        // 如果底部不足，上移
        if (top + menuH > vh) top = Math.max(8, vh - menuH - 8)

        context.left.value = left
        context.top.value = top
        // visible 已由 openPlaceholder 设置为 true
    }

    // 外部点击关闭菜单（使用 pointerdown 更早捕获）
    const handleOutsidePointer = (e: PointerEvent) => {
        const menuEl = document.querySelector('.context-menu') as HTMLElement | null
        if (!menuEl) return
        if (!menuEl.contains(e.target as Node)) {
            context.close()
        }
    }

    onMounted(() => {
        document.addEventListener('pointerdown', handleOutsidePointer)
    })
    onUnmounted(() => {
        document.removeEventListener('pointerdown', handleOutsidePointer)
    })

    // 判断标签是否为当前激活
    const isActive = (tag: View) => getNormalPath(tag.path) === getNormalPath(route.path)

    // 注册父组件传入的 scroll 组件 ref（支持 Ref 或 直接实例）
    function registerScrollRef(refEl: Ref<any | null> | any) {
        if (refEl && typeof refEl === 'object' && 'value' in refEl) {
            scrollRef.value = refEl
        } else {
            scrollRef.value = refEl || null
        }
    }

    // 辅助：导航到最后一个视图（关闭当前激活视图后调用）
    async function navigaToLastView(views: View[]) {
        const last = views[views.length - 1] || { path: '/' }
        try {
            await router.push(last as any)
        } catch {
            ElMessage.error('导航失败')
        }
    }

    // 关闭单个标签（带 affix 检查与跳转逻辑）
    async function onClose(tag: View | null) {
        if (!tag || loading.value) return
        if (tag.meta?.affix) {
            ElMessage.warning('默认标签不能关闭')
            return
        }
        loading.value = true
        try {
            const { visitedViews: updated } = await store.deleteView(tag)
            if (isActive(tag)) {
                await navigaToLastView(updated)
            }
            ElMessage.success('标签关闭成功')
        } catch {
            ElMessage.error('标签关闭失败')
        } finally {
            loading.value = false
        }
    }

    // 中键(鼠标滚轮)关闭
    function onMiddleClick(tag: View) {
        if (!tag.meta?.affix) onClose(tag)
    }

    // 刷新页面（并处理 iframe link 的清理）
    async function onRefresh(tag: View | null) {
        if (!tag) return
        context.close()
        const loadingInst = ElLoading.service({ target: 'body' })
        try {
            await store.refreshPage(tag)
            if (route.meta?.link) {
                await store.deleteIframeView(route as View)
            }
            ElMessage.success('刷新成功')
        } catch {
            ElMessage.error('刷新失败')
        } finally {
            loadingInst.close()
        }
    }

    // 右键菜单：关闭选中（当前）标签
    async function onCloseSelected() {
        const s = context.selectedTag.value
        if (!s) return
        if (s.meta?.affix) {
            ElMessage.warning('默认标签不能关闭')
            return
        }
        await onClose(s)
        context.close()
    }

    // 右键菜单：关闭其他
    async function closeOthers() {
        const s = context.selectedTag.value
        if (!s) return
        if (store.visitedViews.length <= 1) {
            ElMessage.warning('当前无其他标签可关闭')
            context.close()
            return
        }
        loading.value = true
        try {
            await router.push(s)
            await store.delOthersViews(s)
            ElMessage.success('已关闭其他标签')
            context.close()
        } catch {
            ElMessage.error('其他标签关闭失败')
        } finally {
            loading.value = false
        }
    }

    // 右键菜单：关闭左侧
    async function closeLeft() {
        const s = context.selectedTag.value
        if (!s) return
        const first = store.visitedViews[0]
        if (s.fullPath === first.fullPath) {
            ElMessage.warning('左侧无可关闭标签')
            context.close()
            return
        }
        const idx = store.visitedViews.findIndex(v => v.fullPath === s.fullPath)
        if (idx <= 1) {
            ElMessage.warning('默认标签不可关闭')
            context.close()
            return
        }
        loading.value = true
        try {
            await router.push(s)
            await store.closeLeft(s)
            ElMessage.success('已关闭左侧标签')
            context.close()
        } catch {
            ElMessage.error('左侧标签关闭失败')
        } finally {
            loading.value = false
        }
    }

    // 右键菜单：关闭右侧
    async function closeRight() {
        const s = context.selectedTag.value
        if (!s) return
        const visited = store.visitedViews
        if (s.fullPath === visited[visited.length - 1].fullPath) {
            ElMessage.warning('右侧无可关闭标签')
            context.close()
            return
        }
        loading.value = true
        try {
            await router.push(s)
            await store.closeRight(s)
            ElMessage.success('已关闭右侧标签')
            context.close()
        } catch {
            ElMessage.error('右侧标签关闭失败')
        } finally {
            loading.value = false
        }
    }

    // 右键菜单：全部关闭（保留 affix）
    async function closeAll() {
        if (store.visitedViews.length <= 1) {
            ElMessage.warning('没有可关闭的标签')
            context.close()
            return
        }
        loading.value = true
        try {
            await store.closeAll()
            ElMessage.success('已关闭全部标签')
            const firstTag = store.visitedViews[0]
            router.push(firstTag.path)
            context.close()
        } catch {
            ElMessage.error('关闭全部失败')
        } finally {
            loading.value = false
        }
    }

    // 打开右键菜单（对外接口供模板事件调用）
    function openContextMenuHandler(tag: View, e: MouseEvent) {
        openContextMenu(tag, e)
    }

    // 监听页面路由变化：添加视图并滚动到当前标签（自动）
    watch(
        () => route.fullPath,
        () => {
            // 将当前路由加入 store（store 内部会去重）
            store.addView(route as unknown as View)

            // nextTick 后触发滚动到当前标签（调用 scrollRef 的 moveToTarget）
            nextTick(() => {
                const sc = scrollRef.value
                const inst = sc?.value ?? sc
                if (inst && typeof inst.moveToTarget === 'function') {
                    try {
                        inst.moveToTarget({ path: route.fullPath })
                    } catch {
                        // ignore any runtime error from moveToTarget
                    }
                }
            })
        },
        { immediate: true },
    )

    // 对外暴露 API（组件中引用 useTags() 后使用这些）
    return {
        // data
        tags, // computed Ref<View[]>
        isActive, // (tag: View) => boolean

        // actions
        onClose, // (tag: View | null) => Promise<void>
        onMiddleClick, // (tag: View) => void
        onRefresh, // (tag: View | null) => Promise<void>

        // context（右键菜单状态）
        context: {
            visible: context.visible,
            left: context.left,
            top: context.top,
            selectedTag: context.selectedTag,
            open: (t: View, e: MouseEvent) => openContextMenu(t, e),
            close: () => context.close(),
        },

        // 右键菜单辅助方法（供模板直接绑定）
        openContextMenu: openContextMenuHandler,
        onCloseSelected,
        closeOthers,
        closeLeft,
        closeRight,
        closeAll,

        // 注册 scroll ref（父组件在 mounted 时调用 registerScrollRef(scrollPaneRef)）
        registerScrollRef,
    }
}
