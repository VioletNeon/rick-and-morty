const AppRoute = {
  LOGIN: '/login',
  ROOM: '/hotels/:id',
  FAVORITES: '/favorites',
  MAIN: '/',
  BAD_REQUEST: '/not-found',
};

const Cities = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

const APIRoute = {
  HOTELS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  COMMENTS: '/comments/',
  FAVORITE: '/favorite',
};

export {AppRoute, Cities, AuthorizationStatus, APIRoute};
