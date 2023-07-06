import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { AuthState } from '../../types/auth.interfaces';
import { sendLoginReducer } from './reducers';

const initialState: AuthState = {
  isLoading: false,
  isAuthorized: false
};

const slice = createSlice({
  name: SliceNames.USERS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    sendLoginReducer(builder);
  }
});

export const authReducer = slice.reducer;
