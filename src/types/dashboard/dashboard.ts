export interface DropdownItem {
  [x: string]: any;
  text: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  children?: DropdownItem[];
  componentConfig?: any;
}

export interface DropdownConfig {
  title: string;
  items: DropdownItem[];
}

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