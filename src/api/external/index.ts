import request from "@/utils/request";

//获取所有文章列表
//https://v1.jinrishici.com/
// export const getRandomPoem = () => {
//   return request({
//     url: 'https://v1.jinrishici.com/all.txt',
//     baseURL: '', // 这里将baseURL设为空字符串，这样会使用绝对路径
//     method: 'get',
//   })
// }
export const getRandomPoem = () => {
	return request({
		url: "/external/all.txt", // 使用代理路径
		method: "get",
	});
};

export const uploadTest = (data, onUploadProgress) => {
	return request({
		url: "/public/uploadTest",
		method: "post",
		data,
		onUploadProgress,
	});
};
