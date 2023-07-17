import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { SliceNames } from '@shared/constants';

import { QueryParams } from '@shared/types';

import { requestsApi } from '@shared/apis';

import { UpdateRequest } from '@widgets/requests-list';

export const getRequestsAsync = createAsyncThunk(
  `${SliceNames.REQUESTS}/GET_REQUESTS`,
  async (payload?: QueryParams) => {
    const { data } = await requestsApi.getRequests(payload);
    return data;
  }
);

export const updateRequestAsync = createAsyncThunk(
  `${SliceNames.REQUESTS}/UPDATE_REQUEST`,
  async (payload: UpdateRequest) => {
    await requestsApi.updateRequest(payload);
    toast.success('Request updated');
  }
);

export const getRequestAsync = createAsyncThunk(
  `${SliceNames.REQUESTS}/GET_SELECTED_REQUEST`,
  async (payload: string) => {
    const { data } = await requestsApi.getRequest(payload);
    return data;
  }
);
