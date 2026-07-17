export const apiLogininfor = ref([
    {
        key: 'logininfor-list',
        method: 'GET',
        url: '/dev-api/monitor/logininfor/list',
        description: '查询登录日志列表',
        requiresAuth: true,
        request: {
            query: {
                ipaddr: 'string?',
                userName: 'string?',
                status: 'string?',
                loginTime: 'string[]?'
            }
        },
        response: {
            total: 10,
            rows: [
                {
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    infoId: 121,
                    userName: "admin",
                    status: "0",
                    ipaddr: "127.0.0.1",
                    loginLocation: "内网IP",
                    browser: "Chrome 13",
                    os: "Windows 11",
                    msg: "登录成功",
                    loginTime: "2025-05-26 18:36:09"
                },
                {
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    infoId: 120,
                    userName: "admin",
                    status: "0",
                    ipaddr: "127.0.0.1",
                    loginLocation: "内网IP",
                    browser: "Chrome 13",
                    os: "Mac OS X",
                    msg: "登录成功",
                    loginTime: "2025-05-26 17:54:34"
                },
                {
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    infoId: 119,
                    userName: "admin",
                    status: "1",
                    ipaddr: "127.0.0.1",
                    loginLocation: "内网IP",
                    browser: "Chrome 13",
                    os: "Windows 10",
                    msg: "验证码错误",
                    loginTime: "2025-05-26 17:54:31"
                },
                {
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    infoId: 118,
                    userName: "admin",
                    status: "0",
                    ipaddr: "127.0.0.1",
                    loginLocation: "内网IP",
                    browser: "Chrome 13",
                    os: "Android 1.x",
                    msg: "登录成功",
                    loginTime: "2025-05-26 17:50:49"
                },
                {
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    infoId: 117,
                    userName: "admin",
                    status: "0",
                    ipaddr: "127.0.0.1",
                    loginLocation: "内网IP",
                    browser: "Chrome 13",
                    os: "Windows 10",
                    msg: "退出成功",
                    loginTime: "2025-05-26 17:50:46"
                }
            ],
            code: 200,
            msg: "查询成功"
        },
        codeExample: `// 查询登录日志列表
export function list(query: any) {
    return request({
        url: '/monitor/logininfor/list',
        method: 'get',
        params: query
    })
}`
    },
    {
        key: 'delete-logininfor',
        method: 'DELETE',
        url: '/dev-api/monitor/logininfor/:infoId',
        description: '删除登录日志',
        requiresAuth: true,
        request: {
            params: {
                infoId: 'number'
            }
        },
        response: {
            code: 200,
            message: '删除成功',
            data: null
        },
        errorResponse: {
            code: 404,
            message: '登录日志不存在',
            data: null
        },
        codeExample: `// 删除登录日志
export function delLogininfor(logininforId: any) {
    return request({
        url: '/monitor/logininfor/' + logininforId,
        method: 'delete'
    })
}`
    },
    {
        key: 'batch-delete-logininfor',
        method: 'DELETE',
        url: '/dev-api/monitor/logininfor',
        description: '批量删除登录日志',
        requiresAuth: true,
        request: {
            body: {
                infoIds: 'number[]'
            }
        },
        response: {
            code: 200,
            message: '删除成功，共删除 {count} 条记录',
            data: null
        },
        errorResponse: {
            code: 400,
            message: '参数错误：请提供要删除的日志ID数组',
            data: null
        },
        codeExample: `// 批量删除登录日志（需要自行实现）
export function batchDelLogininfor(infoIds: number[]) {
    return request({
        url: '/monitor/logininfor',
        method: 'delete',
        data: { infoIds }
    })
}`
    },
    {
        key: 'clean-logininfor',
        method: 'DELETE',
        url: '/dev-api/monitor/logininfor/clean',
        description: '清空登录日志',
        requiresAuth: true,
        response: {
            code: 200,
            message: '清空成功，共清除 {count} 条记录',
            data: null
        },
        codeExample: `// 清空登录日志
export function cleanLogininfor() {
    return request({
        url: '/monitor/logininfor/clean',
        method: 'delete'
    })
}`
    },
    {
        key: 'unlock-logininfor',
        method: 'GET',
        url: '/dev-api/monitor/logininfor/unlock/:userName',
        description: '解锁用户登录状态',
        requiresAuth: true,
        request: {
            params: {
                userName: 'string'
            }
        },
        response: {
            code: 200,
            message: '用户 {userName} 解锁成功',
            data: null
        },
        errorResponse: {
            code: 400,
            message: '参数错误：请提供用户名',
            data: null
        },
        codeExample: `// 解锁用户登录状态
export function unlockLogininfor(userName: string) {
    return request({
        url: '/monitor/logininfor/unlock/' + userName,
        method: 'get'
    })
}`
    }
]);
