import Link from '../Link/Link';
import './PageNotFound.css';
function PageNotFound() {
  return (
    <section className="page-not-found">
      <div className="page-not-found__error">
        <h2 className="page-not-found__error-title">404</h2>
        <p className="page-not-found__error-description">Страница не найдена</p>
      </div>
      <Link to="/" className="page-not-found__back-link">
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
