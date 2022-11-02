import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const datesSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {
    calendar: (state, action) => {
      state.value.push(action.payload);
    },
    uncalendar: (state, action) => {
      state.value = state.value.filter(e => e.id !== action.payload);
    },
   },
});

export const { calendar, uncalendar } = calendarsSlice.actions;
export default calendarsSlice.reducer;