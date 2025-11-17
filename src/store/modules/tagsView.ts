/**
 * tagsView store (Pinia)
 * - 保存已访问标签（visitedViews）、缓存视图名称（cachedViews）、iframeViews（如使用）
 * - 本地持久化到 localStorage（KEY: 'tags-view-state'）
 */

import { defineStore } from 'pinia'
import type { View, tagsViewState, tagsViewAction } from '@/types/store/tagsView'

const STORAGE_KEY = 'tags-view-state'

// 从 localStorage 恢复状态（容错）
const loadState = (): tagsViewState => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { visitedViews: [], cachedViews: [], iframeViews: [] }
  }
  try {
    const parsed = JSON.parse(raw) as Partial<tagsViewState>
    return {
      visitedViews: parsed.visitedViews || [],
      cachedViews: parsed.cachedViews || [],
      iframeViews: parsed.iframeViews || [],
    }
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY)
    return { visitedViews: [], cachedViews: [], iframeViews: [] }
  }
}

const saveState = (state: tagsViewState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors
  }
}

export const useTagsViewStore = defineStore<'tags-view', tagsViewState, {}, tagsViewAction>('tags-view', {
  state: () => loadState(),
  actions: {
    /**
     * 添加视图（去重）
     * - 若 meta.affix 则放到前面（固定标签）
     */
    addView(view: View) {
      if (this.visitedViews.some(v => v.path === view.path && v.fullPath === view.fullPath)) return

      const newView: View = {
        ...view,
        title: (view.meta && view.meta.title) ? view.meta.title : (view.name as string) || 'no-name',
        meta: { ...(view.meta || {}) },
      }

      if (view.meta?.affix) {
        // 把 affix 标签放在最前面
        this.visitedViews.unshift(newView)
      } else {
        this.visitedViews.push(newView)
      }

      if (!view.meta?.noCache && typeof view.name === 'string') {
        if (!this.cachedViews.includes(view.name)) {
          this.cachedViews.push(view.name)
        }
      }

      saveState(this.$state)
    },

    /**
     * 删除视图（对外方法，返回更新后的状态）
     */
    async deleteView(view: View) {
      await this.delVisitedView(view)
      await this.delCachedView(view)
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
        iframeViews: [...this.iframeViews],
      }
    },

    // 删除已访问视图
    delVisitedView(view: View) {
      return new Promise<View[]>(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.fullPath === view.fullPath) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        // 同步移除 iframeViews 中对应项
        this.iframeViews = this.iframeViews.filter(item => item.fullPath !== view.fullPath)
        saveState(this.$state)
        resolve([...this.visitedViews])
      })
    },

    // 删除缓存视图（按 name）
    delCachedView(view: View) {
      return new Promise<string[]>(resolve => {
        if (typeof view.name === 'string') {
          const index = this.cachedViews.indexOf(view.name)
          if (index > -1) {
            this.cachedViews.splice(index, 1)
          }
        }
        saveState(this.$state)
        resolve([...this.cachedViews])
      })
    },

    // 删除 iframe 视图（如果存在）
    async deleteIframeView(view: View) {
      this.iframeViews = this.iframeViews.filter(v => v.fullPath !== view.fullPath)
      saveState(this.$state)
    },

    // 刷新页面：将视图标记为 noCache 并从 cachedViews 中移除
    async refreshPage(view: View) {
      const idx = this.visitedViews.findIndex(v => v.fullPath === view.fullPath)
      if (idx !== -1) {
        const updated = { ...this.visitedViews[idx], meta: { ...(this.visitedViews[idx].meta || {}), noCache: true } }
        this.visitedViews[idx] = updated as View
        if (typeof view.name === 'string') {
          const cidx = this.cachedViews.indexOf(view.name)
          if (cidx !== -1) this.cachedViews.splice(cidx, 1)
        }
      }
      saveState(this.$state)
    },

    // 关闭其他：保留 affix + 当前
    async delOthersViews(view: View) {
      this.visitedViews = this.visitedViews.filter(v => v.meta?.affix || v.fullPath === view.fullPath)
      // cachedViews 重新计算：保留所有仍在 visitedViews 中的 name
      this.cachedViews = this.cachedViews.filter(name =>
        this.visitedViews.some(v => typeof v.name === 'string' && v.name === name)
      )
      // iframeViews 重算
      this.iframeViews = this.iframeViews.filter(iv =>
        this.visitedViews.some(v => v.fullPath === iv.fullPath)
      )
      saveState(this.$state)
    },

    // 关闭左侧：保留当前及其右侧（及 affix）
    async closeLeft(view: View) {
      const idx = this.visitedViews.findIndex(v => v.fullPath === view.fullPath)
      if (idx === -1) return saveState(this.$state)
      this.visitedViews = this.visitedViews.filter((v, i) => v.meta?.affix || i >= idx)
      this.cachedViews = this.cachedViews.filter(name =>
        this.visitedViews.some(v => typeof v.name === 'string' && v.name === name)
      )
      this.iframeViews = this.iframeViews.filter(iv =>
        this.visitedViews.some(v => v.fullPath === iv.fullPath)
      )
      saveState(this.$state)
    },

    // 关闭右侧：保留当前及其左侧（及 affix）
    async closeRight(view: View) {
      const idx = this.visitedViews.findIndex(v => v.fullPath === view.fullPath)
      if (idx === -1) return saveState(this.$state)
      this.visitedViews = this.visitedViews.filter((v, i) => v.meta?.affix || i <= idx)
      this.cachedViews = this.cachedViews.filter(name =>
        this.visitedViews.some(v => typeof v.name === 'string' && v.name === name)
      )
      this.iframeViews = this.iframeViews.filter(iv =>
        this.visitedViews.some(v => v.fullPath === iv.fullPath)
      )
      saveState(this.$state)
    },

    // 关闭全部（保留 affix）
    async closeAll() {
      this.visitedViews = this.visitedViews.filter(v => v.meta?.affix)
      this.cachedViews = this.cachedViews.filter(name =>
        this.visitedViews.some(v => typeof v.name === 'string' && v.name === name)
      )
      this.iframeViews = []
      saveState(this.$state)
    },
  },
})

export default useTagsViewStore
