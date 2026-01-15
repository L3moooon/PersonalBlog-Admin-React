import { useEffect, Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { routes, type RouteItem } from './routes';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { addTab } from '@/store/slices/userSlice';

//声明式路由
const renderRoutes = (routes: RouteItem[]) => {
  return routes.map(route => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <Suspense fallback={<LoadingSpinner />}>
          <route.element />
        </Suspense>
      }
    >
      {/* 自动重定向到第一个子路由 */}
      {route.children && route.children.length > 0 && (
        <Route
          index
          element={<Navigate to={route.children[0].path} replace />}
        />
      )}
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};
const findRouteByPath = (
  routes: RouteItem[],
  path: string
): RouteItem | null => {
  for (const route of routes) {
    if (route.path === path) return route;
    if (route.children) {
      const child = findRouteByPath(route.children, path);
      if (child) return child;
    }
  }
  return null;
};

const RouterConfig = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const checkAuth = () => {
      const { pathname } = location;

      // 获取当前路由配置信息
      const currentRoute = findRouteByPath(routes, pathname);

      // 白名单处理（例如登录页、重置密码页不需要 token）
      const whitelist = ['/auth', '/reset-password'];
      const isWhitelisted = whitelist.includes(pathname);

      if (!token && !isWhitelisted) {
        // 无 token 且不在白名单，跳转登录
        navigate('/auth', { replace: true, state: { from: pathname } });
        return;
      }

      if (token && isWhitelisted) {
        // 有 token 还去登录页，直接跳回首页
        navigate('/', { replace: true });
        return;
      }

      // 后置处理：设置标题、滚动复位
      // 只有非隐藏且没有子路由的页面（叶子路由）才添加到 Tabs
      if (
        currentRoute &&
        !currentRoute.meta?.hidden &&
        !currentRoute.children
      ) {
        dispatch(
          addTab({
            path: pathname,
            title: currentRoute.meta?.title || '时雨博客后台',
            icon: currentRoute.meta?.icon || '',
          })
        );
        document.title = currentRoute.meta?.title + ' - 时雨博客后台';
      }
      window.scrollTo(0, 0);

      console.log('【路由守卫】已通过:', pathname, currentRoute?.meta?.title);
    };

    checkAuth();
  }, [location, navigate, token, dispatch]);

  return <Routes>{renderRoutes(routes)}</Routes>;
};
export default RouterConfig;
