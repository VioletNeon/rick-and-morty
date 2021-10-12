import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const {charactersInfo, onFilterButtonClick, onFilterResetButtonClick, onFilterFavoriteButtonClick, isOnlyFavorite} = props;
  const [isFilterButtonDisabled, setFilterButtonState] = useState(true);
  const [nameFilter, setName] = useState('');
  const [statusFilter, setStatus] = useState('');
  const [speciesFilter, setSpecies] = useState('');
  const [genderFilter, setGender] = useState('');
  const [typeFilter, setType] = useState('');

  const setFilterParameters = () => {
    const allParameters = {
      name: nameFilter,
      status: statusFilter,
      species: speciesFilter,
      type: typeFilter,
      gender: genderFilter,
    };

    Object.keys(allParameters).forEach((parameter) => {
      if (allParameters[parameter] === '') {
        delete allParameters[parameter];
      }
    });
    return Object.entries(allParameters);
  };

  const resetAllSelect = () => {
    setName('');
    setStatus('');
    setSpecies('');
    setType('');
    setGender('');
    setFilterButtonState(true);
  };

  const handleApplyFilterButtonClick = (evt) => {
    evt.preventDefault();
    onFilterButtonClick(setFilterParameters());
  };

  const handleResetFilterButtonClick = () => {
    onFilterResetButtonClick();
    resetAllSelect();
  };

  const handleFilterFavoriteButtonClick = (evt) => {
    onFilterFavoriteButtonClick(evt.target.checked);
  };

  useEffect(() => {
    const isFormEmpty = [nameFilter, statusFilter, speciesFilter, typeFilter, genderFilter].every((item) => item === '');
    setFilterButtonState(isFormEmpty);
  }, [nameFilter, statusFilter, speciesFilter, typeFilter, genderFilter]);

  return (
    <section className="filter">
      <h2 className="visually-hidden">Characters filter</h2>
      <form className="filter__form" method="post">
        <fieldset className="filter__field">
          <legend className="visually-hidden">Filter</legend>
          <ul className="filter__list">
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-name" tabIndex="0">Name:</label>
              <select
                className="filter__select"
                id="select-filter-name"
                size="1"
                name="name"
                value={nameFilter}
                onChange={(evt) => {setName(evt.target.value);}}
              >
                <option value="">select name</option>
                {charactersInfo.names.map((name, index) => <option value={name} key={name + String(index)}>{name} from {charactersInfo.originLocation[index]}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-status" tabIndex="0">Status:</label>
              <select
                className="filter__select"
                id="select-filter-status"
                size="1"
                name="status"
                value={statusFilter}
                onChange={(evt) => {setStatus(evt.target.value);}}
              >
                <option value="">select status</option>
                {charactersInfo.statuses.map((status) => <option value={status} key={status}>{status}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-species" tabIndex="0">Species:</label>
              <select
                className="filter__select"
                id="select-filter-species"
                size="1"
                name="species"
                value={speciesFilter}
                onChange={(evt) => {setSpecies(evt.target.value);}}
              >
                <option value="">select species</option>
                {charactersInfo.species.map((specie) => <option value={specie} key={specie}>{specie}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-type" tabIndex="0">Type:</label>
              <select
                className="filter__select"
                id="select-filter-type"
                size="1"
                name="type"
                value={typeFilter}
                onChange={(evt) => {setType(evt.target.value);}}
              >
                <option value="">select type</option>
                {charactersInfo.types.map((type) => <option value={type} key={type}>{type}</option>).reverse()}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-gender" tabIndex="0">Gender:</label>
              <select
                className="filter__select"
                id="select-filter-gender"
                size="1"
                name="gender"
                value={genderFilter}
                onChange={(evt) => {setGender(evt.target.value);}}
              >
                <option value="">select gender</option>
                {charactersInfo.genders.map((gender) => <option value={gender} key={gender}>{gender}</option>)}
              </select>
            </li>
          </ul>
        </fieldset>
        <button
          className="filter__button-apply button"
          type="submit"
          disabled={isFilterButtonDisabled}
          onClick={handleApplyFilterButtonClick}
        >
          apply filter
        </button>
        <button
          className="filter__button-reset button"
          type="button"
          onClick={handleResetFilterButtonClick}
        >
          reset filter
        </button>
        <label className="filter__favorite" aria-label="only favorite">
          <input
            className="visually-hidden"
            type="checkbox"
            onChange={handleFilterFavoriteButtonClick}
            checked={isOnlyFavorite}
          />
          <svg className="filter__favorite-icon" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 504 504" enableBackground='new 0 0 504 504' xmlSpace="preserve">
            <circle fill="#48a3a1" cx="252" cy="252" r="252"/>
            <path fill="#a83452" d="M331 115c-34 0-64 19-79 47a90 90 0 0 0-169 43c0 70 169 223 169 223s169-146 169-223c0-50-40-90-90-90z"/>
          </svg>
        </label>
      </form>
    </section>
  );
}

Filter.propTypes = {
  charactersInfo: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    species: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    genders: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    originLocation: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  isOnlyFavorite: PropTypes.bool.isRequired,
  onFilterButtonClick: PropTypes.func.isRequired,
  onFilterResetButtonClick: PropTypes.func.isRequired,
  onFilterFavoriteButtonClick: PropTypes.func.isRequired,
};

export default Filter;
