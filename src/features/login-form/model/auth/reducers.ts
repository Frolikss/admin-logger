import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { sendLoginAsync } from '@features/login-form/model/auth/actions';

import { AuthState } from '../../types/auth.interfaces';

export const sendLoginReducer = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(sendLoginAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendLoginAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(sendLoginAsync.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthorized = true;
    });
};
