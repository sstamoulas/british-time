import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import LocaleSelect from './../locale-select/locale-select.component';

import * as ROUTES from './../../constants/routes';

import { isSubLoading } from './../../redux/ui/ui.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './footer.styles.scss';

const Footer = ({ currentUser, isSubLoading }) => {
  const dt = new Date();
  const currentYear = dt.getFullYear();

  return !isSubLoading ? (
      <footer className="udlite-footer ud-app-loader udlite-in-udheavy ud-app-loaded">
        <div className="footer-section footer-section-main">
          <div className="links">
            <LocaleSelect />
            <ul className="unstyled-list link-column">
              <li>
                <Link to={ROUTES.TEACHING} className="link udlite-text-sm">
                Teach on Native Talk
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT_US} className="link udlite-text-sm">
                About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT_US} className="link udlite-text-sm">
                Contact Us
                </Link>
              </li>
            </ul>
            <ul className="unstyled-list link-column">
              <li>
                <Link to={ROUTES.TERMS} className="link udlite-text-sm">
                Terms
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRIVACY_POLICY} className="link udlite-text-sm">
                Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COURSES} className="link udlite-text-sm">
                Featured Courses
                </Link>
              </li>
            </ul>
          </div>
          <div className="logo-and-copyright">
            <div className="logo-container">
              <Link to={ROUTES.LANDING} className='logo'>Native Talk</Link>
            </div>
            <div className="copyright-container udlite-text-xs">© {currentYear} Native Talk, Inc.</div>
          </div>
        </div>
      </footer>
    )
  :
    null
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  isSubLoading: isSubLoading,
});

export default connect(mapStateToProps)(Footer);
