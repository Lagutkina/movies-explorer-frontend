import './Portfolio.css';
import aboutmePortfolioLinkIcon from '../../images/aboutmePortfolioLinkIcon.svg';
function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <a
            href="https://lagutkina.github.io/russian-travel/index.html#"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <img
            className="portfolio__link-icon"
            src={aboutmePortfolioLinkIcon}
            alt="иконка ссылки"
          ></img>
        </li>
        <li className="portfolio__link-container">
          <a
            href="https://lagutkina.github.io/russian-travel/index.html#"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <img
            className="portfolio__link-icon"
            src={aboutmePortfolioLinkIcon}
            alt="иконка ссылки"
          ></img>
        </li>
        <li className="portfolio__link-container">
          <a
            href="https://lagutkina.github.io/mesto/index.html"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <img
            className="portfolio__link-icon"
            src={aboutmePortfolioLinkIcon}
            alt="иконка ссылки"
          ></img>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
