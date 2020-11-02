import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import { fetchInstructorCourseDetailsByCourseIdStart } from '../../redux/instructor-course/instructor-course.actions';
import { createStudentCourseStart } from '../../redux/student-course/student-course.actions';

import { selectedCourseDetails } from '../../redux/instructor-course/instructor-course.selectors';

import * as ROUTES from './../../constants/routes';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const CourseDetailsPage = ({ history, courseDetails, fetchInstructorCourseDetailsByCourseIdStart, createStudentCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...courseDetails });
  const { courseName } = state;

  useEffect(() => {
    console.log(courseDetails, courseId)
    if(isObjectEmpty(courseDetails)) {
      fetchInstructorCourseDetailsByCourseIdStart(courseId);
    }
  }, [courseId, courseDetails, fetchInstructorCourseDetailsByCourseIdStart])

  const handleSubmit = (event) => {
    createStudentCourseStart(state, courseId);
    history.push(ROUTES.STUDENT);
    event.preventDefault();
  }

  return !isObjectEmpty(courseDetails) && (
    <div>
      <h1>Course Details Page</h1>
      <form onSubmit={handleSubmit}>
        <div>{courseName}</div>
        <input type="submit" value="Register Course" />
      </form>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectedCourseDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorCourseDetailsByCourseIdStart: (courseId) => dispatch(fetchInstructorCourseDetailsByCourseIdStart(courseId)),
  createStudentCourseStart: (courseDetails) => dispatch(createStudentCourseStart(courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseDetailsPage));
