import React from 'react';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { messageApi } from '@/utils/globalInstance';

interface HasAuthProps {
  code: string; // 权限标识符
  children: React.ReactElement; // 必须是单个 React 元素
}

const HasAuth = ({ code, children }: HasAuthProps) => {
  // 从 Redux 获取当前用户的按钮/组件权限
  const buttonPermissions = useSelector(
    (state: RootState) => state.user.userInfo?.permissions?.buttonKeys || []
  );
  // const roleName = useSelector(
  //   (state: RootState) => (state as RootState).user.userInfo?.role_name
  // );

  // 判断逻辑：超级管理员放行 OR 包含特定 code
  const hasPermission = buttonPermissions.includes(code);

  if (hasPermission) {
    return children;
  }

  // --- 无权限时的逻辑 ---

  // 处理拦截事件
  const handleDisabledAction = (e: React.SyntheticEvent) => {
    // 阻止冒泡和默认行为
    e.preventDefault();
    e.stopPropagation();
    // 使用唯一的 key 防止重复提示弹出多次
    messageApi.warning({
      content: '您没有操作该功能的权限',
      key: 'auth_warning',
    });
  };

  // 通过 cloneElement 注入新属性，使组件看起来不可用
  const disabledChild = React.cloneElement(
    children as React.ReactElement<any>,
    {
      // 覆盖常用的交互事件
      onClick: handleDisabledAction,
      onChange: handleDisabledAction,
      // 视觉反馈：半透明、禁用手型
      style: {
        ...(children as React.ReactElement<any>).props.style,
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'auto',
      },
    }
  );

  return (
    <Tooltip title="暂无此操作权限" placement="top">
      <span
        style={{ cursor: 'not-allowed', display: 'inline-block' }}
        onClickCapture={handleDisabledAction}
        onMouseDownCapture={handleDisabledAction}
      >
        {disabledChild}
      </span>
    </Tooltip>
  );
};

export default HasAuth;
