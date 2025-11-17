import { RouteRecordName } from 'vue-router';

// 类型定义
interface Meta {
  title?: string;
  affix?: boolean;
  noCache?: boolean;
  link?: string;
}

export interface View {
  name?: RouteRecordName; // 使用 vue-router 的 RouteRecordName 类型，兼容 string | symbol | undefined
  path: string;
  meta: Meta;
  params?: Record<string, any>;
  query?: Record<string, any>;
}