import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { UsersState } from '../../types/users.interfaces';
import {
  createUserReducer,
  deleteUserReducer,
  getUsersReducer,
  updateUserReducer
} from './reducers';

const initialState: UsersState = {
  isAuthorized: false
};

const slice = createSlice({
  name: SliceNames.USERS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    createUserReducer(builder);
    getUsersReducer(builder);
    deleteUserReducer(builder);
    updateUserReducer(builder);
  }
});

export const usersReducer = slice.reducer;
