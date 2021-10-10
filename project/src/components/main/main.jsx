import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from '../filter/filter';
import Characters from '../characters/characters';
import LoadingScreen from '../loading-screen/loading-screen';
import {
  filterCharacters,
  resetFilter,
  setFavoriteCharacter,
  setPageNumber,
  setOnlyFavorite,
  resetOnlyFavorite,
  deleteCharacter} from '../../store/action';
import {
  selectCharactersInfo,
  selectIsOnlyFavorites,
  selectPageNumber,
  selectCharacters
} from '../../store/selectors';

function Main() {
  const characters = useSelector(selectCharacters);
  const charactersInfo = useSelector(selectCharactersInfo);
  const pageNumber = useSelector(selectPageNumber);
  const isOnlyFavorite = useSelector(selectIsOnlyFavorites);

  const dispatch = useDispatch();

  const onFilterButtonClick = (filterParameters) => {
    dispatch(filterCharacters(filterParameters));
  };

  const onFilterResetButtonClick = () => {
    dispatch(resetFilter());
  };

  const onFavoriteButtonClick = (favoriteCharacter) => {
    dispatch(setFavoriteCharacter(favoriteCharacter));
  };

  const setNewPageNumber = (number) => {
    dispatch(setPageNumber(number));
  };

  const onFilterFavoriteButtonClick = (isFavorite) => {
    isFavorite ?
      dispatch(setOnlyFavorite(isFavorite)) :
      dispatch(resetOnlyFavorite(isFavorite));
  };

  const deleteCharacterCard = (deletedCharacterId) => {
    dispatch(deleteCharacter(deletedCharacterId));
  };

  return (
    <>
      <Header/>
      <main className="page-main">
        <h1 className="page-main__title">Characters of &quot;The Rick and Morty&quot;</h1>
        {
          Object.keys(charactersInfo).length &&
            <Filter
              charactersInfo={charactersInfo}
              onFilterButtonClick={onFilterButtonClick}
              onFilterResetButtonClick={onFilterResetButtonClick}
              onFilterFavoriteButtonClick={onFilterFavoriteButtonClick}
              isOnlyFavorite={isOnlyFavorite}
            />
        }
        {
          characters ?
            <Characters
              loadedCharacters={characters}
              onFavoriteButtonClick={onFavoriteButtonClick}
              pageNumber={pageNumber}
              setPageNumber={setNewPageNumber}
              deleteCharacter={deleteCharacterCard}
            /> :
            <LoadingScreen/>
        }
      </main>
      <Footer/>
    </>
  );
}

export default Main;
