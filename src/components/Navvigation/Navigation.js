import AccountButton from '../AccountButton/AccountButton';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
function Navigation(props) {
  return (
    <section className={`navigation ${props.isOpen ? 'navigation_open' : ''} `}>
      <div className="navigation__container">
        <button className="navigation__close-btn" onClick={props.onClose} />
        <ul className="navigation__menu">
          <li>
            <NavLink
              exact
              to="/"
              className="navigation__menu-item"
              activeClassName="navigation__menu-item_active"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className="navigation__menu-item"
              activeClassName="navigation__menu-item_active"
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              className="navigation__menu-item"
              activeClassName="navigation__menu-item_active"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className="navigation__account-btn">
          <AccountButton />
        </div>
      </div>
    </section>
  );
}
export default Navigation;
