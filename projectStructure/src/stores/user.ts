import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '123',
      userInfo: { nickName: '123' },
      rightList: ['123'],
    };
  },
  actions: {
    setUserInfo() {},
    setToken(value) {
      this.token = value;
    },
    removeToken() {},
    clearUserInfo() {},
    clearRightList() {},
    logout() {},
  },
});
