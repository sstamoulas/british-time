import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CourseCreateUpdate from './../../components/course-create-update/course-create-update.component';

import { createCourseStart } from '../../redux/course/course.actions';

import * as ROUTES from './../../constants/routes';

const CourseCreatePage = ({ history, createCourseStart }) => {
  const onUploadCallback = (courseDetails) => {
    const { imageExtension, level, courseName, headline } = courseDetails;
    createCourseStart({ imageExtension, level, courseName, headline });
  }

  const handleSubmit = (event, courseDetails) => {
    const { imageExtension, level, courseName, headline } = courseDetails;
    createCourseStart({ imageExtension, level, courseName, headline });
    history.push(ROUTES.ADMIN);
    event.preventDefault();
  }

  return <CourseCreateUpdate isNew={true} handleSubmit={handleSubmit} onUploadCallback={onUploadCallback} />;
};

const mapDispatchToProps = (dispatch) => ({
  createCourseStart: (courseDetails) => dispatch(createCourseStart(courseDetails)),
})

export default connect(null, mapDispatchToProps)(withRouter(CourseCreatePage));
