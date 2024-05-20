import { createSlice } from '@reduxjs/toolkit';

const similarMoviesSlice = createSlice({
    name: 'similarMovies',
    initialState: {
        list: []
    },
    reducers: {
        setSimilarMovies: (state, action) => {
            state.list = action.payload;
        }
    }
});

export const { setSimilarMovies } = similarMoviesSlice.actions;
export default similarMoviesSlice.reducer;
