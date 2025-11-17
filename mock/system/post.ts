import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/dev-api/system/post/list',
        method: 'get',
        timeout: 200,
        response: ({ query }) => {
            const allRows = [
                {
                    createBy: 'admin',
                    createTime: '2025-05-25 23:54:42',
                    updateBy: null,
                    updateTime: null,
                    remark: '',
                    postId: 1,
                    postCode: 'ceo',
                    postName: '董事长',
                    postSort: 1,
                    status: '0',
                    flag: false
                },
                {
                    createBy: 'admin',
                    createTime: '2025-05-25 23:54:42',
                    updateBy: null,
                    updateTime: null,
                    remark: '',
                    postId: 2,
                    postCode: 'se',
                    postName: '项目经理',
                    postSort: 2,
                    status: '0',
                    flag: false
                },
                {
                    createBy: 'admin',
                    createTime: '2025-05-25 23:54:42',
                    updateBy: null,
                    updateTime: null,
                    remark: '',
                    postId: 3,
                    postCode: 'hr',
                    postName: '人力资源',
                    postSort: 3,
                    status: '0',
                    flag: false
                },
                {
                    createBy: 'admin',
                    createTime: '2025-05-25 23:54:42',
                    updateBy: null,
                    updateTime: null,
                    remark: '',
                    postId: 4,
                    postCode: 'user',
                    postName: '普通员工',
                    postSort: 4,
                    status: '0',
                    flag: false
                }
            ]
            let rows = allRows;
            if (query.postCode) {
                rows = allRows.filter(item => item.postCode.includes(query.postCode));
            }
            if (query.postName) {
                rows = allRows.filter(item => item.postName.includes(query.postName));
            }
            if (query.status !== undefined && query.status !== '') {
                rows = rows.filter(u => String(u.status) === String(query.status));
            }
            return {
                msg: '操作成功',
                code: 200,
                rows,
                total: rows.length
            }
        }
    }
] as MockMethod[]