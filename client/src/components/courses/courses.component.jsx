import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';

import Carousel from './../carousel/carousel.component';

import { courses, languages } from './../../constants/constants';

import './courses.styles.scss';

const Courses = () => {
  const [course, setCourse] = useState(courses.filter((course) => 
    ((course.code == window.localStorage.getItem('language')) || 
      (course.code == navigator.language.substring(0, 2))))[0]);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setCourse(courses.filter((course) => course.courseName === value)[0])
  }

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
      <div className='d-flex select-course-container'>
        <select className='select-course' value={course.courseName} onChange={onChangeHandler}>
          {
            courses.map((course) => (
              <option key={course.courseName}>{course.courseName}</option>
            ))
          }
        </select>
      </div>
      {
        course && (
          <Carousel type={course.courseName} course={course} />
        )
      }
    </div>
  )
};

export default Courses;
