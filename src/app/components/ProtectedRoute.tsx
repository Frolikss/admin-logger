import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { AppRoutes, TokenNames } from '@shared/constants';

export const ProtectedRoute = () => {
  const token = localStorage.getItem(TokenNames.ACCESS_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(AppRoutes.AUTH);
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to={AppRoutes.AUTH} replace />;
};
