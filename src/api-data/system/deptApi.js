export const apiDept = ref([
    {
        key: 'dept-list',
        method: 'GET',
        url: '/dev-api/system/dept/list',
        description: '查询部门列表',
        requiresAuth: true,
        request: {
            query: {
                deptName: 'string?',
                status: 'string?'
            }
        },
        response: {
            msg: '操作成功',
            code: 200,
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
                                { id: 107, label: '运维部门' }
                            ]
                        },
                        {
                            id: 102,
                            label: '长沙分公司',
                            children: [
                                { id: 108, label: '市场部门' },
                                { id: 109, label: '财务部门' }
                            ]
                        }
                    ]
                }
            ]
        },
        codeExample: `// 查询部门列表
export function listDept(query = {}) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}`
    },
    {
        key: 'dept-exclude',
        method: 'GET',
        url: '/dev-api/system/dept/list/exclude/:deptId',
        description: '查询部门列表(排除节点)',
        requiresAuth: true,
        request: {
            params: {
                deptId: 'number'
            }
        },
        response: {
            msg: '操作成功',
            code: 200,
            data: [
                {
                    id: 100,
                    label: '若依科技',
                    children: [
                        {
                            id: 102,
                            label: '长沙分公司',
                            children: [
                                { id: 108, label: '市场部门' },
                                { id: 109, label: '财务部门' }
                            ]
                        }
                    ]
                }
            ]
        },
        codeExample: `// 查询部门列表(排除节点)
export function listDeptExcludeChild(deptId: number) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}`
    },
    {
        key: 'dept-detail',
        method: 'GET',
        url: '/dev-api/system/dept/:deptId',
        description: '查询部门详细',
        requiresAuth: true,
        request: {
            params: {
                deptId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '查询成功',
            data: {
                createBy: "admin",
                createTime: "2025-05-25 23:54:42",
                updateBy: null,
                updateTime: null,
                remark: null,
                deptId: 103,
                parentId: 101,
                ancestors: "0,100,101",
                deptName: "研发部门",
                orderNum: 1,
                leader: "若依",
                phone: "15888888888",
                email: "ry@qq.com",
                status: "0",
                delFlag: "0",
                parentName: "深圳总公司"
            }
        },
        codeExample: `// 查询部门详细
export function getDept(deptId: number) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}`
    },
    {
        key: 'create-dept',
        method: 'POST',
        url: '/dev-api/system/dept',
        description: '新增部门',
        requiresAuth: true,
        request: {
            body: {
                parentId: 'number',
                deptName: 'string',
                orderNum: 'number',
                leader: 'string?',
                phone: 'string?',
                email: 'string?',
                status: 'string'
            }
        },
        response: {
            code: 200,
            msg: '新增成功'
        },
        codeExample: `// 新增部门
export function addDept(data: string) {
    return request({
        url: '/system/dept',
        method: 'post',
        data: data
    })
}`
    },
    {
        key: 'update-dept',
        method: 'PUT',
        url: '/dev-api/system/dept',
        description: '修改部门',
        requiresAuth: true,
        request: {
            body: {
                deptId: 'number',
                parentId: 'number',
                deptName: 'string',
                orderNum: 'number',
                leader: 'string?',
                phone: 'string?',
                email: 'string?',
                status: 'string'
            }
        },
        response: {
            code: 200,
            msg: '修改成功'
        },
        codeExample: `// 修改部门
export function updateDept(data: string) {
    return request({
        url: '/system/dept',
        method: 'put',
        data: data
    })
}`
    },
    {
        key: 'delete-dept',
        method: 'DELETE',
        url: '/dev-api/system/dept/:deptId',
        description: '删除部门',
        requiresAuth: true,
        request: {
            params: {
                deptId: 'number'
            }
        },
        response: {
            code: 200,
            msg: '删除成功'
        },
        codeExample: `// 删除部门
export function delDept(deptId: string) {
    return request({
        url: '/system/dept/' + deptId,
        method: 'delete'
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
                                { id: 107, label: '运维部门' }
                            ]
                        },
                        {
                            id: 102,
                            label: '长沙分公司',
                            children: [
                                { id: 108, label: '市场部门' },
                                { id: 109, label: '财务部门' }
                            ]
                        }
                    ]
                }
            ]
        }
    }
]);
