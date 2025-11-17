// ===== 类型定义 =====
export interface Post {
  postId?: number;
  postCode: string;
  postName: string;
  postSort: number;
  status: string;
  remark?: string;
  createTime?: string;
  [key: string]: unknown;
}

export interface ListPostResponse {
  rows: Post[];
  total: number;
  code?: number;
  msg?: string;
}

export interface GetPostResponse {
  postId: number | undefined;
  postCode: string;
  postName: string;
  postSort: number;
  status: string;
  remark: string | undefined;
  data: Post;
  code?: number;
  msg?: string;
}