import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from '@shared/constants';

import { EventsState } from '../types/events.interfaces';
import {
  createEventReducer,
  getEventReducer,
  getEventsReducer,
  unsetSelfReducer,
  updateEventReducer
} from './reducers';

const initialState: EventsState = {
  isLoading: false
};

const slice = createSlice({
  name: SliceNames.EVENTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getEventReducer(builder);
    getEventsReducer(builder);
    updateEventReducer(builder);
    createEventReducer(builder);
    unsetSelfReducer(builder);
  }
});

export const eventsReducer = slice.reducer;
