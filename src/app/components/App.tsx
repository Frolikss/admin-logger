import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getCurrentUserAsync } from '@features/login-form/model/auth/actions';
import { selectIsAuthorized } from '@features/login-form/model/auth/selectors';

import { DashboardWrapper } from '@widgets/dashboard-wrapper';

import { Authentication, Requests, Users } from '@pages';

import { ProtectedRoute } from './ProtectedRoute';

export const App = () => {
  const accessToken = localStorage.getItem(TokenNames.ACCESS_TOKEN);
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);

  useEffect(() => {
    if (accessToken) {
      dispatch(getCurrentUserAsync());
    }
  }, [accessToken]);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth={isAuthorized} to={AppRoutes.USERS} />}>
        <Route key={AppRoutes.AUTH} path={AppRoutes.AUTH} element={<Authentication />} />
      </Route>
      <Route element={<ProtectedRoute isAuth={!isAuthorized} to={AppRoutes.AUTH} />}>
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
    </Routes>
  );
};
