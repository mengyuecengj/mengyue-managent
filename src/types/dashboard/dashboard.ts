// types/dashboard-types.ts

// 基础下拉项类型
export interface DropdownItem {
  [x: string]: any;
  text: string;
  value?: string;
  type?: string; // 组件类型标识
  disabled?: boolean;
  children?: DropdownItem[]; // 支持多级
  componentConfig?: any; // 组件配置
}

export interface DropdownConfig {
  title: string;
  items: DropdownItem[];
}

// 图表组件类型
export enum ChartType {
  BASIC_BAR = 'basic-bar',
  HORIZONTAL_BAR = 'horizontal-bar',
  STACKED_BAR = 'stacked-bar',
  CAPSULE_BAR = 'capsule-bar',
  LINE_BAR = 'line-bar',
  PERCENT_BAR = 'percent-bar',
  LINE = 'line',
  PIE = 'pie',
  RING = 'ring',
  SCATTER = 'scatter',
  RADAR = 'radar',
  FUNNEL = 'funnel',
  GAUGE = 'gauge'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}