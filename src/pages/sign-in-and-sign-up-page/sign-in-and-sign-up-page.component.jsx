import React from 'react';

import SignInPage from './../sign-in-page/sign-in-page.component';
import SignUpLink from './../../components/sign-up-link/sign-up-link.component';

import './sign-in-and-sign-up-page.styles.scss';

const SignInAndSignUpPage = () => (
  <div className="modal-content-wrapper">
    <div className="login-header">
    Log In to Your Native Talk Account!
    </div>
    <SignInPage />
    <SignUpLink />
  </div>
)

export default SignInAndSignUpPage;