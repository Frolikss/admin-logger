import { RootState } from '@app/model/store';
import { createSelector } from '@reduxjs/toolkit';

const selectRequestsState = (state: RootState) => state.requests;

export const selectRequests = createSelector(selectRequestsState, (state) => state.requests);
export const selectSelectedRequest = createSelector(
  selectRequestsState,
  (state) => state.selectedRequest
);
