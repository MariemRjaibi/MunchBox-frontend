import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorites: (state, action) => {
      state.value.push(action.payload);
    },
    removeFavorites: (state, action) => {
      state.value = state.value.filter(
        (favoris) => favoris.title !== action.payload.title
      );
    },
    removeAllFavorites: (state) => {
      state.value = [];
    },
  },
});

export const { addFavorites, removeFavorites, removeAllFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
