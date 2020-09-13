import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const CustomRoute = ({path, condition, redirectTo, redirectPage, routePath, routePage}) => (
  <Route
    path={path} 
    render={() => 
      condition ? (
        <Redirect 
          to={redirectTo} 
          component={redirectPage} 
        /> 
      ) : (
        <Route 
          path={routePath} 
          component={routePage} 
        />
      )
    } 
  />
)

export default CustomRoute;
