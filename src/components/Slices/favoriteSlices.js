import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        list: []
    },
    reducers: {
        addFavorite: (state, action) => {
            const newFavorite = action.payload;
            if (!state.list.find(favorite => favorite.id === newFavorite.id)) {
                state.list.push(newFavorite);
            }
        },
        removeFavorite: (state, action) => {
            const removedId = action.payload;
            state.list = state.list.filter(favorite => favorite.id !== removedId);
        }
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;