import './NavBar.css';
function NavBar() {
  return (
    <nav className="navbar">
      <a href="#about-project" className="navbar__btn">
        О проекте
      </a>
      <a href="#techs" className="navbar__btn">
        Технологии
      </a>
      <a href="#aboutme" className="navbar__btn">
        Студент
      </a>
    </nav>
  );
}

export default NavBar;
