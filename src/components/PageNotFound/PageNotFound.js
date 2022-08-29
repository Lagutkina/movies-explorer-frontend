import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory(); // создаем константу для истории
  return (
    <section className="page-not-found">
      <div className="page-not-found__error">
        <h2 className="page-not-found__error-title">404</h2>
        <p className="page-not-found__error-description">Страница не найдена</p>
      </div>
      <div
        onClick={() => history.goBack()}
        className="page-not-found__back-link"
      >
        Назад
      </div>
    </section>
  );
}

export default PageNotFound;
