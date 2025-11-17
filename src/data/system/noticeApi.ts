import { ApiDefinition } from "@/types/views/api";

export const apiNotice = ref<ApiDefinition[]>([
  {
    key: 'notice-list',
    method: 'GET',
    url: '/dev-api/system/notice/list',
    description: '查询公告列表',
    requiresAuth: true,
    request: {
      query: {
        noticeTitle: 'string?',
        createBy: 'string?',
        noticeType: 'string?',
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
            createBy: "admin",
            createTime: "2025-05-25 23:54:43",
            updateBy: "",
            updateTime: "",
            remark: "管理员",
            noticeId: 1,
            noticeTitle: "温馨提醒：2018-07-01 若依新版本发布啦",
            noticeType: "0",
            noticeContent: "新版本内容",
            status: "0"
          },
          {
            createBy: "admin",
            createTime: "2025-05-25 23:54:43",
            updateBy: "",
            updateTime: null,
            remark: "管理员",
            noticeId: 2,
            noticeTitle: "维护通知：2018-07-01 若依系统凌晨维护",
            noticeType: "1",
            noticeContent: "维护内容",
            status: "0"
          }
        ],
        total: 2
      }
    },
    codeExample: `// 查询公告列表
export function listNotice(query: any) {
    return request({
        url: '/system/notice/list',
        method: 'get',
        params: query
    })
}`
  },
  {
    key: 'notice-detail',
    method: 'GET',
    url: '/dev-api/system/notice/:noticeId',
    description: '查询公告详细',
    requiresAuth: true,
    request: {
      params: {
        noticeId: 'number'
      }
    },
    response: {
      code: 200,
      message: 'success',
      data: {
        createBy: "admin",
        createTime: "2025-05-25 23:54:43",
        updateBy: "",
        updateTime: "",
        remark: "管理员",
        noticeId: 1,
        noticeTitle: "温馨提醒：2018-07-01 若依新版本发布啦",
        noticeType: "0",
        noticeContent: "新版本内容",
        status: "0"
      }
    },
    errorResponse: {
      code: 404,
      message: '公告不存在',
      data: null
    },
    codeExample: `// 查询公告详细
export function getNotice(noticeId: any) {
    return request({
        url: '/system/notice/' + noticeId,
        method: 'get'
    })
}`
  },
  {
    key: 'create-notice',
    method: 'POST',
    url: '/dev-api/system/notice',
    description: '新增公告',
    requiresAuth: true,
    request: {
      body: {
        noticeTitle: 'string',
        noticeType: 'string',
        noticeContent: 'string',
        status: 'string?',
        remark: 'string?'
      }
    },
    response: {
      code: 200,
      message: '新增成功',
      data: null
    },
    codeExample: `// 新增公告
export function addNotice(data: any) {
    return request({
        url: '/system/notice',
        method: 'post',
        data: data
    })
}`
  },
  {
    key: 'update-notice',
    method: 'PUT',
    url: '/dev-api/system/notice',
    description: '修改公告',
    requiresAuth: true,
    request: {
      body: {
        noticeId: 'number',
        noticeTitle: 'string',
        noticeType: 'string',
        noticeContent: 'string',
        status: 'string',
        remark: 'string?'
      }
    },
    response: {
      code: 200,
      message: '修改成功',
      data: null
    },
    codeExample: `// 修改公告
export function updateNotice(data: any) {
    return request({
        url: '/system/notice',
        method: 'put',
        data: data
    })
}`
  },
  {
    key: 'delete-notice',
    method: 'DELETE',
    url: '/dev-api/system/notice/:noticeId',
    description: '删除公告',
    requiresAuth: true,
    request: {
      params: {
        noticeId: 'number'
      }
    },
    response: {
      code: 200,
      message: '删除成功',
      data: null
    },
    errorResponse: {
      code: 404,
      message: '公告不存在',
      data: null
    },
    codeExample: `// 删除公告
export function delNotice(noticeId: any) {
    return request({
        url: '/system/notice/' + noticeId,
        method: 'delete'
    })
}`
  },
  {
    key: 'clear-notice-cache',
    method: 'DELETE',
    url: '/dev-api/system/notice/clearCache',
    description: '清除公告缓存',
    requiresAuth: true,
    response: {
      code: 200,
      message: '清除缓存成功',
      data: null
    },
    codeExample: `// 清除缓存
export function clearCache() {
    return request({
        url: '/system/notice/clearCache',
        method: 'delete'
    })
}`
  }
])