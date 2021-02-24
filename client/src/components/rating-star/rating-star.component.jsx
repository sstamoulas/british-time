import React, { Fragment } from 'react';

import './rating-star.styles.scss';

const RatingStar = ({value, isEmpty, canChange, handleMouseover, handleMouseout, rate}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 23 60"
    width="18" 
    height="25"
    onMouseOver={handleMouseover}
    onClick={rate}
    onMouseOut={handleMouseout}  
    style={{transform: canChange && value % 2 === 0 ? 'scale(-1, 1)' : 'unset'}}
  >
    {
      canChange && isEmpty && (
        <Fragment>
          <path className='half-star-same half-star-right' d="M 32,45.25 L 17.84375,55 L 22.25,37.78125 L 9,26.59375 L 25.96875,25.6875 L 31.96875,9 " />
          <path className='half-star-same half-star-right' d="M 32 45.25 L 46.15625 55 L 41.75 37.78125 L 55 26.59375 L 38.03125 25.6875 L 32.03125 9" />
        </Fragment>
      )
    }
    {
      canChange && !isEmpty && value % 2 === 0 && (
        <Fragment>
          <path className='half-star-same half-star-left' d="M 32,45.25 L 17.84375,55 L 22.25,37.78125 L 9,26.59375 L 25.96875,25.6875 L 31.96875,9 " />
          <path className='half-star-same half-star-right' d="M 32 45.25 L 46.15625 55 L 41.75 37.78125 L 55 26.59375 L 38.03125 25.6875 L 32.03125 9" />
        </Fragment>
      )
    }
    {
      canChange && !isEmpty && value % 2 !== 0 && (
        <path className='half-star-same half-star-left' d="M 32,45.25 L 17.84375,55 L 22.25,37.78125 L 9,26.59375 L 25.96875,25.6875 L 31.96875,9 " />
      )
    }
    {
      !canChange && (
        <Fragment>
          <path className='half-star-same half-star-left' d="M 32,45.25 L 17.84375,55 L 22.25,37.78125 L 9,26.59375 L 25.96875,25.6875 L 31.96875,9 " />
          <path className='half-star-same half-star-right' d="M 32 45.25 L 46.15625 55 L 41.75 37.78125 L 55 26.59375 L 38.03125 25.6875 L 32.03125 9" />
        </Fragment>
      )
    }
  </svg>
);

export default RatingStar;
