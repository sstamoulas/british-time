import React from 'react';

import SignInPage from './../sign-in-page/sign-in-page.component';
import SignUpLink from './../../components/sign-up-link/sign-up-link.component';
import ForgotPasswordLink from './../../components/forgot-password-link/forgot-password-link.component';

const SignInAndSignUpPage = () => (
  <div>
    <SignInPage />
    <ForgotPasswordLink />
    <SignUpLink />
  </div>
)

export default SignInAndSignUpPage;