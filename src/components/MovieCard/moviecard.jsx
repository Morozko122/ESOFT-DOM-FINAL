import './moviecard.css';
import { Link } from 'react-router-dom';
export const MovieCard = ({ movie, handleAddToFavorite }) => {
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
            <button onClick={handleAddToFavorite}>Добавить в избранное</button>
        </div>
    )
}