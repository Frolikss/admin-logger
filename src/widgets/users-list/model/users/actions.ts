import { createAsyncThunk } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { QueryParams } from '@shared/types';

import { usersApi } from '@shared/apis';

export const createUserAsync = createAsyncThunk(
  `${SliceNames.USERS}/CREATE`,
  async (payload: FormData) => {
    await usersApi.createUser(payload);
  }
);

export const getUsersAsync = createAsyncThunk(
  `${SliceNames.USERS}/GET_USERS`,
  async (payload?: QueryParams) => {
    const { data } = await usersApi.getUsers(payload);
    return data;
  }
);

export const deleteUsersAsync = createAsyncThunk(
  `${SliceNames.USERS}/DELETE_USER`,
  async (payload: string) => {
    await usersApi.deleteUser(payload);
  }
);

export const updateUserAsync = createAsyncThunk(
  `${SliceNames.USERS}/UPDATE_USER`,
  async (payload: FormData) => {
    await usersApi.updateUser(payload);
  }
);
