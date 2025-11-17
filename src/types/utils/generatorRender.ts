// Define interfaces for configuration
export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any; // Allow additional properties for flexibility
}

export interface PropsConfig {
  props: {
    value?: string;
    label?: string;
    children?: string;
    [key: string]: any;
  };
}

export interface Config {
  tag: string; // e.g., 'el-input', 'el-select', 'el-checkbox-group'
  options?: Option[];
  props?: PropsConfig;
  style?: Record<string, string>;
  slot?: string;
  disabled?: boolean;
  class?: string | string[];
  prop?: string;
  label?: string;
  labelWidth?: string | number;
  [key: string]: any; // Allow additional dynamic props
}

// Type for Vue's createElement function
export type CreateElement = typeof h;

// Type for render functions
export type RenderFunc = (h: CreateElement, conf: Config, key: string) => VNode | VNode[];