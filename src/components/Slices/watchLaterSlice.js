import { createSlice } from '@reduxjs/toolkit';

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState: {
        list: []
    },
    reducers: {
        addWatchLater: (state, action) => {
            const newMovie = action.payload;
            if (!state.list.find(movie => movie.id === newMovie.id)) {
                state.list.push(newMovie);
            }
        },
        removeWatchLater: (state, action) => {
            const removedId = action.payload;
            state.list = state.list.filter(movie => movie.id !== removedId);
        }
    }
});

export const { addWatchLater, removeWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
