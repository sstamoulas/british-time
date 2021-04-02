import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import StudentCourses from './../../components/student-courses/student-courses.component';
import ProfileImage from './../../components/profile-image/profile-image.component';
import StudentVideoChatContainer from './../../components/student-video-chat-container/student-video-chat-container.component';

import { studentDetails } from './../../redux/student/student.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './student.styles.scss';

const INITIAL_STATE = {
  bio: '',
}

const Student = ({ currentUser, studentDetails, error, handleSubmit, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...studentDetails });
  const { bio } = state;
  const isInvalid = bio === '' && !studentDetails.imageExtension;
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Link to={`/payment-history/${currentUser.id}`}>See Payment History</Link>
      <StudentVideoChatContainer />
      <form onSubmit={(e) => handleSubmit(e, state)} className='student-form d-flex flex-column m-default'>
        <ProfileImage className='p-default cursor-pointer' imageExtension={studentDetails.imageExtension} publicId={currentUser.id} onUploadCallback={(imageExtension) => onUploadCallback({ ...state, imageExtension })} />
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
