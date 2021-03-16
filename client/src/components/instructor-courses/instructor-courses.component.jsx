import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CourseImage from './../course-image/course-image.component';
import RatingHalfStar from './../rating-half-star/rating-half-star.component';
import RatingEmptyStar from './../rating-empty-star/rating-empty-star.component';
import RatingFullStar from './../rating-full-star/rating-full-star.component';

import { selectInstructorCoursesForManaging } from './../../redux/instructor-course/instructor-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './instructor-courses.styles.scss';

const InstructorCourses = ({ currentUser, instructorCourses }) => (
  <div className="container">
    <h3 className='course-label'>Your Courses</h3>
    <div className="card-wrapper">
    {
      Object.keys(instructorCourses).length ?
        Object.entries(instructorCourses).map(([index, instructorCourse]) => {
          const isPlural = instructorCourse.totalStudents != 1 ? 's' : '';
          const totalStudents = instructorCourse.totalStudents || 0;
          let renderRating = [];

          for(let i = 0; i < 5; i++) {
            if((instructorCourse.rating/2) > i && (instructorCourse.rating/2) < (i + 1)) {
              renderRating.push(<div key={i}><span><RatingHalfStar /></span></div>)
            }
            else if((instructorCourse.rating/2) > i) {
              renderRating.push(<div key={i}><span><RatingFullStar /></span></div>)
            }
            else {
              renderRating.push(<div key={i}><span><RatingEmptyStar /></span></div>)
            }
          }

          return (
            <div key={instructorCourse.id} role="presentation" tabIndex="-1" className="card card--learning" data-purpose="enrolled-course-card">
              <Link to={`/instructor/course/${instructorCourse.id}`} className="card--learning__image" tabIndex="-1">
                <div className="card__image play-button-trigger">
                  <CourseImage className="course-image" imageExtension={instructorCourse.imageExtension} courseId={instructorCourse.courseId} alt={instructorCourse.courseName}  width="240" height="135" />
                  <div className="play-button">
                  </div>
                </div>
              </Link>
              <Link className='card--learning__details' to={`/instructor/course/${instructorCourse.id}`}>
                <div className="card__details">
                  <strong className="details__name">{instructorCourse.courseName}</strong>
                  <div className="details__bottom">
                    <span className="details__progress"><span className="progress__bar" style={{width: '1%'}}></span></span>
                    <span className="a11 text-midnight-lighter progress__text tooltip-container">
                      <div className="ellipsis">({totalStudents} Student{isPlural})</div>
                    </span>
                    <div className="details__bottom--review dib pull-right">
                      <div>
                        <div role="button" tabIndex="0" data-purpose="review-button" className="leave-rating--review-container--vertical--120k4">
                          <div aria-label="Rating: 0 out of 5" className="star-rating-shell star-rating--star-rating--static--3wPvS star-rating--star-rating--small--yMOwk">
                          {
                            renderRating
                          }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      :
        <div>You have not created any courses</div>
    }
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorCourses: selectInstructorCoursesForManaging,
});

export default connect(mapStateToProps)(withRouter(InstructorCourses));
