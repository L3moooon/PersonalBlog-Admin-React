import PageHeader from '@/components/PageHeader';
import { Space, Card, Table, Image, Switch, type TableProps } from 'antd';
import type { CommonListRequest } from '@/types/common';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';

import {
  getAdminList,
  // changeUserStatus,
  // deleteUser,
} from '@/api/control/user/index';
import type { User } from '@/api/control/user/type';
import Icon from '@/components/Icon';

const UserList = () => {
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const columns: TableProps<User>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'account_id',
        width: '5rem',
      },
      {
        title: '账号',
        dataIndex: 'account',
        width: '15rem',
      },
      {
        title: '昵称',
        dataIndex: 'name',
        width: '15rem',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
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
        title: 'ip地址',
        dataIndex: 'ip',
      },
      {
        title: '地址',
        dataIndex: 'location',
        render: address => {
          return address.country == '中国'
            ? `${address.province} ${address.city}`
            : address.country;
        },
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: create_time => timeFormatter(create_time, 'YYYY-MM-DD'),
      },
      {
        title: '最后登录时间',
        dataIndex: 'last_login_time',
        render: last_login_time => timeFormatter(last_login_time, 'YYYY-MM-DD'),
      },
      {
        title: '角色',
        dataIndex: 'role_names',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        render: (_, record) => (
          <Space size={8}>
            <Switch
              checked={record.top}
              checkedChildren="启用"
              unCheckedChildren="拉黑"
              // onChange={() => updateArticleTop(record)}
            />
          </Space>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    let canceled = false;
    const fetchUserList = async () => {
      setLoading(true);
      try {
        const { code, data, pagination } = await getAdminList(queryParams);
        if (code === 1 && !canceled) {
          setUserList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserList();
    return () => {
      canceled = true;
    };
  }, [queryParams]);
  return (
    <div>
      <PageHeader title="用户管理" desc="本页用于管理后台所有注册账号" />
      <Space size={10} orientation="vertical">
        <Card>
          <Table
            rowKey="visitor"
            tableLayout="fixed"
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
            dataSource={userList}
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
export default UserList;
