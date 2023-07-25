import { RootState } from '@app/model/store';
import { createSelector } from '@reduxjs/toolkit';

const selectEventsState = (state: RootState) => state.events;

export const selectEvents = createSelector(selectEventsState, (state) => state.eventsData);
export const selectSelectedEvent = createSelector(
  selectEventsState,
  (state) => state.selectedEvent
);
