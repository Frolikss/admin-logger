import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { SliceNames, ToastIds } from '@shared/constants';

import { QueryParams } from '@shared/types';

import { eventsApi } from '@shared/apis';

export const getEventsAsync = createAsyncThunk(
  `${SliceNames.EVENTS}/GET_EVENTS`,
  async (payload: QueryParams) => {
    const { data } = await eventsApi.getEvents(payload);
    return data;
  }
);

export const getEventAsync = createAsyncThunk(
  `${SliceNames.EVENTS}/GET_EVENT`,
  async (payload: string) => {
    const { data } = await eventsApi.getEvent(payload);
    return data;
  }
);

export const updateEventAsync = createAsyncThunk(
  `${SliceNames.EVENTS}/UPDATE_EVENT`,
  async (payload: FormData) => {
    await eventsApi.updateEvent(payload);
    toast.success('Updated event', { toastId: ToastIds.ALL });
  }
);

export const createEventAsync = createAsyncThunk(
  `${SliceNames.EVENTS}/CREATE_EVENT`,
  async (payload: FormData) => {
    await eventsApi.createEvent(payload);
    toast.success('Event created', { toastId: ToastIds.ALL });
  }
);

export const unsetSelectedEvent = createAction(`${SliceNames.EVENTS}/UNSET_EVENT`);
