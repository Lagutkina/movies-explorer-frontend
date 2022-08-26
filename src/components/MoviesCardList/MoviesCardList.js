import { useState, useEffect } from 'react';
import debounce from '../../utils/debounce';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

function calcDisplayParams() {
  const width = window.innerWidth;
  if (width <= 604) {
    return [5, 2];
  }
  if (width <= 943) {
    return [8, 2];
  }
  if (width <= 1245) {
    return [12, 3];
  }
  return [16, 4];
}
function MoviesCardList(props) {
  const [displayParams, setDisplayParams] = useState(calcDisplayParams());
  const [initialAmount, additionalAmount] = displayParams;
  const [showAmount, setShowAmount] = useState(initialAmount);
  const { savedMoviesIds } = props;

  // Скрытие кнопки когда не нужна
  const hideButton = !props.movies || props.movies.length <= showAmount;

  useEffect(() => {
    // реакция на изменения размеров экрана
    const handleResize = () => setDisplayParams(calcDisplayParams());
    // Ограничиение вызова функции
    const handleResizeDebounced = debounce(handleResize, 150);
    window.addEventListener('resize', handleResizeDebounced);
    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
    };
  });
  return (
    <>
      <section className="movies-cardlist">
        {props.movies &&
          props.movies
            .slice(0, showAmount)
            .map((card) => (
              <MoviesCard
                type={props.type}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={card._id || card.id}
                isLiked={savedMoviesIds.indexOf(card.movieId) !== -1}
                onLike={props.onLike}
                onRemove={props.onRemove}
              />
            ))}
      </section>
      {!hideButton && (
        <LoadMoreButton
          onClick={() => setShowAmount(showAmount + additionalAmount)}
        />
      )}
    </>
  );
}

export default MoviesCardList;
