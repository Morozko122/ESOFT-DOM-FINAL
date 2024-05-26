import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../Slices/favoriteSlices';
import { addWatchLater, removeWatchLater } from '../Slices/watchLaterSlice';
import './moviecard.css';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.list);
    const watchLater = useSelector(state => state.watchLater.list);

    const isFavorite = favorites.some(fav => fav.id === movie.id);
    const isWatchLater = watchLater.some(watch => watch.id === movie.id);

    const handleAddToFavorite = () => {
        if (!isFavorite) {
            dispatch(addFavorite(movie));
        } else {
            dispatch(removeFavorite(movie.id));
        }
    };

    const handleAddToWatchLater = () => {
        if (!isWatchLater) {
            dispatch(addWatchLater(movie));
        } else {
            dispatch(removeWatchLater(movie.id));
        }
    };

    return (
        <div className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <div>
                <div className='mvcard-link'><Link to={`/films/${movie.id}`} className='mvcard-link-text'><b>{movie.title}</b></Link></div>
                <p><b>Описание</b>: {movie.short_description}</p>
                <p><b>Рейтинг</b>: {movie.rating}</p>
                <p><b>Год</b>: {movie.release_year}</p>
                <p><b>Жанр</b>: {movie.genres.join(', ')}</p>
            </div>
            <div className='fav-wl-buttons'>
                <button onClick={handleAddToFavorite} disabled={isFavorite}>
                    {isFavorite ? 'В избранном' : 'Добавить в избранное'}
                </button>
                <button onClick={handleAddToWatchLater} disabled={isWatchLater}>
                    {isWatchLater ? 'Смотрю позже' : 'Смотреть позже'}
                </button>
            </div>
        </div>
    );
};