import server from './request';
const roleAPI = {
  getRoleList(params) {
    return server({
      url: '/system/role/list',
      method: 'get',
      params: {
        pageNum: params.current,
        ...params,
        orderByColumn: 'createTime',
        isAsc: 'desc',
      },
    });
  },
  getRoleTree(params) {
    return server({
      url: '/system/role/treeselect',
      method: 'get',
      params: {
        pageNum: params.current,
        ...params,
        orderByColumn: 'createTime',
        isAsc: 'desc',
      },
    });
  },
  addRole(data) {
    return server({
      url: '/system/role',
      method: 'post',
      data: {
        ...data,
        roleSort: 1,
      },
    });
  },
  editRole(data) {
    return server({
      url: '/system/role',
      method: 'put',
      data: {
        ...data,
        roleSort: 1,
      },
    });
  },
  deleteRole(roleIds) {
    return server({
      url: `/system/role/${roleIds}`,
      method: 'delete',
    });
  },
  changeStatus(data) {
    return server({
      url: '/system/role/changeStatus',
      method: 'put',
      data,
    });
  },
  changeStatusBatch(data) {
    return server({
      url: '/system/role/changeStatusBatch',
      method: 'put',
      data,
    });
  },
  getRoleMenu(roleId) {
    return server({
      url: `/system/menu/roleMenuTreeselect/${roleId}`,
      method: 'get',
    });
  },
};

export default roleAPI;
