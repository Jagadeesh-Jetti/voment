import { configureStore } from "@reduxjs/toolkit";
import { volunteerSlice } from "./volunteerSlice";
import { eventSlice } from "./eventSlice";

export default configureStore({
  reducer: {
    volunteers: volunteerSlice.reducer,
    events: eventSlice.reducer,
  },
});
