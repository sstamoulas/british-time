import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import { updateCourseStart, fetchCourseByIdStart } from '../../redux/course/course.actions';
import { selectCoursesForManaging, selectCurrentCourse } from '../../redux/course/course.selectors';
import * as ROUTES from './../../constants/routes';

const CourseUpdatePage = ({ history, courses, currentCourse, fetchCourseByIdStart, updateCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...currentCourse });
  const { courseName } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    updateCourseStart(state);
    history.push(ROUTES.ADMIN);
    event.preventDefault();
  }

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    if(isObjectEmpty(currentCourse)) {
      fetchCourseByIdStart(courseId);
    }
  }, [courseId, currentCourse, fetchCourseByIdStart]);

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
  courses: selectCoursesForManaging,
  currentCourse: selectCurrentCourse,
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStart: (courseDetails) => dispatch(updateCourseStart(courseDetails)),
  fetchCourseByIdStart: (courseId) => dispatch(fetchCourseByIdStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUpdatePage));
