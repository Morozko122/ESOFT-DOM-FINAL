import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../Slices/apiSlices';
import { setSortMethod } from '../Slices/sortSlice';
import { MovieCard } from '../MovieCard/moviecard';
import './styles.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.api.data);
  const loading = useSelector(state => state.api.loading);
  const error = useSelector(state => state.api.error);
  const sortBy = useSelector(state => state.sort.method);
  const [filterType, setFilterType] = useState('Все');

  useEffect(() => {
    if (data && data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  const handleSortChange = (method) => {
    dispatch(setSortMethod(method));
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const sortAndFilterMovies = (movies) => {
    let filteredMovies = movies;
    if (filterType !== 'Все') {
      filteredMovies = movies.filter(movie => movie.type === filterType);
    }

    switch (sortBy) {
      case 'asc':
        return [...filteredMovies].sort((a, b) => a.rating - b.rating);
      case 'desc':
        return [...filteredMovies].sort((a, b) => b.rating - a.rating);
      default:
        return filteredMovies;
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
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('Все')}>Все</button>
        <button onClick={() => handleFilterChange('Фильм')}>Фильм</button>
        <button onClick={() => handleFilterChange('Сериал')}>Сериал</button>
        <button onClick={() => handleFilterChange('Мультфильм')}>Мультфильм</button>
      </div>
      <div className="movie-container">
        {sortAndFilterMovies(data).map(item => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
