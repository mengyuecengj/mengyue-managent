import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import { RouteMeta, RouteConfig, CustomRouteConfig, MenuResponse, PermissionState } from '@/types/store/permission'
// 匹配 views 目录下的所有 .vue 文件
const modules: Record<string, () => Promise<{ default: Component }>> = import.meta.glob(
  '@/views/**/*.vue',
  { eager: false }
) as Record<string, () => Promise<{ default: Component }>>;
export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routes: [] as CustomRouteConfig[],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  }),
  actions: {
    setRoutes(routes: RouteConfig[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes as CustomRouteConfig[])
    },
    setDefaultRoutes(routes: RouteConfig[]) {
      this.defaultRoutes = constantRoutes.concat(routes as CustomRouteConfig[])
    },
    setTopbarRoutes(routes: RouteConfig[]) {
      this.topbarRouters = routes
    },
    setSidebarRouters(routes: RouteConfig[]) {
      // 合并 constantRoutes 和动态路由
      const allRoutes = constantRoutes.concat(routes as CustomRouteConfig[]);
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
    generateRoutes(): Promise<RouteConfig[]> {
      return new Promise((resolve, reject) => {
        getRouters()
          .then((res: MenuResponse) => {
            const sdata: RouteConfig[] = JSON.parse(JSON.stringify(res.data))
            const rdata: RouteConfig[] = JSON.parse(JSON.stringify(res.data))
            const defaultData: RouteConfig[] = JSON.parse(JSON.stringify(res.data))

            const sidebarRoutes: RouteConfig[] = filterAsyncRouter(sdata)
            const rewriteRoutes: RouteConfig[] = filterAsyncRouter(rdata, false, true)
            const defaultRoutes: RouteConfig[] = filterAsyncRouter(defaultData)
            const asyncRoutes: RouteConfig[] = filterDynamicRoutes(dynamicRoutes)

            rewriteRoutes.forEach((route: any) => {
              router.addRoute(route)
            })

            asyncRoutes.forEach((route: RouteConfig) => {
              router.addRoute(route as RouteRecordRaw)
            })

            this.setRoutes(rewriteRoutes)
            this.setSidebarRouters(constantRoutes.concat(sidebarRoutes as CustomRouteConfig[]))
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)

            resolve(rewriteRoutes)
          })
          .catch((error: Error) => {
            reject(error)
          })
      })
    }
  }
})

/**
 * 遍历并转换后端路由配置，将 component 字符串替换为组件对象或异步加载函数
 */
function filterAsyncRouter(
  asyncRouterMap: RouteConfig[],
  lastRouter: RouteConfig | false = false,
  type: boolean = false
): RouteConfig[] {
  return asyncRouterMap.filter((route: RouteConfig) => {
    if (type && route.children) {
      route.children = filterChildren(route.children, route)
    }

    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component as string)
      }
    }
    if (route.children != null && route.children.length > 0) {
      if (type && route.component === ParentView) {
        route.children = filterChildren(route.children, route)
      } else {
        route.children = filterAsyncRouter(route.children, route, type)
      }
    }
    return true
  })
}

/** 将 ParentView 下的嵌套路由平铺处理 */
function filterChildren(childrenMap: RouteConfig[], lastRouter: RouteConfig | false = false): RouteConfig[] {
  let children: RouteConfig[] = []
  childrenMap.forEach((el: RouteConfig) => {
    el.path = lastRouter ? `${lastRouter.path}/${el.path}` : el.path
    if (el.children && el.children.length && el.component === 'ParentView') {
      children = children.concat(filterChildren(el.children, el))
    } else {
      children.push(el)
    }
  })
  return children
}

/** 动态路由权限过滤 */
export function filterDynamicRoutes(routes: RouteConfig[]): RouteConfig[] {
  const res: RouteConfig[] = []
  routes.forEach((route: RouteConfig) => {
    // 如果没有 meta 或 meta 中没有 permissions 和 roles，则无条件保留
    if (!route.meta || (!route.meta.permissions && !route.meta.roles)) {
      res.push(route)
    }
    // 如果定义了 permissions，检查权限
    else if (route.meta.permissions && auth.hasPermiOr(route.meta.permissions)) {
      res.push(route)
    }
    // 如果定义了 roles，检查角色
    else if (route.meta.roles && auth.hasRoleOr(route.meta.roles)) {
      res.push(route)
    }
  })
  return res
}

/** 动态加载视图组件 */
export const loadView = (view: string) => {
  // 情况1：直接写 dashboard/design/editor（对应 editor.vue）
  const directPath = `@/views/${view}.vue`
  if (modules[directPath]) {
    return modules[directPath]
  }

  // 情况2：写 dashboard/design/editor（对应 editor/index.vue）
  const indexPath = `@/views/${view}/index.vue`
  if (modules[indexPath]) {
    return modules[indexPath]
  }

  // 情况3：你原来那种 xxx/index 的写法（兼容旧代码）
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view || dir === view + '/index') {
      return modules[path]
    }
  }

  console.warn('[loadView] 未找到组件:', view)
  return () => import('@/views/error/404.vue')
}
export default usePermissionStore