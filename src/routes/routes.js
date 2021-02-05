import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';

import Auth from '../auth';

function Routes() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/login" component={Auth} />
          <Route path="/vehicles" component={() => <h1>Veículos</h1>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
