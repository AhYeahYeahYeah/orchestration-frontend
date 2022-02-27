// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

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
        }
    ]
};

export default dashboard;
