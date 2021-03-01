import React, { useState, useEffect } from 'react';
import { connect, batch } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import RatingStar from './../../components/rating-star/rating-star.component';

import { fetchStudentCourseStart, updateStudentCourseStart } from './../../redux/student-course/student-course.actions';
import { updateInstructorCourseRatingStart } from './../../redux/instructor-course/instructor-course.actions';
import { updateInstructorRatingStart } from './../../redux/instructor/instructor.actions';

import { selectedCourseDetails } from './../../redux/student-course/student-course.selectors';

import * as ROUTES from './../../constants/routes';

import './course-rating-page.styles.scss';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const INITIAL_STATE = {
  tempRating: null,
  rating: null,
  review: '',
}

const CourseRatingPage = ({ 
  history, 
  courseDetails, 
  fetchStudentCourseStart, 
  updateStudentCourseStart, 
  updateInstructorCourseRatingStart, 
  updateInstructorRatingStart
}) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...courseDetails });
  const { rating, tempRating, review } = state;
  const oldRating = courseDetails.rating;
  let ratingDisplay = [];

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    delete state.tempRating;
    batch(() => {
      updateStudentCourseStart(courseId, {...state });
      updateInstructorCourseRatingStart(state.instructorCourseId, oldRating, rating);
      updateInstructorRatingStart(state.instructorId, oldRating, rating);
    });
    history.push(ROUTES.STUDENT);
    event.preventDefault();
  }

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

  useEffect(() => {
    if(isObjectEmpty(courseDetails)) {
      fetchStudentCourseStart(courseId);
    }
  }, [courseId, courseDetails, fetchStudentCourseStart])

  console.log(courseDetails)

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
    <form onSubmit={handleSubmit} className='rating-form'>
      <h3 className='center'>Rate this course: </h3>
      <h6 className='center'>{courseDetails.courseName} By {courseDetails.userName}</h6>
      <div className='rating-container center'>
      {
        ratingDisplay
      }
      </div>
      <textarea 
        name='review' 
        className='m-default mx-7 p-2'
        rows='11' 
        cols='50' 
        defaultValue={review || ''}
        onChange={handleChange} 
        placeholder='Add Your Review...'
      >
      </textarea>
      <button type='submit' className='m-default mx-7 p-2'>Submit Review</button>
    </form>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectedCourseDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudentCourseStart: (courseId) => 
    dispatch(fetchStudentCourseStart(courseId)),
  updateStudentCourseStart: (courseId, courseDetails) => 
    dispatch(updateStudentCourseStart(courseId, courseDetails)),
  updateInstructorCourseRatingStart: (instructorCourseId, oldRating, rating) =>
    dispatch(updateInstructorCourseRatingStart(instructorCourseId, oldRating, rating)),
  updateInstructorRatingStart: (instructorId, oldRating, rating) =>
    dispatch(updateInstructorRatingStart(instructorId, oldRating, rating)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseRatingPage));
