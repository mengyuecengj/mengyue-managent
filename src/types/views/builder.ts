export interface Block {
  type: string
  label: string
  options: {
    modelValue?: string
    placeholder?: string
    [key: string]: any // 允许其他选项属性
  }
}