import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, condition, ...rest }) => (
  <Route 
    {...rest} 
    render={() => (
      condition ? (
        <Component />
      ) : (
        <Redirect to='/sign-in' />
      )
    )} 
  />
)

export default PrivateRoute;
