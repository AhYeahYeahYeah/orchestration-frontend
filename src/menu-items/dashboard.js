// assets
import { MonitorOutlined, DashboardOutlined } from '@mui/icons-material';
// constant
const icons = { DashboardOutlined, MonitorOutlined };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '仪表盘',
    type: 'group',
    children: [
        {
            id: 'default',
            title: '仪表盘',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'monitor',
            title: '流程监控',
            type: 'item',
            url: '/monitor',
            icon: icons.MonitorOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
