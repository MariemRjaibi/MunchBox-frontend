import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    ingredients: [],
    allergies: [],
    diet: {
      pescto: false,
      omnivore: false,
      vegan: false,
      lactoseFree: false,
      glutenFree: false,
    },
  },
};

export const modalFiltersSlice = createSlice({
  name: "modalFilters",
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      // console.log(action);
      state.value.ingredients.push(action.payload);
    },
    removeIngredients: (state, action) => {
      state.value.ingredients = state.value.ingredients.filter(
        (e) => e !== action.payload
      );
    },
    addAllergies: (state, action) => {
      state.value.allergies.push(action.payload);
    },
    removeAllergies: (state, action) => {
      console.log(action);
      console.log(state.value.allergies);
      state.value.allergies = state.value.allergies.filter(
        (e) => e !== action.payload
      );
    },
    updatePescto: (state, action) => {
      // console.log(state.value.diet.pescto);
      state.value.diet.pescto = action.payload;
    },
    updateOmnivore: (state, action) => {
      // console.log(state.value.diet.pescto);
      state.value.diet.omnivore = action.payload;
    },
    updateVegan: (state, action) => {
      // console.log(state.value.diet.pescto);
      state.value.diet.vegan = action.payload;
    },
    updatelactosefree: (state, action) => {
      // console.log(state.value.diet.pescto);
      state.value.diet.lactoseFree = action.payload;
    },
    updateglutenfree: (state, action) => {
      // console.log(state.value.diet.pescto);
      state.value.diet.glutenFree = action.payload;
    },
  },
});

export const {
  addIngredients,
  addAllergies,
  updatePescto,
  updateOmnivore,
  updateVegan,
  updatelactosefree,
  updateglutenfree,
  removeIngredients,
  removeAllergies,
} = modalFiltersSlice.actions;
export default modalFiltersSlice.reducer;
