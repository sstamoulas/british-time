import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import InstructorCourseCreateUpdate from './../../components/instructor-course-create-update/instructor-course-create-update.component';

import { 
  fetchInstructorCourseDetailsByCourseIdStart, 
  updateInstructorCourseDetailsStart 
} from './../../redux/instructor-course/instructor-course.actions';
import { fetchInstructorLessonsStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROUTES from './../../constants/routes';

const InstructorCourseUpdatePage = ({ history, isSubLoading, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart, updateInstructorCourseDetailsStart }) => {
  const isMounted = useRef(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!isMounted.current) {
      batch(() => {
        fetchInstructorCourseDetailsByCourseIdStart(courseId);
        fetchInstructorLessonsStart(courseId);
      });
      
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart]);

  const handleSubmit = (event, courseDetails) => {
    const { id, courseName, totalStudents, rating, isVisible } = courseDetails;
    updateInstructorCourseDetailsStart(courseId, { id, courseName, totalStudents, rating, isVisible });
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <InstructorCourseCreateUpdate isNew={false} handleSubmit={handleSubmit} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonsStart: (instructorCourseId) => 
    dispatch(fetchInstructorLessonsStart(instructorCourseId)),
  fetchInstructorCourseDetailsByCourseIdStart: (instructorCourseId) =>
    dispatch(fetchInstructorCourseDetailsByCourseIdStart(instructorCourseId)),
  updateInstructorCourseDetailsStart: (courseId, courseDetails) => 
    dispatch(updateInstructorCourseDetailsStart(courseId, courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InstructorCourseUpdatePage));
