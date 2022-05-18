// assets
import { StoreOutlined, ManageAccountsOutlined, ListAlt, PeopleAltOutlined, ColorLensOutlined } from '@mui/icons-material';
// constant
const icons = { StoreOutlined, ManageAccountsOutlined, ListAlt, PeopleAltOutlined, ColorLensOutlined };

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
            icon: icons.StoreOutlined,
            breadcrumbs: false
        },
        {
            id: 'orchestration',
            title: '服务编排',
            type: 'item',
            url: '/orchestration',
            icon: icons.ColorLensOutlined,
            breadcrumbs: false
        },
        {
            id: 'cooperation',
            title: '在线协作',
            type: 'item',
            url: '/cooperation',
            icon: icons.PeopleAltOutlined,
            breadcrumbs: false
        },
        {
            id: 'admin-management',
            title: '管理员管理',
            type: 'item',
            url: '/admin-management',
            icon: icons.ManageAccountsOutlined,
            breadcrumbs: false
        },
        {
            id: 'customer-management',
            title: '客户管理',
            type: 'item',
            url: '/customer-management',
            icon: icons.ManageAccountsOutlined,
            breadcrumbs: false
        },
        {
            id: 'log-management',
            title: '日志管理',
            type: 'item',
            url: '/log-management',
            icon: icons.ListAlt,
            breadcrumbs: false
        }
    ]
};

export default management;
