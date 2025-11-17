import { MockMethod } from 'vite-plugin-mock';

const userInfo = {
  msg: '操作成功',
  code: 200,
  permissions: ['*:*:*'],
  roles: ['admin'],
  user: {
    createBy: 'admin',
    createTime: '2025-05-11 11:01:58',
    updateBy: null,
    updateTime: null,
    remark: '管理员',
    params: { '@type': 'java.util.HashMap' },
    userId: 1,
    deptId: 103,
    userName: 'admin',
    nickName: '若依',
    email: 'ry@163.com',
    phonenumber: '15888888888',
    sex: '1',
    avatar: null,
    password: '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2',
    status: '0',
    delFlag: '0',
    loginIp: '127.0.0.1',
    loginDate: '2025-05-19T00:53:20.000+08:00',
    dept: {
      createBy: null,
      createTime: null,
      updateBy: null,
      updateTime: null,
      remark: null,
      params: { '@type': 'java.util.HashMap' },
      deptId: 103,
      parentId: 101,
      ancestors: '0,100,101',
      deptName: '研发部门',
      orderNum: 1,
      leader: '若依',
      phone: null,
      email: null,
      status: '0',
      delFlag: null,
      parentName: null,
      children: []
    },
    roles: [
      {
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: { '@type': 'java.util.HashMap' },
        roleId: 1,
        roleName: '超级管理员',
        roleKey: 'admin',
        roleSort: 1,
        dataScope: '1',
        menuCheckStrictly: false,
        deptCheckStrictly: false,
        status: '0',
        delFlag: null,
        flag: false,
        menuIds: null,
        deptIds: null,
        permissions: null,
        admin: true
      }
    ],
    roleIds: null,
    postIds: null,
    roleId: null,
    admin: true
  }
};

export default [
  // 登录
  {
    url: '/dev-api/login',
    method: 'post',
    timeout: 500,
    response: ({ body }: any) => {
      const { username, password, code } = body;
      if (username === 'admin' && password === 'admin123' && code === '0000') {
        return {
          code: 200,
          msg: '操作成功',
          data: {
            // 默认用 Authorization: Bearer token，前端根据实际需求调整
            token: 'mocked-admin-token'
          }
        };
      } else if (username === 'ry' && password === 'admin123' && code === '0000') {
        return {
          code: 200,
          msg: '操作成功',
          token: 'mocked-admin-token'
        }
      } else {
        return {
          code: 500,
          msg: '用户名或密码错误，或验证码不正确',
        };
      }
    }
  },
  // 获取验证码
  {
    url: '/dev-api/captchaImage',
    method: 'get',
    timeout: 200,
    response: () => {
      return {
        code: 200,
        msg: '操作成功',
        data: {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        uuid: 'mock-uuid-1234'
        }
      };
    }
  },
  // 获取用户信息
  {
    url: '/dev-api/getInfo',
    method: 'get',
    response: () => {
      return {
        ...userInfo
      };
    }
  },
  // 退出
  {
    url: '/dev-api/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '退出成功'
      };
    }
  }
] as MockMethod[];
