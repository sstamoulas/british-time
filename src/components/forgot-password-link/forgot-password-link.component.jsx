import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
 
const ForgotPasswordLink = () => (
  <p>
    <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
  </p>
);
 
export default ForgotPasswordLink;