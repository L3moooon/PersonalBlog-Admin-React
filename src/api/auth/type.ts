import type { CommonResponse } from '@/types/common';

//登录请求
export interface LoginRequest {
  type: 'account' | 'email' | 'phone';
  account?: string;
  password?: string;
  phone?: string;
  email?: string;
  verificationCode?: string;
}

//注册请求
export interface RegisterRequest {
  name: string;
  account: string;
  password: string;
}

//忘记密码请求
export interface ForgetPasswordRequest {
  account: string;
}

//重置密码请求
export interface ResetPasswordRequest {
  token: string;
}

//邮箱验证码请求
export interface EmailCaptchaRequest {
  email: string | undefined;
}

//短信验证码请求
export interface SmsCaptchaRequest {
  phone: string | undefined;
}

//登录响应
export interface LoginResponse extends CommonResponse {
  token: string;
  user: {
    name: string;
    permissions: {
      routeKey: Array<string>;
      componentKeys?: Array<string>;
      buttonKeys?: Array<string>;
    };
  };
}

//重置密码响应
export interface ResetPasswordResponse extends CommonResponse {
  data: {
    password: string;
  };
}
