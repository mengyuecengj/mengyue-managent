export interface Units {
  KB: string;
  MB: string;
  GB: string;
}
// Define interfaces for configuration and elements
export interface Option {
  label: string;
  value: string | number;
  [key: string]: any; // Allow additional properties for flexibility
}

export interface Props {
  props: {
    value?: string;
    label?: string;
    children?: string;
    [key: string]: any;
  };
}

export interface RegListItem {
  pattern: string;
  message: string;
}

export interface FormElement {
  vModel?: string;
  tag?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean | any[] | null;
  required?: boolean;
  multiple?: boolean;
  options?: Option[];
  dataType?: 'static' | 'dynamic';
  valueKey?: string;
  labelKey?: string;
  childrenKey?: string;
  props?: Props;
  regList?: RegListItem[];
  action?: string;
  fileSize?: number;
  sizeUnit?: keyof Units;
  accept?: string;
  'auto-upload'?: boolean;
  children?: FormElement[];
}

export interface FormConfig {
  formRef: string;
  formModel: string;
  formRules: string;
  fields: FormElement[];
}

// Type for trigger object
export interface Trigger {
  [tag: string]: string; // e.g., { 'el-input': 'blur' }
}