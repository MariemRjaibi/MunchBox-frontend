import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const filtersSlice = createSlice({
 name: 'filters',
  initialState,
 reducers: {
   addPreference: (state, action) => {
     state.value.push(action.payload);
   },
 },
});

export const { addPreference } = filtersSlice.actions;
export default filtersSlice.reducer;