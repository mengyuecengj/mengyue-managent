import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { isHttp, isEmpty } from '@/utils/validate';
import defAva from '@/assets/images/profile.jpg';
import { defineStore } from 'pinia';
import { LoginApi, GetInfoApi, LogoutApi, LoginResponse, UserDetailResponse, LoginForm } from '@/types/store/user';

// 确保导入的 API 函数符合类型
const typedLogin = login as unknown as LoginApi;
const typedGetInfo = getInfo as unknown as GetInfoApi;
const typedLogout = logout as unknown as LogoutApi;

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || '', // 确保 token 有默认值
    id: '',
    name: '',
    avatar: '',
    roles: [] as string[],
    permissions: [] as string[],
  }),
  actions: {
    // 登录
    login(userInfo: LoginForm) {
      const { username, password, code, uuid } = userInfo;
      return new Promise<void>((resolve, reject) => {
        typedLogin(username.trim(), password, code, uuid)
          .then((res: LoginResponse) => {
            setToken(res.token);
            this.token = res.token;
            resolve();
          })
          .catch((error: Error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    getInfo() {
      return new Promise<UserDetailResponse>((resolve, reject) => {
        typedGetInfo()
          .then((res: UserDetailResponse) => {
            const { user, roles, permissions } = res;
            let avatar = user.avatar || '';

            if (!isHttp(avatar)) {
              avatar = isEmpty(avatar) ? defAva : import.meta.env.VITE_APP_BASE_API + avatar;
            }

            // 验证返回的 roles 是否是一个非空数组
            if (roles && roles.length > 0) {
              this.roles = roles;
              this.permissions = permissions;
            } else {
              this.roles = ['ROLE_DEFAULT'];
            }

            this.id = user.userId;
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((error: Error) => {
            console.error('getInfo error in store:', error);  // 添加，检查错误
            reject(error);
          });
      });
    },

    // 退出系统
    logOut() {
      return new Promise<boolean>((resolve, reject) => {
        typedLogout()
          .then(() => {
            this.token = '';
            this.roles = [];
            this.permissions = [];
            removeToken();
            resolve(true);
          })
          .catch((error: Error) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
