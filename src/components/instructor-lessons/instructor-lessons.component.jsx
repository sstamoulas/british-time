import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { instructorLessons } from './../../redux/instructor-lessons/instructor-lessons.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './instructor-courses.styles.scss';

const InstructorLessons = ({ currentUser, instructorLessons }) => (
  <div>
    <h1>Your Lessons</h1>
    {
      Object.keys(instructorLessons).length &&
      Object.entries(instructorLessons).map(([index, instructorLesson]) => (
        <Link key={instructorLesson.id} className='course-container' to={`instructor/lesson/${instructorLesson.id}`}>
          <div className='course-name'>{instructorLesson.courseName}</div>
          <div className='course-start-date'>{instructorLesson.startDate}</div>
          <div className='course-end-date'>{instructorLesson.endDate}</div>
          <div className='course-publicly-visible'>{instructorLesson.isVisible}</div>
          <div className='course-schedule'>
          {
            instructorLesson.courseDays.map((courseDay) => courseDay.isChecked && (
              <div key={courseDay.name}>
                <div className='course-days'>{courseDay.name}</div>
                <div className='course-session'>{courseDay.startTime} - {courseDay.endTime}</div>
              </div>
            ))
          }
          </div>
        </Link>
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorLessons: instructorLessons,
});

export default connect(mapStateToProps)(withRouter(InstructorLessons));
