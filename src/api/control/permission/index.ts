import request from '@/api/index';
import type { RoleList } from './type';

enum API {
  GET_PERMISSION_LIST = '/admin/permission/getPermissionList', //获取权限列表
  ADD_PERMISSION = '/admin/permission/addPermission', //新增权限
  EDIT_PERMISSION = '/admin/permission/editPermission', //修改权限
  DELETE_PERMISSION = '/admin/permission/deletePermission', //删除权限
}
//获取权限列表
export const getPermissionList = (): Promise<RoleList> =>
  request.get(API.GET_PERMISSION_LIST);

//新增权限
export const addPermission = data => {
  return request({
    url: API.ADD_PERMISSION,
    method: 'post',
    data,
  });
};

//修改权限
export const editPermission = data => {
  return request({
    url: API.EDIT_PERMISSION,
    method: 'post',
    data,
  });
};

//删除权限
export const deletePermission = data => {
  return request({
    url: API.DELETE_PERMISSION,
    method: 'post',
    data,
  });
};
