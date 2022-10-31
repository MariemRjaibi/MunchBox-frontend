import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const placardIngredientsSlice = createSlice({
  name: "placardIngredients",
  initialState,
  reducers: {
    addPlacardIngredients: (state, action) => {
      console.log(state.value);
      state.value.push(action.payload);
    },
    removePlacardIngredients: (state, action) => {
      state.value = state.value.filter((e) => e !== action.payload);
    },
  },
});

export const { addPlacardIngredients, removePlacardIngredients } =
  placardIngredientsSlice.actions;
export default placardIngredientsSlice.reducer;
