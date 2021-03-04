import React, { useState, useEffect } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter, useParams } from 'react-router-dom';

import ProfileImage from './../../components/profile-image/profile-image.component';
import CourseImage from './../../components/course-image/course-image.component';

import { fetchCourseByIdStart } from '../../redux/course/course.actions';
import { fetchInstructorDetailsStart } from './../../redux/instructor/instructor.actions';
import { fetchInstructorsByCourseIdStart } from './../../redux/instructor-course/instructor-course.actions';
import { createStudentCourseStart } from './../../redux/student-course/student-course.actions';
import { addPaymentHistoryTransactionStart } from './../../redux/payment-history/payment-history.actions';
import { updateStudentFundsStart } from './../../redux/student/student.actions';

import { selectCurrentCourse } from '../../redux/course/course.selectors';
import { studentCourses } from './../../redux/student-course/student-course.selectors';
import { selectedCourseDetails, selectCourseInstructors } from './../../redux/instructor-course/instructor-course.selectors';
import { instructorDetails } from './../../redux/instructor/instructor.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROUTES from './../../constants/routes';

import './course-details-page.styles.scss';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const CourseDetailsPage = ({ 
  history, 
  currentUser,
  courseDetails, 
  instructors, 
  studentCourses,
  instructorDetails,
  fetchCourseByIdStart, 
  fetchInstructorDetailsStart,
  fetchInstructorsByCourseIdStart, 
  addPaymentHistoryTransactionStart,
  updateStudentFundsStart,
  createStudentCourseStart 
}) => {
  const { courseId } = useParams();
  const [sideBarFixed, setSideBarFixed] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState({instructorCourseId: Object.keys(instructors)[0], ...instructors[Object.keys(instructors)[0]]});

  useEffect(() => {
    window.addEventListener('scroll', fixSideBar);

    return () => {
      window.removeEventListener('scroll', fixSideBar);
    };

    function fixSideBar() {
      if(window.scrollY >= 360) {
        setSideBarFixed(true);
      }
      else {
        setSideBarFixed(false);
      }
    }
  }, []);

  useEffect(() => {
    if(isObjectEmpty(courseDetails)) {
      batch(() => {
        fetchCourseByIdStart(courseId);
        fetchInstructorsByCourseIdStart(courseId);
      });
    }
    else {
      fetchInstructorDetailsStart(selectedInstructor.instructorId);
    }
  }, [
    courseId, 
    courseDetails, 
    instructors, 
    selectedInstructor, 
    fetchCourseByIdStart, 
    fetchInstructorDetailsStart, 
    fetchInstructorsByCourseIdStart
  ])

  const handleChange = (event) => {
    setSelectedInstructor({instructorCourseId: event.target.value, ...instructors[event.target.value]})
  }

  const handleClick = (event) => {
    if(currentUser) {
      const courseInfo = {
        title: `${courseDetails.courseName} By ${instructorDetails.userName}`,
        type: 'Credit',
        amount: "30",
        date: (new Date()).toString(),
        transactionId: courseDetails.id,
      }

      batch(() => {
        createStudentCourseStart({ ...selectedInstructor });
        addPaymentHistoryTransactionStart(currentUser.id, courseInfo);
        updateStudentFundsStart(currentUser.id, currentUser.funds - 30);
      })

      history.push(ROUTES.STUDENT);
    }
    else {
      history.push(ROUTES.SIGN_IN);
    }
    event.preventDefault();
  }

  const hasTakenCourse = !isObjectEmpty(studentCourses) && 
    Object.values(studentCourses).map((studentCourse) => 
      studentCourse.instructorCourseId).includes(selectedInstructor.instructorCourseId)

  return !isObjectEmpty(courseDetails) && (
    <div className="paid-course-landing-page__container component-margin">
      <div className="sidebar-container-position-manager">
        <div className="clp-component-render">
          <div className="clp-component-render">
            <div className="ud-component--course-landing-page-udlite--sidebar-container">
              <div data-purpose="sidebar-container" className={`course-landing-page_sidebar-container ${sideBarFixed ? 'sidebar-container--fixed--2xu7a' : ''}`}>
                <div className="sidebar-container--content--gsvyJ">
                  <div className="sidebar-container--content-group--1upV8">
                    <div className="sidebar-container--introduction-asset--5ckuC">
                      <div className="intro-asset--wrapper--zDTjg">
                        <div className="intro-asset--asset--1eSsi" data-purpose="introduction-asset">
                          <button type="button" className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md udlite-custom-focus-visible intro-asset--placeholder--16yPA" aria-label="Play course preview">
                            <span className="intro-asset--img-aspect--1UbeZ">
                              <CourseImage courseId={courseDetails.id} alt="" width="240" height="135" />
                            </span>
                            <span className="intro-asset--overlay--3Z3co intro-asset--gradient--Od7zs"></span>
                            <span className="udlite-play-overlay">
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar-container--purchase-section--17KRp">
                      <div className="main-cta-container" data-purpose="purchase-section">
                        <div className="buy-box-main">
                          <div className="buy-box" data-purpose="buy-box">
                            <div className="buy-box__element">
                              <div>
                                <div className="price-text--container--Ws-fP udlite-clp-price-text" data-purpose="price-text-container">
                                  <div className="price-text--price-part--Tu6MH udlite-clp-discount-price udlite-heading-xxl" data-purpose="course-price-text">
                                    <span>
                                    {
                                      hasTakenCourse ? (
                                        <span>Paid</span>
                                      ) : (
                                        <span>₺30</span>
                                      )
                                    }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="buy-box__element buy-box__element--add-to-cart-button">
                            {
                              hasTakenCourse ?
                                <div data-purpose="add-to-cart"><Link to={`/student/course/${selectedInstructor.instructorCourseId}`} className="udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart" style={{width: '100%'}}>Go to Course</Link></div>
                              :
                                <div data-purpose="add-to-cart"><button type="button" className={`udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart ${currentUser && currentUser.funds < 30 ? 'udlite-btn-disabled' : ''}`} style={{width: '100%'}} onClick={handleClick} disabled={currentUser && currentUser.funds < 30 ? true : false}>{ currentUser && currentUser.funds < 30 ? 'Insufficient Funds' : 'Add to Cart' }</button></div>
                            }
                            </div>
                          </div>
                        </div>
                        <div className="money-back-notice">
                          <div className="buy-box__element buy-box__element--money-back" data-purpose="money-back-guarantee"><span className="money-back">30-Day Money-Back Guarantee</span></div>
                        </div>
                        <div className="incentives--incentives-container--CUQ8q">
                          <h2 className="udlite-heading-md incentives--header--3O_-f" data-purpose="header">This course includes:</h2>
                          <ul className="unstyled-list udlite-block-list">
                            <li>
                              <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                                <span className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon"></span>
                                <div className="udlite-block-list-item-content"><span data-purpose="video-content-length">77 hours on-demand video</span></div>
                              </div>
                            </li>
                            <li>
                              <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                                <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                                </svg>
                                <div className="udlite-block-list-item-content"><span data-purpose="has-lifetime-access">Full lifetime access</span></div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-purpose="slider-menu-container" className={`course-landing-page_slider-menu-container ${sideBarFixed ? 'sidebar-container--fixed--2xu7a' : ''}`}>
                <div className="slider-menu" data-purpose="slider-menu">
                  <div className="slider-menu__lead">
                    <div className="slider-menu__title" data-purpose="title">{courseDetails.courseName}</div>
                  </div>
                  <div className="slider-menu__price-text-container">
                    <div>
                      <div className="price-text--container--Ws-fP slider-menu__price-text udlite-clp-price-text" data-purpose="price-text-container">
                        <div className="price-text--price-part--Tu6MH udlite-clp-discount-price udlite-heading-lg" data-purpose="course-price-text">
                          <span>
                            {
                              hasTakenCourse ? (
                                <span>Paid</span>
                              ) : (
                                <span>₺30</span>
                              )
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-menu__buy-button">
                    <div>
                      {
                        hasTakenCourse ? (
                          <Link to={`/student/course/${selectedInstructor.instructorCourseId}`} className="udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md styles--btn--express-checkout--28jN4">Go to Course</Link>
                        ) : (
                          <button type="button" className={`udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md styles--btn--express-checkout--28jN4 ${currentUser && currentUser.funds < 30 ? 'udlite-btn-disabled' : ''}`} onClick={handleClick} disabled={currentUser && currentUser.funds < 30 ? true : false}>
                            <span>{ currentUser && currentUser.funds < 30 ? 'Insufficient Funds' : 'Add to Cart' }</span>
                          </button>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                            <CourseImage hasImage={courseDetails.hasImage} courseId={courseDetails.id} alt="" width="240" height="135" />
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
        <div className="course-landing-page__main-content component-margin">
         <div className="clp-component-render">
            <div className="clp-component-render">
             <div className="ud-component--course-landing-page-udlite--whatwillyoulearn">
                <div className="what-you-will-learn--what-will-you-learn--mnJ5T">
                 <h2 className="udlite-heading-xl what-you-will-learn--title--hropy">What you'll learn</h2>
                  <div className="what-you-will-learn--content-spacing--3btHJ">
                    <ul className="unstyled-list udlite-block-list what-you-will-learn--objectives-list--2cWZN">
                      { courseDetails.objectives &&
                        courseDetails.objectives.map((courseObjective) => (
                          <li key={courseObjective.id}>
                            <div data-purpose="objective" className="udlite-block-list-item udlite-blok-list-item-small udlite-block-list-item-tight udlie-block-list-item-neutral udlite-text-sm">
                              <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                              <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objective-item--ECarc">{courseObjective.text}</span></div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="course-landing-page__main-content component-margin"></div>
        <div className="course-landing-page__main-content component-margin">
          <div className="clp-component-render">
            <div className="clp-component-render">
              <div className="ud-component--course-landing-page-udlite--requirements">
                <div>
                  <h2 className="udlite-heading-xl requirements--title--2j7S2">Requirements</h2>
                  <ul className="unstyled-list udlite-block-list">
                    { courseDetails.requirements &&
                      courseDetails.requirements.map((courseRequirement) => (
                        <li key={courseRequirement.id}>
                          <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                            <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                            </svg>
                            <div className="udlite-block-list-item-content">{courseRequirement.text}</div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                      <select onChange={handleChange}>
                        {
                          Object.entries(instructors).map(([index, instructor]) => (
                            <option key={index} value={index}>
                              {
                                instructor.userName
                              } 
                            </option>
                          ))
                        }
                      </select>
                      <div>
                        <div className="udlite-heading-lg instructor--instructor__title--34ItB">{instructorDetails.userName}</div>
                        <div className="udlite-text-md instructor--instructor__job-title--1HUmd">{instructorDetails.jobTitle}</div>
                      </div>
                      <div className="instructor--instructor__image-and-stats--1IqE7">
                        <a className="instructor--instructor__image-link--9e3fA">
                          <ProfileImage 
                            alt={instructorDetails.userName} 
                            className="instructor--instructor__image--va-P5 udlite-avatar udlite-avatar-image" 
                            hasImage={instructorDetails.hasImage}  
                            publicId={selectedInstructor.instructorId} 
                            width="64" 
                            height="64" 
                            style={{width: '6.4rem', height: '6.4rem'}} 
                          />
                        </a>
                        <ul className="unstyled-list udlite-block-list">
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">{selectedInstructor.rating || 'N/A'} Instructor Rating</div>
                            </div>
                          </li>
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">{instructorDetails.instructorReviews || 0} Reviews</div>
                            </div>
                          </li>
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">{selectedInstructor.totalStudents || 0} Students</div>
                            </div>
                          </li>
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">{instructorDetails.instructorCourses || 0} Courses</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="show-more--container--1QLmn">
                        <span id="u96-show-more--1" data-type="checkbox" data-checked="checked" style={{display: 'none'}}></span>
                        <div style={{maxHeight: '146px'}} className="show-more--content--isg5c show-more--with-gradient--2abmN">
                          <div>
                            <div className="udlite-text-sm instructor--instructor__description--1dHxF" data-purpose="description-content">
                              <p>{instructorDetails.bio || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  courseDetails: selectCurrentCourse,
  instructorDetails: instructorDetails,
  studentCourses: studentCourses,
  currentUser: currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourseByIdStart: (courseId) => dispatch(fetchCourseByIdStart(courseId)),
  fetchInstructorDetailsStart: (instructorId) => dispatch(fetchInstructorDetailsStart(instructorId)),
  fetchInstructorsByCourseIdStart: (courseId) => dispatch(fetchInstructorsByCourseIdStart(courseId)),
  createStudentCourseStart: (courseDetails) => dispatch(createStudentCourseStart(courseDetails)),
  addPaymentHistoryTransactionStart: (userId, transaction) => 
    dispatch(addPaymentHistoryTransactionStart(userId, transaction)),
  updateStudentFundsStart: (userId, funds) =>
    dispatch(updateStudentFundsStart(userId, funds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseDetailsPage));
