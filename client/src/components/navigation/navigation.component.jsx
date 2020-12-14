import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROUTES from './../../constants/routes';
import * as ROLES from './../../constants/roles';
import SignOutButton from './../sign-out/sign-out.component';

import { currentUser } from './../../redux/user/user.selectors';

import './navigation.styles.scss';

const Navigation = ({ currentUser }) => {
  const [isChecked, setIsChecked] = useState(false);

  const clickHandler = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div className='header'>
      <div className='header-mobile'>
        <div className='header-row'>
          <button className="udlite-btn-icon-large" type="button" onClick={clickHandler} style={{border: 'none', backgroundColor: 'transparent'}}>
            <svg id="icon-menu" className='udlite-icon-medium' viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
          </button>
          <div className='header-row header-middle'><Link to={ROUTES.LANDING} className='logo'>Native Talk</Link></div>
        </div>
      </div>
      <div className="side-drawer--dialog-container">
        <span className="full-page-overlay-checkbox side-drawer--main-drawer-checkbox" data-checked={isChecked}></span>
        <div role="presentation" className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md full-page-overlay--full-page-overlay"></div>
        <span className="js-drawer-radio side-drawer--drawer-radio" data-checked={isChecked} style={{display: 'none'}}></span>
        <div className="js-drawer side-drawer--side-drawer side-drawer--side-left" role="dialog" tabIndex="-1">
          <nav className="side-drawer--drawer-container">
            <div className="mobile-nav--nav side-drawer--drawer-content">
              <ul className="unstyled-list udlite-block-list mobile-nav--nav-section">
                {
                  !currentUser && (
                    <Fragment>
                      <li>
                        <Link to={ROUTES.SIGN_IN} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                          <span className="udlite-block-list-item-content">Log in</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={ROUTES.SIGN_UP} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                          <span className="udlite-block-list-item-content">Sign up</span>
                        </Link>
                      </li>
                    </Fragment>
                  )
                }
                {
                  currentUser && (
                    <li>
                      <SignOutButton />
                    </li>
                  )
                }
              </ul>
              <div className="udlite-heading-sm mobile-nav--nav-section-heading"></div>
              <ul className="unstyled-list udlite-block-list mobile-nav--nav-section">
                <li>
                  <Link to={ROUTES.COURSES} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                    <span className="udlite-block-list-item-content">Courses</span>
                  </Link>
                </li>
                {
                  currentUser && 
                  (
                    <Fragment>
                      <li>
                        <Link to={ROUTES.LANDING} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                          <span className="udlite-block-list-item-content">Landing</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={ROUTES.HOME} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                          <span className="udlite-block-list-item-content">Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={ROUTES.ACCOUNT} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                          <span className="udlite-block-list-item-content">Account</span>
                        </Link>
                      </li>
                    </Fragment>
                  )
                }
                {
                  currentUser && 
                  currentUser.role === ROLES.ADMIN && 
                  (
                    <li>
                      <Link to={ROUTES.ADMIN} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                        <span className="udlite-block-list-item-content">Admin</span>
                      </Link>
                    </li>
                  )
                }
                {
                  currentUser && 
                  currentUser.role === ROLES.INSTRUCTOR && 
                  (
                    <li>
                      <Link to={ROUTES.INSTRUCTOR} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                        <span className="udlite-block-list-item-content">Instructor</span>
                      </Link>
                    </li>
                  )
                }
                {
                  currentUser && 
                  currentUser.role !== ROLES.ADMIN && 
                  currentUser.role !== ROLES.INSTRUCTOR && 
                  (
                    <li>
                      <Link to={ROUTES.STUDENT} onClick={clickHandler} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
                        <span className="udlite-block-list-item-content">Student</span>
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          </nav>
          <button type="button" className="udlite-btn udlite-btn-large udlite-btn-secondary udlite-btn-round udlite-heading-md udlite-btn-icon udlite-btn-icon-large udlite-btn-icon-round side-drawer--close-btn close-button--close-btn" onClick={clickHandler}>
            <svg className='udlite-icon-color-neutral' viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='nav-container'>
        <Link to={ROUTES.LANDING} className='logo'>Native Talk</Link>
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
  )
}
 
const AdminNavigation = () => (
  <ul className="unstyled-list udlite-block-list d-flex">
    <li>
      <Link to={ROUTES.LANDING} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Landing</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.HOME} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Home</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Account</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Admin</span>
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const InstructorNavigation = () => (
  <ul className="unstyled-list udlite-block-list d-flex">
    <li>
      <Link to={ROUTES.LANDING} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Landing</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.HOME} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Home</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Account</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.INSTRUCTOR} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Instructor</span>
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const StudentNavigation = () => (
  <ul className="unstyled-list udlite-block-list d-flex">
    <li>
      <Link to={ROUTES.LANDING} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Landing</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.HOME} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Home</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Account</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.COURSES} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Courses</span>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.STUDENT} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
        <span className="udlite-block-list-item-content">Student</span>
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <div className='nav-sub-container'>
    <div className='header-gap'>
      <Link to={ROUTES.COURSES} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link"><span className="udlite-block-list-item-content">Courses</span></Link>
    </div>
    <div className='header-gap'>
      <Link to={ROUTES.SIGN_IN} className='nav-btn btn-medium nav-btn-secondary heading-sm'><span>Sign In</span></Link>
    </div>
    <div className='header-gap'>
      <Link to={ROUTES.SIGN_UP} className='nav-btn btn-medium nav-btn-primary heading-sm'><span>Sign Up</span></Link>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(Navigation);
