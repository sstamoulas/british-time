import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectInstructorCoursesForManaging } from './../../redux/instructor-course/instructor-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './instructor-courses.styles.scss';

const InstructorCourses = ({ currentUser, instructorCourses }) => (
  <div>
    <h1>Your Courses</h1>
    {
    Object.keys(instructorCourses).length ?
      Object.entries(instructorCourses).map(([index, instructorCourse]) => (
        <div key={instructorCourse.id} role="presentation" tabIndex="-1" className="card card--learning" data-purpose="enrolled-course-card">
          <Link to={`/instructor/course/${instructorCourse.id}`} className="card--learning__image" tabIndex="-1">
            <div className="card__image play-button-trigger">
              <img className="course-image" alt="The Complete Ruby on Rails Developer Course" width="240" height="135" src="https://img-a.udemycdn.com/course/240x135/519442_63fe_2.jpg?TDnbuuMj5fWR7YpsiBKzn6JUpIO3nCDfIcd6FDcghxdhMwz2VK6ygl0CuzsNgkE-3JXcRMiGVV4EXv-EMf26ZpsWpQPOgGHd-olcl-ZAHEn_7ro8f07XtLYLndYord4" srcSet="https://img-a.udemycdn.com/course/240x135/519442_63fe_2.jpg?TDnbuuMj5fWR7YpsiBKzn6JUpIO3nCDfIcd6FDcghxdhMwz2VK6ygl0CuzsNgkE-3JXcRMiGVV4EXv-EMf26ZpsWpQPOgGHd-olcl-ZAHEn_7ro8f07XtLYLndYord4 1x" />
              <div className="play-button">
              </div>
            </div>
          </Link>
          <Link className='card--learning__details' to={`/instructor/course/${instructorCourse.id}`}>
            <div className="card__details">
              <strong className="details__name">{instructorCourse.courseName}</strong>
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
        <div>You have not created any courses</div>
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorCourses: selectInstructorCoursesForManaging,
});

export default connect(mapStateToProps)(withRouter(InstructorCourses));
