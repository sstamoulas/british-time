import React from 'react';

import SignIn from './../../components/sign-in/sign-in.component';
import SignUpLink from './../../components/sign-up-link/sign-up-link.component';

import './sign-in-page.styles.scss';

const SignInPage = () => (
  <div className="modal-content-wrapper">
    <div className="signin-header">Sign In to Your Native Talk Account!</div>
    <SignIn />
    <SignUpLink />
  </div>
)

export default SignInPage;
