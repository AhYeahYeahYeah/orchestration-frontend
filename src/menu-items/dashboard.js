// assets
import { IconDashboard } from '@tabler/icons';
import { Monitor } from '@mui/icons-material';
// constant
const icons = { IconDashboard, Monitor };

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
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'monitor',
            title: '流程监控',
            type: 'item',
            url: '/monitor',
            icon: icons.Monitor,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
