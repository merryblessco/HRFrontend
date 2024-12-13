import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { recruitmentApi } from "./services/recruitmentApi";
import { setupApi } from "./services/setupApi";
import { employeeApi } from "./services/employeeApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [recruitmentApi.reducerPath]: recruitmentApi.reducer,
    [setupApi.reducerPath]: setupApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, recruitmentApi.middleware, setupApi.middleware, employeeApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
