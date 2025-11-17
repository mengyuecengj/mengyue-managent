import request from '@/utils/request';  // 修正导入（之前是 import request from ...，但根据您的代码是 import { request }）

// 查询部门下拉树结构
export function getDeptTree() {
  return request.get('/dev-api/system/user/deptTree');
}

// 查询用户列表
export function getUserList(params: {
  deptId?: string;
  userName?: string;
  nickName?: string;
  phonenumber?: string;
  status?: string;
  'params[beginTime]'?: string;
  'params[endTime]'?: string;
}) {
  return request.get('/dev-api/system/user/list', { params });
}

// 查询用户详情
export function getUserDetail(userId: number) {
  return request.get(`/dev-api/system/user/${userId}`);
}

// 新增用户
export function createUser(data: {
  userName: string;
  nickName: string;
  deptId: number;
  phonenumber?: string;
  email?: string;
  sex?: string;
  status?: string;
  remark?: string;
  password?: string;
}) {
  return request.post('/dev-api/system/user', data);
}

// 修改用户信息
export function updateUser(data: {
  userId: number;
  userName: string;
  nickName: string;
  deptId: number;
  phonenumber?: string;
  email?: string;
  sex?: string;
  status?: string;
  remark?: string;
  password?: string;
  avatar?: string;
}) {
  return request.put('/dev-api/system/user', data);
}

// 删除用户
export function deleteUser(userId: number) {
  return request.delete(`/dev-api/system/user/${userId}`);
}

// 获取当前用户个人信息
export function getUserProfile() {
  return request.get('/dev-api/system/user/profile');
}

// 修改个人信息
export function updateUserProfile(data: {
  nickName?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  avatar?: string;
}) {
  return request.put('/dev-api/system/user/profile', data);
}

// 修改用户状态
export function changeUserStatus(data: {
  userId: number;
  status: string;
}) {
  return request.put('/dev-api/system/user/changeStatus', data);
}

// 保存用户授权角色
export function authUserRole(data: {
  userId: number;
  roleIds: number[];
}) {
  return request.put('/dev-api/system/user/authRole', data);
}

// 获取 Swagger API 文档 JSON（用于动态生成参考文档）
export function getApiDocs() {
  return request.get('/v3/api-docs');  // 如果是旧版，换成 '/v2/api-docs'；如果有前缀如 /dev-api/v3/api-docs，调整
}
