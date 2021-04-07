import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import InstructorCourses from './../../components/instructor-courses/instructor-courses.component';
import ProfileImage from './../../components/profile-image/profile-image.component';
import CountDownTimer from './../../components/count-down-timer/count-down-timer.component';
import LiveSessionButton from './../../components/live-session-button/live-session-button.component';

import { instructorDetails } from './../../redux/instructor/instructor.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROUTES from './../../constants/routes';

import './instructor.styles.scss';

const liveSessionDateTime = (new Date('Mar 06 2021 22:44:26')).getTime();

const Instructor = ({ currentUser, instructorDetails, handleSubmit, onUploadCallback, error }) => {
  const [state, setState] = useState({ ...instructorDetails });
  const { bio } = state;
  const isInvalid = bio === '';
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  // useEffect(() => {
  //   const btn = document.querySelector('.live-session-link');
  //   const ripple = document.createElement("span"); 

  //   const addRipple = () => {

  //     // Add ripple class to span 
  //     ripple.classList.add("ripple"); 

  //     // Add span to the button  
  //     btn.appendChild(ripple); 

  //     // Get position of X 
  //     let x = (btn.offsetWidth)/2; 

  //     // Get position of Y  
  //     let y = (btn.offsetHeight)/2; 

  //     // Position the span element 
  //     ripple.style.left = `${x}px`; 
  //     ripple.style.top = `${y}px`; 
  //   }
    
  //   addRipple();
  // }, [])

  return (
    <div>
      <h1>Greetings {currentUser.userName}</h1>
      <p>The Instructor Page is accessible by only the Instructor in Question.</p>
      <Link to={`/payment-history/${currentUser.id}`}>See Payment History</Link>
      <LiveSessionButton />
      {      
        // <Link to={`/video-conference/1KWzj6WjMwEmwOOtL3mq`} className='d-flex justify-center'>
        //   <div className='live-session-link'>Launch Live Session</div>
        // </Link>
      }
      {
        instructorDetails.sessionId && (
          <Link to={`/video-conference/${instructorDetails.sessionId}`}>Launch Live Session</Link>
        )
      }
      {
        // <CountDownTimer startTime={liveSessionDateTime} text={''}>
        //   <LiveSessionButton />
        // </CountDownTimer>
      }
      <form onSubmit={(e) => handleSubmit(e, state)} className='d-flex flex-column m-default'>
        <ProfileImage className='p-default cursor-pointer' publicId={currentUser.id} onUploadCallback={onUploadCallback} />
        <textarea 
          name='bio' 
          className='m-default mx-7 p-2'
          rows='11' 
          cols='50' 
          defaultValue={bio || ''}
          onChange={onChange} 
          placeholder='Add Your Bio...'
        >
        </textarea>
        <button 
          disabled={isInvalid} 
          type="submit" 
          className='form-btn m-default mx-7 p-2 cursor-pointer'
        >
          Submit Details
        </button>

        {error && <p>{error.message}</p>}
      </form>
      <Link to={ROUTES.CREATE_INSTRUCTOR_COURSE}>Create A New Course</Link>
      <InstructorCourses />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorDetails: instructorDetails,
});

export default connect(mapStateToProps)(Instructor);
