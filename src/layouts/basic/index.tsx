import { useState, useMemo, type ReactNode } from 'react';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { Flex, Button, Layout, Menu, Breadcrumb, type MenuProps } from 'antd';
import { createStyles, cx, keyframes } from 'antd-style';
import type { MenuItemType, SubMenuType } from 'antd/es/menu/interface';

import Icon from '@/components/Icon';
import mainLogo from '@/assets/images/portrait.jpg';
import TabSet from './TabSet';
import Widgets from './widgets/index.tsx';

import { routes, type RouteItem } from '@/router/routes';

const { Header, Content, Sider } = Layout;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  },
  content: {
    // padding: '1rem',
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
  const location = useLocation();

  // 动态生成面包屑数据
  const breadcrumbItems = useMemo(() => {
    const list: { title: ReactNode; key?: string }[] = [];
    const pathname = location.pathname;

    const findPathLevels = (
      routesList: RouteItem[],
      targetPath: string,
      parentPath = ''
    ): boolean => {
      for (const route of routesList) {
        // 计算当前节点的完整路径
        const fullPath = (
          route.path.startsWith('/')
            ? route.path
            : `${parentPath}/${route.path}`
        ).replace(/\/+/g, '/');

        // 检查路径是否匹配
        const isExactMatch = targetPath === fullPath;
        const isChildPath = targetPath.startsWith(
          fullPath.endsWith('/') ? fullPath : fullPath + '/'
        );

        if (isExactMatch || isChildPath) {
          if (route.meta?.title) {
            const isLast = isExactMatch;
            list.push({
              title: isLast ? (
                <Flex align="center" gap={4}>
                  <Icon name={route.meta.icon} />
                  <span>{route.meta.title}</span>
                </Flex>
              ) : (
                <Link
                  to={fullPath}
                  style={{
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Icon name={route.meta.icon} />
                  <span>{route.meta.title}</span>
                </Link>
              ),
              key: fullPath,
            });
          }

          if (isExactMatch) return true;

          if (route.children) {
            return findPathLevels(route.children, targetPath, fullPath);
          }
        }
      }
      return false;
    };

    findPathLevels(routes, pathname);
    return list;
  }, [location.pathname]);
  const menuItems: MenuProps['items'] = useMemo(() => {
    const menuRoutes = routes.find(
      (route: RouteItem) => route.path == '/'
    )?.children;

    const formatRoutes = (list: RouteItem[]) => {
      const filteredRoutes = list.filter(route => !route.meta?.hidden);
      return filteredRoutes.map(
        (route: RouteItem): MenuItemType | SubMenuType => {
          if (route.children) {
            return {
              key: route.path,
              label: route.meta.title,
              icon: <Icon name={route.meta.icon} />,
              children: formatRoutes(route.children),
            } as SubMenuType;
          } else {
            return {
              key: route.path,
              label: route.meta.title,
              icon: <Icon name={route.meta.icon} />,
            } as MenuItemType;
          }
        }
      );
    };
    return formatRoutes(menuRoutes || []) || [];
  }, []);

  const handleJump = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className={styles.main}>
      <Sider
        theme="light"
        width="12%"
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
          items={menuItems}
          className={styles.menu}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Flex justify="space-between" align="center" gap={16}>
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
            <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
          </Flex>
          <Widgets />
        </Header>
        <TabSet />
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicIndex;
