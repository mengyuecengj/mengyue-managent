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
  NProgress.start() // Start progress bar when navigation begins

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
  } else {
    document.title = import.meta.env.VITE_APP_TITLE
  }

  if (getToken()) {
    // User is authenticated (has token)
    if (to.path === '/login') {
      // Redirect to /index if trying to access login while authenticated
      next({ path: '/index' })
      NProgress.done()
    } else if (isWhiteList(to.path)) {
      // Allow direct access to whitelist paths
      next()
    } else {
      // Handle protected routes
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
            next({ ...to, replace: true }) // Proceed with navigation
          })
        }).catch(err => {
          console.error('getInfo failed:', err);  // 添加这行，检查是否进入 catch 和错误是什么
          useUserStore().logOut().then(() => {
            ElMessage.error(err)
            next(`/login?redirect=${to.fullPath}`)  // 确保已添加 redirect
          })
        })
      } else {
        next() // Roles already loaded, proceed
      }
    }
  } else {
    // No token present
    if (isWhiteList(to.path)) {
      next() // Allow access to whitelist paths
    } else {
      next(`/login?redirect=${to.fullPath}`) // Redirect to login with redirect param
      NProgress.done()
    }
  }
})
// router.afterEach(() => {
//   setTimeout(() => NProgress.done(), 300); // 延迟完成
// });
router.afterEach(() => {
  NProgress.done() // Stop progress bar after navigation completes
})