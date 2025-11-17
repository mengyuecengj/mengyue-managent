// @/types/store/tagsView.ts
import type { RouteRecordName, RouteLocationNormalized } from 'vue-router'

export interface View extends RouteLocationNormalized {
  meta: {
    title?: string
    affix?: boolean
    noCache?: boolean
    link?: string
    [key: string]: unknown
  }
  title?: string
  name: RouteRecordName
}

export interface RefreshPage {
  name: string
  path: string
  query: any
}

export interface tagsViewState {
  visitedViews: View[]
  cachedViews: string[]
  iframeViews: View[]
}

export interface tagsViewAction {
  addView: (view: View) => void
  delVisitedView: (view: View) => Promise<View[]>
  delCachedView: (view: View) => Promise<string[]>
  deleteView: (view: View) => Promise<tagsViewState>
  delOthersViews: (view: View) => Promise<void>
  deleteIframeView: (view: View) => Promise<void>
  refreshPage: (view: View) => Promise<void>
  closeLeft: (view: View) => Promise<void>        // 确保这里是 closeLeft
  closeRight: (view: View) => Promise<void>       // 确保这里是 closeRight
  closeAll: () => Promise<void>                   // 确保这里是 closeAll
}
