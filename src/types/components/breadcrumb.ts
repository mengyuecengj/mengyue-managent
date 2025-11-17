export interface RouteMeta {
  title: string
  breadcrumb?: boolean
}

export interface BreadcrumbRoute {
  path: string
  meta: RouteMeta
  redirect?: string
  name?: string
  children?: BreadcrumbRoute[]
}