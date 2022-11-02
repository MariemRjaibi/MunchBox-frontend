import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {
    calendar: (state, action) => {
      state.value.push(action.payload);
    },
    uncalendar: (state, action) => {
      state.value = state.value.filter((calendar) => calendar.title !== action.payload.title);
    },
    removeAllBatch: (state) => {
      state.value = [];
    },
   },
});

export const { calendar, uncalendar, removeAllBatch } = calendarsSlice.actions;
export default calendarsSlice.reducer;