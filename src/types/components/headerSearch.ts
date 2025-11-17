export interface Route {
  path: string
  meta?: { title?: string; icon?: string }
  children?: Route[]
  hidden?: boolean
  redirect?: string
  query?: string
}

export interface RouteItem {
  pinyinTitle: string;
  path: string
  title: string[]
  icon: string
  query?: string
}
