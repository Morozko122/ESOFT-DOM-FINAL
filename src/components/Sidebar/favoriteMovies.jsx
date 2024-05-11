import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../testredux';
import './sidebar.css';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);

  const handleRemoveFromFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className='sidebar-container'>
      <h2>Избранные фильмы</h2>
      {favorites.length === 0 ? (
        <p>Список избранных фильмов пуст</p>
      ) : (
        <div>
          {favorites.map(favorite => (
            <div className="favorite-item" key={favorite.id}>
              <img src={favorite.image} alt={favorite.title} />
              <div className='short-details'>
                <div className="title">
                  <Link to={`/films/${favorite.id}`}>{favorite.title}</Link>
                </div>
                <button onClick={() => handleRemoveFromFavorite(favorite.id)}>Убрать</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;