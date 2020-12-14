import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import * as ROUTES from './../../constants/routes';

const PrivateRoute = ({ component: Component, condition, ...rest }) => (
  <Route 
    {...rest} 
    render={() => (
      condition ? (
        <Component />
      ) : (
        <Redirect to={ROUTES.SIGN_IN} />
      )
    )} 
  />
)

export default PrivateRoute;
