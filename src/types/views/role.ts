// 类型定义
export interface Role {
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: string;
  status: string;
  createTime: string;
  menuIds?: number[];
  deptIds?: number[];
  dataScope?: string;
  remark?: string;
  menuCheckStrictly?: boolean;
  deptCheckStrictly?: boolean;
}

export interface GetRoleResponse {
  data: Role;
  code?: number;
  msg?: string;
}

export interface MenuTreeSelectResponse {
  menus: any[];
  checkedKeys: number[];
}

export interface DeptTreeSelectResponse {
  depts: any[];
  checkedKeys: number[];
}

export interface Proxy {
  addDateRange: (params: any, dateRange: any) => any;
  download: (url: string, params: any, filename: string) => void;
  $modal: {
    confirm: (message: string) => Promise<void>;
  };
}

// 类型定义
export interface User {
  userId: number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  status: string;
  createTime: string;
  [key: string]: unknown;
}

export interface QueryParams {
  pageNum: number;
  pageSize: number;
  roleId: string;
  userName?: string;
  phonenumber?: string;
}

export interface UnallocatedUserListResponse {
  rows: User[];
  total: number;
  code?: number;
  msg?: string;
}
