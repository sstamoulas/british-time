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
import { instructorCourse } from './../../redux/instructor-course/instructor-course.selectors';

import './course-details.styles.scss';

const CourseDetails = ({ courseDetails, instructorCourse, updateInstructorCourseSuccess }) => {
  const onInstructorChangeCallback = (event) => {
    const instructorCourse = JSON.parse(event.target.value);

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
                            <CourseImage imageExtension={courseDetails.imageExtension} courseId={courseDetails.id} alt="" width="240" height="135" />
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
                      {courseDetails.courseName}
                    </h1>
                    <div className="udlite-text-md clp-lead__headline" data-purpose="lead-headline">{courseDetails.headline}&nbsp;
                      English speaking course. 77 Hours of English language speaking, English listening practice. 1000 English language words
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <CourseObjectives />
        <CourseRequirements />
        <CourseInstructor handleChange={onInstructorChangeCallback} />
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectCurrentCourse,
  instructorCourse: instructorCourse,
});

const mapDispatchToProps = (dispatch) => ({
  updateInstructorCourseSuccess: (instructorCourse) => dispatch(updateInstructorCourseSuccess(instructorCourse)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
