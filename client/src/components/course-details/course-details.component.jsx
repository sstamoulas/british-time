import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CourseDetailsSidebar from './../../components/course-details-sidebar/course-details-sidebar.component';
import CourseObjectives from './../../components/course-objectives/course-objectives.component';
import CourseRequirements from './../../components/course-requirements/course-requirements.component';
import CourseInstructor from './../../components/course-instructor/course-instructor.component';
import CourseImage from './../../components/course-image/course-image.component';

import { updateInstructorCourseSuccess } from './../../redux/instructor-course/instructor-course.actions';

import { selectCurrentCourse } from '../../redux/course/course.selectors';

import { levels } from './../../constants/constants';

import './course-details.styles.scss';

const CourseDetails = ({ level, courseDetails, updateInstructorCourseSuccess }) => {
  const onInstructorChangeCallback = (event, instructors) => {
    const instructorCourse = Object.values(instructors)
      .map((instructor, index) => instructor)
      .filter((instructor) => instructor.instructorId === event.target.value)[0];

    updateInstructorCourseSuccess(instructorCourse);
  }

  return (
    <div className="paid-course-landing-page__container component-margin">
      <CourseDetailsSidebar />
      <div className="top-container dark-background">
        <div className="dark-background-inner-position-container">
          <div className="dark-background-inner-text-container">
            <div className="course-landing-page__introduction-asset__main">
              <div className="clp-component-render">
                <div className="clp-component-render">
                  <div className="ud-component--course-landing-page-udlite--introduction-asset">
                    <div className="intro-asset--wrapper--zDTjg">
                      <div className="intro-asset--asset--1eSsi" data-purpose="introduction-asset">
                        <button type="button" className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md udlite-custom-focus-visible intro-asset--placeholder--16yPA" aria-label="Play course preview">
                          <span className="intro-asset--img-aspect--1UbeZ">
                            <CourseImage courseId={courseDetails.courseName} alt="" width="240" height="135" />
                          </span>
                          <span className="intro-asset--overlay--3Z3co intro-asset--gradient--Od7zs">
                          </span>
                          <span className="udlite-play-overlay">
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="course-landing-page__main-content"></div>
            <div className="course-landing-page__main-content">
              <div className="clp-component-render">
                <div className="udlite-text-sm clp-lead">
                  <div className="clp-component-render">
                    <h1 className="udlite-heading-xl clp-lead__title clp-lead__title--small" data-purpose="lead-title">
                      {courseDetails.courseName} {levels[level].text} - {levels[level].headline}
                    </h1>
                    <div className="udlite-text-md clp-lead__headline" data-purpose="lead-headline">{courseDetails.headline}&nbsp;
                      Speaking, Listening, Reading and Writing Excercises. (10) 15-30 minute one-to-one sessions with a native speaker. Full lifetime access. Private instructor responds to any questions, comments or concerns with-in 24 hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <CourseObjectives level={level} />
        <CourseRequirements level={level} />
        <CourseInstructor handleChange={onInstructorChangeCallback} />
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectCurrentCourse,
});

const mapDispatchToProps = (dispatch) => ({
  updateInstructorCourseSuccess: (instructorCourse) => dispatch(updateInstructorCourseSuccess(instructorCourse)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
