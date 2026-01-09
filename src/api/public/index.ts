import request from '@/api/index';
//用户登录

enum API {
  upload = '/public/upload',
  GET_ALI_STS = '/public/oss/getStsToken',
}
export const upload = (data, onUploadProgress) => {
  return request({
    url: API.upload,
    method: 'post',
    data,
    onUploadProgress,
  });
};

export const getAliSts = (): Promise<any> => request.get(API.GET_ALI_STS);
