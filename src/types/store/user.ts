// 定义用户信息接口
export interface UserInfo {
  userId: string;
  userName: string;
  avatar?: string;
  [key: string]: unknown;
}

// 定义登录响应接口
export interface LoginResponse {
  token: string;
  userId: string;
}

// 定义用户详情响应接口
export interface UserDetailResponse {
  user: UserInfo;
  roles: string[];
  permissions: string[];
}

// 定义登录表单接口
export interface LoginForm {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

// 定义 API 函数的返回类型
export interface LoginApi {
  (username: string, password: string, code: string, uuid: string): Promise<LoginResponse>;
}

export interface GetInfoApi {
  (): Promise<UserDetailResponse>;
}

export interface LogoutApi {
  (): Promise<void>;
}
