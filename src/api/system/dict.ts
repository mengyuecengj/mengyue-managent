import request from '@/utils/request'

// 查询字典列表
export function listDict(query: any) {
    return request({
        url: '/system/dict/list',
        method: 'get',
        params: query
    })
}

// 新增
export function addDict(data: any) {
    return request({
        url: '/system/dict',
        method: 'post',
        data: data
    })
}

// 修改
export function updateDict(data: any) {
    return request({
        url: '/system/dict',
        method: 'put',
        data: data
    })
}

// 详情
export function getDict(dictId: string) {
    return request({
        url: '/system/dict/' + dictId,
        method: 'get'
    })
}

// 删除
export function deleteDict(dictId: string) {
    return request({
        url: '/system/dict/' + dictId,
        method: 'delete'
    })
}

// 刷新缓存
export function refreshCache() {
    return request({
        url: '/system/dict/refreshCache',
        method: 'delete'
    })
}