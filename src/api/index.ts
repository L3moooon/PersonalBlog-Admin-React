import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { messageApi, navigate } from '@/utils/globalInstance';
import { getPersistItem } from '@/utils/getItem';

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getPersistItem('user', 'token');
    // console.log(token);
    if (token && config.headers) {
      const payload = JSON.parse(atob(token.split('.')[1])); // 解析 token 的 payload
      console.log(payload);
      const expirationTime = payload.exp * 1000; // 转换为毫秒
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        navigate('/auth'); // 使用路由跳转，避免页面刷新
        messageApi.error('登录状态过期，请重新登录');
      } else {
        config.headers.authorization = `Bearer ${token}`; // 遵循 Bearer 规范
      }
    }

    return config;
  },
  (error: AxiosError) => {
    // 请求错误的前置处理
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  error => {
    let message = '';
    const status = error.response;
    switch (status) {
      case 400:
        message = '请求参数错误';
        break;
      case 401:
        message = '登录已过期，请重新登录';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器错误';
        break;
      default:
        message = '网络出现问题';
        break;
    }
    messageApi.error(message);
    return Promise.reject(error);
  }
);

export default request;
