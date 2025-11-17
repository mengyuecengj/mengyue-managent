// 定义路由项的类型
export interface RouteMeta {
  title?: string;
  icon?: string;
  fullscreen?: boolean;
  // 添加以下这一行
  disabled?: boolean;
}

export interface RouteItem {
  path: string;
  hidden?: boolean;
  children?: RouteItem[];
  meta?: {
    title?: string;
    icon?: string;
    fullscreen?: boolean;
  };
  query?: string;
  alwaysShow?: boolean;
  noShowingChildren?: boolean;
}
