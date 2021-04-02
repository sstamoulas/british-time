import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

import LessonCreateUpdate from './../../components/lesson-create-update/lesson-create-update.component';

import { createInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import * as ROUTES from './../../constants/routes';

const LessonCreatePage = ({ history, createInstructorLessonStart }) => {
  const { courseId } = useParams();

  const handleSubmit = (event, lessonDetails) => {
    const { chapterTitle, lessons } = lessonDetails;
    createInstructorLessonStart({ courseId, chapterTitle, lessons });
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return <LessonCreateUpdate isNew={true} handleSubmit={handleSubmit} />;
};

const mapDispatchToProps = (dispatch) => ({
  createInstructorLessonStart: (lessonDetails) => 
    dispatch(createInstructorLessonStart(lessonDetails)),
})

export default connect(null, mapDispatchToProps)(withRouter(LessonCreatePage));
