import request from '../index';
//获取用户主题相关信息
export const getThemeInfo = () => {
  return request({
    url: '/admin/webInfo/theme',
    method: 'post',
  });
};
//更改用户主题相关信息
export const modiThemeInfo = data => {
  return request({
    url: '/admin/webInfo/modifyTheme',
    method: 'post',
    data,
  });
};
