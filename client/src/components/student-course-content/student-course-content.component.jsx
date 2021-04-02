import React from 'react';

import StudentCourseCurriculum from './../student-course-curriculum/student-course-curriculum.component';

import './student-course-content.styles.scss';

const StudentCourseContent = ({ activeTab, isSidebarVisible, instructorLessons, loadNewContent }) => (
  <div id="tabs--1-content-1" role="tabpanel" tabIndex="0" data-purpose="tab-container" aria-labelledby="tabs--1-tab-1" className={`tabs--tab-content--adAng ${activeTab === 'Course Content' && 'tabs--active--2rPuV'}`} style={{display: `${isSidebarVisible ? 'none' : ''}`}}>
    <div className="dashboard--sizing-wrapper--1vQud">
      <div>
        <StudentCourseCurriculum loadNewContent={loadNewContent} instructorLessons={instructorLessons} />
      </div>
    </div>
  </div>
);

export default StudentCourseContent;
