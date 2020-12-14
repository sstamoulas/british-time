
import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import './sign-up-link.styles.scss';
 
const SignUpLink = () => (
  <div className="sign-in-footer">
    Don't have an account?&nbsp;
    <Link to={ROUTES.SIGN_UP} className="sign-up-link">Sign Up</Link>
  </div>
);
 
export default SignUpLink;
