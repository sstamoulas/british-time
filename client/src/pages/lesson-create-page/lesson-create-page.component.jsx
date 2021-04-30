import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import LessonCreate from './../../components/lesson-create/lesson-create.component';

import { fetchInstructorLessonsStart, createInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROUTES from './../../constants/routes';

const LessonCreatePage = ({ history, isSubLoading, fetchInstructorLessonsStart, createInstructorLessonStart }) => {
  const { courseId } = useParams();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchInstructorLessonsStart(courseId);
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchInstructorLessonsStart]);

  const handleSubmit = (event, lessonDetails, courseLessons) => {
    event.preventDefault();
    delete lessonDetails.errors;
    const chapters = [...courseLessons, lessonDetails];

    createInstructorLessonStart({ courseId, chapters });
    history.push(`/instructor/course/${courseId}`);
  }

  return isMounted.current && !isSubLoading ? (
    <LessonCreate handleSubmit={handleSubmit} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  createInstructorLessonStart: (lessonDetails) => 
    dispatch(createInstructorLessonStart(lessonDetails)),
  fetchInstructorLessonsStart: (courseId) =>
    dispatch(fetchInstructorLessonsStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LessonCreatePage));
