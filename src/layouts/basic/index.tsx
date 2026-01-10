import { Outlet } from 'react-router-dom';
import { Button, Flex, Layout, Menu, Breadcrumb, type MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import mainLogo from '@/assets/images/portrait.jpg';

const { Header, Content, Footer, Sider } = Layout;

const menu: MenuProps['items'] = [
  {
    key: '/dashboard',
    label: '仪表盘',
    icon: <Icon name="dashboard" />,
  },
  {
    key: '/data-center',
    label: '数据中心',
    icon: <Icon name="dashboard" />,
    children: [
      {
        key: '/visitor-list',
        label: '访客列表',
        icon: <Icon name="dashboard" />,
      },
      {
        key: '/track-list',
        label: '埋点列表',
        icon: <Icon name="dashboard" />,
      },
      {
        key: '/schedule-task',
        label: '定时任务',
        icon: <Icon name="dashboard" />,
      },
      {
        key: '/error-log',
        label: '错误日志',
        icon: <Icon name="dashboard" />,
      },
    ],
  },
  {
    key: '/console',
    label: '控制台',
    icon: <Icon name="dashboard" />,
    children: [
      {
        key: '/user-list',
        label: '用户管理',
        icon: <Icon name="dashboard" />,
      },
      {
        key: '/role-list',
        label: '角色管理',
        icon: <Icon name="dashboard" />,
      },
      {
        key: '/permission-list',
        label: '权限管理',
        icon: <Icon name="dashboard" />,
      },
    ],
  },
  {
    key: '/content',
    label: '内容管理',
    icon: <Icon name="dashboard" />,
    children: [
      {
        key: '/article-list',
        label: '文章管理',
        icon: <Icon name="dashboard" />,
      },
      {
        key: '/comment-list',
        label: '评论管理',
        icon: <Icon name="dashboard" />,
      },
    ],
  },
  {
    key: '/setting',
    label: '设置',
    icon: <Icon name="dashboard" />,
    children: [
      {
        key: '/about',
        label: '关于',
        icon: <Icon name="dashboard" />,
      },
    ],
  },
];

const useStyles = createStyles(({ token }) => ({
  main: {
    width: '100%',
    height: '100vh',
  },
  logo: {
    width: '4rem',
    height: '4rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginLeft: '1rem',
  },
  header: {
    padding: 0,
    background: token.colorBgContainer,
  },
}));
const BasicIndex = () => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleJump = e => {
    console.log(e);
    navigate(e.key);
  };
  return (
    <Layout className={styles.main}>
      <Sider
        theme="light"
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <Flex justify="center" align="center">
          <img className={styles.logo} src={mainLogo} alt="logo" />
          <div className={styles.title}>时雨博客后台</div>
        </Flex>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          onClick={e => handleJump(e)}
          items={menu}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <Icon name="menu-unfold" />
              ) : (
                <Icon name="menu-fold" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'User' }, { title: 'Bill' }]}
          />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicIndex;
