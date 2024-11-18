import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { usersApi } from "./features/users/usersApi";

// makeStore function that returns a new store for each request
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
