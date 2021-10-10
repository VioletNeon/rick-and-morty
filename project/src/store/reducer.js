import {ActionType} from './action';

const getAllCharactersInfo = function (loadedCharacters) {
  return {
    originLocation: loadedCharacters.map((item) => item.origin.name),
    names: loadedCharacters.map((item) => item.name),
    statuses: Array.from(new Set(loadedCharacters.map((item) => item.status))),
    species: Array.from(new Set(loadedCharacters.map((item) => item.species))),
    types: Array.from(new Set(loadedCharacters.map((item) => item.type))),
    genders: Array.from(new Set(loadedCharacters.map((item) => item.gender))),
  };
};

const filterCharacters = (charactersList, filterParameters = []) => {
  if (!filterParameters.length) {
    return charactersList;
  }

  return charactersList.filter((character) => filterParameters.every(([key, value]) => character[key] === value));
};

const initialState = {
  characters: [],
  filteredCharacters: [],
  charactersInfo: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
        filteredCharacters: filterCharacters(action.characters),
        charactersInfo: getAllCharactersInfo(action.characters),
      };
    case ActionType.FILTER_CHARACTERS:
      return {
        ...state,
        filteredCharacters: filterCharacters(state.characters, action.payload),
      };
    case ActionType.RESET_FILTER:
      return {
        ...state,
        filteredCharacters: filterCharacters(state.characters),
      };
    default:
      return state;
  }
};

export {reducer};
