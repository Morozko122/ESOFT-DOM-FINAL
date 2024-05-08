import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'data/fetchMoviesData',
    async () => {
        const response = await fetch('https://raw.githubusercontent.com/Lanoriya/json-values/main/films.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);

const apiSlice = createSlice({
    name: 'api',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});
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
export const rootReducer = {
    api: apiSlice.reducer,
    favorites: favoritesSlice.reducer
};