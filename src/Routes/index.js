import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';

const Auth = lazy(() => import('../pages/Auth'));
const Register = lazy(() => import('../pages/Register'));
const Vehicles = lazy(() => import('../pages/Vehicles'));
const VehiclesManage = lazy(() => import('../pages/VehiclesManage'));
const Pay = lazy(() => import('../pages/Pay'));

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
          <Route path="/pay" component={Pay} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route path="/vehicles/create" component={VehiclesManage} />
          <Route path="/vehicles/:id/edit" component={VehiclesManage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
