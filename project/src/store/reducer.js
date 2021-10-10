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

const filterOnlyFavoriteCharacters = (charactersList) => charactersList.filter((character) => character.isFavorite);

const updateCharacters = (stateCharacters, updatedCharacter) => {
  const updatedOfferIndex = stateCharacters.findIndex((character) => character.id === updatedCharacter.id);
  if (updatedOfferIndex === -1) {return stateCharacters;}
  return [...stateCharacters.slice(0, updatedOfferIndex), updatedCharacter, ...stateCharacters.slice(updatedOfferIndex + 1)];
};

const deleteCharacter = (stateCharacters, deletedCharacterId) => {
  const updatedOfferIndex = stateCharacters.findIndex((character) => character.id === +deletedCharacterId);
  if (updatedOfferIndex === -1) {return stateCharacters;}
  return [...stateCharacters.slice(0, updatedOfferIndex), ...stateCharacters.slice(updatedOfferIndex + 1)];
};

const setCharacterFavoriteProperty = function (characters) {
  return characters.map((character) => {
    character.isFavorite = false;
    return character;
  });
};

const PAGE_CHARACTERS_COUNT = 10;

const initialState = {
  characters: [],
  filteredCharacters: '',
  charactersInfo: {},
  pageNumber: PAGE_CHARACTERS_COUNT,
  isOnlyFavorite: false,
  backUpFilteredCharacters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CHARACTERS:
      return {
        ...state,
        characters: setCharacterFavoriteProperty(action.characters),
        filteredCharacters: filterCharacters(setCharacterFavoriteProperty(action.characters)),
        charactersInfo: getAllCharactersInfo(action.characters),
      };
    case ActionType.FILTER_CHARACTERS:
      return {
        ...state,
        filteredCharacters: state.isOnlyFavorite ? filterCharacters(state.filteredCharacters, action.payload) : filterCharacters(state.characters, action.payload),
        pageNumber: initialState.pageNumber,
      };
    case ActionType.RESET_FILTER:
      return {
        ...state,
        filteredCharacters: filterCharacters(state.characters),
        pageNumber: initialState.pageNumber,
        isOnlyFavorite: false,
      };
    case ActionType.SET_FAVORITE_CHARACTER:
      return {
        ...state,
        characters: updateCharacters(state.characters, action.favoriteCharacter),
        filteredCharacters: updateCharacters(state.filteredCharacters, action.favoriteCharacter),
        backUpFilteredCharacters: state.backUpFilteredCharacters.length ? updateCharacters(state.backUpFilteredCharacters, action.favoriteCharacter) : [],
      };
    case ActionType.SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    case ActionType.SET_ONLY_FAVORITE:
      return {
        ...state,
        backUpFilteredCharacters: state.filteredCharacters,
        filteredCharacters: filterOnlyFavoriteCharacters(state.filteredCharacters),
        pageNumber: initialState.pageNumber,
        isOnlyFavorite: action.payload,
      };
    case ActionType.RESET_ONLY_FAVORITE:
      return {
        ...state,
        filteredCharacters: state.backUpFilteredCharacters,
        pageNumber: initialState.pageNumber,
        isOnlyFavorite: action.payload,
      };
    case ActionType.DELETE_CHARACTER:
      return {
        ...state,
        filteredCharacters: deleteCharacter(state.filteredCharacters, action.deletedCharacterId),
        characters: deleteCharacter(state.characters, action.deletedCharacterId),
        backUpFilteredCharacters: state.backUpFilteredCharacters.length ? deleteCharacter(state.backUpFilteredCharacters, action.deletedCharacterId) : [],
      };
    default:
      return state;
  }
};

export {reducer};
