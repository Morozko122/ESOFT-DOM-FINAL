import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeWatchLater } from '../Slices/watchLaterSlice';
import './sidebar.css';

const WatchLaterList = () => {
    const dispatch = useDispatch();
    const watchLater = useSelector(state => state.watchLater.list);

    const handleRemoveFromWatchLater = (id) => {
        dispatch(removeWatchLater(id));
    };

    return (
        <div className='sidebar-container'>
            <h2 className='fav-container-label'>Смотреть позже</h2>
            {watchLater.length === 0 ? (
                <p className='empty-list'>Список пуст</p>
            ) : (
                <div>
                    {watchLater.map(movie => (
                        <div className="favorite-item" key={movie.id}>
                            <img src={movie.image} alt={movie.title} />
                            <div className='short-details'>
                                <div className="title">
                                    <div className='fav-link'><Link to={`/films/${movie.id}`} className='fav-link-text'><b>{movie.title}</b></Link></div>
                                </div>
                                <button onClick={() => handleRemoveFromWatchLater(movie.id)}>Убрать</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchLaterList;