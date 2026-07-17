export const apiRole = ref([
    {
        key: 'role-list',
        method: 'GET',
        url: '/dev-api/system/role/list',
        description: '查询角色列表',
        requiresAuth: true,
        request: {
            query: {
                roleName: 'string?',
                roleKey: 'string?',
                status: 'string?',
                'params[beginTime]': 'string?',
                'params[endTime]': 'string?',
                pageNum: 'number?',
                pageSize: 'number?'
            }
        },
        response: {
            msg: '查询成功',
            code: 200,
            rows: [
                {
                    createBy: null,
                    createTime: '2025-05-25 23:54:42',
                    updateBy: null,
                    updateTime: null,
                    remark: '超级管理员',
                    roleId: 1,
                    roleName: '超级管理员',
                    roleKey: 'admin',
                    roleSort: 1,
                    dataScope: '1',
                    menuCheckStrictly: true,
                    deptCheckStrictly: true,
                    status: '0',
                    delFlag: '0',
                    flag: false,
                    menuIds: [],
                    deptIds: [],
                    permissions: null,
                    admin: true
                },
                {
                    createBy: null,
                    createTime: '2025-05-25 23:54:42',
                    updateBy: null,
                    updateTime: null,
                    remark: '普通角色',
                    roleId: 2,
                    roleName: '普通角色',
                    roleKey: 'common',
                    roleSort: 2,
                    dataScope: '2',
                    menuCheckStrictly: true,
                    deptCheckStrictly: true,
                    status: '0',
                    delFlag: '0',
                    flag: false,
                    menuIds: [],
                    deptIds: [],
                    permissions: null,
                    admin: false
                }
            ],
            total: 2
        },
        codeExample: `// 查询角色列表
export function listRole(query: string) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}`
    },
    {
        key: 'role-detail',
        method: 'GET',
        url: '/dev-api/system/role/:roleId',
        description: '查询角色详情',
        requiresAuth: true,
        request: {
            params: {
                roleId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '查询成功',
            data: {
                createBy: null,
                createTime: '2025-05-25 23:54:42',
                updateBy: null,
                updateTime: null,
                remark: '超级管理员',
                roleId: 1,
                roleName: '超级管理员',
                roleKey: 'admin',
                roleSort: 1,
                dataScope: '1',
                menuCheckStrictly: true,
                deptCheckStrictly: true,
                status: '0',
                delFlag: '0',
                flag: false,
                menuIds: [],
                deptIds: [],
                permissions: null,
                admin: true
            }
        },
        codeExample: `// 查询角色详细
export function getRole(roleId: string) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}`
    },
    {
        key: 'create-role',
        method: 'POST',
        url: '/dev-api/system/role',
        description: '新增角色',
        requiresAuth: true,
        request: {
            body: {
                roleName: 'string',
                roleKey: 'string',
                roleSort: 'number',
                status: 'string',
                dataScope: 'string',
                menuCheckStrictly: 'boolean',
                deptCheckStrictly: 'boolean',
                remark: 'string?',
                menuIds: 'number[]',
                deptIds: 'number[]'
            }
        },
        response: {
            code: 200,
            msg: '新增成功'
        },
        errorResponse: {
            code: 500,
            msg: '角色名称已存在'
        },
        codeExample: `// 新增角色
export function addRole(data: string) {
  return request({
    url: '/system/role',
    method: 'post',
    data: data
  })
}`
    },
    {
        key: 'update-role',
        method: 'PUT',
        url: '/dev-api/system/role',
        description: '修改角色',
        requiresAuth: true,
        request: {
            body: {
                roleId: 'number',
                roleName: 'string',
                roleKey: 'string',
                roleSort: 'number',
                status: 'string',
                dataScope: 'string',
                menuCheckStrictly: 'boolean',
                deptCheckStrictly: 'boolean',
                remark: 'string?',
                menuIds: 'number[]',
                deptIds: 'number[]'
            }
        },
        response: {
            code: 200,
            msg: '修改成功'
        },
        errorResponse: {
            code: 404,
            msg: '未找到角色'
        },
        codeExample: `// 修改角色
export function updateRole(data: string) {
  return request({
    url: '/system/role',
    method: 'put',
    data: data
  })
}`
    },
    {
        key: 'delete-role',
        method: 'DELETE',
        url: '/dev-api/system/role/:roleId',
        description: '删除角色',
        requiresAuth: true,
        request: {
            params: {
                roleId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '删除成功'
        },
        codeExample: `// 删除角色
export function delRole(roleId: string) {
  return request({
    url: '/system/role/' + roleId,
    method: 'delete'
  })
}`
    },
    {
        key: 'change-role-status',
        method: 'PUT',
        url: '/dev-api/system/role/changeStatus',
        description: '角色状态修改',
        requiresAuth: true,
        request: {
            body: {
                roleId: 'number',
                status: 'string'
            }
        },
        response: {
            code: 200,
            msg: '状态修改成功'
        },
        errorResponse: {
            code: 404,
            msg: '未找到角色'
        },
        codeExample: `// 角色状态修改
export function changeRoleStatus(roleId: string, status: string) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}`
    },
    {
        key: 'role-data-scope',
        method: 'PUT',
        url: '/dev-api/system/role/dataScope',
        description: '角色数据权限',
        requiresAuth: true,
        request: {
            body: {
                roleId: 'number',
                dataScope: 'string',
                deptIds: 'number[]'
            }
        },
        response: {
            code: 200,
            msg: '数据权限修改成功'
        },
        errorResponse: {
            code: 404,
            msg: '未找到角色'
        },
        codeExample: `// 角色数据权限
export function dataScope(data: string) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}`
    },
    {
        key: 'allocated-user-list',
        method: 'GET',
        url: '/dev-api/system/role/authUser/allocatedList',
        description: '查询角色已授权用户列表',
        requiresAuth: true,
        request: {
            query: {
                roleId: 'number',
                userName: 'string?',
                phonenumber: 'string?',
                pageNum: 'number?',
                pageSize: 'number?'
            }
        },
        response: {
            code: 200,
            rows: [
                {
                    userId: 1,
                    userName: 'admin',
                    nickName: '超级管理员',
                    email: 'admin@mengyue.vip',
                    phonenumber: '13800000000',
                    status: '0',
                    createTime: '2025-05-25 23:54:42',
                    roleIds: [1]
                },
                {
                    userId: 2,
                    userName: 'ry',
                    nickName: '普通用户',
                    email: 'ry@mengyue.vip',
                    phonenumber: '13800000001',
                    status: '0',
                    createTime: '2025-05-25 23:54:42',
                    roleIds: [2]
                }
            ],
            total: 2
        },
        codeExample: `// 查询角色已授权用户列表
export function allocatedUserList(query: { pageNum: number } ) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}`
    },
    {
        key: 'unallocated-user-list',
        method: 'GET',
        url: '/dev-api/system/role/authUser/unallocatedList',
        description: '查询角色未授权用户列表',
        requiresAuth: true,
        request: {
            query: {
                roleId: 'number',
                userName: 'string?',
                phonenumber: 'string?',
                pageNum: 'number?',
                pageSize: 'number?'
            }
        },
        response: {
            code: 200,
            rows: [
                {
                    userId: 3,
                    userName: 'test',
                    nickName: '测试用户',
                    email: 'test@mengyue.vip',
                    phonenumber: '13900000000',
                    status: '0',
                    createTime: '2025-05-25 23:54:42',
                    roleIds: [3]
                }
            ],
            total: 1
        },
        codeExample: `// 查询角色未授权用户列表
export function unallocatedUserList(query: { pageNum: number }) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}`
    },
    {
        key: 'auth-user-cancel',
        method: 'PUT',
        url: '/dev-api/system/role/authUser/cancel',
        description: '取消用户授权角色',
        requiresAuth: true,
        request: {
            body: {
                userId: 'number',
                roleId: 'string'
            }
        },
        response: {
            code: 200,
            msg: '取消授权成功'
        },
        codeExample: `// 取消用户授权角色
export function authUserCancel(data: { userId: number, roleId: string}) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data: data
  })
}`
    },
    {
        key: 'auth-user-cancel-all',
        method: 'PUT',
        url: '/dev-api/system/role/authUser/cancelAll',
        description: '批量取消用户授权角色',
        requiresAuth: true,
        request: {
            query: {
                userIds: 'string', // "1,2,3"
                roleId: 'string'
            }
        },
        response: {
            code: 200,
            msg: '批量取消授权成功'
        },
        codeExample: `// 批量取消用户授权角色
export function authUserCancelAll(data: any) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}`
    },
    {
        key: 'auth-user-select-all',
        method: 'PUT',
        url: '/dev-api/system/role/authUser/selectAll',
        description: '授权用户选择',
        requiresAuth: true,
        request: {
            query: {
                userIds: 'string', // "1,2,3"
                roleId: 'string | number'
            }
        },
        response: {
            code: 200,
            msg: '授权成功'
        },
        codeExample: `// 授权用户选择
export function authUserSelectAll(data: { roleId: string | number; userIds: string }) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data
  });
}`
    },
    {
        key: 'role-dept-tree',
        method: 'GET',
        url: '/dev-api/system/role/deptTree/:roleId',
        description: '根据角色ID查询部门树结构',
        requiresAuth: true,
        request: {
            params: {
                roleId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '查询成功',
            data: {
                depts: [
                    {
                        id: 100,
                        label: '若依科技',
                        children: [
                            {
                                id: 101,
                                label: '深圳总公司',
                                children: [
                                    { id: 103, label: '研发部门' },
                                    { id: 104, label: '市场部门' },
                                    { id: 105, label: '测试部门' },
                                    { id: 106, label: '财务部门' },
                                    { id: 107, label: '运维部门' },
                                    { id: 108, label: '人事部门' }
                                ]
                            },
                            {
                                id: 102,
                                label: '长沙分公司',
                                children: [
                                    { id: 110, label: '市场部门' },
                                    { id: 111, label: '财务部门' }
                                ]
                            }
                        ]
                    }
                ],
                checkedKeys: [103, 104, 113]
            }
        },
        codeExample: `// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId: string) {
  return request({
    url: '/system/role/deptTree/' + roleId,
    method: 'get'
  })
}`
    },
    {
        key: 'dept-tree',
        method: 'GET',
        url: '/dev-api/system/dept/treeselect',
        description: '查询部门树结构',
        requiresAuth: true,
        response: {
            code: 200,
            msg: '查询成功',
            data: [
                {
                    id: 100,
                    label: '若依科技',
                    children: [
                        {
                            id: 101,
                            label: '深圳总公司',
                            children: [
                                { id: 103, label: '研发部门' },
                                { id: 104, label: '市场部门' },
                                { id: 105, label: '测试部门' },
                                { id: 106, label: '财务部门' },
                                { id: 107, label: '运维部门' },
                                { id: 108, label: '人事部门' }
                            ]
                        },
                        {
                            id: 102,
                            label: '长沙分公司',
                            children: [
                                { id: 110, label: '市场部门' },
                                { id: 111, label: '财务部门' }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        key: 'menu-tree',
        method: 'GET',
        url: '/dev-api/system/menu/treeselect',
        description: '查询菜单树结构',
        requiresAuth: true,
        response: {
            code: 200,
            msg: '查询成功',
            data: [
                {
                    id: 1,
                    label: '系统管理',
                    children: [
                        { id: 2, label: '用户管理' },
                        { id: 3, label: '角色管理' },
                        { id: 4, label: '菜单管理' },
                        { id: 5, label: '部门管理' },
                        { id: 6, label: '岗位管理' },
                        { id: 7, label: '字典管理' },
                        { id: 8, label: '参数设置' },
                        { id: 9, label: '通知公告' },
                        {
                            id: 10,
                            label: '日志管理',
                            children: [
                                { id: 11, label: '操作日志' },
                                { id: 12, label: '登录日志' }
                            ]
                        }
                    ]
                },
                {
                    id: 13,
                    label: '系统监控',
                    children: [
                        { id: 14, label: '在线用户' },
                        { id: 15, label: '服务监控' },
                        { id: 16, label: '缓存监控' }
                    ]
                },
                {
                    id: 17,
                    label: '系统工具',
                    children: [
                        { id: 18, label: '表单构建' },
                        { id: 19, label: '代码生成' },
                        { id: 20, label: '单页生成' },
                        { id: 21, label: '系统接口' }
                    ]
                }
            ]
        }
    },
    {
        key: 'role-menu-tree',
        method: 'GET',
        url: '/dev-api/system/menu/roleMenuTreeselect/:roleId',
        description: '根据角色ID查询菜单树结构',
        requiresAuth: true,
        request: {
            params: {
                roleId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '查询成功',
            data: {
                menus: [
                    {
                        id: 1,
                        label: '系统管理',
                        children: [
                            { id: 2, label: '用户管理' },
                            { id: 3, label: '角色管理' },
                            { id: 4, label: '菜单管理' },
                            { id: 5, label: '部门管理' },
                            { id: 6, label: '岗位管理' },
                            { id: 7, label: '字典管理' },
                            { id: 8, label: '参数设置' },
                            { id: 9, label: '通知公告' },
                            {
                                id: 10,
                                label: '日志管理',
                                children: [
                                    { id: 11, label: '操作日志' },
                                    { id: 12, label: '登录日志' }
                                ]
                            }
                        ]
                    }
                ],
                checkedKeys: [2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21]
            }
        }
    }
]);
