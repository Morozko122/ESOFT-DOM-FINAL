import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchData, setTitleFilter, setGenreFilter, addFavorite } from '../testredux';
import { MovieCard } from '../MovieCard/moviecard';
import Select from 'react-select';
import '../MovieCard/moviecard.css';
import './searchpage.css';

const SearchPage = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.api.data);
    const titleFilter = useSelector(state => state.filter.title);
    const genreFilter = useSelector(state => state.filter.genres);
    
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        if (movies && movies.length === 0) {
            dispatch(fetchData());
        }
    }, [dispatch, movies]);
    
    const handleAddToFavorite = (movie) => {
        dispatch(addFavorite(movie));
    };

    const handleTitleChange = (event) => {
        dispatch(setTitleFilter(event.target.value));
    };

    const handleGenreChange = (selectedOptions) => {
        const genres = selectedOptions.map(option => option.value);
        setSelectedGenres(selectedOptions);
        dispatch(setGenreFilter(genres));
    };

    const filteredMovies = movies.filter(movie => {
        const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
        if (genreFilter.length > 0) {
            const matchesGenre = genreFilter.every(genre => movie.genres.includes(genre));
            return matchesTitle && matchesGenre;
        }
        return matchesTitle;
    });

    return (
        <div className="search-container">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Введите название фильма"
                    value={titleFilter}
                    onChange={handleTitleChange}
                />
                <Select
                    options={[
                        { value: 'Драма', label: 'Драма' },
                        { value: 'Криминал', label: 'Криминал' },
                        { value: 'Боевик', label: 'Боевик' },
                        { value: 'Анимация', label: 'Анимация' },
                        { value: 'Комедия', label: 'Комедия' },
                        { value: 'Приключения', label: 'Приключения' },
                        { value: 'Триллер', label: 'Триллер' },
                        { value: 'Фантастика', label: 'Фантастика' },
                        { value: 'Биография', label: 'Биография' },
                        { value: 'Мюзикл', label: 'Мюзикл' },
                        { value: 'Фэнтези', label: 'Фэнтези' },
                        { value: 'Романтика', label: 'Романтика' }
                    ]}
                    isMulti
                    value={selectedGenres}
                    onChange={handleGenreChange}
                    placeholder="Выберите жанр"
                />
            </div>
            {titleFilter || selectedGenres.length > 0 ? (
                <div className='movie-container'>
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} handleAddToFavorite={() => handleAddToFavorite(movie)}/>
                    ))}
                </div>
            ) : <h2 className='not-found-text'>Ничего не найдено</h2>}
        </div>
    );
};

export default SearchPage;