import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Carousel from './../carousel/carousel.component';

import { fetchAllCoursesStart } from './../../redux/instructor-course/instructor-course.actions';

import { selectInstructorCoursesForManaging } from './../../redux/instructor-course/instructor-course.selectors';

import './courses.styles.scss';

const INITIAL_STATE = {
  filteredCourses: [],
}

const isArrayEmpty = (obj) => {
  return obj.length === 0;
}

const Courses = ({ history, courses, filterValue, fetchAllCoursesStart }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { filteredCourses } = state;

  useEffect(() => {
    if(isArrayEmpty(courses)) {
      fetchAllCoursesStart();
    }
    else {
      const newFilteredCourses = courses.filter((course) => filterValue === 'All' || filterValue === course.courseId);
      setState(prevState => ({ ...prevState, filteredCourses: newFilteredCourses }));
    }
  }, [filterValue, courses, fetchAllCoursesStart])

  return !isArrayEmpty(filteredCourses) ? 
    (
      <div>
        <h3 className="h3-margin">Beginner Level Courses</h3>
        <Carousel type={'beginner'} courses={courses} />
        <h3 className="h3-margin">Pre-Intermediate Level Courses</h3>
        <Carousel type={'pre-intermediate'} courses={courses} />
        <h3 className="h3-margin">Intermediate Level Courses</h3>
        <Carousel type={'intermediate'} courses={courses} />
        <h3 className="h3-margin">Upper Intermediate Level Courses</h3>
        <Carousel type={'upper-intermediate'} courses={courses} />
        <h3 className="h3-margin">Advanced Level Courses</h3>
        <Carousel type={'advanced'} courses={courses} />
      </div>
    )
  :
    (
      <div>There are no courses available.</div>
    )
};

const mapStateToProps = createStructuredSelector({
  courses: selectInstructorCoursesForManaging,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllCoursesStart: () => dispatch(fetchAllCoursesStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Courses));
