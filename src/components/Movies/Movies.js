import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { MOVIES } from '../../utils/constants';

import './Movies.css';

function Movies(props) {
  const handleSearch = (...args) => {
    props.onSearch(MOVIES, ...args);
  };
  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        term={props.searchTerm}
        short={props.isShort}
        key={`${props.searchTerm}-${props.isShort}`}
      />
      {props.movies && !props.isLoading && (
        <MoviesCardList
          type={MOVIES}
          movies={props.movies}
          savedMoviesIds={props.savedMoviesIds}
          onLike={props.onLike}
          onRemove={props.onRemove}
        />
      )}

      {props.isLoading && <Preloader />}
    </section>
  );
}

export default Movies;
