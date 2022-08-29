import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { MOVIES } from '../../utils/constants';
import { filterMovies } from '../../utils/filter';

import './Movies.css';

function Movies(props) {
  const filteredMovies =
    props.movies && filterMovies(props.movies, props.searchTerm, props.isShort);
  return (
    <main className="movies">
      <SearchForm
        isLoading={props.isLoading}
        onSearch={props.onSearch}
        term={props.searchTerm}
        short={props.isShort}
        key={`${props.searchTerm}-${props.isShort}`}
      />
      {props.movies && !props.isLoading && (
        <MoviesCardList
          type={MOVIES}
          movies={filteredMovies}
          savedMoviesIds={props.savedMoviesIds}
          onLike={props.onLike}
          onRemove={props.onRemove}
        />
      )}

      {props.isLoading && <Preloader />}
    </main>
  );
}

export default Movies;
