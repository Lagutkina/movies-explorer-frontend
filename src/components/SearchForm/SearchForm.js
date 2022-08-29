import { useState } from 'react';

import searchBtn from '../../images/seachFormSeachbtn.svg';
import searchBtn_grey from '../../images/seachFormSeachbtn_grey.svg';
import { SAVED } from '../../utils/constants';

import './SearchForm.css';

function SearchForm(props) {
  const [activeCheckbox, setActiveCheckbox] = useState(props.short || false);
  const [value, setValue] = useState(props.term || '');

  function handleInputChange(evt) {
    setValue(evt.target.value);
  }
  function handleCheckboxChange(evt) {
    if (props.isLoading) {
      return;
    }
    if (value || props.type === SAVED) {
      props.onSearch(value, !activeCheckbox);
    }
    setActiveCheckbox(!activeCheckbox);
  }

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (props.isLoading) {
          return;
        }
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
          disabled={props.isLoading}
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
          onClick={handleCheckboxChange}
        ></div>
        <p className="search-form__filter-checkbox-title">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
