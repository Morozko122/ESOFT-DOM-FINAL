import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addFavorite } from '../testredux';
import FavoritesList from '../Sidebar/favoriteMovies';
import { MovieCard } from '../MovieCard/moviecard';
import './styles.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.api.data);
  const loading = useSelector(state => state.api.loading);
  const error = useSelector(state => state.api.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAddToFavorite = (movie) => {
    dispatch(addFavorite(movie));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <div className="movie-container">
      {data.map(item => (
        <MovieCard key={item.id} movie={item} handleAddToFavorite={() => handleAddToFavorite(item)}/>


      ))}
      
    </div>
    <div><FavoritesList /></div>
    </div>
  );
};

export default MainPage;