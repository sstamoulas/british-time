import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ProfileImage from './../../components/profile-image/profile-image.component';

import { selectCourseInstructors } from './../../redux/instructor-course/instructor-course.selectors';
import { instructorCourse } from './../../redux/instructor-course/instructor-course.selectors';

import './course-instructor.styles.scss';

const isObjectEmpty = (obj) => {
  return obj === undefined || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

const CourseInstructor = ({ instructors, instructorCourse, handleChange }) => {

  return isObjectEmpty(instructors) ? (
    <div className="course-landing-page__main-content component-margin">
      <div>This course is currently not available.</div>
    </div>
  ) : (
    <div className="course-landing-page__main-content component-margin">
      <div className="clp-component-render">
        <div className="instructor">
          <span id="instructor" className="in-page-offset-anchor"></span>
          <div className="clp-component-render">
            <div className="ud-component--course-landing-page-udlite--instructors">
              <div className="styles--instructors--2JsS3">
                <h2 className="udlite-heading-xl styles--instructors__header--16F_8">Instructor</h2>
                <div className="instructor--instructor--1wSOF" data-purpose="instructor-bio">
                  <span className="in-page-offset-anchor" id="instructor-1"></span>
                  <select value={instructorCourse?.instructorId} onChange={handleChange}>
                    <option defaultValue hidden>Select an Instructor</option>
                    { 
                      Object.entries(instructors).map(([index, instructor]) => (
                        <option key={index} value={JSON.stringify(instructor)}>
                          {
                            instructor.userName
                          } 
                        </option>
                      ))
                    }
                  </select>
                  {
                    !isObjectEmpty(instructorCourse) && (
                      <Fragment>
                        <div>
                          <div className="udlite-heading-lg instructor--instructor__title--34ItB">{instructorCourse.userName}</div>
                          <div className="udlite-text-md instructor--instructor__job-title--1HUmd">{instructorCourse.jobTitle}</div>
                        </div>
                        <div className="instructor--instructor__image-and-stats--1IqE7">
                          <a className="instructor--instructor__image-link--9e3fA">
                            <ProfileImage 
                              alt={instructorCourse.userName} 
                              className="instructor--instructor__image--va-P5 udlite-avatar udlite-avatar-image" 
                              publicId={instructorCourse.instructorId} 
                              width="64" 
                              height="64" 
                              style={{width: '6.4rem', height: '6.4rem'}} 
                            />
                          </a>
                          <ul className="unstyled-list udlite-block-list">
                            <li>
                              <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                                <div className="udlite-block-list-item-content">{instructorCourse.rating || 'N/A'} Instructor Rating</div>
                              </div>
                            </li>
                            <li>
                              <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                                <div className="udlite-block-list-item-content">{instructorCourse.instructorReviews || 0} Reviews</div>
                              </div>
                            </li>
                            <li>
                              <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                                <div className="udlite-block-list-item-content">{instructorCourse.totalStudents || 0} Students</div>
                              </div>
                            </li>
                            <li>
                              <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                                <div className="udlite-block-list-item-content">{instructorCourse.instructorCourses || 0} Courses</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="show-more--container--1QLmn">
                          <span id="u96-show-more--1" data-type="checkbox" data-checked="checked" style={{display: 'none'}}></span>
                          <div style={{maxHeight: '146px'}} className="show-more--content--isg5c show-more--with-gradient--2abmN">
                            <div>
                              <div className="udlite-text-sm instructor--instructor__description--1dHxF" data-purpose="description-content">
                                <p>{instructorCourse.bio || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  instructors: selectCourseInstructors,
  instructorCourse: instructorCourse,
});

export default connect(mapStateToProps)(CourseInstructor);
