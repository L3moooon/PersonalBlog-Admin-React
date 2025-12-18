import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

// 定义单个路由项的类型接口
export interface RouteItem {
  path: string;
  element: LazyExoticComponent<ComponentType<unknown>>;
  requiresAuth?: boolean;
  children?: RouteItem[];
  meta?: {
    title?: string; // 菜单名称
    requiresAuth: boolean; // 是否需要权限
    permission?: string; // 所需权限标识（如 "user:list"）
  };
}

export const routes: RouteItem[] = [
  {
    path: '/',
    element: lazy(() => import('@/layouts/auth')),
    meta: { requiresAuth: false, title: '登录' },
  },
  {
    path: '/home',
    element: lazy(() => import('@/layouts/basic/BasicIndex')),
    meta: { requiresAuth: false, title: '首页', permission: '' },
  },
  {
    path: '*',
    element: lazy(() => import('@/layouts/default/NotFound')),
    meta: { requiresAuth: false, title: '页面不存在' },
  },
];
