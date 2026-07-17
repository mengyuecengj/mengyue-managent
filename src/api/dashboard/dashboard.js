import request from '@/utils/request';
export function getDashboardList(params) {
    return request({
        url: '/dashboard/design/list',
        method: 'get',
        params: params
    });
}
export function addDashboard(data) {
    return request({
        url: '/dashboard/design',
        method: 'post',
        data
    });
}
export function deleteDashboard(dashboardId) {
    return request({
        url: '/dashboard/design/' + dashboardId,
        method: 'delete'
    });
}
