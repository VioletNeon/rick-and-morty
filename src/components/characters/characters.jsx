import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Character from '../character/character';

const SCREEN_CHARACTERS_COUNT = 10;
const INITIAL_CHARACTERS_COUNT = 0;
const PAGE_FACTOR = 2;

function Characters({loadedCharacters, loadedCharactersCount}) {
  if (!loadedCharacters.length) {return <p className="page-main__empty-list">Requested list is empty. Try another filter...</p>;}
  const [pageNumber, setPageNumber] = useState(SCREEN_CHARACTERS_COUNT);
  const [allCharacters, setAllCharacters] = useState(loadedCharacters.slice(INITIAL_CHARACTERS_COUNT, SCREEN_CHARACTERS_COUNT));

  const handlePageButtonClick = (evt) => {
    let nextPageCount;
    let newPageCharacters;
    if (evt.target.value === 'next' && pageNumber < loadedCharactersCount) {
      nextPageCount = pageNumber + SCREEN_CHARACTERS_COUNT;
      newPageCharacters = loadedCharacters.slice(pageNumber, nextPageCount);
      setAllCharacters(newPageCharacters);
      setPageNumber(nextPageCount);
    } else if (evt.target.value === 'previous' && pageNumber >= (PAGE_FACTOR * SCREEN_CHARACTERS_COUNT)) {
      nextPageCount = pageNumber - (PAGE_FACTOR * SCREEN_CHARACTERS_COUNT);
      newPageCharacters = loadedCharacters.slice(nextPageCount, pageNumber - SCREEN_CHARACTERS_COUNT);
      setAllCharacters(newPageCharacters);
      setPageNumber(nextPageCount + SCREEN_CHARACTERS_COUNT);
    }
  };

  return (
    <section className="characters">
      <h2 className="visually-hidden">Characters</h2>
      <div className="characters__wrapper">
        <ul className="characters__list">
          {allCharacters.map((character) => <Character character={character} key={character.id}/>)}
        </ul>
      </div>
      <div className="characters__button-wrapper">
        <button
          className="characters__button"
          onClick={handlePageButtonClick}
          disabled={pageNumber <= SCREEN_CHARACTERS_COUNT}
          value="previous"
        >
          previous page
        </button>
        <button
          className="characters__button"
          onClick={handlePageButtonClick}
          value="next"
          disabled={pageNumber >= loadedCharactersCount}
        >
          next page
        </button>
      </div>
    </section>
  )
}

Characters.propTypes = {
  loadedCharacters: PropTypes.array.isRequired,
  loadedCharactersCount: PropTypes.number.isRequired,
};


export default Characters;
