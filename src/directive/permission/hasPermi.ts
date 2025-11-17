import useUserStore from '@/store/modules/user'
import type { Directive, DirectiveBinding, VNode } from 'vue'
import { PermissionBinding } from '@/types/directive/general'


export default {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<PermissionBinding>,
    vnode: VNode
  ) {
    const { value } = binding
    const all_permission = "*:*:*"
    const permissions = useUserStore().permissions

    if (value && Array.isArray(value) && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
} as Directive