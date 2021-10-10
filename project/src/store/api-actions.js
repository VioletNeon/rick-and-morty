import {loadCharacters} from './action';

const CHARACTERS_PAGE_LIST_LENGTH = 34;

const loadCharactersList = () => (dispatch, _getState, api) => (
  api(CHARACTERS_PAGE_LIST_LENGTH).then((characters) => {
    dispatch(loadCharacters(characters));
  })
);

export {loadCharactersList};
