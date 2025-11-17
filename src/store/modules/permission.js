import auth from '@/plugins/auth';
import router, { constantRoutes, dynamicRoutes } from '@/router';
import { getRouters } from '@/api/menu';
import Layout from '@/layout/index.vue';
import ParentView from '@/components/ParentView/index.vue';
import InnerLink from '@/layout/components/InnerLink/index.vue';
import { defineStore } from 'pinia';
// 匹配 views 目录下的所有 .vue 文件
const modules = import.meta.glob('@/views/**/*.vue', { eager: false });
export const usePermissionStore = defineStore('permission', {
    state: () => ({
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRouters: [],
        sidebarRouters: []
    }),
    actions: {
        setRoutes(routes) {
            this.addRoutes = routes;
            this.routes = constantRoutes.concat(routes);
        },
        setDefaultRoutes(routes) {
            this.defaultRoutes = constantRoutes.concat(routes);
        },
        setTopbarRoutes(routes) {
            this.topbarRouters = routes;
        },
        setSidebarRouters(routes) {
            // 合并 constantRoutes 和动态路由
            const allRoutes = constantRoutes.concat(routes);
            // 去重：根据 path 和 meta.title
            const uniqueRoutes = [];
            const routeSet = new Set();
            for (const route of allRoutes) {
                const key = route.path + (route.meta?.title || '');
                if (!routeSet.has(key)) {
                    routeSet.add(key);
                    uniqueRoutes.push(route);
                }
            }
            this.sidebarRouters = uniqueRoutes;
        },
        generateRoutes() {
            return new Promise((resolve, reject) => {
                getRouters()
                    .then((res) => {
                    const sdata = JSON.parse(JSON.stringify(res.data));
                    const rdata = JSON.parse(JSON.stringify(res.data));
                    const defaultData = JSON.parse(JSON.stringify(res.data));
                    const sidebarRoutes = filterAsyncRouter(sdata);
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true);
                    const defaultRoutes = filterAsyncRouter(defaultData);
                    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
                    asyncRoutes.forEach((route) => {
                        router.addRoute(route);
                    });
                    this.setRoutes(rewriteRoutes);
                    this.setSidebarRouters(constantRoutes.concat(sidebarRoutes));
                    this.setDefaultRoutes(sidebarRoutes);
                    this.setTopbarRoutes(defaultRoutes);
                    resolve(rewriteRoutes);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        }
    }
});
/**
 * 遍历并转换后端路由配置，将 component 字符串替换为组件对象或异步加载函数
 */
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter((route) => {
        if (type && route.children) {
            route.children = filterChildren(route.children, route);
        }
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout;
            }
            else if (route.component === 'ParentView') {
                route.component = ParentView;
            }
            else if (route.component === 'InnerLink') {
                route.component = InnerLink;
            }
            else {
                route.component = loadView(route.component);
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type);
        }
        else {
            delete route.children;
            delete route.redirect;
        }
        return true;
    });
}
/** 将 ParentView 下的嵌套路由平铺处理 */
function filterChildren(childrenMap, lastRouter = false) {
    let children = [];
    childrenMap.forEach((el) => {
        el.path = lastRouter ? `${lastRouter.path}/${el.path}` : el.path;
        if (el.children && el.children.length && el.component === 'ParentView') {
            children = children.concat(filterChildren(el.children, el));
        }
        else {
            children.push(el);
        }
    });
    return children;
}
/** 动态路由权限过滤 */
export function filterDynamicRoutes(routes) {
    const res = [];
    routes.forEach((route) => {
        // 如果没有 meta 或 meta 中没有 permissions 和 roles，则无条件保留
        if (!route.meta || (!route.meta.permissions && !route.meta.roles)) {
            res.push(route);
        }
        // 如果定义了 permissions，检查权限
        else if (route.meta.permissions && auth.hasPermiOr(route.meta.permissions)) {
            res.push(route);
        }
        // 如果定义了 roles，检查角色
        else if (route.meta.roles && auth.hasRoleOr(route.meta.roles)) {
            res.push(route);
        }
    });
    return res;
}
/** 动态加载视图组件 */
export const loadView = (view) => {
    let res = () => Promise.reject(`组件 ${view} 未找到`);
    for (const path in modules) {
        const dir = path.split('views/')[1].split('.vue')[0];
        if (dir === view) {
            res = () => modules[path]();
            break;
        }
    }
    return res;
};
export default usePermissionStore;
