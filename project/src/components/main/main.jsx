import React from 'react';
import {ActionCreator} from '../../store/action';
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from '../filter/filter';
import Characters from '../characters/characters';
import LoadingScreen from '../loading-screen/loading-screen';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function Main(props) {
  const {
    characters,
    charactersInfo,
    deleteCharacter,
    onFilterButtonClick,
    onFilterResetButtonClick,
    onFavoriteButtonClick,
    onFilterFavoriteButtonClick,
    pageNumber,
    setPageNumber,
    isOnlyFavorite,
  } = props;

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
              setPageNumber={setPageNumber}
              deleteCharacter={deleteCharacter}
            /> :
            <LoadingScreen/>
        }
      </main>
      <Footer/>
    </>
  );
}

const mapStateToProps = (state) => ({
  characters: state.filteredCharacters,
  charactersInfo: state.charactersInfo,
  pageNumber: state.pageNumber,
  isOnlyFavorite: state.isOnlyFavorite,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterButtonClick(filterParameters) {
    dispatch(ActionCreator.filterCharacters(filterParameters));
  },
  onFilterResetButtonClick() {
    dispatch(ActionCreator.resetFilter());
  },
  onFavoriteButtonClick(favoriteCharacter) {
    dispatch(ActionCreator.setFavoriteCharacter(favoriteCharacter));
  },
  setPageNumber(pageNumber) {
    dispatch(ActionCreator.setPageNumber(pageNumber));
  },
  onFilterFavoriteButtonClick(isOnlyFavorite) {
    isOnlyFavorite ?
      dispatch(ActionCreator.setOnlyFavorite(isOnlyFavorite)) :
      dispatch(ActionCreator.resetOnlyFavorite(isOnlyFavorite));
  },
  deleteCharacter(deletedCharacterId) {
    dispatch(ActionCreator.deleteCharacter(deletedCharacterId));
  },
});

Main.propTypes = {
  characters: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  charactersInfo: PropTypes.object.isRequired,
  onFilterButtonClick: PropTypes.func.isRequired,
  onFilterResetButtonClick: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  deleteCharacter: PropTypes.func.isRequired,
  onFilterFavoriteButtonClick: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  isOnlyFavorite: PropTypes.bool.isRequired,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
