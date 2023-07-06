import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { UserData } from '@shared/types';

import { UsersState } from '../../types/users.interfaces';
import { createUserAsync, deleteUsersAsync, getUsersAsync, updateUserAsync } from './actions';

export const createUserReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(createUserAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createUserAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(createUserAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
};

export const getUsersReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(getUsersAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUsersAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getUsersAsync.fulfilled, (state, { payload }: PayloadAction<UserData>) => {
      state.isLoading = false;
      state.users = payload;
      state.isAuthorized = true;
    });
};

export const deleteUserReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(deleteUsersAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteUsersAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteUsersAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
};

export const updateUserReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(updateUserAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateUserAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(updateUserAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
};
