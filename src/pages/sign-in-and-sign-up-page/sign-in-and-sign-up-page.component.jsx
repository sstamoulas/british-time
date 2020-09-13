import React from 'react';
import { connect } from 'react-redux';

import SignInPage from './../sign-in-page/sign-in-page.component';
import SignUpLink from './../../components/sign-up-link/sign-up-link.component';
import ForgotPasswordLink from './../../components/forgot-password-link/forgot-password-link.component';

const SignInAndSignUpPage = ({ currentUser }) => (
  <div>
    <SignInPage />
    <ForgotPasswordLink />
    <SignUpLink />
  </div>
)

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(SignInAndSignUpPage);