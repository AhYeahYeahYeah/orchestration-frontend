import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const RootPage = Loadable(lazy(() => import('views/root')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const RootPageRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <Navigate to="/root-page" replace />
        },
        {
            path: '/root-page',
            element: <RootPage />
        }
    ]
};

export default RootPageRoutes;
