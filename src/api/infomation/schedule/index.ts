import request from '@/utils/request';
import type {
  SimpleCommonListRequest,
  CommonListResponse,
} from '@/types/common';
import type {
  BackupLogResponse,
  RebootLogResponse,
  StatusLogResponse,
} from './type';

enum API {
  GET_BACKUP_LOG = '/admin/schedule/getBackupLog', //获取数据库备份日志
  GET_REBOOT_LOG = '/admin/schedule/getRebootLog', //获取服务器重启日志
  GET_STATUS_LOG = '/admin/schedule/getStatusLog', //获取访客列表
}

export const getBackupLog = (
  params: SimpleCommonListRequest
): Promise<BackupLogResponse> => request.get(API.GET_BACKUP_LOG, { params });

export const getRebootLog = (
  params: SimpleCommonListRequest
): Promise<RebootLogResponse> => request.get(API.GET_REBOOT_LOG, { params });

export const getStatusLog = (
  params: SimpleCommonListRequest
): Promise<StatusLogResponse> => request.get(API.GET_STATUS_LOG, { params });
