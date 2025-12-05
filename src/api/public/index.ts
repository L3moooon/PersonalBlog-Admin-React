import request from "@/utils/request";
//用户登录
export const upload = (data, onUploadProgress) => {
	return request({
		url: "/public/upload",
		method: "post",
		data,
		onUploadProgress,
	});
};
