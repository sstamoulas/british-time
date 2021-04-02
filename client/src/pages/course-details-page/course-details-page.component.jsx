import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CourseDetails from './../../components/course-details/course-details.component';
import CustomLoader from './../../components/custom-loader/custom-loader.component';

import { fetchCourseByIdStart } from '../../redux/course/course.actions';
import { fetchInstructorsByCourseIdStart } from './../../redux/instructor-course/instructor-course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import './course-details-page.styles.scss';

const CourseDetailsPage = ({ 
  isSubLoading,
  fetchCourseByIdStart, 
  fetchInstructorsByCourseIdStart, 
}) => {
  const isMounted = useRef(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!isMounted.current) {
      batch(() => {
        fetchCourseByIdStart(courseId);
        fetchInstructorsByCourseIdStart(courseId);
      });
      
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchCourseByIdStart, fetchInstructorsByCourseIdStart]);

  return isMounted.current && !isSubLoading ? (
    <CourseDetails />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourseByIdStart: (courseId) => dispatch(fetchCourseByIdStart(courseId)),
  fetchInstructorsByCourseIdStart: (courseId) => dispatch(fetchInstructorsByCourseIdStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseDetailsPage));
