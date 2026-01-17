import PageHeader from '@/components/PageHeader';
import { Space, Card, Table, Image, Tooltip, type TableProps } from 'antd';
import { getVisitorList } from '@/api/dataCenter/visitor';
import type { CommonListRequest } from '@/types/common';
import type { Visitor } from '@/api/dataCenter/visitor/type';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';
import TableFunction from '@/components/TableFunction';
import { type Dayjs } from 'dayjs';

const VisitorList = () => {
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [loading, setLoading] = useState(false);
  const [visitorList, setVisitorList] = useState<Visitor[]>([]);
  const [total, setTotal] = useState(0);
  const columns: TableProps<Visitor>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        title: '浏览器指纹',
        dataIndex: 'identify',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '头像',
        dataIndex: 'portrait',
        render: (portrait: string) => {
          return portrait ? (
            <Image
              style={{
                width: '5rem ',
                height: '3rem',
                objectFit: 'cover',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
              src={portrait}
            />
          ) : (
            '暂无头像'
          );
        },
      },
      {
        title: 'ip',
        dataIndex: 'ip',
      },
      {
        title: '地址',
        dataIndex: 'address',
        render: address => {
          return address.country == '中国'
            ? `${address.province} ${address.city}`
            : address.country;
        },
      },
      {
        title: '浏览器',
        dataIndex: 'agent',
        width: '15rem',
        ellipsis: {
          showTitle: false,
        },
        render: agent => (
          <Tooltip placement="topLeft" title={agent}>
            {agent}
          </Tooltip>
        ),
      },

      {
        title: '访问时间',
        dataIndex: 'create_time',
        render: create_time => timeFormatter(create_time, 'YYYY-MM-DD'),
      },
      {
        title: '最后登录时间',
        dataIndex: 'last_login_time',
        render: last_login_time => timeFormatter(last_login_time, 'YYYY-MM-DD'),
      },
      {
        title: '访问次数',
        dataIndex: 'visited_count',
        width: '6rem',
        align: 'center',
      },
    ],
    []
  );
  const onSearch = (value: string) => {
    setQueryParams(prev => ({
      ...prev,
      searchKey: value,
    }));
  };
  const onDateChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setQueryParams(prev => ({
        ...prev,
        dateRange: dateStrings,
      }));
    } else {
      console.log('Clear');
    }
  };
  useEffect(() => {
    let canceled = false;
    const fetchVisitorList = async () => {
      setLoading(true);
      try {
        const { code, data, pagination } = await getVisitorList(queryParams);
        if (code === 1 && !canceled) {
          setVisitorList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitorList();
    return () => {
      canceled = true;
    };
  }, [queryParams]);
  return (
    <div>
      <PageHeader title="访客列表" desc="本页用于查看前台的访客信息" />
      <Space size={10} orientation="vertical">
        <TableFunction
          onSearch={onSearch}
          onDateChange={onDateChange}
        ></TableFunction>
        <Card>
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
            dataSource={visitorList}
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
        </Card>
      </Space>
    </div>
  );
};
export default VisitorList;
