import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { studentCourses } from './../../redux/student-course/student-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

const StudentCourses = ({ currentUser, studentCourses }) => (
  <div>
    <h1>Your Courses</h1>
    {
      Object.keys(studentCourses).length ?
        Object.entries(studentCourses).map(([index, studentCourse]) => (
          <Link key={studentCourse.id} className='course-container' to={`student/course/${studentCourse.id}`}>
            <div className='course-name'>{studentCourse.courseName}</div>
            <div className='course-start-date'>{studentCourse.startDate}</div>
            <div className='course-end-date'>{studentCourse.endDate}</div>
            <div className='course-publicly-visible'>{studentCourse.isVisible}</div>
            <div className='course-schedule'>
            {
              studentCourse.courseDays.map((courseDay) => courseDay.isChecked && (
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
        <div>You have not signed up for any courses</div>
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  studentCourses: studentCourses,
});

export default connect(mapStateToProps)(withRouter(StudentCourses));
