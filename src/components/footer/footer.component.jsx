import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROUTES from './../../constants/routes';
import * as ROLES from './../../constants/roles';
import SignOutButton from './../sign-out/sign-out.component';

import { currentUser } from './../../redux/user/user.selectors';

import './footer.styles.scss';

const Footer = ({ currentUser }) => {
  const dt = new Date();
  const currentYear = dt.getFullYear();
  
  return (
    <footer className="udlite-footer ud-app-loader udlite-in-udheavy ud-app-loaded">
      <div className="footer-section footer-section-main">
        <div className="links">
          <ul className="unstyled-list link-column ">
            <li>
              <a className="link udlite-text-sm ud-ufb-notice-click-event">
              Udemy for Business
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Teach on Udemy
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Get the app
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              About us
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Contact us
              </a>
            </li>
          </ul>
          <ul className="unstyled-list link-column">
            <li>
              <a className="link udlite-text-sm">
              Careers
              </a>
            </li>

            <li>
              <a className="link udlite-text-sm">
              Blog
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Help and Support
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Affiliate
              </a>
            </li>
          </ul>
          <ul className="unstyled-list link-column ">
            <li>
              <a className="link udlite-text-sm">
              Terms
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Privacy policy and cookie policy
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Sitemap
              </a>
            </li>
            <li>
              <a className="link udlite-text-sm">
              Featured courses
              </a>
            </li>
          </ul>
          </div>
          <div className="logo-and-copyright">
            <div className="logo-container">
              <Link to={ROUTES.LANDING} className='logo'>Native Talk</Link>
            </div>
            <div className="copyright-container">© {currentYear} Native Talk, Inc.</div>
        </div>
      </div>


    </footer>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(Footer);
