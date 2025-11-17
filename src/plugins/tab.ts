import { useTagsViewStore } from '@/store/modules/tagsView'
import router from '@/router'
import { TagsViewState, View, RefreshPage } from '@/types/store/tagsView'

export default {
  // 刷新当前tab页签
  async refreshPage(obj?: RefreshPage): Promise<void> {
    const { path, query, matched } = router.currentRoute.value
    let refreshObj: RefreshPage | undefined = obj

    if (!refreshObj) {
      const matchedRoute = matched.find((m) => {
        if (m.components?.default && 'name' in m.components.default) {
          return !['Layout', 'ParentView'].includes(m.components.default.name || '')
        }
        return false
      })

      if (matchedRoute?.components?.default && 'name' in matchedRoute.components.default) {
        refreshObj = {
          name: matchedRoute.components.default.name as string,
          path,
          query
        }
      }
    }

    if (refreshObj) {
      const view: View = {
        ...router.currentRoute.value,
        name: refreshObj.name,
        path: refreshObj.path,
        query: refreshObj.query,
        meta: { ...router.currentRoute.value.meta }
      }
      await useTagsViewStore().deleteCachedView(view)
      await router.replace({
        path: '/redirect' + refreshObj.path,
        query: refreshObj.query
      })
    }
  },

  // 关闭当前tab页签，打开新页签
  async closeOpenPage(path?: string): Promise<void> {
    await useTagsViewStore().deleteView(router.currentRoute.value)
    if (path) {
      await router.push(path)
    }
  },

  // 关闭指定tab页签
  /**
   * Closes a page/tab in the tags view.
   * If no parameter is provided, closes the current route and navigates to the last visited view or index.
   * @param obj - Optional route object to close. If undefined, closes current route.
   * @returns Promise that resolves after closing and navigation completes.
   */
  async closePage(obj?: View | string): Promise<void> {
    if (!obj) {
      const { visitedViews } = await useTagsViewStore().deleteView(router.currentRoute.value)
      const latestView = visitedViews[visitedViews.length - 1]
      if (latestView) {
        await router.push(latestView.fullPath)
      } else {
        await router.push('/user/index')
      }
    } else {
      const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj
      await useTagsViewStore().deleteView(view)
    }
  },

  // 关闭所有tab页签
  async closeAllPage(): Promise<TagsViewState> {
    return useTagsViewStore().deleteAllViews();
  },
  // 关闭左侧tab页签
  async closeLeftPage(obj: View | string): Promise<TagsViewState> {
    const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj
    return await useTagsViewStore().deleteLeftTags(view)
  },

  // 关闭右侧tab页签
  async closeRightPage(obj: View | string): Promise<TagsViewState> {
    const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj
    return await useTagsViewStore().deleteRightTags(view)
  },

  // 关闭其他tab页签
  async closeOtherPage(obj: View | string): Promise<TagsViewState> {
    const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj
    return await useTagsViewStore().deleteOthersViews(view)
  },

  // 打开tab页签
  async openPage(url: string): Promise<void> {
    await router.push(url)
  },

  // 修改tab页签
  async updatePage(view: View): Promise<void> {
    await useTagsViewStore().updateVisitedView(view)
  }
}