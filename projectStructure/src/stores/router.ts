import { defineStore } from 'pinia';
export const useRouterStore = defineStore('router', {
  state: () => {
    return {
      menus: [],
    };
  },
  actions: {
    setMenus(menus) {
      this.menus = menus;
    },
  },
});
