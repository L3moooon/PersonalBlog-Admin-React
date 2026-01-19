import {
  Space,
  Card,
  Table,
  Button,
  Switch,
  Popconfirm,
  message,
  type TableProps,
} from 'antd';
import { timeFormatter } from '@/utils/timeFormatter';
import { useState, useMemo, useEffect, useCallback } from 'react';

import {
  getPermissionList,
  deletePermission,
} from '@/api/control/permission/index';
import type { Permission } from '@/api/control/permission/type';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import TableFunction from '@/components/TableFunction';
import HasAuth from '@/components/HasAuth';
import AddPermission from './AddPermission';

const PermissionList = () => {
  const [loading, setLoading] = useState(false);
  const [permissionList, setPermissionList] = useState<Permission[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Permission | null>(null);

  const fetchPermissionList = useCallback(async () => {
    setLoading(true);
    try {
      const { code, data } = await getPermissionList();
      if (code === 1) {
        setPermissionList(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPermissionList();
  }, [fetchPermissionList]);

  const handleEdit = useCallback((record: Permission) => {
    setCurrentEdit(record);
    setModalOpen(true);
  }, []);

  const handleAdd = () => {
    setCurrentEdit(null);
    setModalOpen(true);
  };

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const { code } = await deletePermission({ id });
        if (code === 1) {
          message.success('删除成功');
          fetchPermissionList();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [fetchPermissionList]
  );

  const columns: TableProps<Permission>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        title: '权限名称',
        dataIndex: 'permission_name',
        width: '15rem',
      },
      {
        title: '权限类型',
        dataIndex: 'permission_type',
        width: 100,
        render: permission_type => {
          if (permission_type === 1) {
            return '路由';
          } else if (permission_type === 2) {
            return '组件';
          } else {
            return '按钮';
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
        title: '权限标识',
        dataIndex: 'permission_code',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: 120,
        render: create_time => timeFormatter(create_time, 'YYYY-MM-DD'),
      },
      {
        title: '操作',
        dataIndex: 'actions',
        width: '10rem',
        render: (_, record) => (
          <Space size={8}>
            <HasAuth code="control:permission:active">
              <Switch
                checked={!record.disabled}
                checkedChildren="启用"
                unCheckedChildren="弃用"
                // onChange={() => updateArticleTop(record)}
              />
            </HasAuth>
            <HasAuth code="control:permission:edit">
              <Icon name="table-edit" onClick={() => handleEdit(record)} />
            </HasAuth>
            <Popconfirm
              title="确定要删除该权限吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <HasAuth code="control:permission:delete">
                <Icon name="table-delete" />
              </HasAuth>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  return (
    <div>
      <PageHeader title="权限管理" desc="本页用于管理后台所有权限" />
      <Space size={10} orientation="vertical">
        <TableFunction date={false} search={false}>
          <HasAuth code="control:permission:add">
            <Button type="primary" onClick={handleAdd}>
              新增权限
            </Button>
          </HasAuth>
        </TableFunction>
        <Card>
          <Table
            rowKey="id"
            tableLayout="fixed"
            styles={{
              body: {
                row: {
                  height: '2.8rem',
                  lineHeight: '2.8rem',
                },
                cell: {
                  padding: '0.5rem',
                },
              },
            }}
            loading={loading}
            columns={columns}
            dataSource={permissionList}
            pagination={false}
          />
        </Card>
      </Space>

      <AddPermission
        open={modalOpen}
        initialValues={currentEdit}
        permissionList={permissionList}
        onCancel={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          fetchPermissionList();
        }}
      />
    </div>
  );
};

export default PermissionList;
