import { lazy, type LazyExoticComponent, type ComponentType } from 'react';
// 定义单个路由项的类型接口
export interface RouteItem {
  path: string;
  element: LazyExoticComponent<ComponentType>;
  children?: RouteItem[];
  meta: {
    title: string; // 菜单名称
    icon?: string; // 菜单图标
    permission?: string; // 所需权限标识（如 "user:list"）
    requiresAuth?: boolean; // 是否需要登录
    hidden?: boolean; // 是否隐藏
  };
}

export const routes: RouteItem[] = [
  {
    path: '/auth',
    element: lazy(() => import('@/layouts/auth')),
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/reset-password',
    element: lazy(() => import('@/layouts/auth/ResetPassword')),
    meta: { title: '重置密码', hidden: true },
  },
  {
    path: '/',
    element: lazy(() => import('@/layouts/basic')),
    meta: { title: '首页', permission: '', icon: 'main-home' },
    children: [
      {
        path: '/dashboard',
        element: lazy(() => import('@/pages/dashboard')),
        meta: {
          title: '仪表盘',
          icon: 'main-dashboard',
        },
      },
      {
        path: '/data-center',
        element: lazy(() => import('@/pages/dataCenter')),
        meta: {
          title: '数据中心',
          icon: 'main-center',
        },
        children: [
          {
            path: '/data-center/visitor-list',
            element: lazy(() => import('@/pages/dataCenter/visitor')),
            meta: { title: '访客列表', icon: 'main-visitor' },
          },
          {
            path: '/data-center/track-list',
            element: lazy(() => import('@/pages/dataCenter/track')),
            meta: { title: '埋点列表', icon: 'main-track' },
          },
          {
            path: '/data-center/schedule-task',
            element: lazy(() => import('@/pages/dataCenter/schedule')),
            meta: { title: '定时任务', icon: 'main-schedule' },
          },
          {
            path: '/data-center/error-log',
            element: lazy(() => import('@/pages/dataCenter/error')),
            meta: { title: '错误日志', icon: 'main-error' },
          },
        ],
      },
      {
        path: '/control',
        element: lazy(() => import('@/pages/control')),
        meta: {
          title: '控制台',
          icon: 'main-console',
        },
        children: [
          {
            path: '/control/user-list',
            element: lazy(() => import('@/pages/control/user')),
            meta: { title: '用户管理', icon: 'main-viewer' },
          },
          {
            path: '/control/role-list',
            element: lazy(() => import('@/pages/control/role')),
            meta: { title: '角色管理', icon: 'main-role' },
          },
          {
            path: '/control/permission-list',
            element: lazy(() => import('@/pages/control/permission')),
            meta: { title: '权限管理', icon: 'main-permission' },
          },
        ],
      },
      {
        path: '/content',
        element: lazy(() => import('@/pages/content')),
        meta: {
          title: '内容管理',
          icon: 'main-content',
        },
        children: [
          {
            path: '/content/article-list',
            element: lazy(() => import('@/pages/content/article')),
            meta: { title: '文章管理', icon: 'main-article' },
          },
          {
            path: '/content/comment-list',
            element: lazy(() => import('@/pages/content/comment')),
            meta: { title: '评论管理', icon: 'main-comment' },
          },
        ],
      },
      {
        path: '/user-center',
        element: lazy(() => import('@/pages/userCenter')),
        meta: {
          title: '用户中心',
          hidden: true,
          icon: 'main-user-center',
        },
      },
      {
        path: '/about',
        element: lazy(() => import('@/pages/about')),
        meta: {
          title: '关于',
          icon: 'main-about',
        },
      },
    ],
  },

  {
    path: '*',
    element: lazy(() => import('@/layouts/default/NotFound')),
    meta: { title: '页面不存在', hidden: true },
  },
];
