import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@api';
import { DocumentsProvider } from '@components';
import { MainRoutes } from '@routes';
import { store } from '@store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter(MainRoutes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DocumentsProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" />
        </Provider>
      </DocumentsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
