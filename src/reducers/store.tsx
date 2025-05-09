import { configureStore } from "@reduxjs/toolkit";
import GamingSlice from "./GamingSlice";

const store = configureStore({
  reducer: {
    game: GamingSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
