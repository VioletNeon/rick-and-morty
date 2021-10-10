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
  const {characters, charactersInfo, onFilterButtonClick, onFilterResetButtonClick} = props;

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
            />
        }
        {
          characters.length ?
            <Characters
              loadedCharacters={characters}
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
});

const mapDispatchToProps = (dispatch) => ({
  onFilterButtonClick(filterParameters) {
    dispatch(ActionCreator.filterCharacters(filterParameters));
  },
  onFilterResetButtonClick() {
    dispatch(ActionCreator.resetFilter());
  },
});

Main.propTypes = {
  characters: PropTypes.array.isRequired,
  charactersInfo: PropTypes.object.isRequired,
  onFilterButtonClick: PropTypes.func.isRequired,
  onFilterResetButtonClick: PropTypes.func.isRequired,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
