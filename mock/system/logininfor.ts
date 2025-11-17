import { MockMethod } from 'vite-plugin-mock';

// 定义登录日志项的接口
interface LoginLogItem {
  createBy: string | null;
  createTime: string | null;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  infoId: number;
  userName: string;
  status: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  msg: string;
  loginTime: string;
}

// mock 数据 - 使用 let 以便修改
let loginLogList: LoginLogItem[] = [
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 121,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 11",
    msg: "登录成功",
    loginTime: "2025-05-26 18:36:09"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 120,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Mac OS X",
    msg: "登录成功",
    loginTime: "2025-05-26 17:54:34"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 119,
    userName: "admin",
    status: "1",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "验证码错误",
    loginTime: "2025-05-26 17:54:31"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 118,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Android 1.x",
    msg: "登录成功",
    loginTime: "2025-05-26 17:50:49"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 117,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "退出成功",
    loginTime: "2025-05-26 17:50:46"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 116,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "登录成功",
    loginTime: "2025-05-26 17:30:46"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 115,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "登录成功",
    loginTime: "2025-05-26 16:55:03"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 114,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "登录成功",
    loginTime: "2025-05-26 15:38:34"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 113,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "登录成功",
    loginTime: "2025-05-26 12:11:15"
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    infoId: 112,
    userName: "admin",
    status: "0",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    msg: "登录成功",
    loginTime: "2025-05-26 11:59:06"
  }
];

// 自动计算下一个 ID
let nextInfoId = Math.max(...loginLogList.map(d => d.infoId), 0) + 1;

// 【持久化函数】
function saveMockLoginLogs() {
    if (typeof window === 'undefined') return;
    try {
        const cleanList = loginLogList.map(d => ({
            ...d,
            infoId: Number(d.infoId),
            status: String(d.status),
        }));
        const data = { version: '1.0', list: cleanList, nextInfoId };
        localStorage.setItem('loginLogList', JSON.stringify(data));
    } catch (e) {
        console.warn('Mock: 保存登录日志失败:', e);
    }
}

// 【初始化加载】
if (typeof window !== 'undefined') {
    const storedLogs = localStorage.getItem('loginLogList');
    if (storedLogs) {
        try {
            const parsed = JSON.parse(storedLogs);
            if (parsed?.version === '1.0' && Array.isArray(parsed?.list)) {
                loginLogList = parsed.list;
                nextInfoId = parsed.nextInfoId || Math.max(...loginLogList.map(d => d.infoId), 0) + 1;
            } else {
                localStorage.removeItem('loginLogList');
            }
        } catch (e) {
            localStorage.removeItem('loginLogList');
        }
    }
    saveMockLoginLogs();
}

function filterData(query: any) {
  let result = [...loginLogList]; // 创建副本避免修改原数组

  // 登录地址
  if (query.ipaddr && query.ipaddr.trim() !== '') {
    result = result.filter(item => item.ipaddr.includes(query.ipaddr));
  }
  // 用户名称
  if (query.userName && query.userName.trim() !== '') {
    result = result.filter(item => item.userName.includes(query.userName));
  }
  // 状态
  if (query.status !== undefined && query.status !== '' && query.status !== 'undefined') {
    result = result.filter(item => String(item.status) === String(query.status));
  }
  // 登录时间（支持区间，格式：[start, end]）
  if (query.loginTime && Array.isArray(query.loginTime) && query.loginTime.length === 2) {
    const [start, end] = query.loginTime;
    result = result.filter(item => item.loginTime >= start && item.loginTime <= end);
  }

  return result;
}

export default [
  {
    url: '/dev-api/monitor/logininfor/list',
    method: 'get',
    response: ({ query }: { query: Record<string, any> }) => {
      const rows = filterData(query);
      return {
        total: rows.length,
        rows,
        code: 200,
        msg: "查询成功"
      };
    }
  },
  // 删除登录日志接口
  {
    url: /\/dev-api\/monitor\/logininfor\/\d+/,
    method: 'delete',
    response: ({ url: requestUrl }: { url: string }) => {
      // 提取 infoId
      const infoIdMatch = requestUrl.match(/\/dev-api\/monitor\/logininfor\/(\d+)/);
      const infoId = infoIdMatch ? parseInt(infoIdMatch[1]) : null;

      if (!infoId) {
        console.error('❌ Mock: 无法解析 infoId');
        return {
          code: 400,
          message: '参数ID格式错误',
          data: null
        };
      }

      const logIndex = loginLogList.findIndex(d => d.infoId === infoId);

      if (logIndex !== -1) {
        // 删除数据
        loginLogList.splice(logIndex, 1);
        saveMockLoginLogs();
        return {
          code: 200,
          message: '删除成功',
          data: null
        };
      } else {
        console.warn('❌ Mock: 未找到要删除的登录日志，infoId:', infoId);
        return {
          code: 404,
          message: '登录日志不存在',
          data: null
        };
      }
    }
  },
  // 批量删除登录日志接口
  {
    url: '/dev-api/monitor/logininfor',
    method: 'delete',
    response: ({ body }: { body: { infoIds: number[] } }) => {
      const { infoIds } = body;
      
      if (!infoIds || !Array.isArray(infoIds) || infoIds.length === 0) {
        return {
          code: 400,
          message: '参数错误：请提供要删除的日志ID数组',
          data: null
        };
      }

      const originalLength = loginLogList.length;
      // 过滤掉要删除的日志
      loginLogList = loginLogList.filter(item => !infoIds.includes(item.infoId));
      saveMockLoginLogs();
      
      const deletedCount = originalLength - loginLogList.length;
      
      return {
        code: 200,
        message: `删除成功，共删除 ${deletedCount} 条记录`,
        data: null
      };
    }
  },
  // 清空登录日志接口
  {
    url: '/dev-api/monitor/logininfor/clean',
    method: 'delete',
    response: () => {
      const originalLength = loginLogList.length;
      // 清空所有日志
      loginLogList = [];
      saveMockLoginLogs();
            
      return {
        code: 200,
        message: `清空成功，共清除 ${originalLength} 条记录`,
        data: null
      };
    }
  },
  // 解锁用户登录接口（如果需要的话）
  {
    url: '/dev-api/monitor/logininfor/unlock',
    method: 'post',
    response: ({ body }: { body: { userName: string } }) => {
      const { userName } = body;
      
      if (!userName) {
        return {
          code: 400,
          message: '参数错误：请提供用户名',
          data: null
        };
      }
            
      return {
        code: 200,
        message: `用户 ${userName} 解锁成功`,
        data: null
      };
    }
  }
] as MockMethod[];