const ActionType = {
  LOAD_CHARACTERS: 'loadCharacters',
  FILTER_CHARACTERS: 'filterCharacters',
  RESET_FILTER: 'resetFilter',
};

const ActionCreator = {
  loadCharacters: (characters) => ({
    type: ActionType.LOAD_CHARACTERS,
    characters,
  }),
  filterCharacters: (payload) => ({
    type: ActionType.FILTER_CHARACTERS,
    payload,
  }),
  resetFilter: () => ({
    type: ActionType.RESET_FILTER,
  }),
};

export {ActionType, ActionCreator};
