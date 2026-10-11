import { createBrowserRouter } from 'react-router';
import { PagePlaceholder } from '@/pages/PagePlaceholder';
import { NotFound } from '@/pages/NotFound';
import { ErrorPage } from '@/pages/ErrorPage';

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <PagePlaceholder /> },

      { path: '/login', element: <PagePlaceholder /> },
      { path: '/register', element: <PagePlaceholder /> },
      { path: '/forgot-password', element: <PagePlaceholder /> },

      { path: '/reset-password', element: <PagePlaceholder /> },

      { path: '/dashboard', element: <PagePlaceholder /> },
      { path: '/dashboard/expenses', element: <PagePlaceholder /> },
      { path: '/dashboard/profile', element: <PagePlaceholder /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
