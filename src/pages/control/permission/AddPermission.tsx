import { Modal, Form, Input, Radio, TreeSelect, message } from 'antd';
import { useEffect, useState } from 'react';
import { addPermission, editPermission } from '@/api/control/permission';
import type { Permission } from '@/api/control/permission/type';

interface AddPermissionProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  initialValues?: Permission | null;
  permissionList: Permission[];
}
interface TreePermission {
  title: string;
  value: number;
  children: TreePermission[];
}
const AddPermission = ({
  open,
  onCancel,
  onSuccess,
  initialValues,
  permissionList,
}: AddPermissionProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 将扁平列表转换为树形结构以供 TreeSelect 使用
  const getTreeData = (list: Permission[]) => {
    const map: Record<number, TreePermission> = {
      0: { title: '根目录', value: 0, children: [] },
    };
    list.forEach(item => {
      map[item.id] = {
        title: item.permission_name,
        value: item.id,
        children: [],
      };
    });

    const tree: TreePermission[] = [map[0]];
    list.forEach(item => {
      const parent = map[item.parent_id];
      if (parent) {
        parent.children.push(map[item.id]);
      }
    });
    return tree;
  };

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldsValue({
          parent_id: 0,
          permission_type: 1,
          disabled: false,
        });
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const apiCall = initialValues ? editPermission : addPermission;
      const payload = initialValues
        ? { ...values, id: initialValues.id }
        : values;

      const { code } = await apiCall(payload);
      if (code === 1) {
        message.success(initialValues ? '修改成功' : '添加成功');
        onSuccess();
      }
    } catch (error) {
      console.error('Validate Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={initialValues ? '编辑权限' : '添加权限'}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
      >
        <Form.Item
          label="权限名称"
          name="permission_name"
          rules={[{ required: true, message: '请输入权限名称' }]}
        >
          <Input placeholder="请输入权限名称" />
        </Form.Item>

        <Form.Item label="父级权限" name="parent_id">
          <TreeSelect
            treeData={getTreeData(permissionList)}
            placeholder="请选择父级权限"
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item label="权限类型" name="permission_type">
          <Radio.Group>
            <Radio value={1}>路由</Radio>
            <Radio value={2}>组件</Radio>
            <Radio value={3}>按钮</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="路径" name="path">
          <Input placeholder="请输入前端路由路径" />
        </Form.Item>

        <Form.Item label="组件路径" name="component">
          <Input placeholder="请输入前端组件文件路径" />
        </Form.Item>

        <Form.Item label="权限标识" name="permission_code">
          <Input placeholder="请输入权限编码（如 user:add）" />
        </Form.Item>

        <Form.Item label="状态" name="disabled" valuePropName="checked">
          <Radio.Group>
            <Radio value={false}>启用</Radio>
            <Radio value={true}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPermission;
