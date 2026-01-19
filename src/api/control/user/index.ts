import request from '@/api';
import type { SimpleCommonListRequest } from '@/types/common';
import type { UserListResponse } from './type';

enum API {
  GET_USER_LIST = '/admin/user/getAdminList', //获取所有用户列表
}

export const getUserList = (
  params: SimpleCommonListRequest
): Promise<UserListResponse> => request.get(API.GET_USER_LIST, { params });
