import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const pathSlice = createSlice({
  name: "choosePaths",
  initialState,
  reducers: {
    updateIsFiltered: (state, action) => {
      state.value = true;
    },
    removeIsFiltered: (state, action) => {
      state.value = false;
    },
  },
});

export const { updateIsFiltered, removeIsFiltered } = pathSlice.actions;
export default pathSlice.reducer;
