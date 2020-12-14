import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Carousel from './../carousel/carousel.component';

import { fetchAllCoursesStart } from './../../redux/instructor-course/instructor-course.actions';

import { selectInstructorCoursesForManaging } from './../../redux/instructor-course/instructor-course.selectors';

import './courses.styles.scss';

const isArrayEmpty = (obj) => {
  return obj.length === 0;
}

const Courses = ({ history, courses, fetchAllCoursesStart }) => {
  useEffect(() => {
    if(isArrayEmpty(courses)) {
      fetchAllCoursesStart();
    }
  }, [courses, fetchAllCoursesStart])

  return (
    <div>
      <div className="ud-component--logged-in-home--billboard">
        <div data-purpose="billboard" className="billboard--billboard--3-fQr">
          <div className="billboard--image-container--2JRqQ">
            <img src="https://img-b.udemycdn.com/notices/featured_banner/image_udlite/d529581a-6f94-45ee-bb32-80f53a3320d3.jpg?secure=9CZUX3Fw1EBNKLG6GeETXg%3D%3D%2C1607715996" width="1340" height="400" alt="" />
          </div>
          <div className="billboard--content-box--JtXUJ">
            <h1 className="udlite-heading-xxl" data-purpose="safely-set-inner-html:billboard:title">Bit by bit</h1>
            <p className="udlite-text-md" data-purpose="safely-set-inner-html:billboard:subtitle">Learn for an hour and develop new skills. Courses from ₺27.99 through Dec. 11.</p>
          </div>
        </div>
      </div>
      <h3 className="h3-margin udlite-container udlite-heading-xl">Beginner Level Courses</h3>
      <Carousel type={'beginner'} courses={courses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Pre-Intermediate Level Courses</h3>
      <Carousel type={'pre-intermediate'} courses={courses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Intermediate Level Courses</h3>
      <Carousel type={'intermediate'} courses={courses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Upper Intermediate Level Courses</h3>
      <Carousel type={'upper-intermediate'} courses={courses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Advanced Level Courses</h3>
      <Carousel type={'advanced'} courses={courses} />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courses: selectInstructorCoursesForManaging,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllCoursesStart: () => dispatch(fetchAllCoursesStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Courses));
