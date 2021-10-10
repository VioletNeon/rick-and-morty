const selectCharacters = (state) => state.filteredCharacters;
const selectCharactersInfo = (state) => state.charactersInfo;
const selectPageNumber = (state) => state.pageNumber;
const selectIsOnlyFavorites = (state) => state.isOnlyFavorite;

export {
  selectCharacters,
  selectCharactersInfo,
  selectPageNumber,
  selectIsOnlyFavorites
};
