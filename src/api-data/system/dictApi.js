export const apiDict = ref([
    {
        key: 'dict-list',
        method: 'GET',
        url: '/dev-api/system/dict/list',
        description: '查询字典列表',
        requiresAuth: true,
        request: {
            query: {
                dictName: 'string?',
                dictCode: 'string?',
                status: 'string?'
            }
        },
        response: {
            code: 200,
            msg: '操作成功',
            data: [
                {
                    dictId: 1,
                    dictName: '用户性别',
                    dictCode: 'sys_user_sex',
                    status: '0',
                    remark: '用户性别列表',
                    createTime: '2021-09-01 00:00:00'
                },
                {
                    dictId: 2,
                    dictName: '菜单状态',
                    dictCode: 'sys_show_hide',
                    status: '0',
                    remark: '菜单状态列表',
                    createTime: '2021-09-01 00:00:00'
                },
                {
                    dictId: 3,
                    dictName: '系统开关',
                    dictCode: 'sys_normal_disable',
                    status: '0',
                    remark: '系统开关列表',
                    createTime: '2021-09-01 00:00:00'
                },
                {
                    dictId: 4,
                    dictName: '任务状态',
                    dictCode: 'sys_job_status',
                    status: '0',
                    remark: '任务状态列表',
                    createTime: '2021-09-01 00:00:00'
                },
                {
                    dictId: 5,
                    dictName: '任务分组',
                    dictCode: 'sys_job_group',
                    status: '0',
                    remark: '任务分组列表',
                    createTime: '2021-09-01 00:00:00'
                }
            ]
        },
        codeExample: `// 查询字典列表
export function listDict(query: any) {
    return request({
        url: '/system/dict/list',
        method: 'get',
        params: query
    })
}`
    },
    {
        key: 'dict-detail',
        method: 'GET',
        url: '/dev-api/system/dict/:dictId',
        description: '查询字典详情',
        requiresAuth: true,
        request: {
            params: {
                dictId: 'number'
            }
        },
        response: {
            msg: '操作成功',
            code: 200,
            data: {
                dictId: 1,
                dictName: '用户性别',
                dictCode: 'sys_user_sex',
                status: '0',
                remark: '用户性别列表',
                createTime: '2021-09-01 00:00:00'
            }
        },
        codeExample: `// 查询字典详情
export function getDict(dictId: string) {
    return request({
        url: '/system/dict/' + dictId,
        method: 'get'
    })
}`
    },
    {
        key: 'create-dict',
        method: 'POST',
        url: '/dev-api/system/dict',
        description: '新增字典',
        requiresAuth: true,
        request: {
            body: {
                dictName: 'string',
                dictCode: 'string',
                status: 'string',
                remark: 'string?'
            }
        },
        response: {
            msg: '新增成功',
            code: 200,
            data: null
        },
        errorResponse: {
            msg: '字典名称已存在',
            code: 500,
            data: null
        },
        codeExample: `// 新增字典
export function addDict(data: any) {
    return request({
        url: '/system/dict',
        method: 'post',
        data: data
    })
}`
    },
    {
        key: 'update-dict',
        method: 'PUT',
        url: '/dev-api/system/dict',
        description: '修改字典',
        requiresAuth: true,
        request: {
            body: {
                dictId: 'number',
                dictName: 'string',
                dictCode: 'string',
                status: 'string',
                remark: 'string?'
            }
        },
        response: {
            msg: '修改成功',
            code: 200,
            data: null
        },
        errorResponse: {
            msg: '字典不存在',
            code: 500,
            data: null
        },
        codeExample: `// 修改字典
export function updateDict(data: any) {
    return request({
        url: '/system/dict',
        method: 'put',
        data: data
    })
}`
    },
    {
        key: 'delete-dict',
        method: 'DELETE',
        url: '/dev-api/system/dict/:dictId',
        description: '删除字典',
        requiresAuth: true,
        request: {
            params: {
                dictId: 'number'
            }
        },
        response: {
            msg: '删除成功',
            code: 200,
            data: null
        },
        errorResponse: {
            msg: '字典不存在',
            code: 500,
            data: null
        },
        codeExample: `// 删除字典
export function deleteDict(dictId: string) {
    return request({
        url: '/system/dict/' + dictId,
        method: 'delete'
    })
}`
    },
    {
        key: 'change-dict-status',
        method: 'PUT',
        url: '/dev-api/system/dict/changeStatus',
        description: '字典状态修改',
        requiresAuth: true,
        request: {
            body: {
                dictId: 'number',
                status: 'string'
            }
        },
        response: {
            msg: '状态修改成功',
            code: 200,
            data: null
        },
        errorResponse: {
            msg: '字典不存在',
            code: 500,
            data: null
        }
    },
    {
        key: 'refresh-dict-cache',
        method: 'DELETE',
        url: '/dev-api/system/dict/refreshCache',
        description: '刷新字典缓存',
        requiresAuth: true,
        response: {
            msg: '刷新缓存成功',
            code: 200,
            data: null
        },
        codeExample: `// 刷新字典缓存
export function refreshCache() {
    return request({
        url: '/system/dict/refreshCache',
        method: 'delete'
    })
}`
    }
]);
