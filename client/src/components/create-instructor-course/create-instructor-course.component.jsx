import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { createInstructorCourseDetailsStart } from './../../redux/instructor-course/instructor-course.actions';

import './create-instructor-course.styles.scss';

const INITIAL_STATE = {
  courseName: '',
  totalStudents: 0,
  rating: 0,
  isVisible: false,
}

const CreateInstructorCourse = ({ courseDetails, createInstructorCourseDetailsStart }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...courseDetails });
  const { courseName } = state;

  useEffect(() => {
    setState(prevState => ({ ...prevState, ...courseDetails }));
  }, [courseDetails]);

  const handleSubmit = (event) => {
    createInstructorCourseDetailsStart(state);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='courseName' value={courseName} disabled />
      <input type="submit" value="Open Course" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createInstructorCourseDetailsStart: (courseDetails) => 
    dispatch(createInstructorCourseDetailsStart(courseDetails)),
})

export default connect(null, mapDispatchToProps)(CreateInstructorCourse);
