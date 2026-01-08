import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

// 定义单个路由项的类型接口
export interface RouteItem {
  path: string;
  element: LazyExoticComponent<ComponentType<unknown>>;
  children?: RouteItem[];
  meta?: {
    title?: string; // 菜单名称
    requiresAuth: boolean; // 是否需要权限
    permission?: string; // 所需权限标识（如 "user:list"）
  };
}

export const routes: RouteItem[] = [
  {
    path: '/auth',
    element: lazy(() => import('@/layouts/auth')),
    meta: { requiresAuth: false, title: '登录' },
  },
  {
    path: '/',
    element: lazy(() => import('@/layouts/basic')),
    meta: { requiresAuth: false, title: '首页', permission: '' },
    children: [
      {
        path: 'dashboard',
        element: lazy(() => import('@/pages/dashboard')),
        meta: { requiresAuth: false, title: '仪表盘' },
      },
      {
        path: 'article-list',
        element: lazy(() => import('@/pages/content/article')),
        meta: { requiresAuth: false, title: '文章管理' },
      },
    ],
  },
  {
    path: '*',
    element: lazy(() => import('@/layouts/default/NotFound')),
    meta: { requiresAuth: false, title: '页面不存在' },
  },
];
