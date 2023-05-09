import Storage from '@/utils/storage';
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isFirstLogin: undefined,
      userInfo: undefined as any,
      rightList: undefined,
    };
  },
  actions: {
    async setUserInfo() {
      const { data } = await this.baseAPI((api) => {
        return api.getUserInfo();
      });
      this.userInfo = data.user;
      if (!this.userInfo) {
        this.logout();
        throw new Error('用户状态异常，请重新登录');
      }
      this.isFirstLogin = Number(data.user.resetStatus || 0);
      this.rightList = data.permissions;
      if (this.isFirstLogin && !location.href.includes('force-change')) {
        location.href = '/force-change';
      }
    },
    removeToken() {},
    clearUserInfo() {
      this.isFirstLogin = undefined;
      this.userInfo = undefined;
    },
    clearRightList() {
      this.rightList = undefined;
    },
    async login(loginData) {
      try {
        const {
          data: { token },
        } = await this.baseAPI((api) => {
          return api.login(loginData);
        });
        Storage.setCookie('token', token);
      } catch (e: any) {
        console.log('登录错误信息 :>> ', e.message);
        return Promise.reject();
      }
    },
    async logout() {
      Storage.removeCookie('token');
      this.clearUserInfo();
      this.clearRightList();
      this.getRouter().push('/login');
    },
  },
});
