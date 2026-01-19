import request from '@/api/index';
import type {
  RoleList,
  AddRoleRequest,
  EditRoleRequest,
  DeleteRoleRequest,
  AssignPermissionRequest,
} from './type';
import type { CommonResponse } from '@/types/common';

enum API {
  GET_ROLE_LIST = '/admin/role/getRoleList', //获取所有角色和对应权限
  ADD_ROLE = '/admin/role/addRole', //新增角色
  EDIT_ROLE = '/admin/role/editRole', //修改角色
  DELETE_ROLE = '/admin/role/deleteRole', //删除角色
  ASSIGN_PERMISSION = '/admin/role/assignPermission', //分配角色权限
}

//获取所有角色和对应权限
export const getRoleList = (): Promise<RoleList> =>
  request.get(API.GET_ROLE_LIST);

//新增角色
export const addRole = (data: AddRoleRequest): Promise<CommonResponse> => {
  return request.post(API.ADD_ROLE, data);
};
//删除角色
export const deleteRole = (
  data: DeleteRoleRequest
): Promise<CommonResponse> => {
  return request.post(API.DELETE_ROLE, data);
};
//修改角色
export const editRole = (data: EditRoleRequest): Promise<CommonResponse> => {
  return request.post(API.EDIT_ROLE, data);
};

//分配角色权限
export const assignPermission = (
  data: AssignPermissionRequest
): Promise<CommonResponse> => {
  return request.post(API.ASSIGN_PERMISSION, data);
};
