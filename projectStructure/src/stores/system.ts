import { defineStore } from 'pinia';
interface Tree {
  key: string;
  value: string;
  title: string;
  children?: Tree[];
  parentRole?: {
    name: string;
    id: string;
  };
}
export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      roles: undefined as undefined | any[],
    };
  },
  actions: {
    async setRoles() {
      const { data } = await this.roleAPI((api) => {
        return api.getRoleTree({ current: 1 });
      });
      this.roles = (function getRoleTree(root, parent: any) {
        const roleTree: Tree[] = [];
        root.forEach((role) => {
          const temp: any = {};
          temp.key = role.roleId;
          temp.value = role.roleId;
          temp.title = role.roleName;
          temp.parent = parent;
          if (role.children?.length) {
            temp.children = getRoleTree(role.children, { name: role.roleName, id: role.roleId });
          }
          roleTree.push(temp);
        });
        return roleTree;
      })(data, undefined);
    },
    async setUserStatus() {},
  },
});
