import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { instructorCourses } from './../../redux/instructor-course/instructor-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './instructor-courses.styles.scss';

const InstructorCourses = ({ currentUser, instructorCourses }) => {
  const isArrayEmpty = (obj) => {
    return obj.length === 0
  }

  return (
    <div>
      <h1>Your Courses</h1>
      {
        !isArrayEmpty(instructorCourses) ?
          instructorCourses.map((instructorCourse) => (
            <Link key={instructorCourse.id} className='course-container' to={`instructor/course/${instructorCourse.id}`}>
              <div className='course-name'>{instructorCourse.courseName}</div>
              <div className='course-start-date'>{instructorCourse.startDate}</div>
              <div className='course-end-date'>{instructorCourse.endDate}</div>
              <div className='course-publicly-visible'>{instructorCourse.isVisible}</div>
              <div className='course-schedule'>
              {
                instructorCourse.courseDays.map((courseDay) => courseDay.isChecked && (
                  <div key={courseDay.name}>
                    <div className='course-days'>{courseDay.name}</div>
                    <div className='course-session'>{courseDay.startTime} - {courseDay.endTime}</div>
                  </div>
                ))
              }
              </div>
            </Link>
          ))
        :
          <div>You have not created any courses</div>
      }
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorCourses: instructorCourses,
});

export default connect(mapStateToProps)(withRouter(InstructorCourses));
