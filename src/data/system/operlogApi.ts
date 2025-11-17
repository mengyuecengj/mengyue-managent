import { ApiDefinition } from "@/types/views/api";

export const apiOperlog = ref<ApiDefinition[]>([
  {
    key: 'operlog-list',
    method: 'GET',
    url: '/dev-api/monitor/operlog/list',
    description: '查询操作日志列表',
    requiresAuth: true,
    request: {
      query: {
        operIp: 'string?',
        operUrl: 'string?',
        title: 'string?',
        operName: 'string?',
        businessType: 'string?',
        status: 'string?',
        operTime: 'string[]?'
      }
    },
    response: {
      msg: '查询成功',
      code: 200,
      total: 2,
      rows: [
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
      ]
    },
    codeExample: `// 查询操作日志列表
export function list(query: any) {
    return request({
        url: '/monitor/operlog/list',
        method: 'get',
        params: query
    })
}`
  },
  {
    key: 'delete-operlog',
    method: 'DELETE',
    url: '/dev-api/monitor/operlog/:operId',
    description: '删除操作日志',
    requiresAuth: true,
    request: {
      params: {
        operId: 'number'
      }
    },
    response: {
      code: 200,
      message: '删除成功',
      data: null
    },
    errorResponse: {
      code: 404,
      message: '操作日志不存在',
      data: null
    },
    codeExample: `//删除操作日志
export function delOperlog(operId: any) {
    return request({
        url: '/monitor/operlog/' + operId,
        method: 'delete'
    })
}`
  },
  {
    key: 'clean-operlog',
    method: 'DELETE',
    url: '/dev-api/monitor/operlog/clean',
    description: '清空操作日志',
    requiresAuth: true,
    response: {
      msg: '清空成功',
      code: 200
    },
    codeExample: `// 清空操作日志
export function cleanOperlog() {
    return request({
        url: '/monitor/operlog/clean',
        method: 'delete'
    })
}`
  }
])