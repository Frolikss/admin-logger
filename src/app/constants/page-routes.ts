import { AppRoutes } from '@shared/constants';

import { EditEvent, EditRequest, EditUser, Events, Requests, Users } from '@pages';

export const PROTECTED_ROUTES = [
  {
    path: AppRoutes.USERS,
    element: Users,
    linkPath: AppRoutes.USER
  },
  {
    path: AppRoutes.USER,
    element: EditUser
  },
  {
    path: AppRoutes.REQUESTS,
    element: Requests
  },
  {
    path: AppRoutes.REQUEST,
    element: EditRequest
  },
  {
    path: AppRoutes.EVENTS,
    element: Events,
    linkPath: AppRoutes.EVENT
  },
  {
    path: AppRoutes.EVENT,
    element: EditEvent
  }
];
