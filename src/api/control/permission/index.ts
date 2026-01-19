import request from '@/api/index';
import type {
  PermissionList,
  AddPermissionRequest,
  UpdatePermissionRequest,
  DeletePermissionRequest,
} from './type';
import type { CommonResponse } from '@/types/common';
enum API {
  GET_PERMISSION_LIST = '/admin/permission/getPermissionList', //获取权限列表
  ADD_PERMISSION = '/admin/permission/addPermission', //新增权限
  EDIT_PERMISSION = '/admin/permission/editPermission', //修改权限
  DELETE_PERMISSION = '/admin/permission/deletePermission', //删除权限
}
//获取权限列表
export const getPermissionList = (): Promise<PermissionList> =>
  request.get(API.GET_PERMISSION_LIST);

//新增权限
export const addPermission = (
  data: AddPermissionRequest
): Promise<CommonResponse> => {
  return request.post(API.ADD_PERMISSION, data);
};

//修改权限
export const editPermission = (
  data: UpdatePermissionRequest
): Promise<CommonResponse> => {
  return request.post(API.EDIT_PERMISSION, data);
};

//删除权限
export const deletePermission = (
  data: DeletePermissionRequest
): Promise<CommonResponse> => {
  return request.post(API.DELETE_PERMISSION, data);
};
