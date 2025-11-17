import { MockMethod } from 'vite-plugin-mock';

// 定义操作日志项的接口
interface OperLogItem {
  createBy: string | null;
  createTime: string | null;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  operId: number;
  title: string;
  businessType: number;
  businessTypes: number[] | null;
  method: string;
  requestMethod: string;
  operatorType: number;
  operName: string;
  deptName: string;
  operUrl: string;
  operIp: string;
  operLocation: string;
  operParam: string;
  jsonResult: string;
  status: number;
  errorMsg: string | null;
  operTime: string;
  costTime: number;
}

// mock 数据 - 使用 let 以便修改
let operLogList: OperLogItem[] = [
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    operId: 101,
    title: "角色管理",
    businessType: 3,
    businessTypes: null,
    method: "com.web.controller.system.SysRoleController.edit()",
    requestMethod: "PUT",
    operatorType: 1,
    operName: "admin",
    deptName: "研发部门",
    operUrl: "/system/role",
    operIp: "127.0.0.1",
    operLocation: "内网IP",
    operParam: "{\"admin\":false,\"createTime\":\"2025-05-25 23:54:42\",\"dataScope\":\"2\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":true,\"menuIds\":[1,100,1000,1001,1002,1003,1004,1005,1006,101,1007,1008,1009,1010,1011,102,1012,1013,1014,1015,103,1016,1017,1018,1019,104,1020,1021,1022,1023,1024,107,1035,1036,1037,1038,108,500,1039,1040,1041,501,1042,1043,1044,1045,2,109,1046,1047,1048,110,1049,1050,1051,1052,1053,1054,111,112,113,114],\"params\":{},\"remark\":\"普通角色\",\"roleId\":2,\"roleKey\":\"common\",\"roleName\":\"普通角色\",\"roleSort\":2,\"status\":\"0\",\"updateBy\":\"admin\"}",
    jsonResult: "{\"msg\":\"操作成功\",\"code\":200}",
    status: 0,
    errorMsg: null,
    operTime: "2025-05-26 01:11:47",
    costTime: 19
  },
  {
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    operId: 100,
    title: "角色管理",
    businessType: 0,
    businessTypes: null,
    method: "com.web.controller.system.SysRoleController.edit()",
    requestMethod: "PUT",
    operatorType: 1,
    operName: "admin",
    deptName: "研发部门",
    operUrl: "/system/role",
    operIp: "127.0.0.1",
    operLocation: "内网IP",
    operParam: "{\"admin\":false,\"createTime\":\"2025-05-25 23:54:42\",\"dataScope\":\"2\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"flag\":false,\"menuCheckStrictly\":true,\"menuIds\":[1,100,1000,1001,1002,1003,1004,1005,1006,101,1007,1008,1009,1010,1011,102,1012,1013,1014,1015,103,1016,1017,1018,1019,104,1020,1021,1022,1023,1024,107,1035,1036,1037,1038,108,500,1039,1040,1041,501,1042,1043,1044,1045,2,109,1046,1047,1048,110,1049,1050,1051,1052,1053,1054,111,112,113,114],\"params\":{},\"remark\":\"普通角色\",\"roleId\":2,\"roleKey\":\"common\",\"roleName\":\"普通角色\",\"roleSort\":2,\"status\":\"0\",\"updateBy\":\"admin\"}",
    jsonResult: "{\"msg\":\"操作成功\",\"code\":200}",
    status: 0,
    errorMsg: null,
    operTime: "2025-05-26 01:11:46",
    costTime: 55
  }
];

// 自动计算下一个 ID
let nextOperId = Math.max(...operLogList.map(d => d.operId), 0) + 1;

// 【持久化函数】
function saveMockOpers() {
    if (typeof window === 'undefined') return;
    try {
        const cleanList = operLogList.map(d => ({
            ...d,
            operId: Number(d.operId),
            status: Number(d.status),
        }));
        const data = { version: '1.0', list: cleanList, nextOperId };
        localStorage.setItem('operLogList', JSON.stringify(data));
    } catch (e) {
        console.warn('Mock: 保存操作日志失败:', e);
    }
}

// 【初始化加载】
if (typeof window !== 'undefined') {
    const storedOpers = localStorage.getItem('operLogList');
    if (storedOpers) {
        try {
            const parsed = JSON.parse(storedOpers);
            if (parsed?.version === '1.0' && Array.isArray(parsed?.list)) {
                operLogList = parsed.list; // 修复：赋值给 operLogList 而不是 operData
                nextOperId = parsed.nextOperId || Math.max(...operLogList.map(d => d.operId), 0) + 1;
            } else {
                localStorage.removeItem('operLogList');
            }
        } catch (e) {
            localStorage.removeItem('operLogList');
        }
    }
    saveMockOpers(); // 修复：调用正确的保存函数
}

// 过滤函数
function filterOperLog(list: OperLogItem[], query: any): OperLogItem[] {
  let result = list;

  if (query.operIp && query.operIp.trim() !== "") {
    result = result.filter(item => item.operIp.includes(query.operIp));
  }
  if (query.operUrl && query.operUrl.trim() !== "") {
    result = result.filter(item => item.operUrl.includes(query.operUrl));
  }
  if (query.title && query.title.trim() !== "") {
    result = result.filter(item => item.title.includes(query.title));
  }
  if (query.operName && query.operName.trim() !== "") {
    result = result.filter(item => item.operName.includes(query.operName));
  }
  if (query.businessType && query.businessType !== "") {
    result = result.filter(item => String(item.businessType) === String(query.businessType));
  }
  if (query.status !== undefined && query.status !== "") {
    result = result.filter(item => String(item.status) === String(query.status));
  }
  // 操作时间区间过滤（格式：[start, end]）
  if (query.operTime && Array.isArray(query.operTime) && query.operTime.length === 2) {
    const [start, end] = query.operTime;
    result = result.filter(item => item.operTime >= start && item.operTime <= end);
  }

  return result;
}

// 定义响应接口
interface MockResponse {
  msg: string;
  code: number;
  total?: number;
  rows?: OperLogItem[];
}

// mock 配置
export default [
  {
    url: '/dev-api/monitor/operlog/list',
    method: 'get',
    timeout: 200,
    response: ({ query }): MockResponse => {
      const rows = filterOperLog(operLogList, query);
      return {
        msg: '查询成功',
        code: 200,
        total: rows.length,
        rows
      }
    }
  },
  // 删除操作日志接口 - 修复URL匹配和变量名
  {
    url: /\/dev-api\/monitor\/operlog\/\d+/, // 修复：正确的URL模式
    method: 'delete',
    response: ({ url: requestUrl }: { url: string }) => {
      // 提取 operId - 修复：使用正确的正则表达式
      const operIdMatch = requestUrl.match(/\/dev-api\/monitor\/operlog\/(\d+)/);
      const operId = operIdMatch ? parseInt(operIdMatch[1]) : null;

      if (!operId) {
        console.error('❌ Mock: 无法解析 operId');
        return {
          code: 400,
          message: '参数ID格式错误',
          data: null
        };
      }

      const operIndex = operLogList.findIndex(d => d.operId === operId);

      if (operIndex !== -1) {
        // 删除数据
        operLogList.splice(operIndex, 1);
        saveMockOpers();
        return {
          code: 200,
          message: '删除成功',
          data: null
        };
      } else {
        console.warn('❌ Mock: 未找到要删除的操作日志，operId:', operId); // 修复：正确的变量名
        return {
          code: 404,
          message: '操作日志不存在',
          data: null
        };
      }
    }
  },
  // 清空操作日志接口
  {
    url: '/dev-api/monitor/operlog/clean',
    method: 'delete',
    timeout: 200,
    response: (): MockResponse => {
      // 清空所有日志
      operLogList = [];
      saveMockOpers(); // 保存清空后的状态

      return {
        msg: '清空成功',
        code: 200
      };
    }
  }
] as MockMethod[];