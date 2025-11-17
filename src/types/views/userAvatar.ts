// 类型定义
export interface Position {
  x: number;
  y: number;
}

export interface AvatarOptions {
  img: string;
  filename: string;
}

export interface UploadResponse {
  imgUrl: string;
  [key: string]: any;
}