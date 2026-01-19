import type { CommonListResponse } from '@/types/common';

export interface User {
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
export interface UserListResponse extends CommonListResponse {
  data: Array<User>;
}
