import './SearchForm.css';
import searchBtn from '../../images/seachFormSeachbtn.svg';
import searchBtn_grey from '../../images/seachFormSeachbtn_grey.svg';
import { useState } from 'react';
function SearchForm(props) {
  const [activeCheckbox, setActiveCheckbox] = useState(props.short || false);
  const [value, setValue] = useState(props.term || '');
  function handleInputChange(evt) {
    setValue(evt.target.value);
  }

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSearch(value, activeCheckbox);
      }}
    >
      <div className="search-form__container">
        <img
          className="search-form__container-image"
          src={searchBtn_grey}
          alt="иконка поиска"
        ></img>
        <input
          type="text"
          placeholder="Фильм"
          value={value}
          className="search-form__field"
          onChange={handleInputChange}
        />
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
            !activeCheckbox ? 'search-form__filter-checkbox_off' : ''
          }`}
          onClick={() => setActiveCheckbox(!activeCheckbox)}
        ></div>
        <p className="search-form__filter-checkbox-title">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
