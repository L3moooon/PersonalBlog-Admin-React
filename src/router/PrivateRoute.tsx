import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store';
// 鉴权路由组件（路由守卫）
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  // 模拟从本地存储获取用户信息（实际项目可结合状态管理如Redux/Context）
  const token = useSelector((state: RootState) => state.user.token);
  // 1. 未登录：跳转到登录页
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  // 2. 已登录：渲染子路由（Outlet是v6的子路由出口）
  return element || <Outlet />;
};

export default PrivateRoute;
