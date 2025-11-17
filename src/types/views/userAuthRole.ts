// 定义角色接口
export interface Role {
  id: string; 
  roleId: number | string;
  roleName: string;
  roleKey: string;
  createTime: string;
  status: string;
  flag?: boolean;
}

// 定义用户信息接口
export interface UserInfo {
  nickName?: string;
  userName?: string;
  userId?: number | string;
}
