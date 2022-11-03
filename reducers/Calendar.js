import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addCalendar: (state, action) => {
      state.value.push(action.payload);
    },
    removeCalendar: (state, action) => {
      state.value = state.value.filter(
        (calendar) => calendar.title !== action.payload.title
      );
    },
    removeAllBatch: (state) => {
      state.value = [];
    },
  },
});

export const { addCalendar, removeCalendar, removeAllBatch } =
  calendarSlice.actions;
export default calendarSlice.reducer;
