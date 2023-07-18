import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { useAppSelector } from '@shared/lib';

import { selectIsAuthorized } from '@features/login-form';

import { AuthModal } from '@widgets/auth-modal';

export const Authentication = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(AppRoutes.USERS);
  }, [isAuthorized]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <AuthModal />
    </div>
  );
};
