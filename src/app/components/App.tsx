import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

import { DashboardWrapper } from '@widgets/dashboard-wrapper';

import { Authentication, Requests, Users } from '@pages';

import { ProtectedRoute } from './ProtectedRoute';

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const accessToken = localStorage.getItem(TokenNames.ACCESS_TOKEN);

  useEffect(() => {
    setIsAuthorized(!!accessToken);
  }, [accessToken, isAuthorized]);

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
