import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { createCourseStart } from '../../redux/course/course.actions';
import { currentUser, userError } from '../../redux/user/user.selectors';
import * as ROUTES from './../../constants/routes';
 
const INITIAL_STATE = {
  courseName: '',
}

const CreateCoursePage = ({ history, currentUser, error, createCourseStart }) => {
  const id = currentUser.courses ? currentUser.courses.length : 0;
  const [state, setState] = useState({ ...INITIAL_STATE, id });
  const { courseName } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    createCourseStart(state);
    history.push(ROUTES.INSTRUCTOR);
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

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  error: userError,
});

const mapDispatchToProps = (dispatch) => ({
  createCourseStart: (courseDetails) => dispatch(createCourseStart(courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateCoursePage));
