import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROUTES from './../../constants/routes';
import * as ROLES from './../../constants/roles';
import SignOutButton from './../sign-out/sign-out.component';

import { currentUser } from './../../redux/user/user.selectors';

const Navigation = ({ currentUser }) => (
  <div>
    {
      currentUser ? 
        currentUser.role === ROLES.ADMIN ?
          <AdminNavigation /> 
        :
        currentUser.role === ROLES.INSTRUCTOR ?
          <InstructorNavigation /> 
        :
          <StudentNavigation /> 
      : 
        <NavigationNonAuth />
    }
  </div>
);
 
const AdminNavigation = () => (
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
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const InstructorNavigation = () => (
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
    <li>
      <Link to={ROUTES.INSTRUCTOR}>Instructor</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const StudentNavigation = () => (
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
    <li>
      <Link to={ROUTES.COURSES}>Courses</Link>
    </li>
    <li>
      <Link to={ROUTES.STUDENT}>Student</Link>
    </li>
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

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(Navigation);
