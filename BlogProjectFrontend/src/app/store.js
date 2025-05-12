import { configureStore } from '@reduxjs/toolkit';
import { publicApi } from '../features/publicApi';
import { protectedApi } from '../features/protectedApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // RTK Query API 슬라이스 등록
    [publicApi.reducerPath]: publicApi.reducer,
    [protectedApi.reducerPath]: protectedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      publicApi.middleware,
      protectedApi.middleware
    ),
});

setupListeners(store.dispatch);
