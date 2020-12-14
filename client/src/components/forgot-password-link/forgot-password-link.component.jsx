import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
 
const ForgotPasswordLink = () => (
  <Link to={ROUTES.FORGOT_PASSWORD} className="forgot-password-link">Forgot Password</Link>
);
 
export default ForgotPasswordLink;