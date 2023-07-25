import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { EventData, EventItem, EventsState } from '../types/events.interfaces';
import { createEventAsync, getEventAsync, getEventsAsync, updateEventAsync } from './actions';

export const getEventsReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(getEventsAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getEventsAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getEventsAsync.fulfilled, (state, { payload }: PayloadAction<EventData>) => {
      state.isLoading = false;
      state.eventsData = payload;
    });
};

export const getEventReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(getEventAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getEventAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getEventAsync.fulfilled, (state, { payload }: PayloadAction<EventItem>) => {
      state.isLoading = false;
      state.selectedEvent = payload;
    });
};

export const updateEventReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(updateEventAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateEventAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(updateEventAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
};

export const createEventReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(createEventAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createEventAsync.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(createEventAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
};
