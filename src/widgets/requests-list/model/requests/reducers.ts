import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { RequestData, RequestsState } from '../../types/requests.interfaces';
import { getRequestsAsync, updateRequestAsync } from './actions';

export const getRequestsReducer = (builder: ActionReducerMapBuilder<RequestsState>) => {
  builder
    .addCase(getRequestsAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getRequestsAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getRequestsAsync.fulfilled, (state, { payload }: PayloadAction<RequestData>) => {
      state.isLoading = false;
      state.requests = payload;
    });
};

export const updateRequestsReducer = (builder: ActionReducerMapBuilder<RequestsState>) => {
  builder
    .addCase(updateRequestAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateRequestAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(updateRequestAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
};
