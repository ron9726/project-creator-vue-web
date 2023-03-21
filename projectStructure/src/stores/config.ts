import { defineStore } from 'pinia';
export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      collapsed: false,
    };
  },
  actions: {
    toggleCollapsed(value) {
      this.collapsed = value;
    },
  },
});
