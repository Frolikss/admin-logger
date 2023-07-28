import { PROTECTED_ROUTES } from '@app/constants/page-routes';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

import { useAppDispatch } from '@shared/lib';

import { getUserAsync } from '@features/login-form';

import { DashboardWrapper } from '@widgets/dashboard-wrapper';

import { Authentication } from '@pages';

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
        {PROTECTED_ROUTES.map(({ path, element: Element, linkPath }) => (
          <Route
            key={path}
            path={path}
            element={
              <DashboardWrapper linkPath={linkPath}>
                <Element />
              </DashboardWrapper>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
