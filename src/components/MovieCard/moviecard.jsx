import './moviecard.css';

export const MovieCard = ({ movie, handleAddToFavorite }) => {
    return (
            <div className="movie-card">
                <img src={movie.image} alt={movie.title} />
                    <h1>{movie.title}</h1>
                    <p><b>Описание</b>: {movie.short_description}</p>
                    <p><b>Рейтинг</b>: {movie.rating}</p>
                    <p><b>Год</b>: {movie.release_year}</p>
                    <p><b>Жанр</b>: {movie.genres.join(', ')}</p>
                    <button onClick={handleAddToFavorite}>Добавить в избранное</button>
                </div>
    )
}