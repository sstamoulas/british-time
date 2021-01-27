import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import { fetchInstructorLessonStart } from '../../redux/instructor-lesson/instructor-lesson.actions';

import { selectedLessonDetails } from '../../redux/instructor-lesson/instructor-lesson.selectors';

import * as ROUTES from './../../constants/routes';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const StudentLessonPage = ({ history, lessonDetails, fetchInstructorLessonStart }) => {
  const { instructorCourseId, lessonId } = useParams();
  const [state, setState] = useState({ ...lessonDetails });
  const { courseName } = state;

  useEffect(() => {
    if(isObjectEmpty(lessonDetails)) {
      fetchInstructorLessonStart(lessonId);
    }
  }, [lessonId, lessonDetails, fetchInstructorLessonStart])

  const handleSubmit = (event) => {
    history.push(ROUTES.STUDENT);
    event.preventDefault();
  }

  return !isObjectEmpty(lessonDetails) && (
    <div>
      <h1>Lesson Details Page</h1>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  lessonDetails: selectedLessonDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonStart: (lessonId) => dispatch(fetchInstructorLessonStart(lessonId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentLessonPage));
