import { RootState } from '@app/model/store';
import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state: RootState) => state.auth;

export const selectSelectedUser = createSelector(selectAuthState, (state) => state.currentUser);
