import { App } from '@components/app';
import { RouteObject } from 'react-router-dom';

export const MainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
];
