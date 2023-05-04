import axios from 'axios';
import type { BasicResponseModel, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { Modal, message as Message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user';
import Storage from '@/utils/storage';
import 'ant-design-vue/lib/modal/style/index.less';
import 'ant-design-vue/lib/button/style/index.less';
declare module 'axios' {
  export interface AxiosRequestConfig {
    noToken?: boolean;
    neverCancel?: boolean;
  }
  export interface BasicResponseModel<T = any> {
    code: number;
    msg: string;
    data?: T;
    rows?: T;
    token?: string;
  }
}

const store = useUserStore();

const CancelToken = axios.CancelToken; // axios 的取消请求

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

Object.assign(axios.defaults.headers, headers);

const server = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

// 防止重复提交 利用axios的cancelToken
const pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识

/**
 * 取消重复请求
 * @param config
 * @param f
 */
const removePending = (config: AxiosRequestConfig, cancel: Canceler | null) => {
  const flgUrl = config?.url;
  if (pending.includes(flgUrl)) {
    if (cancel) {
      cancel(`${flgUrl}接口不允许并发请求`);
    } else {
      pending.splice(pending.indexOf(flgUrl), 1); // 删除记录
    }
  } else {
    if (cancel) {
      pending.push(flgUrl);
    }
  }
};

// request拦截器
server.interceptors.request.use((config) => {
  if (!config.neverCancel) {
    // 生成canalToken
    config.cancelToken = new CancelToken((c: Canceler) => {
      removePending(config, c);
    });
  }

  if (Storage.getCookie('token') && !config.noToken) {
    Object.assign(config.headers as {}, {
      Authorization: 'Bearer ' + Storage.getCookie('token'),
    });
  }

  return config;
});

// response响应拦截器
server.interceptors.response.use(
  (res) => {
    removePending(res.config, null);

    // 过滤登录请求
    if (res.config.url === '/auth/oauth/token' || res.config.responseType === 'blob') {
      return res.data;
    }

    /* todo: 状态码、报错信息尚未确认，前后端协商确定后调整 */
    const { code, msg } = res.data;

    // token失效或无权限
    if (code === 401) {
      Modal.destroyAll();
      Modal.confirm({
        content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
        onOk: () => {
          store.logout();
        },
        onCancel: () => {
          Modal.destroyAll();
        },
      });
      return Promise.reject(401);
    }

    if (code !== 200) {
      checkStatus(code, msg);
      return Promise.reject(msg);
    }

    return res.data;
  },
  (error) => {
    let { config, message } = error;
    let presentMessage;
    removePending(config, null);
    if (error.response) {
      //在有响应的情况下，后端的所有接口返回的http状态码均为200，所以不会走到这个流程控制
      //具体的状态码是放在响应中
      console.log('error.response');
    } else if (error.request) {
      if (message.includes('timeout')) {
        presentMessage = '请求超时';
      } else if (message === 'Network Error') {
        presentMessage = '网络异常，请检查网络';
      }
    } else {
      if (message === '' || !message) {
        presentMessage = '出现未知错误';
      } else {
        presentMessage = message;
      }
    }
    Message.error(presentMessage);
    return Promise.reject();
  }
);

const checkStatus = (code: number, msg: string): void => {
  switch (code) {
    case 500:
      Message.error(msg || '操作出现错误且无法获取有效错误信息');
      break;
    default:
      Message.error(msg || '服务器内部错误，且无法获取有效错误信息');
      break;
  }
};

export default server;
