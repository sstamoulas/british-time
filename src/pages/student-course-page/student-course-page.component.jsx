import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CourseLessons from '../../components/course-lessons/course-lessons.component';

import { fetchStudentCourseStart } from '../../redux/student-course/student-course.actions';

import { selectedCourseDetails } from '../../redux/student-course/student-course.selectors';

import * as ROUTES from './../../constants/routes';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const isArrayEmpty = (obj) => {
  return obj.length === 0
}

const StudentCoursePage = ({ history, courseDetails, fetchStudentCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...courseDetails });
  const { courseName } = state;

  useEffect(() => {
    if(isObjectEmpty(courseDetails)) {
      fetchStudentCourseStart(courseId);
    }
  }, [courseId, courseDetails, fetchStudentCourseStart])

  const handleSubmit = (event) => {
    history.push(ROUTES.STUDENT);
    event.preventDefault();
  }

  return !isObjectEmpty(courseDetails) && (
    <div>
      <h1>Course Details Page</h1>
      <CourseLessons />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectedCourseDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudentCourseStart: (courseId) => dispatch(fetchStudentCourseStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentCoursePage));
