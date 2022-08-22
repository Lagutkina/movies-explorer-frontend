import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
function MoviesCardList(props) {
  return (
    <section className="movies-cardlist">
      <MoviesCard type={props.type} />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </section>
  );
}

export default MoviesCardList;
