import React from 'react';

import SignUp from './../../components/sign-up/sign-up.component';
import SignInLink from './../../components/sign-in-link/sign-in-link.component';

import './sign-up-page.styles.scss';

const SignUpPage = () => (
  <div className="modal-content-wrapper">
    <div className="signup-header">
    Sign Up and Start Learning!
    </div>
    <SignUp />
    <SignInLink />
  </div>
)

export default SignUpPage;