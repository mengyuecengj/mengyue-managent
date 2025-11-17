export interface Option {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}

export interface BaseElement {
  tag: string;
  vModel: string;
  label?: string;
  span?: number;
  layout?: 'colFormItem' | 'rowFormItem';
  required?: boolean;
  labelWidth?: number;
  style?: { width?: string };
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
}

export interface ButtonElement extends BaseElement {
  tag: 'el-button';
  type?: string;
  icon?: string;
  size?: string;
  default?: string;
}

export interface InputElement extends BaseElement {
  tag: 'el-input';
  maxlength?: number;
  'show-word-limit'?: boolean;
  readonly?: boolean;
  'prefix-icon'?: string;
  'suffix-icon'?: string;
  'show-password'?: boolean;
  type?: string;
  autosize?: { minRows: number; maxRows?: number };
  prepend?: string;
  append?: string;
}

export interface InputNumberElement extends BaseElement {
  tag: 'el-input-number';
  'controls-position'?: string;
  min?: number;
  max?: number;
  step?: number;
  'step-strictly'?: boolean;
  precision?: number;
}

export interface SelectElement extends BaseElement {
  tag: 'el-select';
  filterable?: boolean;
  multiple?: boolean;
  options?: Option[];
}

export interface RadioGroupElement extends BaseElement {
  tag: 'el-radio-group';
  size?: string;
  optionType?: 'button' | 'default';
  border?: boolean;
  options?: Option[];
}

export interface CheckboxGroupElement extends BaseElement {
  tag: 'el-checkbox-group';
  size?: string;
  min?: number;
  max?: number;
  optionType?: 'button' | 'default';
  border?: boolean;
  options?: Option[];
}

export interface SwitchElement extends BaseElement {
  tag: 'el-switch';
  'active-text'?: string;
  'inactive-text'?: string;
  'active-color'?: string;
  'inactive-color'?: string;
  'active-value'?: boolean | string | number;
  'inactive-value'?: boolean | string | number;
}

export interface CascaderElement extends BaseElement {
  tag: 'el-cascader';
  options?: Option[];
  props?: Record<string, any>;
  'show-all-levels'?: boolean;
  filterable?: boolean;
  separator?: string;
}

export interface SliderElement extends BaseElement {
  tag: 'el-slider';
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  'show-stops'?: boolean;
}

export interface TimePickerElement extends BaseElement {
  tag: 'el-time-picker';
  'start-placeholder'?: string;
  'end-placeholder'?: string;
  'range-separator'?: string;
  'is-range'?: boolean;
  format?: string;
  'value-format'?: string;
  'picker-options'?: Record<string, any>;
}

export interface DatePickerElement extends BaseElement {
  tag: 'el-date-picker';
  type?: string;
  'start-placeholder'?: string;
  'end-placeholder'?: string;
  'range-separator'?: string;
  format?: string;
  'value-format'?: string;
  readonly?: boolean;
}

export interface RateElement extends BaseElement {
  tag: 'el-rate';
  max?: number;
  'allow-half'?: boolean;
  'show-text'?: boolean;
  'show-score'?: boolean;
}

export interface ColorPickerElement extends BaseElement {
  tag: 'el-color-picker';
  size?: string;
  'show-alpha'?: boolean;
  'color-format'?: string;
}

export interface UploadElement extends BaseElement {
  tag: 'el-upload';
  action?: string;
  multiple?: boolean;
  'list-type'?: string;
  accept?: string;
  name?: string;
  'auto-upload'?: boolean;
  'file-list'?: any[];
  buttonText?: string;
  showTip?: boolean;
  fileSize?: number;
  sizeUnit?: string;
}

export type FormElement =
  | ButtonElement
  | InputElement
  | InputNumberElement
  | SelectElement
  | RadioGroupElement
  | CheckboxGroupElement
  | SwitchElement
  | CascaderElement
  | SliderElement
  | TimePickerElement
  | DatePickerElement
  | RateElement
  | ColorPickerElement
  | UploadElement;

export interface RowElement extends BaseElement {
  tag: 'el-row';
  type?: string;
  justify?: string;
  align?: string;
  gutter?: number;
  children: FormElement[];
}

export interface FormConfig {
  formRef: string;
  formModel: string;
  formRules: string;
  size: string;
  disabled?: boolean;
  labelWidth: number;
  labelPosition?: 'right' | 'left' | 'top';
  gutter?: number;
  formBtns?: boolean;
  fields: (FormElement | RowElement)[];
}