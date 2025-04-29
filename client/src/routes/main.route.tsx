import { App } from '@components/app';
import { Contracts } from '@components/contracts';
import { Customers } from '@components/customers';
import { Equipments } from '@components/equipments';
import { Facilities } from '@components/facilities';
import { Licensees } from '@components/licensees';
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
    ],
  },
];
