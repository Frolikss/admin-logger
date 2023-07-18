import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getUserAsync, selectIsAuthorized } from '@features/login-form';

import { DashboardWrapper } from '@widgets/dashboard-wrapper';

import { Authentication, EditRequest, EditUser, Requests, Users } from '@pages';

import { ProtectedRoute } from './ProtectedRoute';

export const App = () => {
  const accessToken = localStorage.getItem(TokenNames.ACCESS_TOKEN);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserAsync());
    }
  }, [accessToken]);

  return (
    <Routes>
      <Route key={AppRoutes.AUTH} path={AppRoutes.AUTH} element={<Authentication />} />
      <Route element={<ProtectedRoute />}>
        <Route
          key={AppRoutes.USERS}
          path={AppRoutes.USERS}
          element={
            <DashboardWrapper>
              <Users />
            </DashboardWrapper>
          }
        />
        <Route
          key={AppRoutes.REQUESTS}
          path={AppRoutes.REQUESTS}
          element={
            <DashboardWrapper>
              <Requests />
            </DashboardWrapper>
          }
        />
      </Route>
      <Route
        key={AppRoutes.USER}
        path={AppRoutes.USER}
        element={
          <DashboardWrapper>
            <EditUser />
          </DashboardWrapper>
        }
      />
      <Route
        key={AppRoutes.REQUEST}
        path={AppRoutes.REQUEST}
        element={
          <DashboardWrapper>
            <EditRequest />
          </DashboardWrapper>
        }
      />
    </Routes>
  );
};
