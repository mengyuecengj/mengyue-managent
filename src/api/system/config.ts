import request from '@/utils/request'

// 查询参数列表
export function listConfig(query: any) {
    return request({
        url: '/system/config/list',
        method: 'get',
        params: query
    })
}

// 查询参数详细
export function getConfig(configId: any) {
    return request({
        url: '/system/config/' + configId,
        method: 'get'
    })
}

// 新增参数
export function addConfig(data: any) {
    return request({
        url: '/system/config',
        method: 'post',
        data: data
    })
}

// 修改参数
export function updateConfig(data: any) {
    return request({
        url: '/system/config',
        method: 'put',
        data: data
    })
}

// 删除参数
export function delConfig(configId: any) {
    return request({
        url: '/dev-api/system/config/' + configId,
        method: 'delete'
    })
}

// 清除缓存
export function clearCache() {
    return request({
        url: '/system/config/clearCache',
        method: 'delete'
    })
}
