import request from '@/api/index';
//用户登录
export const upload = (data, onUploadProgress) => {
  return request({
    url: '/public/upload',
    method: 'post',
    data,
    onUploadProgress,
  });
};
