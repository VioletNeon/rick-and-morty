import React, {useState} from 'react';
import Character from '../character/character';

const SCREEN_CHARACTERS_COUNT = 10;
const INITIAL_CHARACTERS_COUNT = 0;
const PAGE_FACTOR = 2;

function Characters({loadedCharacters, loadedCharactersCount}) {
  if (!loadedCharacters.length) {return <p className="page-main__empty-list">Requested list is empty. Try another filter...</p>;}
  const [pageNumber, setPageNumber] = useState(SCREEN_CHARACTERS_COUNT);
  const [allCharacters, setAllCharacters] = useState(loadedCharacters.slice(INITIAL_CHARACTERS_COUNT, SCREEN_CHARACTERS_COUNT));

  const onPageButtonClick = (evt) => {
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
      <div className="popup">
        <img className="popup__image" src="https://rickandmortyapi.com/api/character/avatar/361.jpeg" alt="Character image" width="300" height="300"/>
        <ul className="popup__list">
          <li className="popup__item">
            <p className="popup__description">Rick from Earth</p>
          </li>
        </ul>
      </div>
      <div className="characters__button-wrapper">
        <button
          className="characters__button"
          onClick={onPageButtonClick}
          disabled={pageNumber <= SCREEN_CHARACTERS_COUNT}
          value="previous"
        >
          previous page
        </button>
        <button
          className="characters__button"
          onClick={onPageButtonClick}
          value="next"
          disabled={pageNumber >= loadedCharactersCount}
        >
          next page
        </button>
      </div>
    </section>
  )
}

export default Characters;
