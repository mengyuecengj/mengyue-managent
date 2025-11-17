import { MockMethod } from 'vite-plugin-mock';

// 使用 let 以便修改数据
let onlineUsers = [
  {
    tokenId: "211161b2-54be-4a80-8285-69d9dc3e0e35",
    deptName: "研发部门",
    userName: "admin",
    ipaddr: "127.0.0.1",
    loginLocation: "内网IP",
    browser: "Chrome 13",
    os: "Windows 10",
    loginTime: 1748262383784
  },
];

export default [
  {
    url: '/dev-api/monitor/online/list',
    method: 'get',
    response: ({ query }) => {
      let rows = [...onlineUsers];

      // 过滤条件
      if (query?.ipaddr && query.ipaddr.trim() !== '') {
        rows = rows.filter(item => item.ipaddr.includes(query.ipaddr));
      }
      if (query?.userName && query.userName.trim() !== '') {
        rows = rows.filter(item => item.userName.includes(query.userName));
      }
      if (query?.loginLocation && query.loginLocation.trim() !== '') {
        rows = rows.filter(item => item.loginLocation.includes(query.loginLocation));
      }
      if (query?.os && query.os.trim() !== '') {
        rows = rows.filter(item => item.os.includes(query.os));
      }

      // 分页处理
      const pageNum = parseInt(query?.pageNum) || 1;
      const pageSize = parseInt(query?.pageSize) || 10;
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      
      const pagedRows = rows.slice(startIndex, endIndex);
      
      const rowsWithIndex = pagedRows.map((item, index) => ({
        ...item,
        index: startIndex + index + 1
      }));

      return {
        total: rows.length,
        rows: rowsWithIndex,
        code: 200,
        msg: "查询成功"
      };
    }
  },
  // 强退接口 - 使用参数化URL
  {
    url: '/dev-api/monitor/online/:tokenId',
    method: 'delete',
    response: (request) => {
      const { tokenId } = request.params;      
      if (!tokenId) {
        return {
          code: 400,
          message: '参数错误：请提供tokenId',
          data: null
        };
      }
      
      // 从在线用户列表中移除该tokenId对应的用户
      const originalLength = onlineUsers.length;
      onlineUsers = onlineUsers.filter(user => user.tokenId !== tokenId);
      const deletedCount = originalLength - onlineUsers.length;
      
      if (deletedCount > 0) {
        return {
          code: 200,
          message: '强退成功',
          data: null
        };
      } else {
        console.warn(`❌ Mock: 未找到要强退的用户，tokenId: ${tokenId}`);
        return {
          code: 404,
          message: '用户不存在或已被强退',
          data: null
        };
      }
    }
  }
] as MockMethod[];
