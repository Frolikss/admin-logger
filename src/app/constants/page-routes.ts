import { AppRoutes } from '@shared/constants';

import { Authentication, EditEvent, EditRequest, EditUser, Events, Requests, Users } from '@pages';

export const UNPROTECTED_ROUTES = [
  {
    path: AppRoutes.AUTH,
    element: Authentication
  }
];

export const PROTECTED_ROUTES = [
  {
    path: AppRoutes.USERS,
    element: Users
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
    element: Events
  },
  {
    path: AppRoutes.EVENT,
    element: EditEvent
  }
];
