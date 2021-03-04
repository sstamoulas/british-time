import React, { useState } from 'react';

import RatingStar from './../rating-star/rating-star.component';

const INITIAL_STATE = {
  tempRating: null,
  rating: null,
  review: '',
}

const RatingDisplay = (rating) => {
  let ratingDisplay = [];

  const handleMouseover = (rating) => {
    setState(prevState => ({ 
      ...prevState,
      rating,
    }));
  }

  const handleMouseout = () => {
    setState(prevState => ({ 
      ...prevState,
      rating: prevState.tempRating
    }));
  }

  const rate = (rating) => {
    setState(prevState => ({ 
      ...prevState,
      tempRating: rating
    }));
  }

  for(let i = 1; i <= 10; i++) {
    if(rating >= i && rating != null) {
      ratingDisplay.push(
        <RatingStar 
          key={i}    
          value={i}
          handleMouseover={() => handleMouseover(i)}
          rate={() => rate(i)}
          handleMouseout={() => handleMouseout()} 
          canChange={true} 
          isEmpty={false}
        />
      );
    }
    else {
      ratingDisplay.push(
        <RatingStar 
          key={i}    
          value={i}
          handleMouseover={() => handleMouseover(i)}
          rate={() => rate(i)}
          handleMouseout={() => handleMouseout()} 
          canChange={true} 
          isEmpty={true}
        />
      );
    }
  }

  return (
    <div className='rating-container center'>
    {
      ratingDisplay
    }
    </div>
  );
}

export default RatingDisplay;