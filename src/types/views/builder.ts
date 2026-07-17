export interface Block {
  id?: string
  type: string
  label: string
  labelKey: string
  options: {
    modelValue?: string
    placeholder?: string
    [key: string]: any // 允许其他选项属性
  }
}