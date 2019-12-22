import React, { Component, Suspense } from 'react';
import { Router, Route } from 'react-router-dom';
const history = require('history').createBrowserHistory();
class RouteCompo extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={() => <p>Loding....</p>}>
          <Router history={history}>
            <Route
              exact
              path="/"
              component={React.lazy(() => import('./App'))}
            />
            <Route
              path="/nodata"
              component={React.lazy(() => {
                import('./components/NoData');
              })}
            />
            <Route
              path="/showdata"
              component={React.lazy(() => {
                import('./components/ShowMsg');
              })}
            />
          </Router>
        </Suspense>
      </div>
    );
  }
}

export default RouteCompo;
