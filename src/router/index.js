/**
 * router/index.ts
 *
 * constantRoutes: 不依赖权限的基础路由比如登录，所有用户均可访问
 * dynamicRoutes: 业务权限路由（会根据用户权限动态注入）
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            { path: '/redirect/:path(.*)', component: () => import('@/views/redirect/index.vue') },
        ],
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        hidden: true,
    },
    {
        path: '/401',
        component: () => import('@/views/error/401.vue'),
        hidden: true,
    },
    {
        path: '',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/views/index.vue'),
                name: 'Index',
                meta: { title: 'menu.index', icon: 'dashboard', affix: true },
            },
        ],
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: 'profile',
                component: () => import('@/views/system/user/profile/index.vue'),
                name: 'Profile',
                meta: { title: 'person.personCenter', icon: 'user' },
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/error/404.vue'),
    },
];
export const dynamicRoutes = [
    {
        path: '/system/user-auth',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'role/:userId(\\d+)',
                component: () => import('@/views/system/user/authRole.vue'),
                name: 'AuthRole',
                meta: {
                    title: 'system.user.auth.authRole',
                    activeMenu: '/system/user',
                    permissions: ['system:user:edit']
                }
            }
        ]
    },
    {
        path: '/system/role-auth',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'user/:roleId(\\d+)',
                component: () => import('@/views/system/role/authUser.vue'),
                name: 'AuthUser',
                meta: {
                    title: 'system.user.auth.authUser',
                    activeMenu: '/system/role',
                    permissions: ['system:role:edit']
                }
            }
        ]
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});
export default router;
