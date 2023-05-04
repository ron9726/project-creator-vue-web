import server from './request';
const loginLogAPI = {
  getLogList(params) {
    return server({
      url: '/monitor/logininfor/list',
      method: 'get',
      params: {
        pageNum: params.current,
        ...params,
      },
    });
  },
  exportLog(data) {
    return server({
      url: '/monitor/logininfor/export',
      method: 'post',
      data: {
        pageNum: data.current,
        ...data,
      },
      responseType: 'blob',
    });
  },
};

export default loginLogAPI;
