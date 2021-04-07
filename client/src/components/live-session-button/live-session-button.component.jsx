import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Zoom from './../../components/zoom/zoom.component';
// import CountDownTimer from './../../components/count-down-timer/count-down-timer.component';

import { currentUser } from './../../redux/user/user.selectors';

import * as ROLES from './../../constants/roles';

import './live-session-button.styles.scss';

const LiveSessionButton = ({ currentUser, error }) => {
  const [isLiveSessionOpen, setIsLiveSessionOpen] = useState(false);
  // const [hasLiveSession, setHasLiveSession] = useState(false)

  const openLiveSession = () => {
    document.querySelector('#zmmtg-root').style.display = '';
    document.querySelector('#zmmtg-root').style.backgroundColor = 'black';
    document.querySelector('#root').style.display = 'none';
    setIsLiveSessionOpen(true);
  }

  useEffect(() => {
    const btn = document.querySelector('.live-session-link');
    const ripple = document.createElement("span"); 

    const addRipple = () => {

      // Add ripple class to span 
      ripple.classList.add("ripple"); 

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

  return (
    <div className='d-flex justify-center'>
      <button
        className="live-session-link"
        onClick={openLiveSession}
      >
        Launch Live Session
      </button>
      {
        isLiveSessionOpen && (
          <Zoom meetingNumber={process.env.REACT_APP_ZOOM_MEETING_NUMBER} userName={currentUser.userName} userEmail={currentUser.email} passWord={process.env.REACT_APP_ZOOM_MEETING_PASSWORD} role={currentUser.role === ROLES.INSTRUCTOR ? 1 : 0} />
        )
      }
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(LiveSessionButton);
