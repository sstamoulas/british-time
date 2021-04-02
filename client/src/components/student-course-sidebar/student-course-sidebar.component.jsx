import React, { useState, useEffect } from 'react';

import StudentCourseCurriculum from './../../components/student-course-curriculum/student-course-curriculum.component';

import './student-course-sidebar.styles.scss';

const StudentCourseSidebar = ({ activeTab, isSidebarVisible, setIsSidebarVisible, instructorLessons, loadNewContent }) => {
  const [sideBarTop, setSideBarTop] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', fixSideBarHeight);
    window.addEventListener('resize', fixSideBarHeight);
    window.addEventListener("resize", setCourseContentHeight);
    fixSideBarHeight();
    setCourseContentHeight();
 
    return () => {
      window.removeEventListener('scroll', fixSideBarHeight);
      window.removeEventListener('resize', fixSideBarHeight);
      window.removeEventListener('resize', setCourseContentHeight);
    };

    function fixSideBarHeight() {
      const header = document.querySelector('.header');

      // if the header is not visible then the sidebar should extend
      // to the top of the page
      if(header && window.scrollY >= header.getBoundingClientRect().height) {
        setSideBarTop(0);
      }
      // otherwise the top of the sidebar should not overlap the bottom of the 
      // header
      else if(header) {
        setSideBarTop(header.getBoundingClientRect().height - window.scrollY);
      }
    }

    function setCourseContentHeight() {
      const courseContentHeight = document.querySelector(".sidebar--content---4z0-");
      const header = document.querySelector('.header');
      
      if(courseContentHeight) {
        let heightHeader = header.getBoundingClientRect().height;
        let remainingHeight = (window.scrollY < heightHeader ? window.scrollY : heightHeader);
        courseContentHeight.style.height = `${window.innerHeight - 72 - 57 + remainingHeight}px`;
      }

      if(window.innerWidth < 992) {
        setIsSidebarVisible(false);
      }
      else {
        setIsSidebarVisible(true);
      }
    }
  }, [sideBarTop, isSidebarVisible, setIsSidebarVisible, activeTab]);

  return (
    <div className="app--sidebar-column--2t0E8" style={{top: `${sideBarTop}px`, display: `${!isSidebarVisible ? 'none' : ''}`}}>
      <div data-purpose="sidebar">
         <h2 className="udlite-heading-md sidebar--course-content-text--1-32R">Course content</h2>
         <div className="sidebar--content---4z0-" style={{height: '580px'}}>
          <StudentCourseCurriculum loadNewContent={loadNewContent} instructorLessons={instructorLessons} />
         </div>
      </div>
    </div>
  )
};

export default StudentCourseSidebar;
