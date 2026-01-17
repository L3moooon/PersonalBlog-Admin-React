import {
  Space,
  Card,
  Table,
  Button,
  Switch,
  Flex,
  type TableProps,
} from 'antd';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';

import { getRoleList } from '@/api/control/role/index';
import type { Role } from '@/api/control/role/type';
import PageHeader from '@/components/PageHeader';
import TableFunction from '@/components/TableFunction';
import HasAuth from '@/components/HasAuth';

const RoleList = () => {
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState<Role[]>([]);
  const columns: TableProps<Role>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        title: '角色名称',
        dataIndex: 'role_name',
      },
      {
        title: '角色编码',
        dataIndex: 'role_code',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: create_time => timeFormatter(create_time, 'YYYY-MM-DD'),
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        render: update_time => timeFormatter(update_time, 'YYYY-MM-DD'),
      },
      {
        title: '操作',
        dataIndex: 'actions',
        width: '20rem',
        render: (_, record) => (
          <Flex>
            <HasAuth code="control:role:active">
              <Switch
                checked={record.status}
                checkedChildren="启用"
                unCheckedChildren="禁用"
                // onChange={() => updateArticleTop(record)}
              />
            </HasAuth>
            <HasAuth code="control:role:edit">
              <Button type="link">编辑</Button>
            </HasAuth>
            <HasAuth code="control:role:edit">
              <Button type="link">分配权限</Button>
            </HasAuth>
            <HasAuth code="control:role:delete">
              <Button type="link">删除</Button>
            </HasAuth>
          </Flex>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    let canceled = false;
    const fetchRoleList = async () => {
      setLoading(true);
      try {
        const { code, data } = await getRoleList();
        if (code === 1 && !canceled) {
          setRoleList(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleList();
    return () => {
      canceled = true;
    };
  }, []);
  return (
    <div>
      <PageHeader title="用户管理" desc="本页用于管理后台所有注册账号" />
      <Space size={10} orientation="vertical">
        <TableFunction date={false} search={false}>
          <HasAuth code="control:role:add">
            <Button>新增角色</Button>
          </HasAuth>
        </TableFunction>
        <Card>
          <Table
            rowKey="Rele"
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
            dataSource={roleList}
          />
        </Card>
      </Space>
    </div>
  );
};
export default RoleList;
