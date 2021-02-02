import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';

function Routes() {
  <Router>
    <Suspense
      fallback={
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      }
    ></Suspense>
  </Router>;
}

export default Routes;
