// 定义 Column 接口
export interface Column {
  key: number;
  label: string;
  visible: boolean;
}

// 定义 Props 接口
export interface Props {
  showSearch: boolean;
  columns?: Column[];
  search?: boolean;
  showColumnsType?: 'transfer' | 'checkbox';
}

// 定义 Emits 接口
export interface Emits {
  (e: 'update:showSearch', value: boolean): void;
  (e: 'queryTable'): void;
}