import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlices';
import favoritesReducer from './favoriteSlices';
import watchLaterReducer from './watchLaterSlice';
import sortReducer from './sortSlice';
import filterReducer from './filterSlice';
import similarMoviesReducer from './similarMoviesSlice';

const store = configureStore({
    reducer: {
        api: apiReducer,
        favorites: favoritesReducer,
        watchLater: watchLaterReducer,
        sort: sortReducer,
        filter: filterReducer,
        similarMovies: similarMoviesReducer,
    }
});

export default store;