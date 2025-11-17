export const apiUser = ref([
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
                                { id: 4, label: '市场部门', children: [] },
                                { id: 5, label: '测试部门', children: [] },
                                { id: 7, label: '财务部门', children: [] },
                                { id: 8, label: '运维部门', children: [] },
                            ],
                        },
                        {
                            id: 9,
                            label: '长沙分公司',
                            children: [
                                { id: 11, label: '市场部门', children: [] },
                                { id: 10, label: '财务部门', children: [] },
                            ],
                        },
                    ],
                },
            ],
        },
        codeExample: `// 查询部门下拉树结构
export function deptTreeSelect() {
    return request({
        url: '/system/user/deptTree',
        method: 'get'
    })
}`
    },
    // {
    //   key: 'user-roles-posts',
    //   method: 'GET',
    //   url: '/dev-api/system/user',
    //   description: '获取用户可选角色和岗位',
    //   requiresAuth: true,
    //   response: {
    //     msg: '操作成功',
    //     code: 200,
    //     roles: [
    //       {
    //         createBy: null,
    //         createTime: '2025-05-25 23:54:42',
    //         updateBy: null,
    //         updateTime: null,
    //         remark: '普通角色',
    //         roleId: 2,
    //         roleName: '普通角色',
    //         roleKey: 'common',
    //         roleSort: 2,
    //         dataScope: '2',
    //         menuCheckStrictly: true,
    //         deptCheckStrictly: true,
    //         status: '0',
    //         delFlag: '0',
    //         flag: false,
    //         menuIds: null,
    //         deptIds: null,
    //         permissions: null,
    //         admin: false,
    //       },
    //     ],
    //     posts: [
    //       {
    //         createBy: 'admin',
    //         createTime: '2025-05-25 23:54:42',
    //         updateBy: null,
    //         updateTime: null,
    //         remark: '',
    //         postId: 1,
    //         postCode: 'ceo',
    //         postName: '董事长',
    //         postSort: 1,
    //         status: '0',
    //         flag: false,
    //       },
    //       {
    //         createBy: 'admin',
    //         createTime: '2025-05-25 23:54:42',
    //         updateBy: null,
    //         updateTime: null,
    //         remark: '',
    //         postId: 2,
    //         postCode: 'se',
    //         postName: '项目经理',
    //         postSort: 2,
    //         status: '0',
    //         flag: false,
    //       },
    //       {
    //         createBy: 'admin',
    //         createTime: '2025-05-25 23:54:42',
    //         updateBy: null,
    //         updateTime: null,
    //         remark: '',
    //         postId: 3,
    //         postCode: 'hr',
    //         postName: '人力资源',
    //         postSort: 3,
    //         status: '0',
    //         flag: false,
    //       },
    //       {
    //         createBy: 'admin',
    //         createTime: '2025-05-25 23:54:42',
    //         updateBy: null,
    //         updateTime: null,
    //         remark: '',
    //         postId: 4,
    //         postCode: 'user',
    //         postName: '普通员工',
    //         postSort: 4,
    //         status: '0',
    //         flag: false,
    //       },
    //     ],
    //   }
    // },
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
            "msg": "操作成功",
            "code": 200,
            "rows": [
                {
                    "userId": 1,
                    "userName": "admin",
                    "nickName": "管理员",
                    "deptName": "研发部门",
                    "phonenumber": "15888888888",
                    "status": "0",
                    "createTime": "2025-05-20 11:39:06",
                    "deptId": 3,
                    "email": "admin@mengyue.com",
                    "sex": "0",
                    "remark": "管理员用户",
                    "avatar": "",
                    "password": "admin123"
                },
                {
                    "userId": 2,
                    "userName": "ry",
                    "nickName": "测试员",
                    "deptName": "测试部门",
                    "phonenumber": "15666666666",
                    "status": "0",
                    "createTime": "2025-05-20 11:39:06",
                    "deptId": 5,
                    "email": "my@mengyue.com",
                    "sex": "0",
                    "remark": "普通用户",
                    "avatar": "",
                    "password": "ry123"
                }
            ],
            "total": 2
        },
        codeExample: `// 查询用户列表
export function listUser(params) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: params
  })
}`
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
            "msg": "操作成功",
            "code": 200,
            "data": {
                "userId": 1,
                "userName": "admin",
                "nickName": "管理员",
                "deptName": "研发部门",
                "phonenumber": "15888888888",
                "status": "0",
                "createTime": "2025-05-20 11:39:06",
                "deptId": 3,
                "email": "admin@mengyue.com",
                "sex": "0",
                "remark": "管理员用户",
                "avatar": "",
                "postIds": [1],
                "roleIds": [1]
            },
            "posts": [
                { "postId": 1, "postName": "管理员", "status": "0" },
                { "postId": 2, "postName": "开发工程师", "status": "0" },
                { "postId": 3, "postName": "市场专员", "status": "0" }
            ],
            "roles": [
                { "roleId": 1, "roleName": "超级管理员", "status": "0" },
                { "roleId": 2, "roleName": "普通用户", "status": "0" },
                { "roleId": 3, "roleName": "部门经理", "status": "0" }
            ]
        },
        codeExample: `// 查询用户详细
export function getUser(userId) {
    return request({
        url: '/system/user/' + parseStrEmpty(userId),
        method: 'get'
    })
}`
    },
    {
        key: 'user-auth-role',
        method: 'GET',
        url: '/dev-api/system/user/authRole/:userId',
        description: '查询用户授权角色',
        requiresAuth: true,
        request: {
            params: {
                userId: 'number'
            }
        },
        response: {
            "code": 200,
            "msg": "操作成功",
            "user": {
                "userId": 1,
                "userName": "admin",
                "nickName": "管理员"
            },
            "roles": [
                {
                    "roleId": 1,
                    "roleName": "超级管理员",
                    "roleKey": "admin",
                    "status": "0",
                    "createTime": "2024-01-01 12:00:00",
                    "flag": true
                },
                {
                    "roleId": 2,
                    "roleName": "普通用户",
                    "roleKey": "user",
                    "status": "0",
                    "createTime": "2024-01-01 12:00:00",
                    "flag": false
                },
                {
                    "roleId": 3,
                    "roleName": "部门经理",
                    "roleKey": "manager",
                    "status": "0",
                    "createTime": "2024-01-01 12:00:00",
                    "flag": false
                }
            ],
            "roleIds": [1]
        },
        codeExample: `// 查询授权角色
export function getAuthRole(userId) {
    return request({
        url: '/system/user/authRole/' + userId,
        method: 'get'
    })
}`
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
export function addUser(data) {
    return request({
        url: '/system/user',
        method: 'post',
        data: data
    })
}`
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
        errorResponse: {
            msg: '用户不存在',
            code: 500,
            data: null
        },
        codeExample: `// 修改用户
export function updateUser(data) {
    return request({
        url: '/system/user',
        method: 'put',
        data: data
    })
}`
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
export function delUser(userIds) {
    return request({
        url: '/system/user/' + userIds,
        method: 'delete'
    })
}`
    },
    {
        key: 'reset-password',
        method: 'PUT',
        url: '/dev-api/system/user/resetPwd',
        description: '用户密码重置',
        requiresAuth: true,
        request: {
            body: {
                userId: 'number',
                password: 'string'
            }
        },
        response: {
            msg: '密码重置成功',
            code: 200,
            data: null
        },
        codeExample: `// 用户密码重置
export function resetUserPwd(userId, password) {
    const data = {
        userId,
        password
    }
    return request({
        url: '/system/user/resetPwd',
        method: 'put',
        data: data
    })
}`
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
        errorResponse: {
            msg: '用户不存在',
            code: 500,
            data: null
        },
        codeExample: `// 用户状态修改
export function changeUserStatus(userId, status) {
    const data = {
        userId,
        status
    }
    return request({
        url: '/system/user/changeStatus',
        method: 'put',
        data: data
    })
}`
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
        codeExample: `// 保存授权角色
export function updateAuthRole(data) {
    return request({
        url: '/system/user/authRole',
        method: 'put',
        params: data
    })
}`
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
        codeExample: `// 查询用户个人信息
export function getUserProfile() {
    return request({
        url: '/system/user/profile',
        method: 'get'
    })
}`
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
        codeExample: `// 修改用户个人信息
export function updateUserProfile(data) {
    return request({
        url: '/system/user/profile',
        method: 'put',
        data: data
    })
}`
    },
    {
        key: 'update-password',
        method: 'PUT',
        url: '/dev-api/system/user/profile/updatePwd',
        description: '用户密码修改',
        requiresAuth: true,
        request: {
            body: {
                oldPassword: 'string',
                newPassword: 'string'
            }
        },
        response: {
            msg: '密码修改成功',
            code: 200,
            data: null
        },
        codeExample: `// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
    return request({
        url: '/system/user/profile/updatePwd',
        method: 'put',
        data: { oldPassword, newPassword }
    })
}`
    },
    {
        key: 'upload-avatar',
        method: 'POST',
        url: '/dev-api/system/user/profile/avatar',
        description: '用户头像上传',
        requiresAuth: true,
        request: {
            body: {
                avatar: 'string'
            }
        },
        response: {
            msg: '上传成功',
            code: 200,
            data: '/avatar/test.jpg'
        },
        codeExample: `// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/system/user/profile/avatar',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: data
    })
}`
    }
]);
