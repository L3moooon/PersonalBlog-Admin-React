//角色管理
import request from '@/utils/request';
import type { CommonListRequest, CommonListResponse } from '@/types/common';
import type { RoleList } from './type';

enum API {
  GET_ROLE_LIST = '/admin/role/getRoleList', //获取所有角色和对应权限
  ASSIGN_PERMISSION = '/admin/role/assignPermission', //分配角色权限
}

export const getRoleList = (): Promise<RoleList> =>
  request.get(API.GET_ROLE_LIST);

//新增或修改角色
export const addOrEditRole = data => {
  return request({
    url: '/admin/role/addOrEditRole',
    method: 'post',
    data,
  });
};
//删除角色
export const deleteRole = data => {
  return request({
    url: '/admin/role/deleteRole',
    method: 'post',
    data,
  });
};

//获取权限列表
export const getPermissionList = () => {
  return request({
    url: '/admin/role/getPermissionList',
    method: 'post',
  });
};

//分配权限
export const assignPermission = data => {
  return request({
    url: '/admin/role/assignPermission',
    method: 'post',
    data,
  });
};
