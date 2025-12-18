// 环境判断（基于 Vite/Create React App 的环境变量）
export const isDev = import.meta.env.DEV; // Vite 环境
// export const isDev = process.env.NODE_ENV === 'development'; // Create React App 环境

// 接口基础地址
export const BASE_URL = isDev
  ? 'http://localhost:3000/api' // 开发环境
  : 'https://prod-api.example.com/api'; // 生产环境

// 超时时间
export const TIMEOUT = 10000; // 10秒
