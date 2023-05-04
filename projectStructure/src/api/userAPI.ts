import server from './request';
const userAPI = {
  getUserList(params) {
    return server({
      url: '/system/user/list',
      method: 'get',
      params: {
        pageNum: params.current,
        ...params,
        orderByColumn: 'createTime',
        isAsc: 'desc',
      },
    });
  },
  addUser(data) {
    return server({
      url: '/system/user',
      method: 'post',
      data,
    });
  },
  editUser(data) {
    return server({
      url: '/system/user',
      method: 'put',
      data,
    });
  },
  deleteUser(ids) {
    return server({
      url: `/system/user/${ids.join(',')}`,
      method: 'delete',
    });
  },
  resetUserPwd(userId) {
    return server({
      url: '/system/user/resetPwd',
      method: 'put',
      data: {
        userId,
      },
    });
  },
  changePwd(data) {
    return server({
      url: '/system/user/changePwd',
      method: 'put',
      data,
    });
  },
  changeStatus(data) {
    return server({
      url: '/system/user/changeStatus',
      method: 'put',
      data,
    });
  },
  assignRole2User(data) {
    return server({
      url: '/system/user/authRole',
      method: 'put',
      data,
    });
  },
  assignRole2UserBatch(data) {
    return server({
      url: '/system/user/authRoleBatch',
      method: 'put',
      data,
    });
  },
  getImportTemplate() {
    return server({
      url: '/system/user/importTemplate',
      method: 'post',
      responseType: 'blob',
    });
  },
};

export default userAPI;
