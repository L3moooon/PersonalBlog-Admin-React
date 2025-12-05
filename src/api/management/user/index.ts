import request from '@/utils/request';
import type {
  SimpleCommonListRequest,
  CommonListResponse,
} from '@/types/common';

enum API {
  GET_Admin_LIST = '/admin/user/getAdminList', //获取所有用户列表
}

export const getAdminList = (
  params: SimpleCommonListRequest
): Promise<CommonListResponse> => request.get(API.GET_Admin_LIST, { params });
