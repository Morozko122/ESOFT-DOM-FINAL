import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'api/fetchData',
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
    reducers: {
        addComment: (state, action) => {
            const { movieId, comment } = action.payload;
            const movie = state.data.find(movie => movie.id === movieId);
            if (movie) {
                if (!movie.comments) {
                    movie.comments = [];
                }
                movie.comments.push(comment);
            }
        }
    },
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

export const { addComment } = apiSlice.actions;
export default apiSlice.reducer;