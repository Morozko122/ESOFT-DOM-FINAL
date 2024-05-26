import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchData } from '../Slices/apiSlices';
import { setSimilarMovies } from '../Slices/similarMoviesSlice';
import { addFavorite } from '../Slices/favoriteSlices';
import { MovieCard } from '../MovieCard/moviecard';
import './moviepage.css';
import '../Pages/styles.css';

const findSimilarMovies = (sourceMovie, allMovies) => {
    const sourceGenres = sourceMovie.genres;
    const similarMovies = allMovies.filter(movie => {
        if (movie.id === sourceMovie.id) {
            return false;
        }
        return sourceGenres.every(genre => movie.genres.includes(genre));
    });
    return similarMovies;
};

const MovieDetailsPage = () => {
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const data = useSelector(state => state.api.data);
    const loading = useSelector(state => state.api.loading);
    const error = useSelector(state => state.api.error);
    useEffect(() => {
        if (data && data.length == 0) {
            dispatch(fetchData());
        }
    }, [dispatch, data]);

    const { id } = useParams();
    const movie = useSelector(state =>
        state.api.data.find(movie => movie.id === parseInt(id))
    );
    const allMovies = useSelector(state => state.api.data);
    const similarMovies = useSelector(state => state.similarMovies.list);

    const handleAddToFavorite = (movie) => {
        dispatch(addFavorite(movie));
    };

    useEffect(() => {
        if (movie && allMovies.length > 0) {
            const similarMovies = findSimilarMovies(movie, allMovies);
            dispatch(setSimilarMovies(similarMovies));
        }
    }, [dispatch, movie, allMovies]);
    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!movie) {
        return <div className="movie-details-container">Фильм не найден</div>;
    }

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
            dispatch(addComment({ movieId: movie.id, comment: commentText }));
            setCommentText('');
        }
    };

    return (
        <div className='movie-container'>
            <div className="movie-details-container">
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <div className="movie-details">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p><b>Описание</b>: {movie.full_description}</p>
                    <p><b>Рейтинг</b>: {movie.rating}</p>
                    <p><b>Год</b>: {movie.release_year}</p>
                    <p><b>Жанр</b>: {movie.genres.join(', ')}</p>
                    <p><b>Актеры</b>: {movie.actors.join(', ')}</p>
                    <p><b>Страна</b>: {movie.country}</p>
                </div>
            </div>
            <div className="comments-section">
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="Напишите комментарий..."
                    />
                    <button type="submit">Отправить</button>
                </form>

                {movie.comments && (
                    <div className="comments-container">
                        <h2>Комментарии</h2>
                        {movie.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p><b>Анонимный пользователь</b></p>
                                <p>{comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="similar-movies-container">
                <h2>Похожие фильмы</h2>
                <div className="movie-container">
                    {similarMovies.map(similarMovie => (
                        <MovieCard key={similarMovie.id} movie={similarMovie} handleAddToFavorite={() => handleAddToFavorite(similarMovie)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;