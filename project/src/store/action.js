const ActionType = {
  LOAD_CHARACTERS: 'loadCharacters',
  FILTER_CHARACTERS: 'filterCharacters',
  RESET_FILTER: 'resetFilter',
  SET_FAVORITE_CHARACTER: 'setFavoriteCharacters',
  SET_PAGE_NUMBER: 'setPageNumber',
  SET_ONLY_FAVORITE: 'setOnlyFavorite',
  RESET_ONLY_FAVORITE: 'resetOnlyFavorite',
  DELETE_CHARACTER: 'deleteCharacter',
};

const loadCharacters = (characters) => ({
  type: ActionType.LOAD_CHARACTERS,
  characters,
});

const filterCharacters = (payload) => ({
  type: ActionType.FILTER_CHARACTERS,
  payload,
});

const resetFilter = () => ({
  type: ActionType.RESET_FILTER,
});

const setFavoriteCharacter = (favoriteCharacter) => ({
  type: ActionType.SET_FAVORITE_CHARACTER,
  favoriteCharacter: favoriteCharacter,
});

const setPageNumber = (pageNumber) => ({
  type: ActionType.SET_PAGE_NUMBER,
  pageNumber,
});

const setOnlyFavorite = (isOnlyFavorite) => ({
  type: ActionType.SET_ONLY_FAVORITE,
  payload: isOnlyFavorite,
});

const resetOnlyFavorite = (isOnlyFavorite) => ({
  type: ActionType.RESET_ONLY_FAVORITE,
  payload: isOnlyFavorite,
});

const deleteCharacter = (deletedCharacterId) => ({
  type: ActionType.DELETE_CHARACTER,
  deletedCharacterId,
});

export {
  ActionType,
  loadCharacters,
  filterCharacters,
  resetFilter,
  setFavoriteCharacter,
  setPageNumber,
  setOnlyFavorite,
  resetOnlyFavorite,
  deleteCharacter
};
