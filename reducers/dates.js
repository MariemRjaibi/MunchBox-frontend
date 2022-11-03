import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    addDate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addDate } = datesSlice.actions;
export default datesSlice.reducer;
