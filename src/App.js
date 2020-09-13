import React, { Fragment, useEffect, useRef } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from './pages/landing-page/landing-page.component';
import NotFoundPage from './pages/not-found-page/not-found-page.component';
import SignUpPage from './pages/sign-up-page/sign-up-page.component';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page.component';
import HomePage from './pages/home-page/home-page.component';
import AccountPage from './pages/account-page/account-page.component';
import AdminPage from './pages/admin-page/admin-page.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';

import Navigation from './components/navigation/navigation.component';
import CustomLoader from './components/custom-loader/custom-loader.component';
import PrivateRoute from './components/private-route/private-route.component';
import CustomRoute from './components/custom-route/custom-route.component';

import * as ROUTES from './constants/routes';

import { checkUserSessionStart } from './redux/user/user.actions';

const App = ({ currentUser, checkUserSessionStart, isLoading }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      checkUserSessionStart();
      isMounted.current = true;
    }
  }, [checkUserSessionStart]);

  return isMounted.current && !isLoading ?
    (
      <Fragment>
      {
          <div>
            <Navigation />
            <hr />
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <CustomRoute
                exact
                path='/sign-in'
                condition={currentUser}
                redirectTo={ROUTES.HOME}
                redirectPage={HomePage}
                routePath={ROUTES.SIGN_IN}
                routePage={SignInAndSignUpPage} 
              />
              <CustomRoute
                exact
                path='/sign-up'
                condition={currentUser}
                redirectTo={ROUTES.HOME}
                redirectPage={HomePage}
                routePath={ROUTES.SIGN_UP}
                routePage={SignUpPage} 
              />
              <CustomRoute
                exact
                path='/forgot-password' 
                condition={currentUser}
                redirectTo={ROUTES.HOME}
                redirectPage={HomePage}
                routePath={ROUTES.FORGOT_PASSWORD}
                routePage={ForgotPasswordPage} 
              />
              <PrivateRoute 
                exact
                path='/home' 
                condition={currentUser}
                component={HomePage}
              />
              <PrivateRoute 
                exact
                path='/account' 
                condition={currentUser}
                component={AccountPage}
              />
              <PrivateRoute 
                exact
                path='/admin' 
                condition={currentUser}
                component={AdminPage}
              />
              <Route
                path='/*' 
                component={NotFoundPage}
              />
            </Switch>
          </div>
      }
      </Fragment>
    )
  :
    <CustomLoader />
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSessionStart: () => dispatch(checkUserSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
