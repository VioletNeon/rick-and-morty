import React, {useState, useRef} from 'react';

function Filter({allCharactersInfo, onFilterButtonClick, onFilterResetButtonClick}) {
  const {names, statuses, species, types, genders, originLocation} = allCharactersInfo;
  const [isFilterButtonDisabled, setFilterButtonState] = useState(true);
  const nameParameter = useRef(null);
  const statusParameter = useRef(null);
  const speciesParameter = useRef(null);
  const typeParameter = useRef(null);
  const genderParameter = useRef(null);
  const parameters = [nameParameter, statusParameter, speciesParameter, typeParameter, genderParameter];

  const setFilterParameters = () => {
    const allParameters = {};
    parameters.forEach((parameter) => {
      const value = parameter.current.value;
      const name = parameter.current.name;
      if (value && value !== 'NaN') {
        allParameters[name] = value;
      }
    });
    return allParameters;
  };

  const handleButtonClick = (evt) => {
    evt.preventDefault();
    onFilterButtonClick(setFilterParameters());
  };

  const onFormChange = () => {
    const isFormEmpty = parameters.every(item => item.current.value === 'NaN');
    isFormEmpty ? setFilterButtonState(true) : setFilterButtonState(false);
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden">Characters filter</h2>
      <form className="filter__form" method="post" onChange={onFormChange}>
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
                ref={nameParameter}
              >
                <option value="NaN">select name</option>
                {names.map((name, index) => <option value={name} key={name + index}>{name} from {originLocation[index]}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-status" tabIndex="0">Status:</label>
              <select
                className="filter__select"
                id="select-filter-status"
                size="1"
                name="status"
                ref={statusParameter}
              >
                <option value="NaN">select status</option>
                {statuses.map((status, index) => <option value={status} key={status + index}>{status}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-species" tabIndex="0">Species:</label>
              <select
                className="filter__select"
                id="select-filter-species"
                size="1"
                name="species"
                ref={speciesParameter}
              >
                <option value="NaN">select species</option>
                {species.map((specie, index) => <option value={specie} key={specie + index}>{specie}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-type" tabIndex="0">Type:</label>
              <select
                className="filter__select"
                id="select-filter-type"
                size="1"
                name="type"
                ref={typeParameter}
              >
                <option value="NaN">select type</option>
                {types.map((type, index) => <option value={type} key={type + index}>{type}</option>)}
              </select>
            </li>
            <li className="filter__item">
              <label className="filter__description" htmlFor="select-filter-gender" tabIndex="0">Gender:</label>
              <select
                className="filter__select"
                id="select-filter-gender"
                size="1"
                name="gender"
                ref={genderParameter}
              >
                <option value="NaN">select gender</option>
                {genders.map((gender, index) => <option value={gender} key={gender + index}>{gender}</option>)}
              </select>
            </li>
          </ul>
        </fieldset>
        <button
          className="filter__button-apply button"
          type="submit"
          disabled={isFilterButtonDisabled}
          onClick={handleButtonClick}
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
  )
}

export default Filter;
