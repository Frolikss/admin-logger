import { RootState } from '@app/model/store';
import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(selectUsersState, (state) => state.users);
