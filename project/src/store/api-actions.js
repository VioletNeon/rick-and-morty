import {ActionCreator} from './action';

const CHARACTERS_PAGE_LIST_LENGTH = 34;

const loadCharactersList = () => (dispatch, _getState, api) => (
  api(CHARACTERS_PAGE_LIST_LENGTH).then((characters) => {
    dispatch(ActionCreator.loadCharacters(characters));
  })
);

export {loadCharactersList};
