import './MoviesCard.css';

import { MOVIES, SAVED } from '../../utils/constants';

function MoviesCard(props) {
  const m = props.card.duration % 60;
  const h = ~~(props.card.duration / 60);
  function handleLike(evt) {
    evt.preventDefault();
    props.onLike(props.card);
  }
  function handleRemove(evt) {
    evt.preventDefault();
    props.onRemove(props.card.movieId);
  }
  return (
    <div className="card">
      <a
        className="card__image-link"
        href={props.card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt={props.card.nameRU}
          src={props.card.image}
        />
      </a>
      <div className="card__name-wrapper">
        <h2 className="card__name">{props.card.nameRU}</h2>
        {props.type === MOVIES && (
          <button
            type="button"
            onClick={props.isLiked ? handleRemove : handleLike}
            className={`card__like ${props.isLiked ? 'card__like_active' : ''}`}
          ></button>
        )}
        {props.type === SAVED && (
          <button
            type="button"
            onClick={handleRemove}
            className="card__delete"
          ></button>
        )}
      </div>
      <div className="card__movie-length">
        {' '}
        {h > 0 ? h + 'ч' : ''} {m}мин
      </div>
    </div>
  );
}

export default MoviesCard;
