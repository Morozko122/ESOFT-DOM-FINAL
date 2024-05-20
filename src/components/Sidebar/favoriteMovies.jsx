import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../Slices/favoriteSlices';
import './sidebar.css';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);

  const handleRemoveFromFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className='sidebar-container'>
      <h2 className='fav-container-label'>Избранные фильмы</h2>
      {favorites.length === 0 ? (
        <p className='empty-list'>Список пуст</p>
      ) : (
        <div>
          {favorites.map(favorite => (
            <div className="favorite-item" key={favorite.id}>
              <img src={favorite.image} alt={favorite.title} />
              <div className='short-details'>
                <div className="title">
                  <div className='fav-link'><Link to={`/films/${favorite.id}`} className='fav-link-text'><b>{favorite.title}</b></Link></div>
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