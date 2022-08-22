import './SearchForm.css';
import searchBtn from '../../images/seachFormSeachbtn.svg';
import searchBtn_grey from '../../images/seachFormSeachbtn_grey.svg';
import { useState } from 'react';
function SearchForm() {
  const [activeCheckbox, setActiveCheckbox] = useState(false);

  return (
    <form className="search-form">
      <div className="search-form__container">
        <img
          className="search-form__container-image"
          src={searchBtn_grey}
          alt="иконка поиска"
        ></img>
        <input type="text" placeholder="Фильм" className="search-form__field" />
        <button type="submit" className="search-form__searchbtn">
          <img
            className="search-form__searchbtn-image"
            alt="иконка поиска"
            src={searchBtn}
          ></img>
        </button>
      </div>
      <div className="search-form__checkbox-wrapper">
        <div
          className={`search-form__filter-checkbox ${
            activeCheckbox ? 'search-form__filter-checkbox_off' : ''
          }`}
          onClick={() => setActiveCheckbox(!activeCheckbox)}
        ></div>
        <p className="search-form__filter-checkbox-title">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
