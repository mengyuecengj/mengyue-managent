import { MockMethod } from 'vite-plugin-mock'

// 模拟数据库存储
let noticeData = [
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
    },
]

// 自动计算下一个 ID
let nextNoticeId = Math.max(...noticeData.map(d => d.noticeId), 0) + 1;

// 【持久化函数】
function saveMockNotices() {
    if (typeof window === 'undefined') return;
    try {
        const cleanList = noticeData.map(d => ({
            ...d,
            noticeId: Number(d.noticeId),
            status: String(d.status),
            noticeType: String(d.noticeType),
        }));
        const data = { version: '1.0', list: cleanList, nextNoticeId };
        localStorage.setItem('noticeData', JSON.stringify(data));
    } catch (e) {
        console.warn('Mock: 保存公告失败:', e);
    }
}

// 【初始化加载】
if (typeof window !== 'undefined') {
    const storedNotices = localStorage.getItem('noticeData');
    if (storedNotices) {
        try {
            const parsed = JSON.parse(storedNotices);
            if (parsed?.version === '1.0' && Array.isArray(parsed?.list)) {
                noticeData = parsed.list;
                nextNoticeId = parsed.nextNoticeId || Math.max(...noticeData.map(d => d.noticeId), 0) + 1;
            } else {
                localStorage.removeItem('noticeData');
            }
        } catch (e) {
            localStorage.removeItem('noticeData');
        }
    }
    saveMockNotices();
}

export default [
    // 查询公告列表
    {
        url: '/dev-api/system/notice/list',
        method: 'get',
        timeout: 200,
        response: (request: any) => {
            // 从 query 参数中获取搜索条件 - 添加 createBy
            const { noticeTitle, createBy, noticeType, status, pageNum = 1, pageSize = 10 } = request.query;

            // 筛选数据 - 修复逻辑
            let filteredData = [...noticeData];

            // 公告标题筛选（支持模糊匹配）
            if (noticeTitle && noticeTitle.trim() !== '') {
                filteredData = filteredData.filter(item =>
                    item.noticeTitle && item.noticeTitle.includes(noticeTitle)
                );
            }

            // 新增：操作人员筛选（支持模糊匹配）
            if (createBy && createBy.trim() !== '') {
                filteredData = filteredData.filter(item =>
                    item.createBy && item.createBy.toLowerCase().includes(createBy.toLowerCase())
                );
            }

            // 公告类型筛选（精确匹配）
            if (noticeType !== undefined && noticeType !== '' && noticeType !== 'undefined') {
                filteredData = filteredData.filter(item =>
                    item.noticeType === noticeType
                );
            }

            // 状态筛选（精确匹配）
            if (status !== undefined && status !== '' && status !== 'undefined') {
                filteredData = filteredData.filter(item =>
                    item.status === status
                );
            }

            // 分页
            const start = (pageNum - 1) * pageSize;
            const end = start + pageSize;
            const pageData = filteredData.slice(start, end);

            return {
                code: 200,
                message: 'success',
                data: {
                    rows: pageData,
                    total: filteredData.length
                }
            };
        }
    },
    // 新增公告
    {
        url: '/dev-api/system/notice',
        method: 'post',
        response: (data: any) => {

            const newNotice = {
                noticeId: nextNoticeId++,
                noticeTitle: data.body.noticeTitle,
                noticeType: data.body.noticeType,
                noticeContent: data.body.noticeContent,
                status: data.body.status || '0',
                remark: data.body.remark || '',
                createBy: 'admin',
                createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
                updateBy: '',
                updateTime: null
            }

            // 添加到数据中
            noticeData.push(newNotice)
            saveMockNotices(); // 保存到本地存储

            return {
                code: 200,
                message: '新增成功',
                data: null
            }
        }
    },
    // 修改公告
    {
        url: '/dev-api/system/notice',
        method: 'put',
        response: (data: any) => {
            const { noticeId, noticeTitle, noticeType, noticeContent, status, remark } = data.body

            const index = noticeData.findIndex(item => item.noticeId === noticeId)
            if (index !== -1) {
                noticeData[index] = {
                    ...noticeData[index],
                    noticeTitle,
                    noticeType,
                    noticeContent,
                    status,
                    remark,
                    updateBy: 'admin',
                    updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
                }
                saveMockNotices(); // 保存到本地存储
            } else {
                console.warn('❌ Mock: 未找到要修改的公告')
            }

            return {
                code: 200,
                message: '修改成功',
                data: null
            }
        }
    },
    // 删除公告
    {
        url: /\/dev-api\/system\/notice\/\d+/,
        method: 'delete',
        response: ({ url: requestUrl }: { url: string }) => {
            // 提取 noticeId
            const noticeIdMatch = requestUrl.match(/\/dev-api\/system\/notice\/(\d+)/);
            const noticeId = noticeIdMatch ? parseInt(noticeIdMatch[1]) : null;

            if (!noticeId) {
                console.error('❌ Mock: 无法解析 noticeId');
                return {
                    code: 400,
                    message: '公告ID格式错误',
                    data: null
                };
            }

            const noticeIndex = noticeData.findIndex(d => d.noticeId === noticeId);

            if (noticeIndex !== -1) {
                // 删除数据
                const deletedItem = noticeData.splice(noticeIndex, 1);
                saveMockNotices();

                return {
                    code: 200,
                    message: '删除成功',
                    data: null
                };
            } else {
                console.warn('❌ Mock: 未找到要删除的公告，noticeId:', noticeId);
                return {
                    code: 404,
                    message: '公告不存在',
                    data: null
                };
            }
        }
    },
    // 查询公告详细
    {
        url: /\/dev-api\/system\/notice\/\d+/,
        method: 'get',
        response: ({ url: requestUrl }: { url: string }) => {
            // 提取 noticeId
            const noticeIdMatch = requestUrl.match(/\/system\/notice\/(\d+)/);
            const noticeId = noticeIdMatch ? parseInt(noticeIdMatch[1]) : null;

            if (!noticeId) {
                console.error('❌ Mock: 无法解析 noticeId');
                return {
                    code: 400,
                    message: '公告ID格式错误',
                    data: null
                };
            }

            const notice = noticeData.find(d => d.noticeId === noticeId);

            if (notice) {
                return {
                    code: 200,
                    message: 'success',
                    data: notice
                };
            } else {
                console.warn('❌ Mock: 未找到公告详情，noticeId:', noticeId);
                return {
                    code: 404,
                    message: '公告不存在',
                    data: null
                };
            }
        },
    }
] as MockMethod[]