import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes, type RouteItem } from './routes';
import LoadingSpinner from '@/components/LoadingSpinner';

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
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};
const RouterConfig = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};
export default RouterConfig;
