import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createCourseStart } from '../../redux/course/course.actions';
import * as ROUTES from './../../constants/routes';
 
const INITIAL_STATE = {
  courseName: '',
}

const CourseCreatePage = ({ history, createCourseStart }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { courseName } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    createCourseStart(state);
    history.push(ROUTES.ADMIN);
    event.preventDefault();
  }

  return (
    <div>
      <h1>Create Course Page</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='courseName' value={courseName} onChange={handleChange} />
        <input type="submit" value="Create Course" />
      </form>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createCourseStart: (courseDetails) => dispatch(createCourseStart(courseDetails)),
})

export default connect(null, mapDispatchToProps)(withRouter(CourseCreatePage));
