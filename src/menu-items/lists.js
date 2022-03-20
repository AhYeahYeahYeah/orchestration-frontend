// assets
import { IconDashboard, IconList } from '@tabler/icons';
// constant
const icons = { IconDashboard, IconList };

// ==============================|| LISTS MENU ITEMS ||============================== //

const lists = {
    id: 'lists',
    title: '名单',
    caption: '用户过滤',
    type: 'group',
    children: [
        {
            id: 'black-and-white-list',
            title: '黑白名单',
            type: 'collapse',
            icon: icons.IconList,
            children: [
                {
                    id: 'whitelist',
                    title: '白名单',
                    type: 'item',
                    url: '/whitelist',
                    breadcrumbs: false
                },
                {
                    id: 'blacklist',
                    title: '黑名单',
                    type: 'item',
                    url: '/blacklist',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'group',
            title: '用户组',
            type: 'item',
            url: '/group',
            icon: icons.IconList,
            breadcrumbs: false
        }
    ]
};

export default lists;
