import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Request, RequestData, RequestsState } from '../../types/requests.interfaces';
import { getRequestAsync, getRequestsAsync, updateRequestAsync } from './actions';

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

export const getRequestReducer = (builder: ActionReducerMapBuilder<RequestsState>) => {
  builder
    .addCase(getRequestAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getRequestAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getRequestAsync.fulfilled, (state, { payload }: PayloadAction<Request>) => {
      state.isLoading = false;
      state.selectedRequest = payload;
    });
};
