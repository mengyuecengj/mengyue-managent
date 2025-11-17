import { MockMethod } from 'vite-plugin-mock'

// 模拟数据库存储
let configData = [
    {
        configId: 1,
        configName: '主框架页-默认皮肤样式名称',
        configCode: 'sys.index.skinName',
        configValue: 'skin-blue',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    },
    {
        configId: 2,
        configName: '主框架页-默认主题样式名称',
        configCode: 'sys.index.theme',
        configValue: 'theme-dark',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    },
    {
        configId: 3,
        configName: '主框架页-自动刷新',
        configCode: 'sys.index.autoRefresh',
        configValue: 'true',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    },
    {
        configId: 4,
        configName: '主框架页-侧边栏主题',
        configCode: 'sys.index.sideTheme',
        configValue: 'theme-dark',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    },
    {
        configId: 5,
        configName: '主框架页-是否开启页脚',
        configCode: 'sys.index.footer',
        configValue: 'true',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    },
    {
        configId: 6,
        configName: '主框架页-是否开启页脚',
        configCode: 'sys.index.footer',
        configValue: 'true',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    },
    {
        configId: 7,
        configName: '主框架页-是否开启页脚',
        configCode: 'sys.index.footer',
        configValue: 'true',
        status: '0',
        createTime: '2021-09-01 00:00:00',
    }
]

// 自动计算下一个 ID
let nextConfigId = Math.max(...configData.map(d => d.configId), 0) + 1;

// 【持久化函数】
function saveMockConfigs() {
    if (typeof window === 'undefined') return;
    try {
        const cleanList = configData.map(d => ({
            ...d,
            configId: Number(d.configId),
            status: String(d.status),
        }));
        const data = { version: '1.0', list: cleanList, nextConfigId };
        localStorage.setItem('configData', JSON.stringify(data));
    } catch (e) {
        console.warn('Mock: 保存配置失败:', e);
    }
}

// 【初始化加载】
if (typeof window !== 'undefined') {
    const storedConfigs = localStorage.getItem('configData');
    if (storedConfigs) {
        try {
            const parsed = JSON.parse(storedConfigs);
            if (parsed?.version === '1.0' && Array.isArray(parsed?.list)) {
                configData = parsed.list;
                nextConfigId = parsed.nextConfigId || Math.max(...configData.map(d => d.configId), 0) + 1;
            } else {
                localStorage.removeItem('configData');
            }
        } catch (e) {
            localStorage.removeItem('configData');
        }
    }
    saveMockConfigs();
}

export default [
    // 查询参数列表
    {
        url: '/dev-api/system/config/list',
        method: 'get',
        response: (request: any) => {
            // 从 query 参数中获取搜索条件
            const { configName, configCode, status, pageNum = 1, pageSize = 10 } = request.query;

            // 筛选数据 - 修复逻辑
            let filteredData = [...configData];

            // 参数名称筛选（支持模糊匹配）
            if (configName && configName.trim() !== '') {
                filteredData = filteredData.filter(item =>
                    item.configName && item.configName.includes(configName)
                );
            }

            // 参数键名筛选（支持模糊匹配）
            if (configCode && configCode.trim() !== '') {
                filteredData = filteredData.filter(item =>
                    item.configCode && item.configCode.includes(configCode)
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
    // 新增参数
    {
        url: '/dev-api/system/config',
        method: 'post',
        response: (data: any) => {

            const newConfig = {
                configId: nextConfigId++,
                configName: data.body.configName,
                configCode: data.body.configCode,
                configValue: data.body.configValue,
                status: data.body.status || '0',
                remark: data.body.remark || '',
                createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
            }

            // 添加到数据中
            configData.push(newConfig)
            saveMockConfigs(); // 保存到本地存储

            return {
                code: 200,
                message: '新增成功',
                data: null
            }
        }
    },
    // 修改参数
    {
        url: '/dev-api/system/config',
        method: 'put',
        response: (data: any) => {

            const { configId, configName, configCode, configValue, status, remark } = data.body

            const index = configData.findIndex(item => item.configId === configId)
            if (index !== -1) {
                configData[index] = {
                    ...configData[index],
                    configName,
                    configCode,
                    configValue,
                    status,
                    remark
                }
                saveMockConfigs(); // 保存到本地存储
            } else {
                console.warn('❌ Mock: 未找到要修改的参数')
            }

            return {
                code: 200,
                message: '修改成功',
                data: null
            }
        }
    },
    // 删除参数
    {
        url: /\/dev-api\/system\/config\/\d+/,
        method: 'delete',
        response: ({ url: requestUrl }: { url: string }) => {
            // 提取 configId
            const configIdMatch = requestUrl.match(/\/dev-api\/system\/config\/(\d+)/);
            const configId = configIdMatch ? parseInt(configIdMatch[1]) : null;

            if (!configId) {
                console.error('❌ Mock: 无法解析 configId');
                return {
                    code: 400,
                    message: '参数ID格式错误',
                    data: null
                };
            }

            const configIndex = configData.findIndex(d => d.configId === configId);

            if (configIndex !== -1) {
                // 删除数据
                const deletedItem = configData.splice(configIndex, 1);
                saveMockConfigs();

                return {
                    code: 200,
                    message: '删除成功',
                    data: null
                };
            } else {
                console.warn('❌ Mock: 未找到要删除的参数，configId:', configId);
                return {
                    code: 404,
                    message: '参数不存在',
                    data: null
                };
            }
        }
    },
    // 刷新缓存
    {
        url: '/dev-api/system/config/refreshCache',
        method: 'delete',
        response: () => {
            return {
                code: 200,
                message: '刷新缓存成功',
                data: null
            }
        }
    },
    // 查询参数详细 - ✅ 修复后的版本
    {
        url: /\/dev-api\/system\/config\/\d+/,
        method: 'get',
        response: ({ url: requestUrl }: { url: string }) => {
            // 提取 configId
            const configIdMatch = requestUrl.match(/\/system\/config\/(\d+)/);
            const configId = configIdMatch ? parseInt(configIdMatch[1]) : null;

            if (!configId) {
                console.error('❌ Mock: 无法解析 configId');
                return {
                    code: 400,
                    message: '参数ID格式错误',
                    data: null
                };
            }

            // ✅ 修复：使用 configId 而不是 config
            const config = configData.find(d => d.configId === configId);

            if (config) {
                return {
                    code: 200,
                    message: 'success',
                    data: config
                };
            } else {
                console.warn('❌ Mock: 未找到参数详情，configId:', configId);
                return {
                    code: 404,
                    message: '参数不存在',
                    data: null
                };
            }
        },
    }
] as MockMethod[]
