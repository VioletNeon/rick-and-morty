import React, {useState, useEffect} from 'react';
import {getCharacters} from 'rickmortyapi';
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from '../filter/filter';
import Characters from '../characters/characters';
import LoadingScreen from '../loading-screen/loading-screen';

const CHARACTERS_PAGE_LIST_LENGTH = 34;
const MAX_CHARACTERS_COUNT = 680;

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

function Main() {
  const [loadedCharacters, setLoadedCharacters] = useState(null);
  const [filterParameters, setFilterParameters] = useState(null);
  const [loadedCharactersCount, setLoadedCharactersCount] = useState(MAX_CHARACTERS_COUNT);

  const loadAllCharacters = async (pagesCount) => {
    const requests = Array.from(Array(pagesCount).keys()).map((item) => getCharacters({page: item + 1}));
    const allCharacters = await Promise.all(requests);
    setLoadedCharactersCount(MAX_CHARACTERS_COUNT);
    return allCharacters.map((item) => item.data.results).flat(1);
  };

  const loadFilteredCharacters = async (newFilterParameters) => {
    const request = await getCharacters(newFilterParameters);
    if (request.status === 404) {return [];}
    const charactersCount = request.data.info.count;
    setLoadedCharactersCount(charactersCount);
    const charactersPageListLength = request.data.info.pages;
    const filteredCharacters = [...request.data.results];
    if (charactersPageListLength > 1) {
      const requests = Array.from(Array(charactersPageListLength - 1).keys()).map((item) => getCharacters(Object.assign({page: item + 2}, filterParameters)));
      const allCharacters = await Promise.all(requests);
      return [...filteredCharacters, ...allCharacters.map((item) => item.data.results).flat(1)];
    }
    return filteredCharacters;
  };

  const onFilterButtonClick = (newParameters) => {
    loadFilteredCharacters(newParameters).then((characters) => {
      setLoadedCharacters(null);
      setLoadedCharacters(characters);
    });
  };

  const onFilterResetButtonClick = () => {
    loadAllCharacters(CHARACTERS_PAGE_LIST_LENGTH).then((characters) => {
      setLoadedCharacters(null);
      setLoadedCharacters(characters);
    });
  };

  useEffect(() => {
    loadAllCharacters(CHARACTERS_PAGE_LIST_LENGTH).then((characters) => {
      setFilterParameters(getAllCharactersInfo(characters));
      setLoadedCharacters(characters);
    });
  }, []);

  return (
    <>
      <Header/>
      <main className="page-main">
        <h1 className="page-main__title">Characters of &quot;The Rick and Morty&quot;</h1>
        {
          filterParameters &&
            <Filter
              allCharactersInfo={filterParameters}
              onFilterButtonClick={onFilterButtonClick}
              onFilterResetButtonClick={onFilterResetButtonClick}
            />
        }
        {
          loadedCharacters ?
            <Characters
              loadedCharacters={loadedCharacters}
              loadedCharactersCount={loadedCharactersCount}
            /> :
            <LoadingScreen/>
        }
      </main>
      <Footer/>
    </>
  );
}

export default Main;
