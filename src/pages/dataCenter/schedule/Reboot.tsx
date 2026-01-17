import { Table, Tag, Button, type TableProps } from 'antd';
import type { CommonListRequest } from '@/types/common';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';

import { getRebootLog } from '@/api/dataCenter/schedule/index';
import type { RebootLogItem } from '@/api/dataCenter/schedule/type';
import HasAuth from '@/components/HasAuth';

const Reboot = () => {
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [loading, setLoading] = useState(false);
  const [rebootLogList, setRebootLogList] = useState<RebootLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const getColor = (value: string) => {
    if (value == '成功') {
      return 'green';
    } else if (value == '执行中') {
      return 'orange';
    } else {
      return 'red';
    }
  };
  const columns: TableProps<RebootLogItem>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        title: '操作',
        dataIndex: 'action',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => {
          return <Tag color={getColor(status)}>{status}</Tag>;
        },
      },
      {
        title: '消息',
        dataIndex: 'message',
      },
      {
        title: '记录时间',
        dataIndex: 'time',
        render: time => timeFormatter(time, 'YYYY-MM-DD'),
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: () => (
          <HasAuth code="dataCenter:backup:delete">
            <Button type="link">删除</Button>
          </HasAuth>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    let canceled = false;
    const fetchRebootLog = async () => {
      setLoading(true);
      try {
        const { code, data, pagination } = await getRebootLog(queryParams);
        if (code === 1 && !canceled) {
          setRebootLogList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRebootLog();
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
      dataSource={rebootLogList}
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
export default Reboot;
