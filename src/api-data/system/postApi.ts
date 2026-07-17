import { ApiDefinition } from "@/types/views/api";

export const apiPost = ref<ApiDefinition[]>([
  {
    key: 'post-list',
    method: 'GET',
    url: '/dev-api/system/post/list',
    description: '查询岗位列表',
    requiresAuth: true,
    request: {
      query: {
        postCode: 'string?',
        postName: 'string?',
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
            postId: 1,
            postCode: 'ceo',
            postName: '董事长',
            postSort: 1,
            status: '0',
            createTime: '2025-05-25 23:54:42'
          },
          {
            postId: 2,
            postCode: 'se',
            postName: '项目经理',
            postSort: 2,
            status: '0',
            createTime: '2025-05-25 23:54:42'
          }
        ],
        total: 2
      }
    },
    codeExample: `// 查询岗位列表
export function listPost(query: any) {
    return request({
        url: '/system/post/list',
        method: 'get',
        params: query
    })
}`
  },
  {
    key: 'post-detail',
    method: 'GET',
    url: '/dev-api/system/post/:postId',
    description: '查询岗位详细',
    requiresAuth: true,
    request: {
      params: {
        postId: 'number'
      }
    },
    response: {
      code: 200,
      message: 'success',
      data: {
        postId: 1,
        postCode: 'ceo',
        postName: '董事长',
        postSort: 1,
        status: '0',
        remark: '',
        createTime: '2025-05-25 23:54:42'
      }
    },
    codeExample: `// 查询岗位详细
export function getPost(postId: any) {
    return request({
        url: '/system/post/' + postId,
        method: 'get'
    })
}`
  },
  {
    key: 'create-post',
    method: 'POST',
    url: '/dev-api/system/post',
    description: '新增岗位',
    requiresAuth: true,
    request: {
      body: {
        postCode: 'string',
        postName: 'string',
        postSort: 'number',
        status: 'string',
        remark: 'string?'
      }
    },
    response: {
      code: 200,
      message: '新增成功',
      data: null
    },
    codeExample: `// 新增岗位
export function addPost(data: any) {
    return request({
        url: '/system/post',
        method: 'post',
        data: data
    })
}`
  },
  {
    key: 'update-post',
    method: 'PUT',
    url: '/dev-api/system/post',
    description: '修改岗位',
    requiresAuth: true,
    request: {
      body: {
        postId: 'number',
        postCode: 'string',
        postName: 'string',
        postSort: 'number',
        status: 'string',
        remark: 'string?'
      }
    },
    response: {
      code: 200,
      message: '修改成功',
      data: null
    },
    codeExample: `// 修改岗位
export function updatePost(data: any) {
    return request({
        url: '/system/post',
        method: 'put',
        data: data
    })
}`
  },
  {
    key: 'delete-post',
    method: 'DELETE',
    url: '/dev-api/system/post/:postId',
    description: '删除岗位',
    requiresAuth: true,
    request: {
      params: {
        postId: 'number'
      }
    },
    response: {
      code: 200,
      message: '删除成功',
      data: null
    },
    errorResponse: {
      code: 404,
      message: '岗位不存在',
      data: null
    },
    codeExample: `// 删除岗位
export function delPost(postId: any) {
    return request({
        url: '/system/post/' + postId,
        method: 'delete'
    })
}`
  }
]);