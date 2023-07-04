import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./reducer";

const store = configureStore({
  reducer: {
    locations: locationReducer,
  },
});
export default store;
