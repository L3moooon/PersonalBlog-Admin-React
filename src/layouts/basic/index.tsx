import { useState, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Layout, Menu, Breadcrumb, type MenuProps } from 'antd';
import { createStyles, cx, keyframes } from 'antd-style';

import Icon from '@/components/Icon';
import mainLogo from '@/assets/images/portrait.jpg';
import TabSet from './TabSet';
import Widgets from './widgets';

const { Header, Content, Sider } = Layout;

const menu: MenuProps['items'] = [
  {
    key: '/dashboard',
    label: '仪表盘',
    icon: <Icon name="main-dashboard" />,
  },
  {
    key: '/data-center',
    label: '数据中心',
    icon: <Icon name="main-data-center" />,
    children: [
      {
        key: '/visitor-list',
        label: '访客列表',
        icon: <Icon name="main-visitor-list" />,
      },
      {
        key: '/track-list',
        label: '埋点列表',
        icon: <Icon name="main-track-list" />,
      },
      {
        key: '/schedule-task',
        label: '定时任务',
        icon: <Icon name="main-schedule-task" />,
      },
      {
        key: '/error-log',
        label: '错误日志',
        icon: <Icon name="main-error-log" />,
      },
    ],
  },
  {
    key: '/console',
    label: '控制台',
    icon: <Icon name="main-console" />,
    children: [
      {
        key: '/user-list',
        label: '用户管理',
        icon: <Icon name="main-user-list" />,
      },
      {
        key: '/role-list',
        label: '角色管理',
        icon: <Icon name="main-role-list" />,
      },
      {
        key: '/permission-list',
        label: '权限管理',
        icon: <Icon name="main-permission-list" />,
      },
    ],
  },
  {
    key: '/content',
    label: '内容管理',
    icon: <Icon name="main-content" />,
    children: [
      {
        key: '/article-list',
        label: '文章管理',
        icon: <Icon name="main-article-list" />,
      },
      {
        key: '/comment-list',
        label: '评论管理',
        icon: <Icon name="main-comment-list" />,
      },
    ],
  },
  {
    key: '/about',
    label: '关于',
    icon: <Icon name="main-setting" />,
  },
];

//消失
const disappear = keyframes`
  from {
    opacity: 1;
    width: "2rem";
  }
  to {
    opacity: 0;
    width: 0;
    margin: 0;
  }
`;
const appear = keyframes`
  from {
    opacity: 0;
    width: 0;
  }
  to {
    opacity: 1;
    width: "2rem";
  }
`;

const useStyles = createStyles(({ token }) => ({
  main: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  sideHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '64px',
    background: token.colorBgContainer,
    overflow: 'hidden',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  },
  logo: {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    flexShrink: 0,
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginLeft: '12px',
    color: token.colorText,
    whiteSpace: 'nowrap',
    flexShrink: 1,
    flexBasis: 0,
  },
  disappear: {
    animation: `${disappear} 0.2s ease forwards`,
  },
  appear: {
    animation: `${appear} 0.2s ease forwards`,
  },
  sider: {
    height: '100vh',
    borderRight: `1px solid ${token.colorBorderSecondary}`,
    '& .ant-layout-sider-children': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  menu: {},
  header: {
    padding: '0 1rem',
    background: token.colorBgContainer,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  },
  content: {
    padding: '0 1.5rem 1.5rem',
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
    background: token.colorBgLayout,
  },
  breadcrumb: {
    margin: '16px 0',
  },
}));
const BasicIndex = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { styles } = useStyles();
  const navigate = useNavigate();

  const handleJump = useCallback(
    (e: { key: string }) => {
      navigate(e.key);
    },
    [navigate]
  );

  return (
    <Layout className={styles.main}>
      <Sider
        theme="light"
        width={200}
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={styles.sider}
      >
        <div className={styles.sideHeader}>
          <img className={styles.logo} src={mainLogo} alt="logo" />
          <div
            className={cx(
              styles.title,
              collapsed ? styles.disappear : styles.appear
            )}
          >
            时雨博客后台
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          onClick={handleJump}
          items={menu}
          className={styles.menu}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            icon={
              collapsed ? (
                <Icon name="main-unfold" size="1.5rem" />
              ) : (
                <Icon name="main-fold" size="1.5rem" />
              )
            }
          />
          <Breadcrumb
            className={styles.breadcrumb}
            items={[{ title: '首页' }, { title: '仪表盘' }]}
          />
          <Widgets />
        </Header>
        <Content className={styles.content}>
          <TabSet />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicIndex;
