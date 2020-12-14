import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';

import { fetchInstructorCourseDetailsByCourseIdStart } from './../../redux/instructor-course/instructor-course.actions';
import { createStudentCourseStart } from './../../redux/student-course/student-course.actions';

import { selectedCourseDetails } from './../../redux/instructor-course/instructor-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROUTES from './../../constants/routes';

import './course-details-page.styles.scss';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const CourseDetailsPage = ({ history, currentUser, courseDetails, fetchInstructorCourseDetailsByCourseIdStart, createStudentCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...courseDetails });
  const [sideBarFixed, setSideBarFixed] = useState(false);
  const { courseName } = state;

  useEffect(() => {
    let isMounted = true;
    window.addEventListener('scroll', fixSideBar);

    return () => {
      isMounted = false;

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
      fetchInstructorCourseDetailsByCourseIdStart(courseId);
    }
  }, [courseId, courseDetails, fetchInstructorCourseDetailsByCourseIdStart])

  const handleClick = (event) => {
    createStudentCourseStart(state, courseId);
    history.push(ROUTES.STUDENT);
    event.preventDefault();
  }

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
                              <img src="https://img-a.udemycdn.com/course/240x135/1526882_ea81_43.jpg?C7lEtYPLnG-mvZ28edzO0MfgEx1kNA89jQ8eC5XoBNelZ8544ucFfuiT7yMf2_fJrcuDkeQ4Vqm-ntCEPfNeRFJi5fHoWx7EU-PcyLJCn5JIRl7foQGTTFdMnvrV0pPxtw" srcSet="https://img-a.udemycdn.com/course/240x135/1526882_ea81_43.jpg?C7lEtYPLnG-mvZ28edzO0MfgEx1kNA89jQ8eC5XoBNelZ8544ucFfuiT7yMf2_fJrcuDkeQ4Vqm-ntCEPfNeRFJi5fHoWx7EU-PcyLJCn5JIRl7foQGTTFdMnvrV0pPxtw 1x, https://img-a.udemycdn.com/course/480x270/1526882_ea81_43.jpg?Dgr3O0PHBIzQ5h_hIFweXEUQ4jcGy7z25ftES8lxTJKd60NLXDA_XpK7b2Po5bf81sMBAEEy5Obc8UT6ecmQJMmf6h-tpyt9tJY3ZGbJVZF_67ytpt43OzH1E-4yF3C_lQ 2x" alt="" width="240" height="135" />
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
                                  <div className="price-text--price-part--Tu6MH udlite-clp-discount-price udlite-heading-xxl" data-purpose="course-price-text"><span><span>₺27.99</span></span></div>
                                </div>
                              </div>
                            </div>
                            <div className="buy-box__element buy-box__element--add-to-cart-button">
                              <div data-purpose="add-to-cart"><button type="button" className="udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart" style={{width: '100%'}} onClick={handleClick}>Add to cart</button></div>
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
                    <div className="slider-menu__title" data-purpose="title">English for Beginners: Intensive Spoken English Course</div>
                  </div>
                  <div className="slider-menu__price-text-container">
                    <div>
                      <div className="price-text--container--Ws-fP slider-menu__price-text udlite-clp-price-text" data-purpose="price-text-container">
                        <div className="price-text--price-part--Tu6MH udlite-clp-discount-price udlite-heading-lg" data-purpose="course-price-text">
                          <span>
                            <span>₺27.99</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-menu__buy-button">
                    <div>
                      <button type="button" className="udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md styles--btn--express-checkout--28jN4" onClick={handleClick}>
                        <span>Add to Cart</span>
                      </button>
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
                            <img src="https://img-a.udemycdn.com/course/240x135/1526882_ea81_43.jpg?Blh_hd-OCzQ-5VAZrNu-On0hBfAeGkXqAkRn3uAFOQFPQG4IH1g4cTp1bl1kaoQPp_mMWIs8-MMNu-k2C6eUhy9MGNumZ7fU4r20QSmMjmIRcdJQgZIqWj5zEhA3i9wFCQ" srcSet="https://img-a.udemycdn.com/course/240x135/1526882_ea81_43.jpg?Blh_hd-OCzQ-5VAZrNu-On0hBfAeGkXqAkRn3uAFOQFPQG4IH1g4cTp1bl1kaoQPp_mMWIs8-MMNu-k2C6eUhy9MGNumZ7fU4r20QSmMjmIRcdJQgZIqWj5zEhA3i9wFCQ 1x, https://img-a.udemycdn.com/course/480x270/1526882_ea81_43.jpg?0JFWJQXz-bAdqqSpJtLLG20V12NxyXZ_WEBaCZZq4VcKbDFnef5K1AHoEpBTw-N8pYhefRKEq0dX05OMt5COUOIpP9k-xlNvhI9cx8f51EnzePmnKWde_zDvlVGP7LA-ww 2x" alt="" width="240" height="135" />
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
                      English for Beginners: Intensive Spoken English Course
                    </h1>
                    <div className="udlite-text-md clp-lead__headline" data-purpose="lead-headline">
                      English speaking course. 77 Hours of English language speaking, English listening practice. 1000 English language words
                    </div>
                  </div>
                  <div className="clp-lead__element-item">
                    <div className="clp-component-render">
                      <div className="clp-component-render">
                        <div className="ud-component--course-landing-page-udlite--instructor-links">
                          <div className="instructor-links--instructor-links--3d8_F" data-purpose="instructor-name-top">
                            <span className="instructor-links--names--7UPZj">
                              <span className="udlite-text-sm">Created by &nbsp;</span>
                              <a className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md udlite-text-sm udlite-instructor-links" data-position="1" href="#instructor-1">
                                <span>Logus Online</span>
                              </a>
                            </span>
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
     <div className="bottom-container">
        <div className="course-landing-page__main-content component-margin">
         <div className="clp-component-render">
            <div className="clp-component-render">
             <div className="ud-component--course-landing-page-udlite--whatwillyoulearn">
                <div className="what-you-will-learn--what-will-you-learn--mnJ5T">
                 <h2 className="udlite-heading-xl what-you-will-learn--title--hropy">What you'll learn</h2>
                  <div className="what-you-will-learn--content-spacing--3btHJ">
                    <ul className="unstyled-list udlite-block-list what-you-will-learn--objectives-list--2cWZN">
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-blok-list-item-small udlite-block-list-item-tight udlie-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objective-item--ECarc">You will learn over 1000 vital English words, expressions and idioms, and how to use them in real life.</span></div>
                        </div>
                      </li>
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objective-item--ECarc">You will learn the most important English grammar wth tons of English-speaking practice.</span></div>
                       </div>
                      </li>
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objective-item--ECarc">You will learn t think in English and to speak English fluently. (in Intermediate level)</span></div>
                       </div>
                     </li>
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objective-item--ECarc">You will learn to read in English and o spell English words intuitively</span></div>
                        </div>
                      </li>
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-lock-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objectve-item--ECarc">You will learn to understand movies and TV shows in English.</span></div>
                        </div>
                      </li>
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-lern--objective-item--ECarc">After the course, you can travel the world freely, without a language barrier</span></div>
                        </div>
                      </li>
                      <li>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content"><span className="what-you-will-learn--objective-item--ECarc">After the course, you can start preparing for English language tests like TOEFL, IELTS, GMAT etc.</span></div>
                        </div>
                      </li>
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
                    <li>
                      <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                        <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                        </svg>
                        <div className="udlite-block-list-item-content">A computer, or a tablet, or a phone with good speakers or headphones. (So you can hear the pronunciation very clearly).</div>
                      </div>
                    </li>
                    <li>
                      <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                        <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                        </svg>
                        <div className="udlite-block-list-item-content">Absolutely no previous knowledge of English is necessary.</div>
                      </div>
                    </li>
                    <li>
                      <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                        <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                        </svg>
                        <div className="udlite-block-list-item-content">4 hours a week to speak English when you won't be disturbed.</div>
                      </div>
                    </li>
                    <li>
                      <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                        <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                        </svg>
                        <div className="udlite-block-list-item-content">Very positive attitude :)</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="course-landing-page__main-content component-margin" data-purpose="curriculum-practice-test"></div>
        <div className="course-landing-page__main-content component-margin">
          <div className="clp-component-render">
            <div className="clp-component-render">
              <div className="ud-component--course-landing-page-udlite--description">
                <div className="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
                  <h2 className="udlite-heading-xl styles--description__header--3SNsO">Description</h2>
                  <div className="show-more--container--1QLmn">
                    <span id="u411-show-more--1" data-type="checkbox" data-checked="checked" style={{display: 'none'}}></span>
                    <div style={{maxHeight: '221px'}} className="show-more--content--isg5c show-more--with-gradient--2abmN">
                      <div>
                        <div data-purpose="safely-set-inner-html:description:description">
                          <p><strong>Introducing LOGUS</strong></p>
                          <p>Your <strong>most powerful and intensive online English language course</strong>.</p>
                          <p>It is a must-have <strong>English language course for complete beginners</strong> in English, who want to reach the<strong> intermediate level of spoken English</strong> language in the <strong>shortest time possible</strong>.
                            &nbsp; 
                          </p>
                          <p><br /></p>
                          <p><strong>The killer advantages of English language course LOGUS that blow the competition out of the water:</strong>
                            &nbsp; 
                          </p>
                          <ul>
                            <li>
                              <p><strong>It is not a short basic course</strong> of English&nbsp;language. It is a <strong>full beginner to intermediate course of spoken English</strong>. It is specifically designed to help you build all the necessary skills for&nbsp;the real-life day-to-day use.&nbsp; &nbsp; </p>
                            </li>
                            <li>
                              <p>It is a <strong>100% animated</strong> and interactive spoken&nbsp;English language course, which makes it very fun to use.&nbsp; &nbsp; </p>
                            </li>
                            <li>
                              <p>You get over<strong> 77 hours of intensive spoken English language practice</strong>. Each English language lesson lasts about 1 hour and a half.&nbsp; &nbsp; </p>
                            </li>
                            <li>
                              <p>It is <strong>100% communicative</strong> intensive spoken English language course. <strong>You speak English language all the time</strong> and you say over <strong>2000 English words</strong> in each lesson.&nbsp; &nbsp;&nbsp; </p>
                            </li>
                            <li>
                              <p>LOGUS doesn't teach you separate English words. You learn everything only in the context.&nbsp; &nbsp;&nbsp; </p>
                            </li>
                            <li>
                              <p>LOGUS is the only online video course obsessed&nbsp;with perfecting your speech fluency. What good is your knowledge of English grammar and words if you can't speak English fluently? Your fluency is our number 1 priority.&nbsp; &nbsp; </p>
                            </li>
                            <li>
                              <p>English grammar is explained in extremely simple and&nbsp; &nbsp; &nbsp; intuitive way, with tons of examples and many hours of listening and&nbsp; &nbsp; &nbsp; speaking practice.&nbsp; </p>
                              <p><br /></p>
                            </li>
                          </ul>
                          <p>Needless to say, all English words and English grammar are translated into your native language.
                            &nbsp; 
                          </p>
                          <p>All the vocabulary and grammar are translated into the following languages: English, Spanish Brazilian Portuguese and Hindi.</p>
                        </div>
                        <div className="styles--audience--2pZ0S" data-purpose="target-audience">
                          <h2 className="udlite-heading-xl styles--audience__title--1Sob_">Who this course is for:</h2>
                          <ul className="styles--audience__list--3NCqY">
                            <li>It is a must-have English course for complete beginners, who want to reach the intermediate level of spoken English in the shortest time possible.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div>
                        <div className="udlite-heading-lg instructor--instructor__title--34ItB"><a href="/user/logus/">Logus Online</a></div>
                        <div className="udlite-text-md instructor--instructor__job-title--1HUmd">Online School of the Future</div>
                      </div>
                      <div className="instructor--instructor__image-and-stats--1IqE7">
                        <a className="instructor--instructor__image-link--9e3fA" href="/user/logus/"><img alt="Logus Online" className="instructor--instructor__image--va-P5 udlite-avatar udlite-avatar-image" width="64" height="64" style={{width: '6.4rem', height: '6.4rem'}} src="https://img-a.udemycdn.com/user/75x75/43210610_e9ab_4.jpg?75S446bgsxJBCqF5vSrcF7g7hdWzm6fp61ldoIdbEBIuP2Mreg1vxwPBSk2BgqQVIhCPZGlbprUTBIGUlh12aO664MLxR6dCKfQatTnpOezLZ0SRfo-WAfsYPtL0" /></a>
                        <ul className="unstyled-list udlite-block-list">
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">4.3 Instructor Rating</div>
                            </div>
                          </li>
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">8,912 Reviews</div>
                            </div>
                          </li>
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">41,166 Students</div>
                            </div>
                          </li>
                          <li>
                            <div data-purpose="stat" className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                              <div className="udlite-block-list-item-content">4 Courses</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="show-more--container--1QLmn">
                        <span id="u96-show-more--1" data-type="checkbox" data-checked="checked" style={{display: 'none'}}></span>
                        <div style={{maxHeight: '146px'}} className="show-more--content--isg5c show-more--with-gradient--2abmN">
                          <div>
                            <div className="udlite-text-sm instructor--instructor__description--1dHxF" data-purpose="description-content">
                              <p>LOGUS is an innovative online school, which employs only highly skilled and professional teachers and psychologists to create the most efficient courses.</p>
                              <p>We always think outside the box and we strive to make online self-teaching on par or even higher quality than traditional schools.&nbsp; &nbsp;</p>
                              <p>Our mission: to make studying literally any topic a very easy and fun process.&nbsp; &nbsp;</p>
                              <p> We are working hard on implementing the newest AI (artificial intelligence) and AR (augmented reality) technologies to teach literally anything to anyone in the world in the most efficient and fun way possible.&nbsp; &nbsp;
                                &nbsp; 
                              </p>
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
  courseDetails: selectedCourseDetails,
  currentUser: currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorCourseDetailsByCourseIdStart: (courseId) => dispatch(fetchInstructorCourseDetailsByCourseIdStart(courseId)),
  createStudentCourseStart: (courseDetails, courseId) => 
    dispatch(createStudentCourseStart(courseDetails, courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseDetailsPage));
