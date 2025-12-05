import request from "@/utils/request";
import type { CommonResponse } from "../../types/common";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	EmailCaptchaRequest,
} from "./type";

enum API {
	LOGIN = "/admin/auth/login", //登录
	REGISTER = "/admin/auth/register", //注册
	GET_EMAIL_CAPTCHA = "/admin/auth/getEmailCaptcha", //获取邮箱验证码
	RESET_PASSWORD = "/admin/auth/forgetPassword", //忘记密码
	MODIFY_INFO = "", //修改个人信息
}

export const login = (data: LoginRequest): Promise<LoginResponse> =>
	request.post(API.LOGIN, data);

export const register = (data: RegisterRequest): Promise<CommonResponse> =>
	request.post(API.REGISTER, data);

export const getEmailCaptcha = (
	data: EmailCaptchaRequest
): Promise<CommonResponse> => request.post(API.GET_EMAIL_CAPTCHA, data);
