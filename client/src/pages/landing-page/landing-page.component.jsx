import React from 'react';

import hero from'./../../assets/images/hero.webp';

import './landing-page.styles.scss';
 
const LandingPage = () => (
  <div>
    <div className="ud-component--logged-in-home--billboard">
      <div data-purpose="billboard" className="billboard--billboard--3-fQr">
        <div className="billboard--image-container--2JRqQ">
          <img src={hero} width="1340" height="100" alt="" />
        </div>
        <div className="billboard--content-box--JtXUJ">
          <h1 className="udlite-heading-xxl" data-purpose="safely-set-inner-html:billboard:title">Bit by bit</h1>
          <p className="udlite-text-md" data-purpose="safely-set-inner-html:billboard:subtitle">Learn for an hour and develop new skills. Courses from ₺27.99 through Dec. 11.</p>
        </div>
      </div>
    </div>
  </div>
);
 
export default LandingPage;
