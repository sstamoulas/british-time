import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CourseImage from './../course-image/course-image.component';
import RatingHalfStar from './../rating-half-star/rating-half-star.component';
import RatingEmptyStar from './../rating-empty-star/rating-empty-star.component';
import RatingFullStar from './../rating-full-star/rating-full-star.component';

import { studentCourses } from './../../redux/student-course/student-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROUTES from './../../constants/routes';

import './student-courses.styles.scss';

const StudentCourses = ({ history, currentUser, studentCourses }) => {

  const handleRating = (event, studentCourseId) => {
    history.push(`/course-rating/${studentCourseId}`)
    event.preventDefault();
  }

  return (
    <div className="container">
      <h3 className='course-label'>Your Courses</h3>
      <div className="card-wrapper">
      {
        Object.keys(studentCourses).length ?
          Object.entries(studentCourses).map(([index, studentCourse]) => console.log(studentCourse) || (
            <div key={studentCourse.id} role="presentation" tabIndex="-1" className="card card--learning" data-purpose="enrolled-course-card">
              <Link to={`/student/course/${studentCourse.id}`} className="card--learning__image" tabIndex="-1">
                <div className="card__image play-button-trigger">
                  <CourseImage className="course-image" courseId={studentCourse.courseId} alt={studentCourse.courseName}  width="240" height="135" />
                  <div className="play-button">
                  </div>
                </div>
              </Link>
              <Link className='card--learning__details' to={`/student/course/${studentCourse.id}`}>
                <div className="card__details">
                  <strong className="details__name">{studentCourse.courseName}</strong>
                  <div className="details__instructor">{studentCourse.userName}<span>, {studentCourse.jobTitle}</span></div>
                  <div className="details__bottom">
                    <span className="details__progress"><span className="progress__bar" style={{width: '1%'}}></span></span>
                    <span className="a11 text-midnight-lighter progress__text tooltip-container">
                      <div className="ellipsis">(10 Students)</div>
                    </span>
                    <div className="details__bottom--review dib pull-right">
                      <div>
                        <div role="button" tabIndex="0" data-purpose="review-button" className="leave-rating--review-container--vertical--120k4">
                          <div aria-label="Rating: 0 out of 5" className="star-rating-shell star-rating--star-rating--static--3wPvS star-rating--star-rating--small--yMOwk">
                            <div><span><RatingFullStar /></span></div>
                            <div><span><RatingFullStar /></span></div>
                            <div><span><RatingHalfStar /></span></div>
                            <div><span><RatingEmptyStar /></span></div>
                            <div><span><RatingEmptyStar /></span></div>
                          </div>
                          <span onClick={(e) => handleRating(e, studentCourse.id)} className="leave-rating--helper-text--21RPx" data-purpose="helper-text">Leave a rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        :
          <div>You have not signed up for any courses</div>
      }
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  studentCourses: studentCourses,
});

export default connect(mapStateToProps)(withRouter(StudentCourses));
