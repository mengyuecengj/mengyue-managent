import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { isHttp, isEmpty } from '@/utils/validate';
import defAva from '@/assets/images/profile.jpg';
import { defineStore } from 'pinia';
// 确保导入的 API 函数符合类型
const typedLogin = login;
const typedGetInfo = getInfo;
const typedLogout = logout;
const useUserStore = defineStore('user', {
    state: () => ({
        token: getToken() || '', // 确保 token 有默认值
        id: '',
        name: '',
        avatar: '',
        roles: [],
        permissions: [],
    }),
    actions: {
        // 登录
        login(userInfo) {
            const { username, password, code, uuid } = userInfo;
            return new Promise((resolve, reject) => {
                typedLogin(username.trim(), password, code, uuid)
                    .then((res) => {
                    setToken(res.token);
                    this.token = res.token;
                    resolve();
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        },
        // 获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                typedGetInfo()
                    .then((res) => {
                    const { user, roles, permissions } = res;
                    let avatar = user.avatar || '';
                    if (!isHttp(avatar)) {
                        avatar = isEmpty(avatar) ? defAva : import.meta.env.VITE_APP_BASE_API + avatar;
                    }
                    // 验证返回的 roles 是否是一个非空数组
                    if (roles && roles.length > 0) {
                        this.roles = roles;
                        this.permissions = permissions;
                    }
                    else {
                        this.roles = ['ROLE_DEFAULT'];
                    }
                    this.id = user.userId;
                    this.name = user.userName;
                    this.avatar = avatar;
                    resolve(res);
                })
                    .catch((error) => {
                    console.error('getInfo error in store:', error); // 添加，检查错误
                    reject(error);
                });
            });
        },
        // 退出系统
        logOut() {
            return new Promise((resolve, reject) => {
                typedLogout()
                    .then(() => {
                    this.token = '';
                    this.roles = [];
                    this.permissions = [];
                    removeToken();
                    resolve(true);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        },
    },
});
export default useUserStore;
