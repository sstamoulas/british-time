import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import InstructorCourseCreateUpdate from './../../components/instructor-course-create-update/instructor-course-create-update.component';

import { fetchCoursesStart } from './../../redux/course/course.actions';
import { createInstructorCourseDetailsStart } from './../../redux/instructor-course/instructor-course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROUTES from './../../constants/routes';

const InstructorCourseCreatePage = ({ history, isSubLoading, fetchCoursesStart, createInstructorCourseDetailsStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchCoursesStart();
      isMounted.current = true;
    }
  }, [isSubLoading, fetchCoursesStart]);

  const handleSubmit = (event, courseDetails) => {
    const { id, courseName, totalStudents, rating, isVisible } = courseDetails;
    createInstructorCourseDetailsStart({ id, courseName, totalStudents, rating, isVisible });
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <InstructorCourseCreateUpdate isNew={true} handleSubmit={handleSubmit} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoursesStart: () => dispatch(fetchCoursesStart()),
  createInstructorCourseDetailsStart: (courseDetails) => 
    dispatch(createInstructorCourseDetailsStart(courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InstructorCourseCreatePage));
