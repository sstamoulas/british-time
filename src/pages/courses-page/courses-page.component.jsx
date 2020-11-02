import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Courses from './../../components/courses/courses.component';

import { fetchCoursesStart } from './../../redux/course/course.actions';

import { selectCoursesForManaging } from './../../redux/course/course.selectors';

const INITIAL_STATE = {
  filterValue: 'All',
}

const CoursesPage = ({ courses, fetchCoursesStart }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { filterValue } = state;

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    if(isObjectEmpty(courses)) {
      fetchCoursesStart();
    }
  }, [courses, fetchCoursesStart])
 
  const onSelectChange = (event) => {
    const { value } = event.target;
    setState(prevState => ({ ...prevState, filterValue: value }));
  }

  return (
    <div>
      <p>The Courses Page is accessible by any Student.</p>
      <select onChange={onSelectChange}>
        <option value='All'>All</option>
        {
          courses.map((course) => <option key={course.id} value={course.id}>{course.courseName}</option>)
        }
      </select>
      <Courses filterValue={filterValue} />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courses: selectCoursesForManaging,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoursesStart: () => 
    dispatch(fetchCoursesStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesPage));
