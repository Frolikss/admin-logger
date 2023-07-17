import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { SliceNames } from '@shared/constants';

import { authApi, usersApi } from '@shared/apis';

import { LoginFieldValues } from '@features/login-form';

export const sendLoginAsync = createAsyncThunk(
  `${SliceNames.AUTH}/LOGIN`,
  async (payload: LoginFieldValues) => {
    const { data } = await authApi.signIn(payload);
    toast.success('Login successful');
    return data;
  }
);

export const getUserAsync = createAsyncThunk(`${SliceNames.AUTH}/GET_SELF`, async () => {
  const { data } = await usersApi.getCurrentUser();
  return data;
});
