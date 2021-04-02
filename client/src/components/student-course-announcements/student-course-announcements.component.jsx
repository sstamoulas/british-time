import React from 'react';

import './student-course-announcements.styles.scss';

const StudentCourseAnnouncements = ({ activeTab }) => (
  <div 
    id="tabs--1-content-4" 
    role="tabpanel" 
    tabIndex="-1" 
    className={`tabs--tab-content--adAng ${activeTab === 'Announcements' && 'tabs--active--2rPuV'}`}
  >
    No Announcements
  </div>
);

export default StudentCourseAnnouncements;
