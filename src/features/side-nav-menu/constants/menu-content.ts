import { AppRoutes } from '@shared/constants';

import { ReactComponent as DashboardIcon } from '@svg/dashboard.svg';
import { ReactComponent as UserIcon } from '@svg/user.svg';

import { MenuItem } from '../types/menu.interfaces';

export const MENU_CONTENT: MenuItem[] = [
  {
    path: AppRoutes.DASHBOARD,
    icon: DashboardIcon,
    text: 'Dashboard'
  },
  {
    path: AppRoutes.USER,
    icon: UserIcon,
    text: 'User'
  }
];
