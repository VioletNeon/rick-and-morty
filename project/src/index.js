import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {reducer} from './store/reducer';
import {loadCharactersList} from './store/api-actions';
import {loadAllCharacters} from './services/api';

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(loadAllCharacters)),
);

store.dispatch(loadCharactersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
