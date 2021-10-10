import {getCharacters} from 'rickmortyapi';

const loadAllCharacters = async (pagesCount) => {
  const requests = Array.from(Array(pagesCount).keys()).map((item) => getCharacters({page: item + 1}));
  const allCharacters = await Promise.all(requests);

  return allCharacters.map((item) => item.data.results).flat(1);
};

export {loadAllCharacters};
