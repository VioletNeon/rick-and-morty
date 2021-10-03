import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../main/main';
import {AppRoute} from '../../const';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.BAD_REQUEST}>

        </Route>
        <Route>

        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
