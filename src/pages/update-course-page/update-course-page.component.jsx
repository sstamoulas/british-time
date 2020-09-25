import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import { updateCourseStart } from '../../redux/course/course.actions';
import { currentUser, userError } from '../../redux/user/user.selectors';
import * as ROUTES from './../../constants/routes';

const UpdateCoursePage = ({ history, currentUser, error, updateCourseStart }) => {
  let { id } = useParams();
  const [state, setState] = useState({ ...currentUser.courses[id] });
  const { courseName } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    updateCourseStart(state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return (
    <div>
      <h1>Edit Course Titled '{courseName}' Page</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='courseName' value={courseName} onChange={handleChange} />
        <input type="submit" value="Update Course" />
      </form>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  error: userError,
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStart: (courseDetails) => dispatch(updateCourseStart(courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateCoursePage));
