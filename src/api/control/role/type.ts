import type { CommonResponse } from '@/types/common';

export interface Role {
  id: number;
  role_name: string;
  role_code: string;
  description: string;
  create_time: string;
  update_time: string;
  status: boolean;
  permission_ids: Array<number>;
}

export interface RoleList extends CommonResponse {
  data: Array<Role>;
}

export interface AddRoleRequest {
  role_name: string;
  role_code: string;
  description: string;
}

export interface EditRoleRequest {
  id: number;
  role_name: string;
  role_code: string;
  description: string;
}

export interface DeleteRoleRequest {
  id: number;
}

export interface AssignPermissionRequest {
  role_id: number;
  permission_ids: Array<number>;
}
