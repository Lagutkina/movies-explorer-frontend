import './MoviesCard.css';
import cardImage from '../../images/cardImage.png';
function MoviesCard(props) {
  return (
    <div className="card">
      <img className="card__image" alt="обложка фильма" src={cardImage} />
      <div className="card__name-wrapper">
        <h2 className="card__name">33 слова о дизайне</h2>
        {props.type !== 'saved' && (
          <button
            type="button"
            className="card__like card__like_active"
          ></button>
        )}
        {props.type === 'saved' && (
          <button type="button" className="card__delete"></button>
        )}
      </div>
      <div className="card__movie-length">1ч 42м</div>
    </div>
  );
}

export default MoviesCard;
