import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { BASE_URL, TIMEOUT } from '../config/env';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 导入 Hooks

// 定义响应数据的通用类型（根据后端接口规范调整）
interface ApiResponse<T = any> {
  code: number; // 状态码（如 200 成功，401 未授权）
  data: T; // 业务数据
  msg: string; // 提示信息
}

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// ******************** 请求拦截器 ********************
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const navigate = useNavigate();
    // 1. 添加 Token 到请求头（认证逻辑）
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      const payload = JSON.parse(atob(token.split('.')[1])); // 解析 token 的 payload
      const expirationTime = payload.exp * 1000; // 转换为毫秒
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        localStorage.removeItem('token'); // 清除过期的 token
        navigate('/login'); // 使用路由跳转，避免页面刷新
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

// ******************** 响应拦截器 ********************
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    const navigate = useNavigate();
    // 1. 后端返回非成功状态码（如 400、401、500）
    if (res.code !== 200) {
      // 提示错误信息
      message.error(res.msg || '请求失败');

      // 2. 处理特殊状态码
      switch (res.code) {
        case 401: // 未授权/Token 过期
          message.error('登录状态过期，请重新登录');
          localStorage.removeItem('token'); // 清除过期的 token
          navigate('/login');
          break;
        case 403: // 权限不足
          message.error('暂无权限访问');
          break;
        case 500: // 服务器错误
          message.error('服务器内部错误，请稍后重试');
          break;
      }
      return Promise.reject(new Error(res.msg || '请求失败'));
    }

    // 3. 响应成功，返回业务数据
    return res.data;
  },
  (error: AxiosError) => {
    // 网络错误/超时等情况的处理
    const errMsg = error.message || '网络异常，请稍后重试';
    message.error(errMsg);

    // 处理超时错误
    if (errMsg.includes('timeout')) {
      message.error('请求超时，请稍后重试');
    }

    // 处理网络错误（如断网）
    if (errMsg.includes('Network Error')) {
      message.error('网络连接失败，请检查网络');
    }

    return Promise.reject(error);
  }
);

export default request;
