import request from '@/utils/request'

// 查询生成表数据
export function listTable(query: any) {
    return request({
        url: '/tool/gen/list',
        method: 'get',
        params: query
    })
}

// 查询db数据库列表
export function listDbTable(query: any) {
    return request({
        url: '/tool/gen/db/list',
        method: 'get',
        params: query
    })
}

// 查询表详细信息
export function getGenTable(tableId: any) {
    return request({
        url: '/tool/gen/' + tableId,
        method: 'get'
    })
}

// 修改代码生成信息
export function updateGenTable(data: any) {
    return request({
        url: '/tool/gen',
        method: 'put',
        data: data
    })

}

// 导入表
export function importTable(data: any) {
    return request({
        url: '/tool/gen/importTable',
        method: 'post',
        data: data
    })
}

// 创建表
export function createTable(data: any) {
    return request({
        url: '/tool/gen/createTable',
        method: 'post',
        data: data
    })
}

// 预览生成代码
export function previewTable(tableId: any) {
    return request({
        url: '/tool/gen/preview' + tableId,
        method: 'post',
    })
}

// 删除表数据
export function delTable(tableName: any) {
    return request({
        url: '/tool/gen/' + tableName,
        method: 'delete'
    })
}

// 生成代码(自定义路径)
export function genCode(tableName: any) {
    return request({
        url: '/tool/gen/genCode/' + tableName,
        method: 'get',
        responseType: 'blob'
    })
}

// 同步数据库
export function synchDb(tableName: any) {
    return request({
        url: '/tool/gen/synchDb/' + tableName,
        method: 'get'
    })
}