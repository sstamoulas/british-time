
import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import './sign-in-link.styles.scss';
 
const SignInLink = () => (
  <div className="sign-up-footer">
    Already have an account?&nbsp;
    <Link to={ROUTES.SIGN_IN} className="sign-in-link">Sign In</Link>
  </div>
);
 
export default SignInLink;
