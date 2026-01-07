import { Outlet } from 'react-router-dom';
import { Button, Flex, Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { createStyles } from 'antd-style';
import mainLogo from '@/assets/images/portrait.jpg';
import { useState } from 'react';
import { routes } from '@/router/routes';

const useStyles = createStyles(() => ({
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
}));
const BasicIndex = () => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={styles.main}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <Flex justify="center" align="center">
          <img className={styles.logo} src={mainLogo} alt="logo" />
          <div className={styles.title}>时雨博客后台</div>
        </Flex>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              label: 'nav 1',
            },
            {
              key: '2',
              label: 'nav 2',
            },
            {
              key: '3',
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header>
          <Button type="text" />
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
