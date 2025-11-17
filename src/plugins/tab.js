import { useTagsViewStore } from '@/store/modules/tagsView';
import router from '@/router';
export default {
    // 刷新当前tab页签
    async refreshPage(obj) {
        const { path, query, matched } = router.currentRoute.value;
        let refreshObj = obj;
        if (!refreshObj) {
            const matchedRoute = matched.find((m) => {
                if (m.components?.default && 'name' in m.components.default) {
                    return !['Layout', 'ParentView'].includes(m.components.default.name || '');
                }
                return false;
            });
            if (matchedRoute?.components?.default && 'name' in matchedRoute.components.default) {
                refreshObj = {
                    name: matchedRoute.components.default.name,
                    path,
                    query
                };
            }
        }
        if (refreshObj) {
            const view = {
                ...router.currentRoute.value,
                name: refreshObj.name,
                path: refreshObj.path,
                query: refreshObj.query,
                meta: { ...router.currentRoute.value.meta }
            };
            await useTagsViewStore().delCachedView(view);
            await router.replace({
                path: '/redirect' + refreshObj.path,
                query: refreshObj.query
            });
        }
    },
    // 关闭当前tab页签，打开新页签
    async closeOpenPage(path) {
        await useTagsViewStore().deleteView(router.currentRoute.value);
        if (path) {
            await router.push(path);
        }
    },
    // 关闭指定tab页签
    async closePage(obj) {
        if (!obj) {
            const { visitedViews } = await useTagsViewStore().deleteView(router.currentRoute.value);
            const latestView = visitedViews[visitedViews.length - 1];
            if (latestView) {
                await router.push(latestView.fullPath);
            }
            else {
                await router.push('/user/index');
            }
        }
        else {
            const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj;
            await useTagsViewStore().deleteView(view);
        }
    },
    // 关闭所有tab页签
    async closeAllPage() {
        return useTagsViewStore().closeAll(); // 改为 closeAll
    },
    // 关闭左侧tab页签
    async closeLeftPage(obj) {
        const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj;
        return await useTagsViewStore().closeLeft(view); // 改为 closeLeft
    },
    // 关闭右侧tab页签
    async closeRightPage(obj) {
        const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj;
        return await useTagsViewStore().closeRight(view); // 改为 closeRight
    },
    // 关闭其他tab页签
    async closeOtherPage(obj) {
        const view = typeof obj === 'string' ? { ...router.currentRoute.value, path: obj } : obj;
        return await useTagsViewStore().delOthersViews(view);
    },
    // 打开tab页签
    async openPage(url) {
        await router.push(url);
    },
    // 修改tab页签
    async updatePage(view) {
        await useTagsViewStore().delVisitedView(view);
    }
};
