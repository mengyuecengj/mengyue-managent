// Define interfaces for type safety
export interface DeptNode {
  // parentId: null;
  // parentId: number;
  id: number | string; // Allow string or number for node-key compatibility
  label: string;
  children?: DeptNode[];
  disabled?: boolean;
}

export interface User {
  userId: number;
  userName: string;
  nickName: string;
  dept: { deptName: string };
  phonenumber: string;
  status: string | number; // 改为 number 类型
  createTime: string;
  deptId?: number;
  email?: string;
  sex?: string;
  remark?: string;
  postIds?: number[];
  roleIds?: number[];
  password?: string;
  [key: string]: unknown;
}

export interface QueryParams {
  pageNum: number;
  pageSize: number;
  userName?: string;
  nickName?: string;
  phonenumber?: string;
  status?: string | number; // 改为 number 类型
  deptId?: number;
}

export interface UserForm {
  userId?: number;
  deptId?: number;
  userName?: string;
  nickName?: string;
  password?: string;
  phonenumber?: string;
  email?: string;
  sex?: string;
  status: string; // 改为 number 类型
  remark?: string;
  postIds: number[];
  roleIds: number[];
}

export interface Column {
  key: number;
  label: string;
  visible: boolean;
}

// 字典项类型
export interface DictItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

// 字典加载状态类型
export interface DictLoaded {
  [key: string]: boolean;
}
export interface DictResult {
  [key: string]: any;
  dictLoaded: Record<string, boolean>;
}

export interface Rule {
  required?: boolean;
  min?: number;
  max?: number;
  message: string;
  trigger: string | string[];
  pattern?: RegExp;
  type?: string;
}

export interface ValidationError {
  errors: { message: string }[];
}