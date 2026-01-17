import { Table, Tag, Tooltip, Button, type TableProps } from 'antd';
import type { CommonListRequest } from '@/types/common';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';
import HasAuth from '@/components/HasAuth';
import { getBackupLog } from '@/api/dataCenter/schedule/index';
import type { BackupLogItem } from '@/api/dataCenter/schedule/type';

const Backup = () => {
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [loading, setLoading] = useState(false);
  const [backupLogList, setBackupLogList] = useState<BackupLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const columns: TableProps<BackupLogItem>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        title: '文件名',
        dataIndex: 'file_name',
        width: '15rem',
        ellipsis: {
          showTitle: false,
        },
        render: fileName => {
          return (
            <Tooltip placement="topLeft" title={fileName}>
              {fileName}
            </Tooltip>
          );
        },
      },
      {
        title: '文件大小',
        dataIndex: 'file_size',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => {
          return (
            <Tag color={status === 'success' ? 'green' : 'red'}>
              {status === 'success' ? '成功' : '失败'}
            </Tag>
          );
        },
      },
      {
        title: '存储地址',
        dataIndex: 'oss_url',
        width: '15rem',
        ellipsis: {
          showTitle: false,
        },
        render: oss_url => {
          return (
            <Tooltip placement="topLeft" title={oss_url}>
              {oss_url}
            </Tooltip>
          );
        },
      },
      {
        title: '错误信息',
        dataIndex: 'error_msg',
      },
      {
        title: '耗时',
        dataIndex: 'duration',
      },
      {
        title: '记录时间',
        dataIndex: 'time',
        render: time => timeFormatter(time, 'YYYY-MM-DD'),
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: () => {
          return (
            <HasAuth code="dataCenter:backup:delete">
              <Button type="link">删除</Button>
            </HasAuth>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    let canceled = false;
    const fetchBackupLog = async () => {
      setLoading(true);
      try {
        const { code, data, pagination } = await getBackupLog(queryParams);
        if (code === 1 && !canceled) {
          setBackupLogList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBackupLog();
    return () => {
      canceled = true;
    };
  }, [queryParams]);
  return (
    <Table
      rowKey="visitor"
      styles={{
        body: {
          row: {
            height: '2.8rem',
            minHeight: '2.8rem',
            lineHeight: '2.8rem',
            maxHeight: '2.8rem',
            overflow: 'hidden',
          },
          cell: {
            padding: '0.5rem',
          },
        },
      }}
      loading={loading}
      columns={columns}
      dataSource={backupLogList}
      pagination={{
        current: queryParams.pageNo,
        pageSize: queryParams.pageSize,
        total: total,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
          setQueryParams(prev => ({
            ...prev,
            pageNo: page,
            pageSize: pageSize,
          }));
        },
      }}
    />
  );
};
export default Backup;
