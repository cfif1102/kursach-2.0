import {
  App,
  Contracts,
  Customers,
  Documents,
  Equipments,
  Facilities,
  Licensees,
} from '@components';
import { RouteObject } from 'react-router-dom';

export const MainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/equipments',
        element: <Equipments />,
      },
      {
        path: '/facilities',
        element: <Facilities />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/licensees',
        element: <Licensees />,
      },
      {
        path: '/contracts',
        element: <Contracts />,
      },
      {
        path: '/documents',
        element: <Documents />,
      },
    ],
  },
];
