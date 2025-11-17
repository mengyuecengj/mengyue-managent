import { MockMethod } from 'vite-plugin-mock';

// 定义用户类型
interface User {
  [x: string]: any;
  userId: number;
  userName: string;
  nickName: string;
  deptName: string;
  phonenumber: string;
  status: string;
  createTime: string;
  deptId: string | number;
  email: string;
  sex: string;
  remark: string;
  avatar?: string;
  password?: string;
}

// 维护状态的用户列表 - 修复数据结构
let mockUserList: User[] = [
  {
    userId: 1,
    userName: 'admin',
    nickName: '管理员',
    deptName: '研发部门',
    phonenumber: '15888888888',
    status: '0',
    createTime: '2025-05-20 11:39:06',
    deptId: 3,
    email: 'admin@mengyue.com',
    sex: '0',
    remark: '管理员用户',
    avatar: '',
    password: 'admin123'
  },
  {
    userId: 2,
    userName: 'ry',
    nickName: '测试员',
    deptName: '测试部门',
    phonenumber: '15666666666',
    status: '0',
    createTime: '2025-05-20 11:39:06',
    deptId: 5,
    email: 'my@mengyue.com',
    sex: '0',
    remark: '普通用户',
    avatar: '',
    password: 'ry123'
  },
  // {
  //   userId: 3,
  //   userName: 'market1',
  //   nickName: '市场专员',
  //   deptName: '市场部门',
  //   phonenumber: '13911111111',
  //   status: '0',
  //   createTime: '2025-05-21 10:00:00',
  //   deptId: 4,
  //   email: 'market1@mengyue.com',
  //   sex: '1',
  //   remark: '市场部员工',
  //   avatar: '',
  //   password: 'market123'
  // },
  // {
  //   userId: 4,
  //   userName: 'finance1',
  //   nickName: '财务专员',
  //   deptName: '财务部门',
  //   phonenumber: '13722222222',
  //   status: '0',
  //   createTime: '2025-05-22 14:30:00',
  //   deptId: 7,
  //   email: 'finance1@mengyue.com',
  //   sex: '1',
  //   remark: '财务部员工',
  //   avatar: '',
  //   password: 'finance123'
  // }
];

// 辅助函数：根据部门ID获取部门名称
function getDeptNameById(deptId: number): string {
  const deptMap: { [key: number]: string } = {
    1: '梦悦科技',
    2: '深圳总公司',
    3: '研发部门',
    4: '市场部门',
    5: '测试部门',
    7: '财务部门',
    8: '运维部门',
    9: '长沙分公司',
    10: '财务部门',
    11: '市场部门'
  };
  return deptMap[deptId] || '未知部门';
}

// 【持久化函数】
function saveMockUsers() {
  if (typeof window === 'undefined') return;
  try {
    const cleanList = mockUserList.map(u => ({
      ...u,
      userId: Number(u.userId),
      deptId: Number(u.deptId),
      sex: String(u.sex),
      status: String(u.status),
      avatar: String(u.avatar || ''),
      password: String(u.password || ''),
      dept: String(u.deptName || ''),
    }));
    const data = { version: '1.2', list: cleanList };
    localStorage.setItem('mockUserList', JSON.stringify(data));
  } catch (e) {
    console.warn('Mock: 保存失败:', e);
  }
}

// 【初始化加载】
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('mockUserList');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.version === '1.2' && Array.isArray(parsed?.list)) {
        mockUserList = parsed.list.map((u: any): User => {
          const safeU = u || {};
          let deptName = getDeptNameById(Number(safeU.deptId || 3));
          
          if (safeU.dept && safeU.dept.deptName) {
            deptName = safeU.dept.deptName;
          }
          
          return {
            userId: Number(safeU.userId || 0),
            userName: String(safeU.userName || 'unknown'),
            nickName: String(safeU.nickName || '未知用户'),
            deptName,
            phonenumber: String(safeU.phonenumber || ''),
            status: String(safeU.status || '0'),
            createTime: String(safeU.createTime || new Date().toISOString().replace('T', ' ').substr(0, 19)),
            deptId: Number(safeU.deptId || 3),
            email: String(safeU.email || ''),
            sex: String(safeU.sex || '0'),
            remark: String(safeU.remark || ''),
            avatar: String(safeU.avatar || ''),
            password: String(safeU.password || ''),
          };
        });
      } else {
        localStorage.removeItem('mockUserList');
      }
    } catch (e) {
      localStorage.removeItem('mockUserList');
    }
  } else {
  }
  saveMockUsers();
} else {
}

// Mock data
export default [
  // 查询部门下拉树结构
  {
    url: '/dev-api/system/user/deptTree',
    method: 'get',
    timeout: 200,
    response: () => ({
      msg: '操作成功',
      code: 200,
      data: [
        {
          id: 1,
          label: '梦悦科技',
          children: [
            {
              id: 2,
              label: '深圳总公司',
              children: [
                { id: 3, label: '研发部门', children: [] },
                { id: 4, label: '市场部门', children: [] },
                { id: 5, label: '测试部门', children: [] },
                { id: 7, label: '财务部门', children: [] },
                { id: 8, label: '运维部门', children: [] },
              ],
            },
            {
              id: 9,
              label: '长沙分公司',
              children: [
                { id: 11, label: '市场部门', children: [] },
                { id: 10, label: '财务部门', children: [] },
              ],
            },
          ],
        },
      ],
    }),
  },
  // 获取用户可选角色和岗位
  {
    url: '/dev-api/system/user',
    method: 'get',
    timeout: 200,
    response: () => ({
      msg: '操作成功',
      code: 200,
      roles: [
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
          menuIds: null,
          deptIds: null,
          permissions: null,
          admin: false,
        },
      ],
      posts: [
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
          flag: false,
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
          flag: false,
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
          flag: false,
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
          flag: false,
        },
      ],
    }),
  },
  // 查询用户列表 - 修复部门过滤逻辑
  {
    url: '/dev-api/system/user/list',
    method: 'get',
    timeout: 200,
    response: ({ query }: { query: Record<string, string | undefined> }) => {
      const beginTime = query['params[beginTime]'];
      const endTime = query['params[endTime]'];

      // 使用维护的用户列表
      let rows = [...mockUserList];

      // 修复部门过滤逻辑
      if (query.deptId && query.deptId !== 'undefined') {
        const deptIdNum = Number(query.deptId);

        rows = rows.filter((u) => {
          const userDeptId = Number(u.deptId);
          const matches = userDeptId === deptIdNum;
          return matches;
        });
      }

      // 其他过滤条件
      if (query.userName) {
        rows = rows.filter((u) => u.userName.includes(query.userName as string));
      }
      if (query.nickName) {
        rows = rows.filter((u) => u.nickName.includes(query.nickName as string));
      }
      if (query.phonenumber) {
        rows = rows.filter((u) => u.phonenumber.includes(query.phonenumber as string));
      }
      if (query.status !== undefined && query.status !== '') {
        rows = rows.filter((u) => String(u.status) === String(query.status));
      }
      if (beginTime && endTime) {
        rows = rows.filter((u) => u.createTime >= (beginTime as string) && u.createTime <= (endTime as string));
      } else if (beginTime) {
        rows = rows.filter((u) => u.createTime >= (beginTime as string));
      } else if (endTime) {
        rows = rows.filter((u) => u.createTime <= (endTime as string));
      }

      return {
        msg: '操作成功',
        code: 200,
        rows,
        total: rows.length,
      };
    },
  },
  // 查询用户详情
  {
    url: /\/dev-api\/system\/user\/\d+/,
    method: 'get',
    timeout: 200,
    response: ({ url: requestUrl }: { url: string }) => {
      const userId = requestUrl.match(/\/system\/user\/(\d+)/)?.[1];
      const user = mockUserList.find(u => u.userId === parseInt(userId || '0')) || {
        userId: parseInt(userId || '0'),
        userName: 'unknown',
        nickName: '未知用户',
        dept: { deptName: getDeptNameById(3) },
        deptId: 3,
        phonenumber: '00000000000',
        email: 'unknown@example.com',
        sex: '0',
        status: '0',
        remark: '用户不存在',
        avatar: '',
        createTime: new Date().toISOString().replace('T', ' ').substr(0, 19)
      };

      return {
        msg: '操作成功',
        code: 200,
        data: {
          ...user,
          postIds: [1],
          roleIds: [1],
          avatar: String(user.avatar || ''),
        },
        posts: [
          { postId: 1, postName: '管理员', status: '0' },
          { postId: 2, postName: '开发工程师', status: '0' },
          { postId: 3, postName: '市场专员', status: '0' },
        ],
        roles: [
          { roleId: 1, roleName: '超级管理员', status: '0' },
          { roleId: 2, roleName: '普通用户', status: '0' },
          { roleId: 3, roleName: '部门经理', status: '0' },
        ],
        postIds: [1],
        roleIds: [1],
      };
    },
  },
  // 查询用户授权角色
  {
    url: /\/dev-api\/system\/user\/authRole\/\d+/,
    method: 'get',
    timeout: 200,
    response: ({ url }: { url: string }) => {
      const userId = url.match(/\/authRole\/(\d+)/)?.[1] || '1';
      const user = mockUserList.find(u => u.userId === parseInt(userId)) || {
        userId: parseInt(userId),
        userName: 'admin',
        nickName: '若依',
        dept: { deptName: '研发部门' },
        deptId: 3
      };

      const roleIds = [parseInt(userId)];
      const roles = [
        { roleId: 1, roleName: '超级管理员', roleKey: 'admin', status: '0', createTime: '2024-01-01 12:00:00', flag: roleIds.includes(1) },
        { roleId: 2, roleName: '普通用户', roleKey: 'user', status: '0', createTime: '2024-01-01 12:00:00', flag: roleIds.includes(2) },
        { roleId: 3, roleName: '部门经理', roleKey: 'manager', status: '0', createTime: '2024-01-01 12:00:00', flag: roleIds.includes(3) }
      ];

      return {
        code: 200,
        msg: '操作成功',
        user: { userId: user.userId, userName: user.userName, nickName: user.nickName },
        roles,
        roleIds
      };
    }
  },
  // 新增用户 - 添加重复检查
  {
    url: '/dev-api/system/user',
    method: 'post',
    timeout: 200,
    response: ({ body }: { body: any }) => {
      const userData = typeof body === 'string' ? JSON.parse(body) : body;
      
      // 检查用户名是否重复
      const existUserName = mockUserList.find(user => user.userName === userData.userName);
      if (existUserName) {
        return {
          msg: '用户名已存在',
          code: 500,
          data: null,
        };
      }
      
      // 检查手机号是否重复
      if (userData.phonenumber) {
        const existPhone = mockUserList.find(user => user.phonenumber === userData.phonenumber);
        if (existPhone) {
          return {
            msg: '手机号码已存在',
            code: 500,
            data: null,
          };
        }
      }
      
      // 检查邮箱是否重复
      if (userData.email) {
        const existEmail = mockUserList.find(user => user.email === userData.email);
        if (existEmail) {
          return {
            msg: '邮箱已存在',
            code: 500,
            data: null,
          };
        }
      }

      const newUserId = mockUserList.length > 0
        ? Math.max(...mockUserList.map(u => u.userId)) + 1
        : 1;

      const newUser: User = {
        userId: newUserId,
        userName: userData.userName,
        nickName: userData.nickName,
        deptName: getDeptNameById(Number(userData.deptId)),
        phonenumber: userData.phonenumber || '',
        status: String(userData.status || '0'),
        createTime: new Date().toISOString().replace('T', ' ').substr(0, 19),
        deptId: Number(userData.deptId),
        email: userData.email || '',
        sex: String(userData.sex || '0'),
        remark: userData.remark || '',
        avatar: '',
        password: userData.password,
      };

      mockUserList.push(newUser);

      saveMockUsers();

      return {
        msg: '新增成功',
        code: 200,
        data: null,
      };
    },
  },
  // 修改用户 - 添加重复检查
  {
    url: '/dev-api/system/user',
    method: 'put',
    timeout: 200,
    response: ({ body }: { body: any }) => {
      const userData = typeof body === 'string' ? JSON.parse(body) : body;
      const userIndex = mockUserList.findIndex(u => u.userId === Number(userData.userId));

      if (userIndex !== -1) {
        // 检查用户名重复（排除自己）
        const existUserName = mockUserList.find(user => 
          user.userName === userData.userName && user.userId !== Number(userData.userId)
        );
        if (existUserName) {
          return {
            msg: '用户名已存在',
            code: 500,
            data: null,
          };
        }
        
        // 检查手机号重复（排除自己）
        if (userData.phonenumber) {
          const existPhone = mockUserList.find(user => 
            user.phonenumber === userData.phonenumber && user.userId !== Number(userData.userId)
          );
          if (existPhone) {
            return {
              msg: '手机号码已存在',
              code: 500,
              data: null,
            };
          }
        }
        
        // 检查邮箱重复（排除自己）
        if (userData.email) {
          const existEmail = mockUserList.find(user => 
            user.email === userData.email && user.userId !== Number(userData.userId)
          );
          if (existEmail) {
            return {
              msg: '邮箱已存在',
              code: 500,
              data: null,
            };
          }
        }

        // 如果有密码字段，则更新密码
        if (userData.password !== undefined) {
          mockUserList[userIndex].password = userData.password;
        }

        mockUserList[userIndex] = {
          ...mockUserList[userIndex],
          ...userData,
          deptName: getDeptNameById(Number(userData.deptId)),
          deptId: Number(userData.deptId),
          status: String(userData.status || mockUserList[userIndex].status),
          sex: String(userData.sex || mockUserList[userIndex].sex),
          avatar: String(userData.avatar || mockUserList[userIndex].avatar || ''),
        };

        saveMockUsers();

        return {
          msg: '修改成功',
          code: 200,
          data: null,
        };
      } else {
        return {
          msg: '用户不存在',
          code: 500,
          data: null,
        };
      }
    },
  },
  // 删除用户
  {
    url: /\/dev-api\/system\/user\/\d+/,
    method: 'delete',
    timeout: 200,
    response: ({ url: requestUrl }: { url: string }) => {
      const userId = requestUrl.match(/\/system\/user\/(\d+)/)?.[1];

      if (userId) {
        const userIndex = mockUserList.findIndex(u => u.userId === parseInt(userId));

        if (userIndex !== -1) {
          mockUserList.splice(userIndex, 1);

          saveMockUsers();

          return {
            msg: '删除成功',
            code: 200,
            data: null,
          };
        }
      }

      return {
        msg: '用户不存在',
        code: 500,
        data: null,
      };
    },
  },
  // 用户密码重置
  {
    url: '/dev-api/system/user/resetPwd',
    method: 'put',
    timeout: 200,
    response: () => ({
      msg: '密码重置成功',
      code: 200,
      data: null,
    }),
  },
  // 用户状态修改
  {
    url: '/dev-api/system/user/changeStatus',
    method: 'put',
    timeout: 200,
    response: ({ body }: { body: any }) => {

      const user = mockUserList.find(u => u.userId === Number(body.userId));

      if (user) {
        user.status = String(body.status);

        saveMockUsers();

        return {
          msg: '状态修改成功',
          code: 200,
          data: null,
        };
      }

      return {
        msg: '用户不存在',
        code: 500,
        data: null,
      };
    },
  },
  // 保存授权角色
  {
    url: '/dev-api/system/user/authRole',
    method: 'put',
    timeout: 200,
    response: () => ({
      code: 200,
      msg: '角色分配成功',
      data: null,
    }),
  },
  // 查询用户个人信息
  {
    url: '/dev-api/system/user/profile',
    method: 'get',
    timeout: 200,
    response: () => {
      const currentUser = (mockUserList.find(u => u.userName === 'admin') ||
        mockUserList[0] ||
      {
        userId: 1,
        userName: 'admin',
        nickName: '若依',
        email: 'admin@ry.com',
        phonenumber: '15888888888',
        sex: '0',
        avatar: '',
        deptId: 3,
        dept: { deptName: '研发部门' },
        status: '0',
        remark: '',
        createTime: '2025-05-20 11:39:06'
      });

      const safeUser = {
        userId: currentUser.userId || 1,
        userName: currentUser.userName || 'admin',
        nickName: currentUser.nickName || '若依',
        email: currentUser.email || 'admin@ry.com',
        phonenumber: currentUser.phonenumber || '15888888888',
        sex: currentUser.sex || '0',
        avatar: String(currentUser.avatar || ''),
        deptId: currentUser.deptId || 3,
        dept: { deptName: currentUser.dept?.deptName || '研发部门' },
      };

      return {
        msg: '操作成功',
        code: 200,
        data: {
          ...safeUser,
          roles: [{ roleId: 1, roleName: '超级管理员', status: '0' }],
        },
      };
    },
  },
  // 修改用户个人信息
  {
    url: '/dev-api/system/user/profile',
    method: 'put',
    timeout: 200,
    response: ({ body }: { body: any }) => {
      const currentUser = mockUserList.find(u => u.userName === 'admin');
      if (currentUser) {
        Object.assign(currentUser, body);
        currentUser.avatar = String(body.avatar || currentUser.avatar || '');
        saveMockUsers();
      }
      return {
        msg: '修改成功',
        code: 200,
        data: null,
      };
    },
  },
  // 用户密码修改
  {
    url: '/dev-api/system/user/profile/updatePwd',
    method: 'put',
    timeout: 200,
    response: () => ({
      msg: '密码修改成功',
      code: 200,
      data: null,
    }),
  },
  // 用户头像上传
  {
    url: '/dev-api/system/user/profile/avatar',
    method: 'post',
    timeout: 200,
    response: ({ body }: { body: any }) => {
      const currentUser = mockUserList.find(u => u.userName === 'admin');
      if (currentUser) {
        currentUser.avatar = String(body.avatar || '/avatar/test.jpg');
        saveMockUsers();
      }
      return {
        msg: '上传成功',
        code: 200,
        data: '/avatar/test.jpg',
      };
    },
  },
] as MockMethod[];
