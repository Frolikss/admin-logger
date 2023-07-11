import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { User, UserData } from '@shared/types';

import { UsersState } from '../../types/users.interfaces';
import {
  createUserAsync,
  getSelectedUserAsync,
  getUsersAsync,
  suspendUserAsync,
  updateUserAsync
} from './actions';

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

export const suspendUserReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(suspendUserAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(suspendUserAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(suspendUserAsync.fulfilled, (state) => {
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

export const getSelectedUserReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(getSelectedUserAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSelectedUserAsync.rejected, (state) => {
      state.isLoading = true;
      state.isAuthorized = false;
    })
    .addCase(getSelectedUserAsync.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.isAuthorized = true;
      state.selectedUser = payload;
    });
};
