import React from 'react';

import './student-course-navigation.styles.scss';

const StudentCourseNavigation = ({ activeTab, isSidebarVisible, hasLiveSession, openLiveSession, handleClick }) => (
  <div className="tabs--tabs-nav-buttons--1S7wK" role="tablist" data-purpose="tab-nav-buttons">
     <div className="carousel--container--22Ab7">
        <div id="scroll-port--2" aria-live="polite" className="carousel--scroll-port--2O41b carousel--grid--2dzpP">
           <div data-index="1" className="carousel--scroll-item--3Wciz" style={{display: `${isSidebarVisible ? 'none' : ''}`}}>
              <div className={`tabs--nav-button-container--P4D9D ${activeTab === 'Course Content' && 'tabs--active--2rPuV'}`}><button type="button" id="tabs--1-tab-1" aria-selected="true" role="tab" tabIndex="0" className={`udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_ ${activeTab === 'Course Content' && 'tabs--active--2rPuV'}`} onClick={handleClick}><span>Course Content</span></button></div>
           </div>
           <div data-index="1" className="carousel--scroll-item--3Wciz">
              <div className={`tabs--nav-button-container--P4D9D ${(activeTab === 'Overview' || (activeTab === 'Course Content' && isSidebarVisible)) && 'tabs--active--2rPuV'}`}><button type="button" id="tabs--1-tab-1" aria-selected="true" role="tab" tabIndex="0" className={`udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_ ${activeTab === 'Overview' && 'tabs--active--2rPuV'}`} onClick={handleClick}><span>Overview</span></button></div>
           </div>
           <div data-index="4" className="carousel--scroll-item--3Wciz">
              <div className={`tabs--nav-button-container--P4D9D ${activeTab === 'Announcements' && 'tabs--active--2rPuV'}`}><button type="button" id="tabs--1-tab-4" aria-selected="false" role="tab" tabIndex="-1" className={`udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_ ${activeTab === 'Announcements' && 'tabs--active--2rPuV'}`} onClick={handleClick}><span>Announcements</span></button></div>
           </div>
           <div data-index="4" className="carousel--scroll-item--3Wciz" style={{display: `${!hasLiveSession ? 'none' : ''}`}}>
              <div className="tabs--nav-button-container--P4D9D"><button type="button" id="tabs--1-tab-4" aria-selected="false" role="tab" tabIndex="-1" className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_" onClick={openLiveSession}><span>Join Live Session</span></button></div>
           </div>
        </div>
     </div>
  </div>
);

export default StudentCourseNavigation;
