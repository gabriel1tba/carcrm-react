import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';

const Auth = lazy(() => import('../pages/Auth'));
const Register = lazy(() => import('../pages/Register'));
const Vehicles = lazy(() => import('../pages/Vehicles'));
const ManageVehicles = lazy(() => import('../pages/ManageVehicles'));

const Routes = () => {
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
          <Route path="/register" component={Register} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route path="/vehicles/create" component={ManageVehicles} />
          <Route path="/vehicles/:id/edit" component={ManageVehicles} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
