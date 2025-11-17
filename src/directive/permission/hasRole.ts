import useUserStore from '@/store/modules/user'
import type { Directive, DirectiveBinding, VNode } from 'vue'
import type { RoleBinding } from '@/types/directive/general'

export default {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<RoleBinding>,
    vnode: VNode
  ) {
    const { value } = binding
    const super_admin = "admin"
    const roles = useUserStore().roles

    if (value && Array.isArray(value) && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值`)
    }
  }
} as Directive