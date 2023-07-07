import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@shared/types';

import { getCurrentUserAsync, sendLoginAsync } from '@features/login-form/model/auth/actions';

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

export const getCurrentUserReducer = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(getCurrentUserAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getCurrentUserAsync.rejected, (state) => {
      state.isLoading = true;
      state.isAuthorized = false;
    })
    .addCase(getCurrentUserAsync.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.isAuthorized = true;
      state.currentUser = payload;
    });
};
