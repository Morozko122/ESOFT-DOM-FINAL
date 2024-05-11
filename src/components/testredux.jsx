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

const sortSlice = createSlice({
    name: 'sort',
    initialState:{
        method: 'default'
    },
    reducers: {
        setSortMethod(state, action) {
            return { ...state, method: action.payload };
        }
    }
});


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
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const { setSortMethod } = sortSlice.actions;
export const { addComment } = apiSlice.actions;
export const { setSimilarMovies } = similarMoviesSlice.actions;
export const { setTitleFilter, setGenreFilter, clearFilters } = filterSlice.actions;
export const rootReducer = {
    api: apiSlice.reducer,
    favorites: favoritesSlice.reducer,
    sort: sortSlice.reducer,
    similar: similarMoviesSlice.reducer,
    filter: filterSlice.reducer
};