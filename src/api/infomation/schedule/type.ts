import type { CommonListResponse } from '@/types/common';

export interface BackupLogItem {
  id: number;
  file_name: string;
  file_size: string;
  status: string;
  oss_url: string;
  error_msg: string;
  duration: string;
  time: string;
}

export interface BackupLogResponse extends CommonListResponse {
  data: Array<BackupLogItem>;
}

export interface RebootLogItem {
  id: number;
  action: string;
  status: string;
  message: string;
  time: string;
}

export interface RebootLogResponse extends CommonListResponse {
  data: Array<RebootLogItem>;
}

export interface StatusLogItem {
  id: number;
  cpu_usage: string;
  mem_usage: string;
  disk_usage: string;
  network_status: string;
  time: string;
}

export interface StatusLogResponse extends CommonListResponse {
  data: Array<StatusLogItem>;
}
