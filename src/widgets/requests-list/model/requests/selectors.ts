import { RootState } from '@app/model/store';
import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state: RootState) => state.requests;

export const selectRequests = createSelector(selectUsersState, (state) => state.requests);
