import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Carousel from './../carousel/carousel.component';

import { selectCoursesForManaging } from './../../redux/course/course.selectors';

import './courses.styles.scss';

const sortCourses = (courseA, courseB) => {
  if (courseA.courseName < courseB.courseName) {
    return -1;
  }
  else if (courseA.courseName > courseB.courseName) {
    return 1;
  }
  else {
    return 0;
  }
}

const Courses = ({ courses }) => {
  const beginnerCourses = courses.filter((course) => parseInt(course.level) === 0).sort(sortCourses);
  const elementaryCourses = courses.filter((course) => parseInt(course.level) === 1).sort(sortCourses);
  const preIntermediateCourses = courses.filter((course) => parseInt(course.level) === 2).sort(sortCourses);
  const intermediateCourses = courses.filter((course) => parseInt(course.level) === 3).sort(sortCourses);
  const upperIntermediateCourses = courses.filter((course) => parseInt(course.level) === 4).sort(sortCourses);
  const advancedCourses = courses.filter((course) => parseInt(course.level) === 5).sort(sortCourses);

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
      <Carousel type={'beginner'} courses={beginnerCourses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Elementary Level Courses</h3>
      <Carousel type={'elementary'} courses={elementaryCourses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Pre-Intermediate Level Courses</h3>
      <Carousel type={'pre-intermediate'} courses={preIntermediateCourses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Intermediate Level Courses</h3>
      <Carousel type={'intermediate'} courses={intermediateCourses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Upper Intermediate Level Courses</h3>
      <Carousel type={'upper-intermediate'} courses={upperIntermediateCourses} />
      <h3 className="h3-margin udlite-container udlite-heading-xl">Advanced Level Courses</h3>
      <Carousel type={'advanced'} courses={advancedCourses} />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courses: selectCoursesForManaging,
});

export default connect(mapStateToProps)(Courses);
