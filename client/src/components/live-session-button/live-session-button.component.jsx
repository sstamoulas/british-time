import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Zoom from './../../components/zoom/zoom.component';
import CountDownTimer from './../../components/count-down-timer/count-down-timer.component';

import { currentUser } from './../../redux/user/user.selectors';

import './live-session-button.styles.scss';

const LiveSessionButton = ({ currentUser, error }) => {
  const [isLiveSessionOpen, setIsLiveSessionOpen] = useState(false);
  const [hasLiveSession, setHasLiveSession] = useState(false)


  const openLiveSession = () => {
    document.querySelector('#zmmtg-root').style.display = '';
    document.querySelector('#zmmtg-root').style.backgroundColor = 'black';
    document.querySelector('#root').style.display = 'none';
    setIsLiveSessionOpen(true);
  }

  return (
    <div>
      <button
        className="launchButton"
        onClick={openLiveSession}
        style={{ backgroundColor: "red" }}
      >
        Launch Live Session
      </button>
      {
        isLiveSessionOpen && (
          <Zoom meetingNumber={'82267762341'} userName={currentUser.userName} userEmail={currentUser.email} passWord={'ZGRpZWZiNU1DUGhGelNQbEJlUUxiQT09'} role={1} />
        )
      }
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(LiveSessionButton);
