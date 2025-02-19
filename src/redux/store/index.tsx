import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import currencySlice from "../slices/currencySlice";
import userDetailSlice from "../slices/userDetailSlice";


export const store = configureStore({
  reducer: {
    getUserData: userSlice.reducer,
    getCurrency: currencySlice.reducer,
    getUserDetail: userDetailSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
