import { MockMethod } from 'vite-plugin-mock';

let roles = [
  {
    createBy: null,
    createTime: '2025-05-25 23:54:42',
    updateBy: null,
    updateTime: null,
    remark: '超级管理员',
    roleId: 1,
    roleName: '超级管理员',
    roleKey: 'admin',
    roleSort: 1,
    dataScope: '1',
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    status: '0',
    delFlag: '0',
    flag: false,
    menuIds: [],
    deptIds: [],
    permissions: null,
    admin: true
  },
  {
    createBy: null,
    createTime: '2025-05-25 23:54:42',
    updateBy: null,
    updateTime: null,
    remark: '普通角色',
    roleId: 2,
    roleName: '普通角色',
    roleKey: 'common',
    roleSort: 2,
    dataScope: '2',
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    status: '0',
    delFlag: '0',
    flag: false,
    menuIds: [],
    deptIds: [],
    permissions: null,
    admin: false
  }
];

let nextRoleId = 3;

// mock用户数据
let users = [
  {
    userId: 1,
    userName: 'admin',
    nickName: '超级管理员',
    email: 'admin@mengyue.vip',
    phonenumber: '13800000000',
    status: '0',
    createTime: '2025-05-25 23:54:42',
    roleIds: [1]
  },
  {
    userId: 2,
    userName: 'my',
    nickName: '普通用户',
    email: 'my@mengyue.vip',
    phonenumber: '13800000001',
    status: '0',
    createTime: '2025-05-25 23:54:42',
    roleIds: [2]
  },
  {
    userId: 3,
    userName: 'test',
    nickName: '测试用户',
    email: 'test@mengyue.vip',
    phonenumber: '13900000000',
    status: '0',
    createTime: '2025-05-25 23:54:42',
    roleIds: [3]
  },
];

// 完整菜单树（与 getRouters 保持一致，id 唯一）
const menuTree = [
  {
    id: 1,
    label: '系统管理',
    children: [
      { id: 2, label: '用户管理' },
      { id: 3, label: '角色管理' },
      { id: 4, label: '菜单管理' },
      { id: 5, label: '部门管理' },
      { id: 6, label: '岗位管理' },
      { id: 7, label: '字典管理' },
      { id: 8, label: '参数设置' },
      { id: 9, label: '通知公告' },
      {
        id: 10,
        label: '日志管理',
        children: [
          { id: 11, label: '操作日志' },
          { id: 12, label: '登录日志' }
        ]
      }
    ]
  },
  {
    id: 13,
    label: '系统监控',
    children: [
      { id: 14, label: '在线用户' },
      { id: 15, label: '服务监控' },
      { id: 16, label: '缓存监控' },
    ]
  },
  {
    id: 17,
    label: '系统工具',
    children: [
      { id: 18, label: '表单构建' },
      { id: 19, label: '代码生成' },
      { id: 20, label: '单页生成' },
      { id: 21, label: '系统接口' }
    ]
  }
];

// 完整的部门树结构
const deptTree = [
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
          { id: 107, label: '运维部门' },
          { id: 108, label: '人事部门' },
          // { id: 109, label: '行政部' }
        ]
      },
      {
        id: 102,
        label: '长沙分公司',
        children: [
          { id: 110, label: '市场部门' },
          { id: 111, label: '财务部门' },
          // { id: 112, label: '运维部门' },
          // { id: 113, label: '技术支撑部' }
        ]
      },
      // {
      //   id: 114,
      //   label: '北京分公司',
      //   children: [
      //     { id: 115, label: '销售部' },
      //     { id: 116, label: '市场部' },
      //     { id: 117, label: '客户服务部' },
      //     { id: 118, label: '技术部' }
      //   ]
      // },
      // {
      //   id: 119,
      //   label: '上海研发中心',
      //   children: [
      //     { id: 120, label: '前端研发部' },
      //     { id: 121, label: '后端研发部' },
      //     { id: 122, label: '移动端研发部' },
      //     { id: 123, label: '测试部' },
      //     { id: 124, label: '产品部' }
      //   ]
      // }
    ]
  }
];

// 获取所有部门ID的辅助函数
function getAllDeptIds(nodes: any[]): number[] {
  const ids: number[] = [];
  const traverse = (nodeList: any[]) => {
    nodeList.forEach(node => {
      if (node.id) {
        ids.push(node.id);
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  };
  traverse(nodes);
  return ids;
}

export default [
  // 角色列表
  {
    url: '/dev-api/system/role/list',
    method: 'get',
    timeout: 200,
    response: ({ query }) => {
      const beginTime = query['params[beginTime]'];
      const endTime = query['params[endTime]'];
      const params = { ...query };
      let rows = roles;
      if (params.roleName) {
        rows = rows.filter(u => u.roleName.includes(params.roleName));
      }
      if (params.roleKey) {
        rows = rows.filter(u => u.roleKey.includes(params.roleKey));
      }
      if (params.status) {
        rows = rows.filter(u => String(u.status) === String(params.status));
      }
      if (beginTime && endTime) {
        rows = rows.filter(u =>
          u.createTime >= beginTime && u.createTime <= endTime
        );
      } else if (beginTime) {
        rows = rows.filter(u => u.createTime >= beginTime);
      } else if (endTime) {
        rows = rows.filter(u => u.createTime <= endTime);
      }
      // 分页
      const pageNum = Number(params.pageNum) || 1;
      const pageSize = Number(params.pageSize) || 10;
      const start = (pageNum - 1) * pageSize;
      const end = start + pageSize;
      const pageRows = rows.slice(start, end);

      return {
        msg: '查询成功',
        code: 200,
        rows: pageRows,
        total: rows.length
      }
    }
  },
  // 角色详情
  {
    url: /\/dev-api\/system\/role\/\d+$/,
    method: 'get',
    response: ({ url }) => {
      const id = Number(url?.split('/').pop());
      const role = roles.find(r => r.roleId === id);
      return {
        code: 200,
        msg: '查询成功',
        data: role || null
      }
    }
  },
  // 在新增角色 Mock 中
  {
    url: '/dev-api/system/role',
    method: 'post',
    response: ({ body }) => {
      const roleData = typeof body === 'string' ? JSON.parse(body) : body;

      // 检查角色名称是否重复
      const existRoleName = roles.find(role => role.roleName === roleData.roleName);
      if (existRoleName) {
        return {
          code: 500,
          msg: '角色名称已存在'
        };
      }

      // 检查权限字符是否重复
      const existRoleKey = roles.find(role => role.roleKey === roleData.roleKey);
      if (existRoleKey) {
        return {
          code: 500,
          msg: '权限字符已存在'
        };
      }

      const newRole = {
        ...roleData,
        roleId: nextRoleId++,
        createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: roleData.status ?? '0',
        delFlag: '0',
        admin: false
      };
      roles.push(newRole);
      return {
        code: 200,
        msg: '新增成功'
      }
    }
  },

  // 在修改角色 Mock 中也添加检查
  {
    url: '/dev-api/system/role',
    method: 'put',
    response: ({ body }) => {
      const roleData = typeof body === 'string' ? JSON.parse(body) : body;
      const idx = roles.findIndex(r => r.roleId === roleData.roleId);
      if (idx > -1) {
        // 检查角色名称重复（排除自己）
        const existRoleName = roles.find(role =>
          role.roleName === roleData.roleName && role.roleId !== roleData.roleId
        );
        if (existRoleName) {
          return {
            code: 500,
            msg: '角色名称已存在'
          };
        }

        // 检查权限字符重复（排除自己）
        const existRoleKey = roles.find(role =>
          role.roleKey === roleData.roleKey && role.roleId !== roleData.roleId
        );
        if (existRoleKey) {
          return {
            code: 500,
            msg: '权限字符已存在'
          };
        }

        roles[idx] = { ...roles[idx], ...roleData, updateTime: new Date().toISOString().slice(0, 19).replace('T', ' ') };
        return { code: 200, msg: '修改成功' };
      }
      return { code: 404, msg: '未找到角色' };
    }
  },
  // 删除角色
  {
    url: /\/dev-api\/system\/role\/\d+$/,
    method: 'delete',
    response: ({ url }) => {
      const id = Number(url?.split('/').pop());
      roles = roles.filter(r => r.roleId !== id);
      // 同时移除所有用户的该角色
      users.forEach(u => {
        u.roleIds = u.roleIds.filter(rid => rid !== id);
      });
      return { code: 200, msg: '删除成功' };
    }
  },
  // 角色状态修改
  {
    url: '/dev-api/system/role/changeStatus',
    method: 'put',
    response: ({ body }) => {
      const { roleId, status } = body;
      const idx = roles.findIndex(r => r.roleId === roleId);
      if (idx > -1) {
        roles[idx].status = status;
        return { code: 200, msg: '状态修改成功' };
      }
      return { code: 404, msg: '未找到角色' };
    }
  },
  // 角色数据权限
  {
    url: '/dev-api/system/role/dataScope',
    method: 'put',
    response: ({ body }) => {
      const idx = roles.findIndex(r => r.roleId === body.roleId);
      if (idx > -1) {
        roles[idx].dataScope = body.dataScope;
        roles[idx].deptIds = body.deptIds || [];
        return { code: 200, msg: '数据权限修改成功' };
      }
      return { code: 404, msg: '未找到角色' };
    }
  },
  // 查询角色已授权用户列表
  {
    url: '/dev-api/system/role/authUser/allocatedList',
    method: 'get',
    response: ({ query }) => {
      // 支持分页、用户名、手机号过滤
      const { roleId, userName, phonenumber, pageNum = 1, pageSize = 10 } = query;
      let filtered = users.filter(u => u.roleIds.includes(Number(roleId)));
      if (userName) {
        filtered = filtered.filter(u => u.userName.includes(userName));
      }
      if (phonenumber) {
        filtered = filtered.filter(u => u.phonenumber.includes(phonenumber));
      }
      const total = filtered.length;
      const start = (pageNum - 1) * pageSize;
      const end = start + Number(pageSize);
      return {
        code: 200,
        rows: filtered.slice(start, end),
        total
      };
    }
  },
  // 查询角色未授权用户列表
  {
    url: '/dev-api/system/role/authUser/unallocatedList',
    method: 'get',
    response: ({ query }) => {
      // 支持分页、用户名、手机号过滤
      const { roleId, userName, phonenumber, pageNum = 1, pageSize = 10 } = query;
      let filtered = users.filter(u => !u.roleIds.includes(Number(roleId)));
      if (userName) {
        filtered = filtered.filter(u => u.userName.includes(userName));
      }
      if (phonenumber) {
        filtered = filtered.filter(u => u.phonenumber.includes(phonenumber));
      }
      const total = filtered.length;
      const start = (pageNum - 1) * pageSize;
      const end = start + Number(pageSize);
      return {
        code: 200,
        rows: filtered.slice(start, end),
        total
      };
    }
  },
  // 取消用户授权角色
  {
    url: '/dev-api/system/role/authUser/cancel',
    method: 'put',
    response: ({ body }) => {
      const { userId, roleId } = body;
      const user = users.find(u => u.userId === Number(userId));
      if (user) {
        user.roleIds = user.roleIds.filter(rid => rid !== Number(roleId));
      }
      return {
        code: 200,
        msg: '取消授权成功'
      };
    }
  },
  // 批量取消用户授权角色
  {
    url: '/dev-api/system/role/authUser/cancelAll',
    method: 'put',
    response: ({ query }) => {
      // userIds: "1,2,3", roleId: 2
      const { userIds, roleId } = query;
      if (userIds && roleId) {
        userIds.split(',').forEach(uid => {
          const user = users.find(u => u.userId === Number(uid));
          if (user) {
            user.roleIds = user.roleIds.filter(rid => rid !== Number(roleId));
          }
        });
      }
      return {
        code: 200,
        msg: '批量取消授权成功'
      };
    }
  },
  // 授权用户选择
  {
    url: '/dev-api/system/role/authUser/selectAll',
    method: 'put',
    response: ({ query }) => {
      // userIds: "1,2,3", roleId: 2
      const { userIds, roleId } = query;
      if (userIds && roleId) {
        userIds.split(',').forEach(uid => {
          const user = users.find(u => u.userId === Number(uid));
          if (user && !user.roleIds.includes(Number(roleId))) {
            user.roleIds.push(Number(roleId));
          }
        });
      }
      return {
        code: 200,
        msg: '授权成功'
      };
    }
  },
  // 根据角色ID查询部门树结构
  {
    url: /\/dev-api\/system\/role\/deptTree\/\d+$/,
    method: 'get',
    response: ({ url }) => {
      const roleId = Number(url?.split('/').pop());
      let checkedKeys: number[] = [];
      
      // 根据角色设置不同的选中项
      if (roleId === 1) {
        // 超级管理员：选中所有部门
        checkedKeys = getAllDeptIds(deptTree);
      } else if (roleId === 2) {
        // 普通角色：只选中部分部门（深圳总公司的研发、市场部门，长沙分公司的技术支撑部）
        checkedKeys = [103, 104, 113];
      } else {
        // 其他角色：默认选中深圳总公司的研发部门
        checkedKeys = [103];
      }
      
      return {
        code: 200,
        msg: '查询成功',
        data: {
          depts: deptTree,
          checkedKeys: checkedKeys
        }
      };
    }
  },
  // 查询部门树结构（用于其他需要部门树的地方）
  {
    url: '/dev-api/system/dept/treeselect',
    method: 'get',
    response: () => ({
      code: 200,
      msg: '查询成功',
      data: deptTree
    })
  },
  // 查询菜单树结构（完整菜单）
  {
    url: '/dev-api/system/menu/treeselect',
    method: 'get',
    response: () => ({
      code: 200,
      msg: '查询成功',
      data: menuTree
    })
  },
  // 根据角色ID查询菜单树结构（完整菜单+选中项）
  {
    url: /\/dev-api\/system\/menu\/roleMenuTreeselect\/\d+$/,
    method: 'get',
    response: ({ url }) => {
      const roleId = Number(url.split('/').pop());
      let checkedKeys: number[] = [];
      if (roleId === 1) {
        // 超级管理员：全选
        checkedKeys = [
          2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21
        ];
      } else if (roleId === 2) {
        // 普通角色：只选用户管理和角色管理
        checkedKeys = [2, 3];
      }
      return {
        code: 200,
        msg: '查询成功',
        data: {
          menus: menuTree,
          checkedKeys
        }
      }
    }
  },
] as MockMethod[];
