import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { fetchAllCoursesStart } from './../../redux/instructor-course/instructor-course.actions';

import { selectInstructorCoursesForManaging } from './../../redux/instructor-course/instructor-course.selectors';

const INITIAL_STATE = {
  filteredCourses: [],
}

const isArrayEmpty = (obj) => {
  return obj.length === 0;
}

const Courses = ({ history, courses, filterValue, fetchAllCoursesStart }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { filteredCourses } = state;

  useEffect(() => {
    if(isArrayEmpty(courses)) {
      fetchAllCoursesStart();
    }
    else {
      const newFilteredCourses = courses.filter((course) => filterValue === 'All' || filterValue === course.courseId);
      setState(prevState => ({ ...prevState, filteredCourses: newFilteredCourses }));
    }
  }, [filterValue, courses, fetchAllCoursesStart])

  return !isArrayEmpty(filteredCourses) ? 
    (
      <div>
      {
        filteredCourses.map((course) => (
          <Link key={course.id} className='course-container' to={`course/details/${course.id}`}>
            <div className='course-name'>{course.courseName}</div>
            <div className='course-start-date'>{course.startDate}</div>
            <div className='course-end-date'>{course.endDate}</div>
            <div className='course-publicly-visible'>{course.isVisible}</div>
            <div className='course-schedule'>
            {
              course.courseDays.map((courseDay) => courseDay.isChecked && (
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
    )
  :
    (
      <div>There are no courses available.</div>
    )
};

const mapStateToProps = createStructuredSelector({
  courses: selectInstructorCoursesForManaging,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllCoursesStart: () => dispatch(fetchAllCoursesStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Courses));
