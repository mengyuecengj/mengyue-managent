import request from '@/utils/request'

export interface DashboardItem {
  id: number
  name: string
  description: string
  status: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  thumbnail?: string
  config?: any
}

export interface DashboardListRes {
  code: number
  msg: string
  total: number
  rows: DashboardItem[]
}
export function getDashboardList(params: any): Promise<DashboardListRes> {
    return request({
        url: '/dashboard/design/list',
        method: 'get',
        params: params
    })
}

export function addDashboard(data: any): Promise<DashboardListRes> {
  return request({
    url: '/dashboard/design',
    method: 'post',
    data
  })
}

export function deleteDashboard(dashboardId: any): Promise<DashboardListRes> {
  return request({
    url: '/dashboard/design/' + dashboardId,
    method: 'delete'
  })
}
