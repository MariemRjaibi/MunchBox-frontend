import { createSlice } from '@reduxjs/toolkit';

const initialState = {
<<<<<<< HEAD
    value: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (state, action) => {
            state.value.push(action.payload);
        },
        removeFavorites: (state, action) => {
            state.value = state.value.filter(favoris => favoris.title !== action.payload.title);
        },
        removeAllFavorites: (state) => {
            state.value = [];
        },
    },
});

export const { addFavorites, removeFavorites, removeAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
=======
	value: [],
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorites: (state, action) => {
			state.value.push(action.payload);
		},
		removeFavorites: (state, action) => {
			state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
		},
		removeAllFavorites: (state) => {
			state.value = [];
		},
	},
});

export const { addFavorites, removeFavorites, removeAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
>>>>>>> f601dbb5a4fbefbcd01a2c03aab523901902089d
