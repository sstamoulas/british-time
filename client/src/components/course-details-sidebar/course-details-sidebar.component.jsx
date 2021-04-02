import React, { useState, useEffect } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter, useParams } from 'react-router-dom';

import CourseImage from './../../components/course-image/course-image.component';

import { createStudentCourseStart } from './../../redux/student-course/student-course.actions';
import { addPaymentHistoryTransactionStart } from './../../redux/payment-history/payment-history.actions';
import { updateStudentFundsStart } from './../../redux/student/student.actions';

import { selectCurrentCourse } from '../../redux/course/course.selectors';
import { instructorCourse } from './../../redux/instructor-course/instructor-course.selectors';
import { studentCourses } from './../../redux/student-course/student-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROUTES from './../../constants/routes';

import './course-details-sidebar.styles.scss';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const CourseDetailsPage = ({ 
  history, 
  currentUser,
  courseDetails, 
  studentCourses,
  instructor,
  addPaymentHistoryTransactionStart,
  updateStudentFundsStart,
  createStudentCourseStart 
}) => {
  const { courseId } = useParams();
  const [sideBarFixed, setSideBarFixed] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', fixSideBar);

    function fixSideBar() {
      if(window.scrollY >= 360) {
        setSideBarFixed(true);
      }
      else {
        setSideBarFixed(false);
      }
    }

    return () => window.removeEventListener('scroll', fixSideBar);
  }, []);

  const handleClick = (event) => {
    if(currentUser) {
      const courseInfo = {
        title: `${courseDetails.courseName} By ${instructor.userName}`,
        type: 'Credit',
        amount: "30",
        date: (new Date()).toString(),
        transactionId: courseDetails.id,
      }

      batch(() => {
        createStudentCourseStart({ 
          courseId: courseId, 
          instructorId: instructor.instructorId, 
          instructorCourseId: instructor.instructorCourseId,
        });
        addPaymentHistoryTransactionStart(currentUser.id, courseInfo);

        courseInfo.type = 'Pending Debit'

        addPaymentHistoryTransactionStart(instructor.instructorId, courseInfo);
        updateStudentFundsStart(currentUser.id, currentUser.funds - 30);
      })

      history.push(ROUTES.STUDENT);
    }
    else {
      history.push(ROUTES.SIGN_IN);
    }
    event.preventDefault();
  }

  const hasTakenCourse = currentUser && !isObjectEmpty(studentCourses) && 
    Object.values(studentCourses).map((studentCourse) => 
      studentCourse.instructorCourseId).includes(instructor.instructorCourseId)

  return (
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
                            <CourseImage imageExtension={courseDetails.imageExtension} courseId={courseDetails.id} alt="" width="240" height="135" />
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
                              <div data-purpose="add-to-cart"><Link to={`/student/course/${instructor.instructorCourseId}`} className="udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart" style={{width: '100%'}}>Go to Course</Link></div>
                            :
                              <div data-purpose="add-to-cart"><button type="button" className={`udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart ${(currentUser?.funds < 30 || isObjectEmpty(instructor)) ? 'udlite-btn-disabled' : ''}`} style={{width: '100%'}} onClick={handleClick} disabled={(currentUser?.funds < 30 || isObjectEmpty(instructor)) ? true : false}>{ isObjectEmpty(instructor) ?  'Not Available' : (currentUser?.funds < 30 ? 'Insufficient Funds' : 'Add to Cart') }</button></div>
                          }
                          </div>
                        </div>
                      </div>
                      {
                        false && (
                          <div className="money-back-notice">
                            <div className="buy-box__element buy-box__element--money-back" data-purpose="money-back-guarantee"><span className="money-back">30-Day Money-Back Guarantee</span></div>
                          </div>
                        )
                      }
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
                        <Link to={`/student/course/${instructor.instructorCourseId}`} className="udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md styles--btn--express-checkout--28jN4">Go to Course</Link>
                      ) : (
                        <button type="button" className={`udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md styles--btn--express-checkout--28jN4 ${(currentUser?.funds < 30 || isObjectEmpty(instructor)) ? 'udlite-btn-disabled' : ''}`} onClick={handleClick} disabled={(currentUser?.funds < 30 || isObjectEmpty(instructor)) ? true : false}>
                          <span>{ isObjectEmpty(instructor) ? 'Not Available' : (currentUser?.funds < 30 ? 'Insufficient Funds' : 'Add to Cart') }</span>
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
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectCurrentCourse,
  instructor: instructorCourse,
  studentCourses: studentCourses,
  currentUser: currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  createStudentCourseStart: (courseDetails) => dispatch(createStudentCourseStart(courseDetails)),
  addPaymentHistoryTransactionStart: (userId, transaction) => 
    dispatch(addPaymentHistoryTransactionStart(userId, transaction)),
  updateStudentFundsStart: (userId, funds) =>
    dispatch(updateStudentFundsStart(userId, funds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseDetailsPage));
