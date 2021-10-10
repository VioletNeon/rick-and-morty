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

const ActionCreator = {
  loadCharacters: (characters) => ({
    type: ActionType.LOAD_CHARACTERS,
    characters,
  }),
  filterCharacters: (payload) => ({
    type: ActionType.FILTER_CHARACTERS,
    payload,
  }),
  resetFilter: () => ({
    type: ActionType.RESET_FILTER,
  }),
  setFavoriteCharacter: (favoriteCharacter) => ({
    type: ActionType.SET_FAVORITE_CHARACTER,
    favoriteCharacter: favoriteCharacter,
  }),
  setPageNumber: (pageNumber) => ({
    type: ActionType.SET_PAGE_NUMBER,
    pageNumber,
  }),
  setOnlyFavorite: (isOnlyFavorite) => ({
    type: ActionType.SET_ONLY_FAVORITE,
    payload: isOnlyFavorite,
  }),
  resetOnlyFavorite: (isOnlyFavorite) => ({
    type: ActionType.RESET_ONLY_FAVORITE,
    payload: isOnlyFavorite,
  }),
  deleteCharacter: (deletedCharacterId) => ({
    type: ActionType.DELETE_CHARACTER,
    deletedCharacterId,
  }),
};

export {ActionType, ActionCreator};
