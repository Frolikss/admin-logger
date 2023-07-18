import { AppRoutes } from '@shared/constants';

import { ReactComponent as CalendarIcon } from '@svg/calendar.svg';
import { ReactComponent as DashboardIcon } from '@svg/dashboard.svg';

import { MenuItem } from '../types/menu.interfaces';

export const MENU_CONTENT: MenuItem[] = [
  {
    path: AppRoutes.USERS,
    icon: DashboardIcon
  },
  {
    path: AppRoutes.REQUESTS,
    icon: CalendarIcon
  }
];
