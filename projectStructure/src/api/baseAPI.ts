import server from './request';
const baseAPI = {
  login(data) {
    return server({
      url: '/login',
      method: 'post',
      data,
    });
  },
  getUserInfo() {
    return server({
      url: '/getInfo',
      method: 'get',
    });
  },
  logout() {
    return server({
      url: '/logout',
      method: 'get',
    });
  },
  getCaptchaImage() {
    return server({
      url: '/captchaImage',
      method: 'get',
    });
  },
};

export default baseAPI;
