// API 数据类型定义
export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
}

export interface ApiResponseData {
  code: number;
  message: string;
  data: null | Record<string, any> | Array<any>; // 支持 null、对象或数组
}

export interface ApiRequest {
  query?: Record<string, any>
  params?: Record<string, any>
  body?: Record<string, any>
}

export interface ApiDefinition {
  key: string
  method: string
  url: string
  description: string
  requiresAuth: boolean
  request?: ApiRequest
  response: any
  errorResponse?: any
  codeExample?: string
}