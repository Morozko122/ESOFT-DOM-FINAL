import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../testredux';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);

  const handleRemoveFromFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div>
      <h2>Избранные фильмы</h2>
      {favorites.length === 0 ? (
        <p>Список избранных фильмов пуст</p>
      ) : (
        <ul>
          {favorites.map(favorite => (
            <li key={favorite.id}>
              <span>{favorite.title}</span>
              <button onClick={() => handleRemoveFromFavorite(favorite.id)}>Удалить из избранного</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;