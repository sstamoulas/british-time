import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import LessonUpdate from './../../components/lesson-update/lesson-update.component';

import { fetchInstructorLessonsStart, createInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROUTES from './../../constants/routes';

const LessonUpdatePage = ({ history, isSubLoading, fetchInstructorLessonsStart, createInstructorLessonStart }) => {
  const isMounted = useRef(false);
  const { courseId, lessonId } = useParams();

  useEffect(() => {
    if (!isMounted.current) {
      fetchInstructorLessonsStart(courseId);
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchInstructorLessonsStart]);


  const handleSubmit = (event, lessonDetails, courseLessons) => {
    event.preventDefault();
    delete lessonDetails.errors;
    const chapters = [...courseLessons];
    chapters[lessonId] = { ...lessonDetails };

    createInstructorLessonStart({ courseId, chapters });
    history.push(`/instructor/course/${courseId}`);
  }

  return isMounted.current && !isSubLoading ? (
    <LessonUpdate handleSubmit={handleSubmit} chapterIndex={lessonId} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonsStart: (lessonId) =>
    dispatch(fetchInstructorLessonsStart(lessonId)),
  createInstructorLessonStart: (lessonDetails) => 
    dispatch(createInstructorLessonStart(lessonDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LessonUpdatePage));
