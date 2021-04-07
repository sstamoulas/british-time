import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import StudentCourses from './../../components/student-courses/student-courses.component';
import ProfileImage from './../../components/profile-image/profile-image.component';
import LiveSessionButton from './../../components/live-session-button/live-session-button.component';

import { studentDetails } from './../../redux/student/student.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './student.styles.scss';

const INITIAL_STATE = {
  bio: '',
}

const Student = ({ currentUser, studentDetails, error, handleSubmit, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...studentDetails });
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
      <Link to={`/payment-history/${currentUser.id}`}>See Payment History</Link>
      <LiveSessionButton />
      {      
        // <Link to={`/video-conference/1KWzj6WjMwEmwOOtL3mq`} className='d-flex justify-center'>
        //   <div className='live-session-link'>Launch Live Session</div>
        // </Link>
      }
      {
        // studentDetails.sessionId && (
        //   <Link to={`/video-conference/${studentDetails.sessionId}`}>Launch Live Session</Link>
        // )
      }
      <form onSubmit={(e) => handleSubmit(e, state)} className='student-form d-flex flex-column m-default'>
        <ProfileImage className='p-default cursor-pointer' publicId={currentUser.id} onUploadCallback={() => onUploadCallback({ ...state })} />
        <textarea 
          name='bio' 
          className='m-default mx-7 p-2'
          rows='11' 
          cols='50' 
          defaultValue={bio}
          onChange={onChange} 
          placeholder='Add Your Bio...'
        >
        </textarea>
        <button 
          disabled={isInvalid} 
          type="submit"
          className='m-default mx-7 p-2 cursor-pointer'
        >
          Submit Details
        </button>

        {error && <p>{error.message}</p>}
      </form>
      <StudentCourses />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  studentDetails: studentDetails,
});

export default connect(mapStateToProps)(Student);
