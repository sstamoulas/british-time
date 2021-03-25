import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentUser } from './../../redux/user/user.selectors';

import './home-page.styles.scss';
 
const HomePage = ({ currentUser }) => (
  <div className="ud-component--logged-in-home--billboard">
    <div data-purpose="billboard" className="billboard--billboard--3-fQr">
      <div className="billboard--image-container--2JRqQ">
        <img src="https://img-b.udemycdn.com/notices/featured_banner/image_udlite/d529581a-6f94-45ee-bb32-80f53a3320d3.jpg?secure=9CZUX3Fw1EBNKLG6GeETXg%3D%3D%2C1607715996" width="1340" height="400" alt="" />
      </div>
      <div className="billboard--content-box--JtXUJ">
        <h1 className="udlite-heading-xxl" data-purpose="safely-set-inner-html:billboard:title">Bit by bit</h1>
        <p className="udlite-text-md" data-purpose="safely-set-inner-html:billboard:subtitle">Learn for an hour and develop new skills. Courses from ₺27.99 through Dec. 11.</p>
      </div>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(HomePage);