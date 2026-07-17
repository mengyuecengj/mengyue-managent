/**
 * 路由权限控制中间件
 * 
 * 负责：
 * - 控制用户访问权限（基于 token 和白名单）
 * - 动态加载用户角色菜单路由
 * - 设置页面标题
 * - 管理页面加载进度条（NProgress）
 * 
 * 白名单路径（如 /login）无需登录即可访问；
 * 其他路径需验证 token 并确保用户信息和路由已加载。
 */

import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp, isPathMatch } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

const isWhiteList = (path: string) => {
  return whiteList.some(pattern => isPathMatch(pattern, path))
}

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
  } else {
    document.title = import.meta.env.VITE_APP_TITLE
  }

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/index' })
      NProgress.done()
    } else if (isWhiteList(to.path)) {
      next()
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true
        useUserStore().getInfo().then(() => {
          isRelogin.show = false
          usePermissionStore().generateRoutes().then((accessRoutes: any) => {
            accessRoutes.forEach((route: any) => {
              if (!isHttp(route.path)) {
                if (!router.hasRoute(route.name)) {
                  router.addRoute(route)
                }
              }
            })
            next({ ...to, replace: true })
          })
        }).catch(err => {
          console.error('getInfo failed:', err);
          useUserStore().logOut().then(() => {
            ElMessage.error(err)
            next(`/login?redirect=${to.fullPath}`)
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (isWhiteList(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})