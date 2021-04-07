import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import LessonCreateUpdate from './../../components/lesson-create-update/lesson-create-update.component';

import { fetchInstructorLessonStart, updateInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROUTES from './../../constants/routes';

const LessonUpdatePage = ({ history, isSubLoading, fetchInstructorLessonStart, updateInstructorLessonStart }) => {
  const isMounted = useRef(false);
  const { lessonId } = useParams();

  useEffect(() => {
    if (!isMounted.current) {
      fetchInstructorLessonStart(lessonId);
      isMounted.current = true;
    }
  }, [lessonId, isSubLoading, fetchInstructorLessonStart]);

  const handleSubmit = (event, lessonDetails) => {
    const { chapterTitle, lessons } = lessonDetails;
    updateInstructorLessonStart(lessonId, { chapterTitle, lessons });
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <LessonCreateUpdate isNew={false} handleSubmit={handleSubmit} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonStart: (lessonId) =>
    dispatch(fetchInstructorLessonStart(lessonId)),
  updateInstructorLessonStart: (lessonId, lessonDetails) => 
    dispatch(updateInstructorLessonStart(lessonId, lessonDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LessonUpdatePage));
