import type { CommonResponse } from '@/types/common';

export interface Role {
  id: number;
  role_name: string;
  role_code: string;
  description: string;
  create_time: string;
  update_time: string;
  status: number;
  permission_ids: Array<number>;
}

export interface RoleList extends CommonResponse {
  data: Array<Role>;
}

export interface UserItem {
  id: number;
  account: string;
  name: string;
  avatar: string;
  ip: string;
  location: string;
  create_time: string;
  last_login_time: string;
  status: boolean;
}
export interface UserListResponse extends CommonResponse {
  data: Array<UserItem>;
}
