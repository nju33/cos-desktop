import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import FinderPage from './containers/FinderPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FinderPage} />
  </Route>
);
