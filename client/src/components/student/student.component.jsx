import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import StudentCourses from './../../components/student-courses/student-courses.component';
import LiveSessionButton from './../../components/live-session-button/live-session-button.component';

import { studentDetails } from './../../redux/student/student.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './student.styles.scss';

const INITIAL_STATE = {
  bio: '',
}

const Student = ({ currentUser, studentDetails, error, handleSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...studentDetails, selectedOption: null });
  const { bio, selectedOption } = state;
  const isInvalid = bio === '';
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const btn = document.querySelector('.live-session-link');
    const ripple = document.createElement('span'); 

    const addRipple = () => {

      // Add ripple class to span 
      ripple.classList.add('ripple'); 

      // Add span to the button  
      btn.appendChild(ripple); 

      // Get position of X 
      let x = (btn.offsetWidth)/2; 

      // Get position of Y  
      let y = (btn.offsetHeight)/2; 

      // Position the span element 
      ripple.style.left = `${x}px`; 
      ripple.style.top = `${y}px`; 
    }

    addRipple();
  }, [])

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setState(prevState => ({ ...prevState, selectedOption: value }));
  };

  return (
    <div>
      <Link to={`/payment-history/${currentUser.id}`}>See Payment History</Link>
      {
        //<LiveSessionButton />
      }
      {      
        <Link to={`/video-conference/1KWzj6WjMwEmwOOtL3mq`} className='d-flex justify-center'>
          <div className='live-session-link'>Launch Live Session</div>
        </Link>
      }
      {
        studentDetails.sessionId && (
          <Link to={`/video-conference/${studentDetails.sessionId}`}>Launch Live Session</Link>
        )
      }
      <fieldset>
          <legend>What is 1 + 1?</legend>

          <div>
            <input
              type='radio'
              id='0'
              value='0'
              checked={selectedOption === '0'} 
              onChange={handleOptionChange}
            />
            <label htmlFor='0'>0</label>
          </div>

          <div>
            <input
              type='radio'
              id='1'
              value='1'
              checked={selectedOption === '1'} 
              onChange={handleOptionChange}
            />
            <label htmlFor='1'>1</label>
          </div>

          <div>
            <input
              type='radio'
              id='2'
              value='2'
              checked={selectedOption === '2'} 
              onChange={handleOptionChange}
            />
            <label htmlFor='2'>2</label>
          </div>
      </fieldset>
      {
        selectedOption ?
        (
          selectedOption == '2' ?
            <div>That is the correct answer</div> :
            <div>I'm sorry the correct answer is 2.</div>
        ) :

          null
      }
      <form onSubmit={(e) => handleSubmit(e, state)} className='student-form d-flex flex-column m-default'>
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
          type='submit'
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
