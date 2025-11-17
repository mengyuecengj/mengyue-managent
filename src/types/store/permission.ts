import { RouteRecordRaw } from 'vue-router'
// 定义路由的类型
export interface RouteMeta {
  title?: string
  icon?: string
  noCache?: boolean
  link?: string
  permissions?: string[]
  roles?: string[]
}

export interface RouteConfig extends Omit<RouteRecordRaw, 'component' | 'children' | 'meta'> {
  component?: string | Component
  children?: RouteConfig[]
  meta?: RouteMeta
}

// 定义状态的类型
export interface PermissionState {
  routes: RouteConfig[]
  addRoutes: RouteConfig[]
  defaultRoutes: RouteConfig[]
  topbarRouters: RouteConfig[]
  sidebarRouters: RouteConfig[]
}

// 定义 API 响应数据的类型
export interface MenuResponse {
  code: number
  data: RouteConfig[]
}

export interface CustomRouteConfig {
  path: string;
  component: Component;
  hidden?: boolean;
  children?: CustomRouteConfig[];
  redirect?: string;
  name?: string
  meta?: {
    title?: string;
    icon?: string;
    activeMenu?: string;
    affix?: boolean;
  }
}