export const apiConfig = ref([
    {
        key: 'config-list',
        method: 'GET',
        url: '/dev-api/system/config/list',
        description: '查询参数列表',
        requiresAuth: true,
        request: {
            query: {
                configName: 'string?',
                configCode: 'string?',
                status: 'string?',
                pageNum: 'number?',
                pageSize: 'number?'
            }
        },
        response: {
            code: 200,
            message: 'success',
            data: {
                rows: [
                    {
                        configId: 1,
                        configName: '主框架页-默认皮肤样式名称',
                        configCode: 'sys.index.skinName',
                        configValue: 'skin-blue',
                        status: '0',
                        createTime: '2021-09-01 00:00:00'
                    },
                    {
                        configId: 2,
                        configName: '主框架页-默认主题样式名称',
                        configCode: 'sys.index.theme',
                        configValue: 'theme-dark',
                        status: '0',
                        createTime: '2021-09-01 00:00:00'
                    },
                    {
                        configId: 3,
                        configName: '主框架页-自动刷新',
                        configCode: 'sys.index.autoRefresh',
                        configValue: 'true',
                        status: '0',
                        createTime: '2021-09-01 00:00:00'
                    },
                    {
                        configId: 4,
                        configName: '主框架页-侧边栏主题',
                        configCode: 'sys.index.sideTheme',
                        configValue: 'theme-dark',
                        status: '0',
                        createTime: '2021-09-01 00:00:00'
                    },
                    {
                        configId: 5,
                        configName: '主框架页-是否开启页脚',
                        configCode: 'sys.index.footer',
                        configValue: 'true',
                        status: '0',
                        createTime: '2021-09-01 00:00:00'
                    }
                ],
                total: 5
            }
        },
        codeExample: `// 查询参数列表
export function listConfig(query: any) {
    return request({
        url: '/system/config/list',
        method: 'get',
        params: query
    })
}`
    },
    {
        key: 'config-detail',
        method: 'GET',
        url: '/dev-api/system/config/:configId',
        description: '查询参数详细',
        requiresAuth: true,
        request: {
            params: {
                configId: 'number'
            }
        },
        response: {
            code: 200,
            message: 'success',
            data: {
                configId: 1,
                configName: '主框架页-默认皮肤样式名称',
                configCode: 'sys.index.skinName',
                configValue: 'skin-blue',
                status: '0',
                createTime: '2021-09-01 00:00:00'
            }
        },
        codeExample: `// 查询参数详细
export function getConfig(configId: any) {
    return request({
        url: '/system/config/' + configId,
        method: 'get'
    })
}`
    },
    {
        key: 'create-config',
        method: 'POST',
        url: '/dev-api/system/config',
        description: '新增参数',
        requiresAuth: true,
        request: {
            body: {
                configName: 'string',
                configCode: 'string',
                configValue: 'string',
                status: 'string',
                remark: 'string?'
            }
        },
        response: {
            code: 200,
            message: '新增成功',
            data: null
        },
        codeExample: `// 新增参数
export function addConfig(data: any) {
    return request({
        url: '/system/config',
        method: 'post',
        data: data
    })
}`
    },
    {
        key: 'update-config',
        method: 'PUT',
        url: '/dev-api/system/config',
        description: '修改参数',
        requiresAuth: true,
        request: {
            body: {
                configId: 'number',
                configName: 'string',
                configCode: 'string',
                configValue: 'string',
                status: 'string',
                remark: 'string?'
            }
        },
        response: {
            code: 200,
            message: '修改成功',
            data: null
        },
        codeExample: `// 修改参数
export function updateConfig(data: any) {
    return request({
        url: '/system/config',
        method: 'put',
        data: data
    })
}`
    },
    {
        key: 'delete-config',
        method: 'DELETE',
        url: '/dev-api/system/config/:configId',
        description: '删除参数',
        requiresAuth: true,
        request: {
            params: {
                configId: 'number'
            }
        },
        response: {
            code: 200,
            message: '删除成功',
            data: null
        },
        errorResponse: {
            code: 404,
            message: '参数不存在',
            data: null
        },
        codeExample: `// 删除参数
export function delConfig(configId: any) {
    return request({
        url: '/system/config/' + configId,
        method: 'delete'
    })
}`
    },
    {
        key: 'refresh-config-cache',
        method: 'DELETE',
        url: '/dev-api/system/config/refreshCache',
        description: '刷新参数缓存',
        requiresAuth: true,
        response: {
            code: 200,
            message: '刷新缓存成功',
            data: null
        },
        codeExample: `// 刷新参数缓存
export function refreshCache() {
    return request({
        url: '/system/config/refreshCache',
        method: 'delete'
    })
}`
    },
    {
        key: 'clear-config-cache',
        method: 'DELETE',
        url: '/dev-api/system/config/clearCache',
        description: '清除参数缓存',
        requiresAuth: true,
        response: {
            code: 200,
            message: '清除缓存成功',
            data: null
        },
        codeExample: `// 清除参数缓存
export function clearCache() {
    return request({
        url: '/system/config/clearCache',
        method: 'delete'
    })
}`
    }
]);
