import { ApiDefinition } from "@/types/views/api";

export const apiServer = ref<ApiDefinition[]>([
  {
    key: 'online-list',
    method: 'GET',
    url: '/dev-api/monitor/online/list',
    description: '查询在线用户列表',
    requiresAuth: true,
    request: {
      query: {
        ipaddr: 'string?',
        userName: 'string?',
        loginLocation: 'string?',
        os: 'string?',
        pageNum: 'number?',
        pageSize: 'number?'
      }
    },
    response: {
      total: 1,
      rows: [
        {
          tokenId: "211161b2-54be-4a80-8285-69d9dc3e0e35",
          deptName: "研发部门",
          userName: "admin",
          ipaddr: "127.0.0.1",
          loginLocation: "内网IP",
          browser: "Chrome 13",
          os: "Windows 10",
          loginTime: 1748262383784,
          index: 1
        }
      ],
      code: 200,
      msg: "查询成功"
    },
    codeExample: `// 查询在线用户列表
export function list(query: any) {
    return request({
        url: '/monitor/online/list',
        method: 'get',
        params: query
    })
}`
  },
  {
    key: 'force-logout',
    method: 'DELETE',
    url: '/dev-api/monitor/online/:tokenId',
    description: '强退用户',
    requiresAuth: true,
    request: {
      params: {
        tokenId: 'string'
      }
    },
    response: {
      code: 200,
      message: '强退成功',
      data: null
    },
    errorResponse: {
      code: 404,
      message: '用户不存在或已被强退',
      data: null
    },
    codeExample: `// 强退用户
export function forceLogout(tokenId: string) {
    return request({
        url: '/monitor/online/' + tokenId,
        method: 'delete',
        params: {
            tokenId: tokenId
        }
    })
}`
  }
])