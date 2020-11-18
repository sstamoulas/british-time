import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './carousel.styles.scss';

const Carousel = ({ type }) => {
  let carouselContainer, carouselList, carouselItem, carouselButton;
  
  useEffect(() => {
    carouselContainer = document.querySelector(".js-carousel-container");
    carouselList = document.querySelector(`.js-carousel-list-${type}`);
    carouselItem = document.querySelectorAll(`.js-carousel-item-${type}`);
    carouselButton = document.querySelectorAll(`.js-carousel-button-${type}`);

    window.addEventListener("resize", setItemWidth);
    setItemWidth();

    carouselButton.forEach((elem) => elem.addEventListener("click", slide));
  }, [])

  let setItemWidth = function(){
    carouselList.removeAttribute("style");
    let curWidth = carouselItem[0].offsetWidth * carouselItem.length;
    carouselList.style.width = `${curWidth}px`;
    carouselButton.forEach((elem) => elem.style.top = `${carouselList.offsetTop}px`);
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
      moveTo = (after < containerWidth) ? curPos - after : curPos - containerWidth;
    } else {
      moveTo = (before >= 0) ? 0 : curPos + containerWidth;
    }

    carouselList.style.left = `${moveTo}px`;
  }

  return (
    <div className="carousel js-carousel">
      <div className="carousel__container js-carousel-container">
        <button className={`carousel__button--prev js-carousel-button-${type}`} data-dir="prev"></button>
        <div className={`carousel__list js-carousel-list-${type}`}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <div key={number} data-index="0" className={`carousel__item slick-slide slick-active slick-current js-carousel-item-${type}`} tabIndex="-1" aria-hidden="false" style={{outline: 'none', width: '231px'}}>
              <div>
                <div data-courseid="637930" className="course-discovery-unit--card-margin--2TVw4 merchandising-course-card--card--2UfMa">
                  <Link to='/course/an-entire-mba-in-1-courseaward-winning-business-school-prof/' data-purpose="merchandising-course-card-body-637930" target="_self" className="merchandising-course-card--mask--2-b-d">
                    <div className="merchandising-course-card--card-header--89z8L">
                      <img className="merchandising-course-card--course-image--3G7Kh" alt="" width="240" height="135" src="https://img-b.udemycdn.com/course/240x135/637930_9a22_19.jpg?secure=HCifkE1Mt0Y29igEn4nsRw%3D%3D%2C1605732101" srcSet="https://img-b.udemycdn.com/course/240x135/637930_9a22_19.jpg?secure=HCifkE1Mt0Y29igEn4nsRw%3D%3D%2C1605732101 1x, https://img-a.udemycdn.com/course/480x270/637930_9a22_19.jpg?D9zrv5xSyJOm_g98LgoWkld9pgcFDzSgbrIH_pVAnrdDrrTPaCESbm4qjPSBKCub4BSldXRV5R6NQmN5Vnm6eKfQHRWuLvJIv6McQeIvBeNzdTbgObq4c4uDA7obVuy1 2x" />
                    </div>
                    <div className="merchandising-course-card--card-body--3OpAH">
                      <div>
                        <div className="merchandising-course-card--course-title--2Ob4m" data-purpose="course-card-title">An Entire MBA in 1 Course:Award Winning Business School Prof</div>
                        <span className="course-badge--course-badge--1AN7r">
                          <span data-purpose="badge" className="on-course-card badge badge-accented yellow">
                            <span className="badge-text">Bestseller</span>
                          </span>
                        </span>
                        <span className="merchandising-course-card--instructor-titles--vXVfV" data-purpose="course-card-instructor-titles">Chris Haroun</span>
                      </div>
                      <div className="fx-jsb">
                        <span data-purpose="details-rating" className="star-rating--details__rating--36AIt">
                          <span className="star-rating--star-container--186zZ">
                            <div aria-label="Rating: 4.5 out of 5, 43,128 reviews" data-purpose="star-rating-shell" className="star-rating-shell star-rating--star-rating--static--3wPvS star-rating--star-rating--tiny--2kjvX">
                              <div>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '100%'}}></span>
                              </div>
                              <div>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '100%'}}></span>
                              </div>
                              <div>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '100%'}}></span>
                              </div>
                              <div>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '100%'}}></span>
                              </div>
                              <div>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--unfilled--1aZxo"></span>
                                <span className="star-rating--review-star--Z6Nqj star-rating--review-star--filled--2D0bO" style={{width: '50%'}}></span>
                              </div>
                            </div>
                          </span>
                          <span aria-hidden="true" className="star-rating--review__numbers-container--2euA-">
                            <span className="star-rating--reviews__stats--3ANGp" data-purpose="course-card-star-rating">4.5</span>
                            <span className="star-rating--reviews__count--1Zo2k" data-purpose="course-card-review-count">(43,128)</span>
                          </span>
                        </span>
                      </div>
                      <div className="merchandising-course-card--price-wrapper--1eeWg" data-purpose="course-card-price-wrapper">
                        <div className="price-text-container price-text--base-price__container--Xwk8v price-text--reverse--1rh1B" data-purpose="price-text-container">
                          <div className="course-price-text price-text--base-price__discount--1J7vF price-text--black--1qJbH price-text--medium--2clK9 price-text--semibold--DLyJV" data-purpose="course-price-text">
                            <span className="sr-only">Current price</span>
                            <span>
                              <span>₺379.99</span>
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
        <button className={`carousel__button--next js-carousel-button-${type}`} data-dir="next"></button>
      </div>
    </div>
  )
}

export default Carousel;