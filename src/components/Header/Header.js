import './Header.css';
import headerLogo from '../../images/headerLogo.svg';
import headerMenu from '../../images/headerMenu.png';
import AccountButton from '../AccountButton/AccountButton';
import { useState } from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';
import Link from '../Link/Link';
import Navigation from '../Navvigation/Navigation';
function Header(props) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  function handleMenuClick() {
    setIsNavigationOpen(true);
  }
  function closeNavigation() {
    setIsNavigationOpen(false);
  }
  const matchMain = useRouteMatch({ path: '/', exact: true });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="логотип" />
      </Link>
      {!matchMain && (
        <ul className="header__logged-navigation">
          <li>
            <NavLink
              className="header__navigation-link"
              activeClassName="header__navigation-link_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header__navigation-link"
              activeClassName="header__navigation-link_active"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      )}

      {matchMain && (
        <ul className="header__main-navigation">
          <li>
            <Link to="/signup" className="header__signup-link">
              Регистрация
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <div className="header__login-button">Войти</div>
            </Link>
          </li>
        </ul>
      )}
      {!matchMain && (
        <>
          <div>
            <img
              className="header__menu"
              src={headerMenu}
              alt="иконка меню"
              onClick={handleMenuClick}
            />
            <div className="header__account-btn">
              <AccountButton />
            </div>
          </div>
          <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
        </>
      )}
    </header>
  );
}

export default Header;
