import React, { useEffect, useRef } from 'react';
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
      <div>
        <Navigation />
        <hr />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <CustomRoute
            exact
            path={ROUTES.SIGN_IN}
            condition={currentUser}
            component={SignInAndSignUpPage} 
          />
          <CustomRoute
            exact
            path={ROUTES.SIGN_UP}
            condition={currentUser}
            component={SignUpPage} 
          />
          <CustomRoute
            exact
            path={ROUTES.FORGOT_PASSWORD}
            condition={currentUser}
            component={ForgotPasswordPage} 
          />
          <PrivateRoute 
            exact
            path={ROUTES.HOME} 
            condition={currentUser}
            component={HomePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.ACCOUNT}
            condition={currentUser}
            component={AccountPage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.ADMIN}
            condition={currentUser}
            component={AdminPage}
          />
          <Route
            path='/*' 
            component={NotFoundPage}
          />
        </Switch>
      </div>
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
