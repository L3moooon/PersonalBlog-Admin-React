import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// import router from "../router/index";
// import { toast } from "vue-sonner";
// import { useUserStore } from "../store/user";
const request: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 10000,
});
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //获取token，登录成功以后携带给服务器
  const token = useUserStore().token;
  if (token) {
    //辅助判断Token是否过期
    const payload = JSON.parse(atob(token.split('.')[1])); // 解析 token 的 payload
    const expirationTime = payload.exp * 1000; // 转换为毫秒
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
      localStorage.removeItem('user'); // 清除过期的 token
      router.push('/login'); // 使用路由跳转，避免页面刷新
    } else {
      config.headers.authorization = `Bearer ${token}`; // 遵循 Bearer 规范
    }
  }
  return config;
});

request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  error => {
    let message = '';
    let status = error.response;
    console.log(error);
    switch (status) {
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
    toast.error(message, {
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export default request;
