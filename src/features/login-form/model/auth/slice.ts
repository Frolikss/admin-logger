import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { AuthState } from '../../types/auth.interfaces';
import { getCurrentUserReducer, sendLoginReducer } from './reducers';

const initialState: AuthState = {
  isLoading: false,
  isAuthorized: false
};

const slice = createSlice({
  name: SliceNames.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    sendLoginReducer(builder);
    getCurrentUserReducer(builder);
  }
});

export const authReducer = slice.reducer;
