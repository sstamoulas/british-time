import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CourseImage from './../course-image/course-image.component';

import './carousel.styles.scss';

const Carousel = ({ type, courses }) => {
  let carouselContainer, carouselList, carouselItem, carouselButton;
  
  useEffect(() => {
    if(courses.length) {
      carouselContainer = document.querySelector(".js-carousel-container");
      carouselList = document.querySelector(`.js-carousel-list-${type}`);
      carouselItem = document.querySelectorAll(`.js-carousel-item-${type}`);
      carouselButton = document.querySelectorAll(`.js-carousel-button-${type}`);

      window.addEventListener("resize", setItemWidth);
      setItemWidth();

      carouselButton.forEach((elem) => elem.addEventListener("click", slide));
    }
  }, [courses, carouselContainer, carouselList, carouselItem, carouselButton])

  let setItemWidth = function(){
    carouselList.removeAttribute("style");
    let curWidth = carouselItem[0].offsetWidth * carouselItem.length;
    carouselList.style.width = `${curWidth}px`;

    carouselButton.forEach((elem) => {
      elem.style.top = '25%';
      if(elem.dataset.dir === 'prev') {
        elem.style.left = '9px';
      }

      if(elem.dataset.dir === 'next') {
        elem.style.right = '19px';
      }
    });
  }

  let slide = function(){
    let button = this;
    let dir = button.dataset.dir;
    let curPos = parseInt(carouselList.style.left) || 0;
    let moveTo = 0;
    let containerWidth = carouselContainer.offsetWidth;
    let listWidth = carouselList.offsetWidth;
    let before = (curPos + containerWidth);
    let after = listWidth + (curPos - containerWidth);
    
    if(dir === "next") {
      moveTo = (after < containerWidth) ? (curPos - after) : (curPos - containerWidth);
    } else {
      moveTo = (before >= 0) ? 0 : (curPos + containerWidth);
    }

    carouselList.style.left = `${moveTo}px`;
  }

  return courses.length && (
    <div className="carousel-width">
      <div className="carousel js-carousel">
        <button className={`carousel__button--prev js-carousel-button-${type} carousel--button--21JBZ udlite-btn-icon-round udlite-btn-large udlite-btn-icon-large`} data-dir="prev"></button>
        <div className="carousel__container js-carousel-container">
          <div className={`carousel__list js-carousel-list-${type}`}>
          {
            courses.map((course) => console.log(course) || (
              <div key={course.id} data-index="0" className={`carousel__item slick-slide slick-active slick-current js-carousel-item-${type}`} tabIndex="-1" aria-hidden="false" style={{outline: 'none', width: '231px'}}>
                <div>
                  <div data-courseid="637930" className="course-discovery-unit--card-margin--2TVw4 merchandising-course-card--card--2UfMa">
                    <Link to={`/course/details/${course.id}`} data-purpose="merchandising-course-card-body-637930" target="_self" className="merchandising-course-card--mask--2-b-d">
                      <div className="merchandising-course-card--card-header--89z8L">
                        <CourseImage className="merchandising-course-card--course-image--3G7Kh" courseId={course.id} alt="" width="240" height="135" />
                      </div>
                      <div className="merchandising-course-card--card-body--3OpAH">
                        <div>
                          <div className="merchandising-course-card--course-title--2Ob4m" data-purpose="course-card-title">{course.courseName}</div>
                          <span className="merchandising-course-card--instructor-titles--vXVfV" data-purpose="course-card-instructor-titles">{course.headline}</span>
                        </div>
                        <div className="merchandising-course-card--price-wrapper--1eeWg" data-purpose="course-card-price-wrapper">
                          <div className="price-text-container price-text--base-price__container--Xwk8v price-text--reverse--1rh1B" data-purpose="price-text-container">
                            <div className="course-price-text price-text--base-price__discount--1J7vF price-text--black--1qJbH price-text--medium--2clK9 price-text--semibold--DLyJV" data-purpose="course-price-text">
                              <span className="sr-only">Current price</span>
                              <span>
                                <span>₺30</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
        </div>
        <button className={`carousel__button--next js-carousel-button-${type} carousel--button--21JBZ udlite-btn-icon-round udlite-btn-large udlite-btn-icon-large`} data-dir="next"></button>
      </div>
    </div>
  )
}

export default Carousel;