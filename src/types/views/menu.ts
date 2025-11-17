export interface MenuOption {
  menuId: number
  menuName: string
  children: MenuOption[]
}

export interface MenuForm {
  menuId?: number
  parentId: number
  menuName?: string
  icon?: string
  menuType: string
  orderNum?: number
  isFrame: string
  isCache: string
  visible: string
  status: string
  path?: string
  component?: string
  perms?: string
}

export interface MenuRow {
  menuId: number
  menuName: string
  icon?: string
  orderNum?: number
  perms?: string
  component?: string
  status?: string
  createTime?: string
  children?: MenuRow[]
}

export interface DictItem {
  value: string
  label: string
}

export interface MyFormInstance {
  validate: (callback: (valid: boolean) => void) => void;
  resetFields: () => void;
  // 如果有其他方法，如 clearValidate 等，可以添加
}