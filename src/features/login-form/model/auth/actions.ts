import { createAsyncThunk } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { authApi } from '@shared/apis';

import { LoginFieldValues } from '@features/login-form';

export const sendLoginAsync = createAsyncThunk(
  `${SliceNames.AUTH}/LOGIN`,
  async (payload: LoginFieldValues) => {
    const { data } = await authApi.signIn(payload);
    return data;
  }
);

export const getCurrentUserAsync = createAsyncThunk(`${SliceNames.AUTH}/GET_SELF`, async () => {
  const { data } = await authApi.getSelf();
  return data;
});
