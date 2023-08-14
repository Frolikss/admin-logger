import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@app/constants/page-routes';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getUserAsync, selectSelectedUser } from '@features/login-form';

import { DashboardWrapper } from '@widgets/dashboard-wrapper';

import { ProtectedRoute } from './ProtectedRoute';

export const App = () => {
  const accessToken = localStorage.getItem(TokenNames.ACCESS_TOKEN);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentUser = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken && currentUser && UNPROTECTED_ROUTES.some(({ path }) => path === pathname)) {
      navigate(AppRoutes.USERS);
    }
  }, [currentUser]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserAsync());
    }
  }, [accessToken]);

  return (
    <Routes>
      {UNPROTECTED_ROUTES.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route element={<ProtectedRoute />}>
        {PROTECTED_ROUTES.map(({ path, element: Element, linkPath }) => (
          <Route
            key={path}
            path={path}
            element={
              <DashboardWrapper>
                <Element />
              </DashboardWrapper>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
