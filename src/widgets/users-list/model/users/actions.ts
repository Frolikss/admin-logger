import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { SliceNames } from '@shared/constants';

import { QueryParams, User } from '@shared/types';

import { usersApi } from '@shared/apis';

export const createUserAsync = createAsyncThunk(
  `${SliceNames.USERS}/CREATE`,
  async (payload: FormData) => {
    await usersApi.createUser(payload);
    toast.success('User created');
  }
);

export const getUsersAsync = createAsyncThunk(
  `${SliceNames.USERS}/GET_USERS`,
  async (payload?: QueryParams) => {
    const { data } = await usersApi.getUsers(payload);
    return data;
  }
);

export const suspendUserAsync = createAsyncThunk(
  `${SliceNames.USERS}/SUSPEND_USER`,
  async (payload: User) => {
    await usersApi.deleteUser(payload);
  }
);

export const updateUserAsync = createAsyncThunk(
  `${SliceNames.USERS}/UPDATE_USER`,
  async (payload: FormData) => {
    await usersApi.updateUser(payload);
    toast.success('User updated', { toastId: 'user' });
  }
);

export const getSelectedUserAsync = createAsyncThunk(
  `${SliceNames.AUTH}/GET_SELF`,
  async (payload?: string) => {
    const { data } = await usersApi.getSelectedUser(payload);
    return data;
  }
);
