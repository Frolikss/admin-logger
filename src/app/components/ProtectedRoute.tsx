import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

export const ProtectedRoute = () => {
  const token = localStorage.getItem(TokenNames.ACCESS_TOKEN);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && pathname !== AppRoutes.AUTH) {
      navigate(AppRoutes.AUTH);
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to={AppRoutes.AUTH} replace />;
};
