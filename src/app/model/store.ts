import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@features/login-form';

import { eventsReducer } from '@widgets/events-list';
import { requestsReducer } from '@widgets/requests-list';
import { usersReducer } from '@widgets/users-list';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  requests: requestsReducer,
  events: eventsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
