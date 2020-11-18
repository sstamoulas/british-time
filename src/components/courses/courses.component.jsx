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
        <h3>Beginner Level Courses</h3>
        <Carousel type={'beginner'} />
        <h3>Pre-Intermediate Level Courses</h3>
        <Carousel type={'pre-intermediate'} />
        <h3>Intermediate Level Courses</h3>
        {
          filteredCourses.map((course) => course.isVisible && (
            <li key={course.id} className="course-item">
              <div className="course-container">
                <article className="course audit">
                  <section className="details">
                    <div className="wrapper-course-details">
                      <h3 className="course-title">
                        <Link className='course-target-link' to={`course/details/${course.id}`}>
                          {course.courseName}
                        </Link>
                      </h3>
                      <div className="course-info">
                        <span className="info-instructor">Microsoft - </span>
                        <span className="info-instrutor-rating">DEV221x</span>
                        <span className="info-date-block-container">
                          <span className="info-date-block">{course.startDate} - {course.endDate}</span>
                        </span>
                      </div>
                    </div>
                  </section>
                </article>
              </div>
            </li>


            // <Link key={course.id} className='course-container' to={`course/details/${course.id}`}>
            //   <div className='course-name'>{course.courseName}</div>
            //   <div className='course-start-date'>{course.startDate}</div>
            //   <div className='course-end-date'>{course.endDate}</div>
            //   <div className='course-publicly-visible'>{course.isVisible}</div>
            //   <div className='course-schedule'>
            //   {
            //     course.courseDays.map((courseDay) => courseDay.isChecked && (
            //       <div key={courseDay.name}>
            //         <div className='course-days'>{courseDay.name}</div>
            //         <div className='course-session'>{courseDay.startTime} - {courseDay.endTime}</div>
            //       </div>
            //     ))
            //   }
            //   </div>
            // </Link>
          ))
        }
        <h3>Upper Intermediate Level Courses</h3>
        {
          filteredCourses.map((course) => course.isVisible && (
            <li key={course.id} className="course-item">
              <div className="course-container">
                <article className="course audit">
                  <section className="details">
                    <div className="wrapper-course-details">
                      <h3 className="course-title">
                        <Link className='course-target-link' to={`course/details/${course.id}`}>
                          {course.courseName}
                        </Link>
                      </h3>
                      <div className="course-info">
                        <span className="info-instructor">Microsoft - </span>
                        <span className="info-instrutor-rating">DEV221x</span>
                        <span className="info-date-block-container">
                          <span className="info-date-block">{course.startDate} - {course.endDate}</span>
                        </span>
                      </div>
                    </div>
                  </section>
                </article>
              </div>
            </li>


            // <Link key={course.id} className='course-container' to={`course/details/${course.id}`}>
            //   <div className='course-name'>{course.courseName}</div>
            //   <div className='course-start-date'>{course.startDate}</div>
            //   <div className='course-end-date'>{course.endDate}</div>
            //   <div className='course-publicly-visible'>{course.isVisible}</div>
            //   <div className='course-schedule'>
            //   {
            //     course.courseDays.map((courseDay) => courseDay.isChecked && (
            //       <div key={courseDay.name}>
            //         <div className='course-days'>{courseDay.name}</div>
            //         <div className='course-session'>{courseDay.startTime} - {courseDay.endTime}</div>
            //       </div>
            //     ))
            //   }
            //   </div>
            // </Link>
          ))
        }
        <h3>Advanced Level Courses</h3>
        {
          filteredCourses.map((course) => course.isVisible && (
            <li key={course.id} className="course-item">
              <div className="course-container">
                <article className="course audit">
                  <section className="details">
                    <div className="wrapper-course-details">
                      <h3 className="course-title">
                        <Link className='course-target-link' to={`course/details/${course.id}`}>
                          {course.courseName}
                        </Link>
                      </h3>
                      <div className="course-info">
                        <span className="info-instructor">Microsoft - </span>
                        <span className="info-instrutor-rating">DEV221x</span>
                        <span className="info-date-block-container">
                          <span className="info-date-block">{course.startDate} - {course.endDate}</span>
                        </span>
                      </div>
                    </div>
                  </section>
                </article>
              </div>
            </li>


            // <Link key={course.id} className='course-container' to={`course/details/${course.id}`}>
            //   <div className='course-name'>{course.courseName}</div>
            //   <div className='course-start-date'>{course.startDate}</div>
            //   <div className='course-end-date'>{course.endDate}</div>
            //   <div className='course-publicly-visible'>{course.isVisible}</div>
            //   <div className='course-schedule'>
            //   {
            //     course.courseDays.map((courseDay) => courseDay.isChecked && (
            //       <div key={courseDay.name}>
            //         <div className='course-days'>{courseDay.name}</div>
            //         <div className='course-session'>{courseDay.startTime} - {courseDay.endTime}</div>
            //       </div>
            //     ))
            //   }
            //   </div>
            // </Link>
          ))
        }
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
