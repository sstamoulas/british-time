import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import * as ROUTES from './../../constants/routes';

const CustomRoute = ({ component: Component, condition, ...rest }) => (
  <Route 
    {...rest} 
    render={() => (
      condition ? (
        <Redirect to={ROUTES.HOME} />
      ) : (
        <Component />
      )
    )} 
  />
)



export default CustomRoute;
