import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: false,
};

export const fromSlice = createSlice({
 name: 'fromWhichScreen',
  initialState,
 reducers: {
   recetteScreen: (state, action) => {
     state.value=true;
   },
   favorisScreen:(state, action) => {
    state.value=false;
  },
 },
});

export const { recetteScreen, favorisScreen } = fromSlice.actions;
export default fromSlice.reducer;