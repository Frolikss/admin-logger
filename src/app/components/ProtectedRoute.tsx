import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

interface Props {
  isAuth: boolean;
  to: To;
}

export const ProtectedRoute: FC<Props> = ({ isAuth, to }) => {
  return isAuth ? <Navigate to={to} /> : <Outlet />;
};
