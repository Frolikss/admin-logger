import moment from 'moment/moment';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { User } from '@shared/types';

import { useAppDispatch } from '@shared/lib';

import { UserFieldValues } from '@features/user-form/types/fields.interfaces';

import { getSelectedUserAsync } from '@widgets/users-list';

export const useUserForm = (
  isSubmitSuccessful: boolean,
  reset: UseFormReset<UserFieldValues>,
  selectedUser?: User
) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(getSelectedUserAsync(id));
    }
  }, []);

  useEffect(() => {
    if (selectedUser && searchParams.has('id')) {
      const date = moment(selectedUser.birthday).format('YYYY-MM-DD');
      const { birthday: _, avatar: __, ...rest } = selectedUser;
      reset({ birthday: `${date}`, ...rest });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate(AppRoutes.USERS);
    }
  }, [isSubmitSuccessful]);
};
