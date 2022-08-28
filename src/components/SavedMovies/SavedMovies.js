import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { SAVED } from '../../utils/constants';
import { filterMovies } from '../../utils/filter';

import './SavedMovies.css';

function SavedMovies(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isShort, setIsShort] = useState(false);

  const handleSearch = (term, short) => {
    setSearchTerm(term);
    setIsShort(short);
  };
  const filteredMovies =
    props.movies && filterMovies(props.movies, searchTerm, isShort);

  return (
    <main className="saved-movies">
      <SearchForm type={SAVED} onSearch={handleSearch} />
      {props.movies && !props.isLoading && (
        <MoviesCardList
          type={SAVED}
          movies={filteredMovies}
          onLike={props.onLike}
          onRemove={props.onRemove}
          savedMoviesIds={[]}
        />
      )}
      {props.isLoading && <Preloader />}
    </main>
  );
}
export default SavedMovies;
