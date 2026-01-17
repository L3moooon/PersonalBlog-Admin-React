import { Space, Card, Table, Button, Switch, type TableProps } from 'antd';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect } from 'react';

import { getPermissionList } from '@/api/control/permission/index';
import type { Permission } from '@/api/control/permission/type';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import TableFunction from '@/components/TableFunction';

const PermissionList = () => {
  const [loading, setLoading] = useState(false);
  const [permissionList, setPermissionList] = useState<Permission[]>([]);
  const columns: TableProps<Permission>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '父级id',
        dataIndex: 'parent_id',
      },
      {
        title: '权限名称',
        dataIndex: 'permission_name',
      },
      {
        title: '权限类型',
        dataIndex: 'permission_type',
        render: permission_type => {
          if (permission_type === 1) {
            return '路由权限';
          } else if (permission_type === 2) {
            return '组件权限';
          } else {
            return '按钮权限';
          }
        },
      },
      {
        title: '路径',
        dataIndex: 'path',
      },
      {
        title: '组件',
        dataIndex: 'component',
      },
      {
        title: '按钮-权限编码',
        dataIndex: 'permission_code',
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
        render: (_, record) => (
          <Space size={8}>
            <Switch
              checked={record.disabled}
              checkedChildren="启用"
              unCheckedChildren="禁用"
              // onChange={() => updateArticleTop(record)}
            />
            <Icon
              name="table-edit"
              onClick={() => {
                console.log(record);
              }}
            />
            <Icon
              name="table-delete"
              onClick={() => {
                console.log(record);
              }}
            />
          </Space>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    let canceled = false;
    const fetchPermissionList = async () => {
      setLoading(true);
      try {
        const { code, data } = await getPermissionList();
        if (code === 1 && !canceled) {
          setPermissionList(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPermissionList();
    return () => {
      canceled = true;
    };
  }, []);
  return (
    <div>
      <PageHeader title="权限管理" desc="本页用于管理后台所有权限" />
      <Space size={10} orientation="vertical">
        <TableFunction date={false} search={false}>
          <Button>新增权限</Button>
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
            dataSource={permissionList}
          />
        </Card>
      </Space>
    </div>
  );
};
export default PermissionList;
