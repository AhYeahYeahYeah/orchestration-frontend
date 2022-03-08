// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| MANAGEMENT MENU ITEMS ||============================== //

const management = {
    id: 'management',
    title: '管理',
    type: 'group',
    children: [
        {
            id: 'product',
            title: '产品管理',
            type: 'item',
            url: '/product',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'orchestration',
            title: '服务编排',
            type: 'item',
            url: '/orchestration',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'admin-management',
            title: '管理员管理',
            type: 'item',
            url: '/admin-management',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'customer-management',
            title: '客户管理',
            type: 'item',
            url: '/customer-management',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default management;
