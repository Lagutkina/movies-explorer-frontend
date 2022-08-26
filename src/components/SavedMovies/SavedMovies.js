import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { SAVED } from '../../utils/constants';

import './SavedMovies.css';
function SavedMovies(props) {
  const handleSearch = (...args) => {
    props.onSearch(SAVED, ...args);
  };
  return (
    <section className="saved-movies">
      <SearchForm onSearch={handleSearch} />
      {props.movies && !props.isLoading && (
        <MoviesCardList
          type={SAVED}
          movies={props.movies}
          onLike={props.onLike}
          onRemove={props.onRemove}
          savedMoviesIds={[]}
        />
      )}
      {props.isLoading && <Preloader />}
    </section>
  );
}
export default SavedMovies;
