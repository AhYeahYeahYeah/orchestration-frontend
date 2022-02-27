import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import RootPageRoutes from './RootPageRoutes';
import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([RootPageRoutes, MainRoutes, AuthenticationRoutes], config.basename);
}
