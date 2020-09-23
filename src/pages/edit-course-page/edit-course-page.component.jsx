import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import { editCourseStart } from '../../redux/instructor/instructor.actions';
import { currentUser, userError } from '../../redux/user/user.selectors';
import * as ROUTES from './../../constants/routes';
 
const INITIAL_STATE = {
  courseName: '',
}

const EditCoursePage = ({ history, currentUser, error, editCourseStart }) => {
  let { id } = useParams();
  console.log(id)
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { courseName } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    console.log(state)
    editCourseStart(state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return (
    <div>
      <h1>Edit Course Page</h1>
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
  editCourseStart: (courseDetails) => dispatch(editCourseStart(courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCoursePage));
