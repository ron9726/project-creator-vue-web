import server from './request';
const operationLogAPI = {
  getLogList(params) {
    return server({
      url: '/monitor/operlog/list',
      method: 'get',
      params: {
        pageNum: params.current,
        ...params,
      },
    });
  },
  exportLog(data) {
    return server({
      url: '/monitor/operlog/export',
      method: 'post',
      data: {
        pageNum: data.current,
        ...data,
      },
      responseType: 'blob',
    });
  },
};

export default operationLogAPI;
