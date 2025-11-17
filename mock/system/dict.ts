import { MockMethod } from 'vite-plugin-mock';

// 定义字典类型
interface DictItem {
    dictId: number;
    dictName: string;
    dictCode: string;
    status: string;
    remark: string;
    createTime: string;
}

// 维护状态的字典列表
let mockDictList: DictItem[] = [
    {
        dictId: 1,
        dictName: '用户性别',
        dictCode: 'sys_user_sex',
        status: '0',
        remark: '用户性别列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 2,
        dictName: '菜单状态',
        dictCode: 'sys_show_hide',
        status: '0',
        remark: '菜单状态列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 3,
        dictName: '系统开关',
        dictCode: 'sys_normal_disable',
        status: '0',
        remark: '系统开关列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 4,
        dictName: '任务状态',
        dictCode: 'sys_job_status',
        status: '0',
        remark: '任务状态列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 5,
        dictName: '任务分组',
        dictCode: 'sys_job_group',
        status: '0',
        remark: '任务分组列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 6,
        dictName: '操作类型',
        dictCode: 'sys_oper_type',
        status: '0',
        remark: '操作类型列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 7,
        dictName: '系统是否',
        dictCode: 'sys_yes_no',
        status: '0',
        remark: '系统是否列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 8,
        dictName: '通知状态',
        dictCode: 'sys_notice_status',
        status: '0',
        remark: '通知状态列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 9,
        dictName: '操作类型',
        dictCode: 'sys_oper_type',
        status: '0',
        remark: '操作类型列表',
        createTime: '2021-09-01 00:00:00',
    },
    {
        dictId: 10,
        dictName: '系统状态',
        dictCode: 'sys_yes_no',
        status: '0',
        remark: '系统状态列表',
        createTime: '2021-09-01 00:00:00'
    }
];

// 【持久化函数】
function saveMockDicts() {
    if (typeof window === 'undefined') return;
    try {
        const cleanList = mockDictList.map(d => ({
            ...d,
            dictId: Number(d.dictId),
            status: String(d.status),
        }));
        const data = { version: '1.0', list: cleanList };
        localStorage.setItem('mockDictList', JSON.stringify(data));
    } catch (e) {
        console.warn('Mock: 保存字典失败:', e);
    }
}

// 【初始化加载】
if (typeof window !== 'undefined') {
    const storedDicts = localStorage.getItem('mockDictList');
    if (storedDicts) {
        try {
            const parsed = JSON.parse(storedDicts);
            if (parsed?.version === '1.0' && Array.isArray(parsed?.list)) {
                mockDictList = parsed.list;
            } else {
                localStorage.removeItem('mockDictList');
            }
        } catch (e) {
            localStorage.removeItem('mockDictList');
        }
    }
    saveMockDicts();
}

export default [
    // 查询字典列表 - 修复数据结构，保持与原始一致
    {
        url: '/dev-api/system/dict/list',
        method: 'get',
        timeout: 200,
        response: ({ query }: { query: Record<string, string | undefined> }) => {
            const { dictName, dictCode, status } = query;
            let mockList = [...mockDictList];

            if (dictName) {
                mockList = mockList.filter((item) => item.dictName.includes(dictName));
            }
            if (dictCode) {
                mockList = mockList.filter((item) => item.dictCode.includes(dictCode));
            }
            if (status) {
                mockList = mockList.filter((item) => item.status.includes(status));
            }

            return {
                code: 200,
                msg: '操作成功',
                data: mockList  // 保持原始数据结构，使用 data 而不是 rows
            }
        }
    },

    // 查询字典详情
    {
        url: /\/dev-api\/system\/dict\/\d+/,
        method: 'get',
        timeout: 200,
        response: ({ url: requestUrl }: { url: string }) => {
            const dictId = requestUrl.match(/\/system\/dict\/(\d+)/)?.[1];
            const dict = mockDictList.find(d => d.dictId === parseInt(dictId || '0')) || {
                dictId: parseInt(dictId || '0'),
                dictName: '未知字典',
                dictCode: 'unknown',
                status: '0',
                remark: '字典不存在',
                createTime: new Date().toISOString().replace('T', ' ').substr(0, 19)
            };

            return {
                msg: '操作成功',
                code: 200,
                data: dict,
            };
        },
    },

    // 新增字典
    {
        url: '/dev-api/system/dict',
        method: 'post',
        timeout: 200,
        response: ({ body }: { body: any }) => {
            const dictData = typeof body === 'string' ? JSON.parse(body) : body;

            // 检查字典名称是否重复
            const existDictName = mockDictList.find(dict => dict.dictName === dictData.dictName);
            if (existDictName) {
                return {
                    msg: '字典名称已存在',
                    code: 500,
                    data: null,
                };
            }

            // 检查字典编码是否重复
            const existDictCode = mockDictList.find(dict => dict.dictCode === dictData.dictCode);
            if (existDictCode) {
                return {
                    msg: '字典编码已存在',
                    code: 500,
                    data: null,
                };
            }

            const newDictId = mockDictList.length > 0
                ? Math.max(...mockDictList.map(d => d.dictId)) + 1
                : 1;

            const newDict: DictItem = {
                dictId: newDictId,
                dictName: dictData.dictName,
                dictCode: dictData.dictCode,
                status: String(dictData.status || '0'),
                remark: dictData.remark || '',
                createTime: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            mockDictList.push(newDict);

            saveMockDicts();

            return {
                msg: '新增成功',
                code: 200,
                data: null,
            };
        },
    },

    // 修改字典
    {
        url: '/dev-api/system/dict',
        method: 'put',
        timeout: 200,
        response: ({ body }: { body: any }) => {
            const dictData = typeof body === 'string' ? JSON.parse(body) : body;
            const dictIndex = mockDictList.findIndex(d => d.dictId === Number(dictData.dictId));

            if (dictIndex !== -1) {
                // 检查字典名称重复（排除自己）
                const existDictName = mockDictList.find(dict =>
                    dict.dictName === dictData.dictName && dict.dictId !== Number(dictData.dictId)
                );
                if (existDictName) {
                    return {
                        msg: '字典名称已存在',
                        code: 500,
                        data: null,
                    };
                }

                // 检查字典编码重复（排除自己）
                const existDictCode = mockDictList.find(dict =>
                    dict.dictCode === dictData.dictCode && dict.dictId !== Number(dictData.dictId)
                );
                if (existDictCode) {
                    return {
                        msg: '字典编码已存在',
                        code: 500,
                        data: null,
                    };
                }

                mockDictList[dictIndex] = {
                    ...mockDictList[dictIndex],
                    ...dictData,
                    status: String(dictData.status || mockDictList[dictIndex].status),
                };

                saveMockDicts();

                return {
                    msg: '修改成功',
                    code: 200,
                    data: null,
                };
            } else {
                return {
                    msg: '字典不存在',
                    code: 500,
                    data: null,
                };
            }
        },
    },

    // 删除字典
    {
        url: /\/dev-api\/system\/dict\/\d+/,
        method: 'delete',
        timeout: 200,
        response: ({ url: requestUrl }: { url: string }) => {
            const dictId = requestUrl.match(/\/system\/dict\/(\d+)/)?.[1];

            if (dictId) {
                const dictIndex = mockDictList.findIndex(d => d.dictId === parseInt(dictId));

                if (dictIndex !== -1) {
                    mockDictList.splice(dictIndex, 1);

                    saveMockDicts();

                    return {
                        msg: '删除成功',
                        code: 200,
                        data: null,
                    };
                }
            }

            return {
                msg: '字典不存在',
                code: 500,
                data: null,
            };
        },
    },

    // 字典状态修改
    {
        url: '/dev-api/system/dict/changeStatus',
        method: 'put',
        timeout: 200,
        response: ({ body }: { body: any }) => {

            const dict = mockDictList.find(d => d.dictId === Number(body.dictId));

            if (dict) {
                dict.status = String(body.status);

                saveMockDicts();

                return {
                    msg: '状态修改成功',
                    code: 200,
                    data: null,
                };
            }

            return {
                msg: '字典不存在',
                code: 500,
                data: null,
            };
        },
    },

    // 刷新字典缓存
    {
        url: '/dev-api/system/dict/refreshCache',
        method: 'delete',
        timeout: 200,
        response: () => ({
            msg: '刷新缓存成功',
            code: 200,
            data: null,
        }),
    },
] as MockMethod[];
