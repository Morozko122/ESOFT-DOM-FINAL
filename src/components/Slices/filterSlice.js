import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        title: '',
        genres: []
    },
    reducers: {
        setTitleFilter(state, action) {
            state.title = action.payload;
        },
        setGenreFilter(state, action) {
            state.genres = action.payload;
        },
        clearFilters(state) {
            state.title = '';
            state.genres = [];
        }
    }
});

export const { setTitleFilter, setGenreFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;