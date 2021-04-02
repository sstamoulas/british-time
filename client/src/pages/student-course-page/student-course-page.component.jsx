import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import StudentCourse from './../../components/student-course/student-course.component';

import { fetchInstructorCourseDetailsByCourseIdStart } from './../../redux/instructor-course/instructor-course.actions';
import { fetchInstructorLessonsStart } from '../../redux/instructor-lesson/instructor-lesson.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import './student-course-page.styles.scss';

const StudentCoursePage = ({ isSubLoading, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart }) => {
  const { courseId } = useParams();
  const isMounted = useRef(false)

  useEffect(() => {
    if(!isMounted.current) {
      batch(() => {
        fetchInstructorCourseDetailsByCourseIdStart(courseId);
        fetchInstructorLessonsStart(courseId);
      });
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart])

  return isMounted.current && !isSubLoading ? (
    <StudentCourse />
  ) : (
    <CustomLoader message={'Loading'} />
  )
}

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorCourseDetailsByCourseIdStart: (courseId) => 
    dispatch(fetchInstructorCourseDetailsByCourseIdStart(courseId)),
  fetchInstructorLessonsStart: (instructorCourseId) => 
    dispatch(fetchInstructorLessonsStart(instructorCourseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentCoursePage);
