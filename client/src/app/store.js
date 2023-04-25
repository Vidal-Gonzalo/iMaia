import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import newTextSlice from "../features/texts/newTextSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newText: newTextSlice,
  },
});
