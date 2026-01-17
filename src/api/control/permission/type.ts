import type { CommonResponse } from '@/types/common';

export interface Permission {
  id: number;
  parent_id: number;
  permission_name: string;
  permission_type: number;
  path: string;
  component: string;
  permission_code: string;
  create_time: string;
  update_time: string;
  disabled: boolean;
}

export interface PermissionList extends CommonResponse {
  data: Array<Permission>;
}
