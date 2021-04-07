import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import CourseCreateUpdate from './../../components/course-create-update/course-create-update.component';

import { updateCourseStart, fetchCourseByIdStart } from '../../redux/course/course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROUTES from './../../constants/routes';

const CourseUpdatePage = ({ history, isSubLoading, fetchCourseByIdStart, updateCourseStart }) => {
  const isMounted = useRef(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!isMounted.current) {
      fetchCourseByIdStart(courseId);
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchCourseByIdStart]);

  const onUploadCallback = (courseDetails) => {
    const { level, courseName, headline } = courseDetails;
    updateCourseStart(courseId, { level, courseName, headline });
  }

  const handleSubmit = (event, courseDetails) => {
    const { level, courseName, headline } = courseDetails;
    updateCourseStart(courseId, { level, courseName, headline });
    history.push(ROUTES.ADMIN);
    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <CourseCreateUpdate isNew={false} handleSubmit={handleSubmit} onUploadCallback={onUploadCallback} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStart: (courseId, courseDetails) => dispatch(updateCourseStart(courseId, courseDetails)),
  fetchCourseByIdStart: (courseId) => dispatch(fetchCourseByIdStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUpdatePage));
