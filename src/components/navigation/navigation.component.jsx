import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ROUTES from './../../constants/routes';
import * as ROLES from './../../constants/roles';
import SignOutButton from './../sign-out/sign-out.component';

const Navigation = ({ currentUser }) => (
  <div>
    {
      currentUser ? 
        <NavigationAuth currentUser={currentUser} /> 
      : 
        <NavigationNonAuth />
    }
  </div>
);
 
const NavigationAuth = ({ currentUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!currentUser.roles && currentUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Navigation);
