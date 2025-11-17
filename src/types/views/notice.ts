// 定义查询参数接口
export interface NoticeQueryParams {
  noticeTitle?: string;
  noticeType?: string;
  status?: string;
  createBy?: string;
  pageNum?: number;
  pageSize?: number;
}

// 定义公告项接口
export interface NoticeItem {
  noticeId: number;
  noticeTitle: string;
  noticeType: string;
  noticeContent: string;
  status: string;
  createBy: string;
  createTime: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
}

// 定义响应接口
export interface NoticeListResponse {
  code: number;
  msg: string;
  rows: NoticeItem[];
  total: number;
}