export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiRequest {
  query?: Record<string, any>;
  params?: Record<string, any>;
  body?: Record<string, any>;
}

export interface ApiDefinition {
  key: string;
  method: string;
  url: string;
  description: string;
  requiresAuth: boolean;
  request?: ApiRequest;
  response: any;
  errorResponse?: any;
  codeExample?: string;
}

export const apiDefinitions: ApiDefinition[] = [
  {
    key: 'dept-tree',
    method: 'GET',
    url: '/dev-api/system/user/deptTree',
    description: '查询部门下拉树结构',
    requiresAuth: true,
    response: {
      msg: '操作成功',
      code: 200,
      data: [
        {
          id: 1,
          label: '梦悦科技',
          children: [
            {
              id: 2,
              label: '深圳总公司',
              children: [
                { id: 3, label: '研发部门', children: [] },
                { id: 4, label: '市场部门', children: [] }
              ]
            }
          ]
        }
      ]
    },
    codeExample: `// 获取部门树
request.get('/dev-api/system/user/deptTree', {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'user-list',
    method: 'GET',
    url: '/dev-api/system/user/list',
    description: '查询用户列表',
    requiresAuth: true,
    request: {
      query: {
        deptId: 'string?',
        userName: 'string?',
        nickName: 'string?',
        phonenumber: 'string?',
        status: 'string?',
        'params[beginTime]': 'string?',
        'params[endTime]': 'string?'
      }
    },
    response: {
      msg: '操作成功',
      code: 200,
      rows: [
        {
          userId: 1,
          userName: 'admin',
          nickName: '管理员',
          deptName: '研发部门',
          phonenumber: '15888888888',
          status: '0',
          createTime: '2025-05-20 11:39:06'
        }
      ],
      total: 1
    },
    errorResponse: {
      msg: '参数错误',
      code: 400,
      data: null
    },
    codeExample: `// 查询用户列表
request.get('/dev-api/system/user/list', {
  params: {
    deptId: 3,
    userName: 'admin'
  },
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'user-detail',
    method: 'GET',
    url: '/dev-api/system/user/:userId',
    description: '查询用户详情',
    requiresAuth: true,
    request: {
      params: {
        userId: 'number'
      }
    },
    response: {
      msg: '操作成功',
      code: 200,
      data: {
        userId: 1,
        userName: 'admin',
        nickName: '管理员',
        deptName: '研发部门',
        phonenumber: '15888888888',
        email: 'admin@mengyue.com',
        sex: '0',
        status: '0',
        remark: '管理员用户',
        avatar: '',
        createTime: '2025-05-20 11:39:06',
        postIds: [1],
        roleIds: [1]
      }
    },
    codeExample: `// 查询用户详情
request.get('/dev-api/system/user/1', {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'create-user',
    method: 'POST',
    url: '/dev-api/system/user',
    description: '新增用户',
    requiresAuth: true,
    request: {
      body: {
        userName: 'string',
        nickName: 'string',
        deptId: 'number',
        phonenumber: 'string?',
        email: 'string?',
        sex: 'string?',
        status: 'string?',
        remark: 'string?',
        password: 'string?'
      }
    },
    response: {
      msg: '新增成功',
      code: 200,
      data: null
    },
    errorResponse: {
      msg: '用户名已存在',
      code: 500,
      data: null
    },
    codeExample: `// 新增用户
request.post('/dev-api/system/user', {
  userName: 'newuser',
  nickName: '新用户',
  deptId: 3,
  phonenumber: '13800138000',
  email: 'newuser@example.com',
  sex: '0',
  status: '0',
  remark: '这是新用户',
  password: 'password123'
}, {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'update-user',
    method: 'PUT',
    url: '/dev-api/system/user',
    description: '修改用户信息',
    requiresAuth: true,
    request: {
      body: {
        userId: 'number',
        userName: 'string',
        nickName: 'string',
        deptId: 'number',
        phonenumber: 'string?',
        email: 'string?',
        sex: 'string?',
        status: 'string?',
        remark: 'string?',
        password: 'string?',
        avatar: 'string?'
      }
    },
    response: {
      msg: '修改成功',
      code: 200,
      data: null
    },
    codeExample: `// 修改用户信息
request.put('/dev-api/system/user', {
  userId: 1,
  nickName: '更新管理员'
}, {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'delete-user',
    method: 'DELETE',
    url: '/dev-api/system/user/:userId',
    description: '删除用户',
    requiresAuth: true,
    request: {
      params: {
        userId: 'number'
      }
    },
    response: {
      msg: '删除成功',
      code: 200,
      data: null
    },
    errorResponse: {
      msg: '用户不存在',
      code: 500,
      data: null
    },
    codeExample: `// 删除用户
request.delete('/dev-api/system/user/1', {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'user-profile',
    method: 'GET',
    url: '/dev-api/system/user/profile',
    description: '获取当前用户个人信息',
    requiresAuth: true,
    response: {
      msg: '操作成功',
      code: 200,
      data: {
        userId: 1,
        userName: 'admin',
        nickName: '管理员',
        email: 'admin@mengyue.com',
        phonenumber: '15888888888',
        sex: '0',
        avatar: '',
        deptId: 3,
        dept: { deptName: '研发部门' },
        roles: [{ roleId: 1, roleName: '超级管理员', status: '0' }]
      }
    },
    codeExample: `// 获取当前用户个人信息
request.get('/dev-api/system/user/profile', {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'update-profile',
    method: 'PUT',
    url: '/dev-api/system/user/profile',
    description: '修改个人信息',
    requiresAuth: true,
    request: {
      body: {
        nickName: 'string?',
        email: 'string?',
        phonenumber: 'string?',
        sex: 'string?',
        avatar: 'string?'
      }
    },
    response: {
      msg: '修改成功',
      code: 200,
      data: null
    },
    codeExample: `// 修改个人信息
request.put('/dev-api/system/user/profile', {
  nickName: '更新昵称',
  email: 'newemail@example.com'
}, {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'change-status',
    method: 'PUT',
    url: '/dev-api/system/user/changeStatus',
    description: '修改用户状态',
    requiresAuth: true,
    request: {
      body: {
        userId: 'number',
        status: 'string'
      }
    },
    response: {
      msg: '状态修改成功',
      code: 200,
      data: null
    },
    codeExample: `// 修改用户状态
request.put('/dev-api/system/user/changeStatus', {
  userId: 1,
  status: '1'
}, {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  },
  {
    key: 'auth-role',
    method: 'PUT',
    url: '/dev-api/system/user/authRole',
    description: '保存用户授权角色',
    requiresAuth: true,
    request: {
      body: {
        userId: 'number',
        roleIds: 'number[]'
      }
    },
    response: {
      code: 200,
      msg: '角色分配成功',
      data: null
    },
    codeExample: `// 保存用户授权角色
request.put('/dev-api/system/user/authRole', {
  userId: 1,
  roleIds: [1, 2]
}, {
  headers: {
    'Authorization': 'Bearer your-token'
  }
}).then(response => console.log(response.data));`
  }
];