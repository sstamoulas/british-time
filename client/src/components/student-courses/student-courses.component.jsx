import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { studentCourses } from './../../redux/student-course/student-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './student-courses.styles.scss';

const StudentCourses = ({ currentUser, studentCourses }) => (
  <div className="container">
    <h3 className='course-label'>Your Courses</h3>
    <div className="card-wrapper">
    {
      Object.keys(studentCourses).length ?
        Object.entries(studentCourses).map(([index, studentCourse]) => (
          <div key={studentCourse.id} role="presentation" tabIndex="-1" className="card card--learning" data-purpose="enrolled-course-card">
            <Link to={`/student/course/${studentCourse.id}`} className="card--learning__image" tabIndex="-1">
              <div className="card__image play-button-trigger">
                <img className="course-image" alt="The Complete Ruby on Rails Developer Course" width="240" height="135" src="https://img-a.udemycdn.com/course/240x135/519442_63fe_2.jpg?TDnbuuMj5fWR7YpsiBKzn6JUpIO3nCDfIcd6FDcghxdhMwz2VK6ygl0CuzsNgkE-3JXcRMiGVV4EXv-EMf26ZpsWpQPOgGHd-olcl-ZAHEn_7ro8f07XtLYLndYord4" srcSet="https://img-a.udemycdn.com/course/240x135/519442_63fe_2.jpg?TDnbuuMj5fWR7YpsiBKzn6JUpIO3nCDfIcd6FDcghxdhMwz2VK6ygl0CuzsNgkE-3JXcRMiGVV4EXv-EMf26ZpsWpQPOgGHd-olcl-ZAHEn_7ro8f07XtLYLndYord4 1x" />
                <div className="play-button">
                </div>
              </div>
            </Link>
            <Link className='card--learning__details' to={`/student/course/${studentCourse.id}`}>
              <div className="card__details">
                <strong className="details__name">{studentCourse.courseName}</strong>
                <div className="details__instructor">Rob Percival<span>, Web Developer And Teacher</span></div>
                <div className="details__bottom">
                  <span className="details__progress"><span className="progress__bar" style={{width: '1%'}}></span></span>
                  <span className="a11 text-midnight-lighter progress__text tooltip-container">
                    <div className="ellipsis">1% Complete</div>
                  </span>
                  <div className="details__bottom--review dib pull-right">
                    <div>
                      <div role="button" tabIndex="0" data-purpose="review-button" className="leave-rating--review-container--vertical--120k4">
                        <div aria-label="Rating: 0 out of 5" data-purpose="star-rating-shell" className="star-rating-shell star-rating--star-rating--static--3wPvS star-rating--star-rating--small--yMOwk">
                          <div><span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span><span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '0%'}}></span></div>
                          <div><span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span><span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '0%'}}></span></div>
                          <div><span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span><span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '0%'}}></span></div>
                          <div><span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span><span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '0%'}}></span></div>
                          <div><span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span><span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '0%'}}></span></div>
                        </div>
                        <span className="leave-rating--helper-text--21RPx" data-purpose="helper-text">Leave a rating</span>
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
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  studentCourses: studentCourses,
});

export default connect(mapStateToProps)(withRouter(StudentCourses));
