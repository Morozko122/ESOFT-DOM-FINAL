import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addFavorite, setSortMethod } from '../testredux';
import FavoritesList from '../Sidebar/favoriteMovies';
import { MovieCard } from '../MovieCard/moviecard';
import './styles.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.api.data);
  const loading = useSelector(state => state.api.loading);
  const error = useSelector(state => state.api.error);
  const sortBy = useSelector(state => state.sort.method)

  useEffect(() => {
    if (data && data.length == 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  const handleAddToFavorite = (movie) => {
    dispatch(addFavorite(movie));
  };

  const handleSortChange = (method) => {
    dispatch(setSortMethod(method));
  };

  const sortMovies = (movies) => {
    switch (sortBy) {
      case 'asc':
        return [...movies].sort((a, b) => a.rating - b.rating);
      case 'desc':
        return [...movies].sort((a, b) => b.rating - a.rating);
      default:
        return movies;
    }
  };
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <div className="sort-buttons">
        <button onClick={() => handleSortChange('default')}>По-умолчанию</button>
        <button onClick={() => handleSortChange('asc')}>По возрастанию</button>
        <button onClick={() => handleSortChange('desc')}>По убыванию</button>
      </div>
      <div className="movie-container">
        {sortMovies(data).map(item => (
          <MovieCard key={item.id} movie={item} handleAddToFavorite={() => handleAddToFavorite(item)} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;