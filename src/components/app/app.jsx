import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../main/main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <Main/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
