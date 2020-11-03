import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROUTES from './../../constants/routes';
import * as ROLES from './../../constants/roles';
import SignOutButton from './../sign-out/sign-out.component';

import { currentUser } from './../../redux/user/user.selectors';

import './navigation.styles.scss';

const Navigation = ({ currentUser }) => (
  <div className='header'>
    <div className='container'>
      <Link to={ROUTES.LANDING} className='logo'>
        Native Talk
      </Link>
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
  <div className='sub-container'>
    <div className='header-gap'>
      <Link to={ROUTES.SIGN_IN} className='btn btn-medium btn-secondary heading-sm'><span>Log In</span></Link>
    </div>
    <div className='header-gap'>
      <Link to={ROUTES.SIGN_UP} className='btn btn-medium btn-primary heading-sm'><span>Sign Up</span></Link>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(Navigation);
