export const apiMenu = ref([
    {
        key: 'menu-list',
        method: 'GET',
        url: '/dev-api/system/menu/list',
        description: '查询菜单列表',
        requiresAuth: true,
        request: {
            query: {
                menuName: 'string?',
                status: 'string?',
                visible: 'string?'
            }
        },
        response: {
            msg: '操作成功',
            code: 200,
            data: [
                {
                    id: 1,
                    label: '系统管理',
                    children: [
                        {
                            id: 100,
                            label: '用户管理',
                            children: [
                                { id: 1000, label: '用户查询' },
                                { id: 1001, label: '用户新增' },
                                { id: 1002, label: '用户修改' },
                                { id: 1003, label: '用户删除' },
                                { id: 1004, label: '用户导出' },
                                { id: 1005, label: '用户导入' },
                                { id: 1006, label: '重置密码' }
                            ]
                        },
                        {
                            id: 101,
                            label: '角色管理',
                            children: [
                                { id: 1007, label: '角色查询' },
                                { id: 1008, label: '角色新增' },
                                { id: 1009, label: '角色修改' },
                                { id: 1010, label: '角色删除' },
                                { id: 1011, label: '角色导出' }
                            ]
                        },
                        {
                            id: 102,
                            label: '菜单管理',
                            children: [
                                { id: 1012, label: '菜单查询' },
                                { id: 1013, label: '菜单新增' },
                                { id: 1014, label: '菜单修改' },
                                { id: 1015, label: '菜单删除' }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '系统监控',
                    children: [
                        {
                            id: 109,
                            label: '在线用户',
                            children: [
                                { id: 1046, label: '在线查询' },
                                { id: 1047, label: '批量强退' },
                                { id: 1048, label: '单条强退' }
                            ]
                        },
                        {
                            id: 110,
                            label: '定时任务',
                            children: [
                                { id: 1049, label: '任务查询' },
                                { id: 1050, label: '任务新增' },
                                { id: 1051, label: '任务修改' },
                                { id: 1052, label: '任务删除' },
                                { id: 1053, label: '状态修改' },
                                { id: 1054, label: '任务导出' }
                            ]
                        }
                    ]
                }
            ]
        },
        codeExample: `// 查询菜单列表
export function listMenu(query = {}) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}`
    },
    {
        key: 'menu-detail',
        method: 'GET',
        url: '/dev-api/system/menu/:menuId',
        description: '查询菜单详情',
        requiresAuth: true,
        request: {
            params: {
                menuId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '查询成功',
            data: {
                createBy: null,
                createTime: "2025-05-25 23:54:42",
                updateBy: null,
                updateTime: null,
                remark: null,
                menuId: 100,
                menuName: "用户管理",
                parentName: null,
                parentId: 1,
                orderNum: 1,
                path: "user",
                component: "system/user/index",
                query: "",
                routeName: "",
                isFrame: "1",
                isCache: "0",
                menuType: "C",
                visible: "0",
                status: "0",
                perms: "system:user:list",
                icon: "user"
            }
        },
        codeExample: `// 查询菜单详细
export function getMenu(menuId: string) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}`
    },
    {
        key: 'create-menu',
        method: 'POST',
        url: '/dev-api/system/menu',
        description: '新增菜单',
        requiresAuth: true,
        request: {
            body: {
                menuName: 'string',
                parentId: 'number',
                orderNum: 'number',
                path: 'string',
                component: 'string?',
                query: 'string?',
                routeName: 'string?',
                isFrame: 'string',
                isCache: 'string',
                menuType: 'string',
                visible: 'string',
                status: 'string',
                perms: 'string?',
                icon: 'string?',
                remark: 'string?'
            }
        },
        response: {
            code: 200,
            msg: '新增成功'
        },
        codeExample: `// 新增菜单
export function addMenu(data: string) {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data
  })
}`
    },
    {
        key: 'update-menu',
        method: 'PUT',
        url: '/dev-api/system/menu',
        description: '修改菜单',
        requiresAuth: true,
        request: {
            body: {
                menuId: 'number',
                menuName: 'string',
                parentId: 'number',
                orderNum: 'number',
                path: 'string',
                component: 'string?',
                query: 'string?',
                routeName: 'string?',
                isFrame: 'string',
                isCache: 'string',
                menuType: 'string',
                visible: 'string',
                status: 'string',
                perms: 'string?',
                icon: 'string?',
                remark: 'string?'
            }
        },
        response: {
            code: 200,
            msg: '修改成功'
        },
        codeExample: `// 修改菜单
export function updateMenu(data: string) {
  return request({
    url: '/system/menu',
    method: 'put',
    data: data
  })
}`
    },
    {
        key: 'delete-menu',
        method: 'DELETE',
        url: '/dev-api/system/menu/:menuId',
        description: '删除菜单',
        requiresAuth: true,
        request: {
            params: {
                menuId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '删除成功'
        },
        codeExample: `// 删除菜单
export function delMenu(menuId: string) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  })
}`
    },
    {
        key: 'menu-tree',
        method: 'GET',
        url: '/dev-api/system/menu/treeselect',
        description: '查询菜单下拉树结构',
        requiresAuth: true,
        response: {
            code: 200,
            msg: '查询成功',
            data: [
                {
                    id: 1,
                    label: '系统管理',
                    children: [
                        {
                            id: 100,
                            label: '用户管理',
                            children: [
                                { id: 1000, label: '用户查询' },
                                { id: 1001, label: '用户新增' },
                                { id: 1002, label: '用户修改' }
                            ]
                        },
                        {
                            id: 101,
                            label: '角色管理',
                            children: [
                                { id: 1007, label: '角色查询' },
                                { id: 1008, label: '角色新增' },
                                { id: 1009, label: '角色修改' }
                            ]
                        },
                        {
                            id: 102,
                            label: '菜单管理',
                            children: [
                                { id: 1012, label: '菜单查询' },
                                { id: 1013, label: '菜单新增' },
                                { id: 1014, label: '菜单修改' }
                            ]
                        },
                        {
                            id: 103,
                            label: '部门管理',
                            children: [
                                { id: 1016, label: '部门查询' },
                                { id: 1017, label: '部门新增' },
                                { id: 1018, label: '部门修改' }
                            ]
                        },
                        {
                            id: 104,
                            label: '岗位管理',
                            children: [
                                { id: 1020, label: '岗位查询' },
                                { id: 1021, label: '岗位新增' },
                                { id: 1022, label: '岗位修改' }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '系统监控',
                    children: [
                        {
                            id: 109,
                            label: '在线用户',
                            children: [
                                { id: 1046, label: '在线查询' },
                                { id: 1047, label: '批量强退' },
                                { id: 1048, label: '单条强退' }
                            ]
                        },
                        {
                            id: 110,
                            label: '定时任务',
                            children: [
                                { id: 1049, label: '任务查询' },
                                { id: 1050, label: '任务新增' },
                                { id: 1051, label: '任务修改' }
                            ]
                        },
                        {
                            id: 111,
                            label: '数据监控',
                            children: []
                        },
                        {
                            id: 112,
                            label: '服务监控',
                            children: []
                        },
                        {
                            id: 113,
                            label: '缓存监控',
                            children: []
                        },
                        {
                            id: 114,
                            label: '缓存列表',
                            children: []
                        }
                    ]
                },
                {
                    id: 3,
                    label: '系统工具',
                    children: [
                        {
                            id: 115,
                            label: '表单构建',
                            children: []
                        },
                        {
                            id: 116,
                            label: '代码生成',
                            children: [
                                { id: 1055, label: '生成查询' },
                                { id: 1056, label: '生成修改' },
                                { id: 1057, label: '生成删除' },
                                { id: 1058, label: '导入代码' },
                                { id: 1059, label: '预览代码' },
                                { id: 1060, label: '生成代码' }
                            ]
                        },
                        {
                            id: 117,
                            label: '系统接口',
                            children: []
                        }
                    ]
                }
            ]
        },
        codeExample: `// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}`
    },
    {
        key: 'role-menu-tree',
        method: 'GET',
        url: '/dev-api/system/menu/roleMenuTreeselect/:roleId',
        description: '根据角色ID查询菜单下拉树结构',
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
                            {
                                id: 100,
                                label: '用户管理',
                                children: [
                                    { id: 1000, label: '用户查询' },
                                    { id: 1001, label: '用户新增' },
                                    { id: 1002, label: '用户修改' },
                                    { id: 1003, label: '用户删除' },
                                    { id: 1004, label: '用户导出' },
                                    { id: 1005, label: '用户导入' },
                                    { id: 1006, label: '重置密码' }
                                ]
                            },
                            {
                                id: 101,
                                label: '角色管理',
                                children: [
                                    { id: 1007, label: '角色查询' },
                                    { id: 1008, label: '角色新增' },
                                    { id: 1009, label: '角色修改' },
                                    { id: 1010, label: '角色删除' },
                                    { id: 1011, label: '角色导出' }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '系统监控',
                        children: [
                            {
                                id: 109,
                                label: '在线用户',
                                children: [
                                    { id: 1046, label: '在线查询' },
                                    { id: 1047, label: '批量强退' },
                                    { id: 1048, label: '单条强退' }
                                ]
                            }
                        ]
                    }
                ],
                checkedKeys: [100, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 101, 1007, 1008, 1009, 1010, 1011, 109, 1046, 1047, 1048]
            }
        },
        codeExample: `// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId: string) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}`
    }
]);
