import { AppRoutes } from '@shared/constants';

import { ReactComponent as CalendarIcon } from '@svg/calendar.svg';
import { ReactComponent as EventsIcon } from '@svg/events.svg';
import { ReactComponent as DashboardIcon } from '@svg/users.svg';

import { MenuItem } from '../types/menu.interfaces';

export const MENU_CONTENT: MenuItem[] = [
  {
    path: AppRoutes.USERS,
    icon: DashboardIcon,
    text: 'Users'
  },
  {
    path: AppRoutes.REQUESTS,
    icon: CalendarIcon,
    text: 'Requests'
  },
  {
    path: AppRoutes.EVENTS,
    icon: EventsIcon,
    text: 'Events'
  }
];
