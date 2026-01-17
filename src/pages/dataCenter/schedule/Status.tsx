import { Table, Button, Progress, type TableProps } from 'antd';
import type { CommonListRequest } from '@/types/common';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';

import { getStatusLog } from '@/api/dataCenter/schedule/index';
import type { StatusLogItem } from '@/api/dataCenter/schedule/type';

const Status = () => {
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [loading, setLoading] = useState(false);
  const [statusLogList, setStatusLogList] = useState<StatusLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const getColors = (value: number) => {
    if (value < 50) {
      return '#7fd29e';
    } else if (value < 80) {
      return '#e7c37f';
    } else {
      return '#f37f84';
    }
  };
  const columns: TableProps<StatusLogItem>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        dataIndex: 'cpu_usage',
        title: 'CPU使用率',
        align: 'center',
        render: cpu => <Progress percent={cpu} strokeColor={getColors(cpu)} />,
      },
      {
        dataIndex: 'mem_usage',
        title: '内存占用率',
        align: 'center',
        render: mem => <Progress percent={mem} strokeColor={getColors(mem)} />,
      },
      {
        dataIndex: 'disk_usage',
        title: '磁盘使用率',
        align: 'center',
        render: disk => (
          <Progress percent={disk} strokeColor={getColors(disk)} />
        ),
      },
      {
        dataIndex: 'network_status',
        title: '网络使用率',
        align: 'center',
        render: network => (
          <Progress percent={network} strokeColor={getColors(network)} />
        ),
      },
      {
        dataIndex: 'time',
        title: '记录时间',
        render: time => timeFormatter(time, 'YYYY-MM-DD'),
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: () => {
          return <Button>删除</Button>;
        },
      },
    ],
    []
  );
  useEffect(() => {
    let canceled = false;
    const fetchStatusLog = async () => {
      setLoading(true);
      try {
        const { code, data, pagination } = await getStatusLog(queryParams);
        if (code === 1 && !canceled) {
          setStatusLogList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatusLog();
    return () => {
      canceled = true;
    };
  }, [queryParams]);
  return (
    <Table
      rowKey="visitor"
      styles={{
        header: {
          cell: {
            padding: '0.5rem 2rem',
          },
        },
        body: {
          row: {
            height: '2.8rem',
            minHeight: '2.8rem',
            lineHeight: '2.8rem',
            maxHeight: '2.8rem',
            overflow: 'hidden',
          },
          cell: {
            padding: '0.5rem 2rem',
          },
        },
      }}
      loading={loading}
      columns={columns}
      dataSource={statusLogList}
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
export default Status;
