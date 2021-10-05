import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

function Filter({allCharactersInfo, onFilterButtonClick, onFilterResetButtonClick}) {
  const {names, statuses, species, types, genders, originLocation} = allCharactersInfo;
  const [isFilterButtonDisabled, setFilterButtonState] = useState(true);
  const [isSelectNameDisabled, setSelectNameState] = useState(true);
  const [nameParameter, setName] = useState('NaN');
  const [statusParameter, setStatus] = useState('NaN');
  const [speciesParameter, setSpecies] = useState('NaN');
  const [typeParameter, setType] = useState('NaN');
  const [genderParameter, setGender] = useState('NaN');
  const formParameters = useRef(null);

  const setFilterParameters = () => {
    const allParameters = {
      name: nameParameter,
      status: statusParameter,
      species: speciesParameter,
      type: typeParameter,
      gender: genderParameter,
    };

    Object.keys(allParameters).forEach((parameter) => {
      if (allParameters[parameter] === 'NaN') {
        delete allParameters[parameter];
      }
    });
    return allParameters;
  };

  const handleApplyFilterButtonClick = (evt) => {
    evt.preventDefault();
    onFilterButtonClick(setFilterParameters());
  };

  const resetAllSelect = () => {
    setName('NaN');
    setStatus('NaN');
    setSpecies('NaN');
    setType('NaN');
    setGender('NaN');
  };

  const handleFormChange = () => {
    const parameters = Array.from(formParameters.current.elements).filter((item) => item.tagName === ('SELECT' || 'select')).map((item) => item.value);
    const isFormEmpty = parameters.every((item) => item === 'NaN');
    isFormEmpty ? setFilterButtonState(true) : setFilterButtonState(false);
  };

  const handleSelectNameChange = (evt) => {
    setName(evt.target.value);
    if (evt.target.value !== 'NaN') {
      setSelectNameState(false);
    } else {
      setSelectNameState(true);
      resetAllSelect();
    }
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden">Characters filter</h2>
      <form className="filter__form" method="post" onChange={handleFormChange} ref={formParameters}>
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
                value={nameParameter}
                onChange={handleSelectNameChange}
              >
                <option value="NaN">select name</option>
                {names.map((name, index) => <option value={name} key={name + String(index)}>{name} from {originLocation[index]}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-status" tabIndex="0">Status:</label>
              <select
                className="filter__select"
                id="select-filter-status"
                size="1"
                name="status"
                disabled={isSelectNameDisabled}
                value={statusParameter}
                onChange={(evt) => {setStatus(evt.target.value);}}
              >
                <option value="NaN">select status, but at first select name</option>
                {statuses.map((status) => <option value={status} key={status}>{status}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-species" tabIndex="0">Species:</label>
              <select
                className="filter__select"
                id="select-filter-species"
                size="1"
                name="species"
                disabled={isSelectNameDisabled}
                value={speciesParameter}
                onChange={(evt) => {setSpecies(evt.target.value);}}
              >
                <option value="NaN">select species, but at first select name</option>
                {species.map((specie) => <option value={specie} key={specie}>{specie}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-type" tabIndex="0">Type:</label>
              <select
                className="filter__select"
                id="select-filter-type"
                size="1"
                name="type"
                value={typeParameter}
                onChange={(evt) => {setType(evt.target.value);}}
              >
                <option value="NaN">select type</option>
                {types.map((type) => <option value={type} key={type}>{type}</option>).reverse()}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-gender" tabIndex="0">Gender:</label>
              <select
                className="filter__select"
                id="select-filter-gender"
                size="1"
                name="gender"
                disabled={isSelectNameDisabled}
                value={genderParameter}
                onChange={(evt) => {setGender(evt.target.value);}}
              >
                <option value="NaN">select gender, but at first select name</option>
                {genders.map((gender) => <option value={gender} key={gender}>{gender}</option>)}
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
          onClick={onFilterResetButtonClick}
        >
          reset filter
        </button>
      </form>
    </section>
  );
}

Filter.propTypes = {
  allCharactersInfo: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    species: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    genders: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    originLocation: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  onFilterButtonClick: PropTypes.func.isRequired,
  onFilterResetButtonClick: PropTypes.func.isRequired,
};

export default Filter;
