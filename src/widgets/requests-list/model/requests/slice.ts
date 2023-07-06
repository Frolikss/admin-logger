import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { RequestsState } from '../../types/requests.interfaces';
import { getRequestsReducer, updateRequestsReducer } from './reducers';

const initialState: RequestsState = {
  isLoading: false
};

const slice = createSlice({
  name: SliceNames.REQUESTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getRequestsReducer(builder);
    updateRequestsReducer(builder);
  }
});

export const requestsReducer = slice.reducer;
