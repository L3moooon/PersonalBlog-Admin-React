import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

// 定义单个路由项的类型接口
export interface RouteItem {
  path: string;
  element: LazyExoticComponent<ComponentType<unknown>>;
  title: string;
  requiresAuth?: boolean;
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  {
    path: '/',
    element: lazy(() => import('@/layouts/auth')),
    title: '登录',
  },
  {
    path: '/home',
    element: lazy(() => import('@/layouts/basic/BasicIndex')),
    title: '首页',
  },
  {
    path: '*',
    element: lazy(() => import('@/layouts/default/NotFound')),
    title: '页面不存在',
  },
];
