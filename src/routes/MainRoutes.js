import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Orchestration = Loadable(lazy(() => import('views/orchestration')));
const Product = Loadable(lazy(() => import('views/product')));
const Whitelist = Loadable(lazy(() => import('views/whitelist')));
const Blacklist = Loadable(lazy(() => import('views/blacklist')));
const Group = Loadable(lazy(() => import('views/group')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/product',
            element: <Product />
        },
        {
            path: '/orchestration',
            element: <Orchestration />
        },
        {
            path: '/admin-management',
            element: <Dashboard />
        },
        {
            path: '/customer-management',
            element: <Dashboard />
        },
        {
            path: '/whitelist',
            element: <Whitelist />
        },
        {
            path: '/blacklist',
            element: <Blacklist />
        },
        {
            path: '/group',
            element: <Group />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
