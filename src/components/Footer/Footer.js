import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__wrapper">
        <ul className="footer__links">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              Github{' '}
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
        <p className="footer__year">©2022</p>
      </div>
    </footer>
  );
}

export default Footer;
