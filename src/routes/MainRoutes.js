import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("views/dashboard/Default")));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import("views/utilities/Typography")));
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(lazy(() => import("views/utilities/MaterialIcons")));
const UtilsTablerIcons = Loadable(lazy(() => import("views/utilities/TablerIcons")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: "/main",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <DashboardDefault />,
        },
        {
            path: "/dashboard",
            element: <DashboardDefault />,
        },
        {
            path: "/product",
            element: <UtilsTypography />,
        },
        {
            path: "/orchestration",
            element: <UtilsMaterialIcons />,
        },
        {
            path: "/whitelist",
            element: <UtilsColor />,
        },
        {
            path: "/blacklist",
            element: <UtilsShadow />,
        },
        {
            path: "/group",
            element: <UtilsTablerIcons />,
        },
        {
            path: "/customer-management",
            element: <UtilsMaterialIcons />,
        },
    ],
};

export default MainRoutes;
