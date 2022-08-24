import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
function Movies(props) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList type="movies" />
      <LoadMoreButton />
      <Preloader />
    </section>
  );
}

export default Movies;
