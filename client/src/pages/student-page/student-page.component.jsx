import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import StudentCourses from './../../components/student-courses/student-courses.component';
import ProfileImage from './../../components/profile-image/profile-image.component';

import { createStudentDetailsStart, updateStudentDetailsStart } from './../../redux/student/student.actions';

import { studentDetails } from './../../redux/student/student.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './student-page.styles.scss';

// need to add hasImage flag
// Also if a course is activated for a user 
// it shoulld not show in the search results to activate a new course.


const INITIAL_STATE = {
  bio: '',
  hasImage: false,
  imageLoading: false,
}

const StudentPage = ({ 
    currentUser, 
    studentDetails, 
    createStudentDetailsStart, 
    updateStudentDetailsStart, 
    error 
  }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...studentDetails });
  const { bio, imageLoading } = state;
  const isInvalid = bio === '' && !studentDetails.hasImage;

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  // useEffect(() => {
  //   setState(prevState => ({ 
  //     ...prevState, 
  //     bio: studentDetails.bio, 
  //   }));
  // }, [studentDetails])

  const onSubmit = event => {
    if(isObjectEmpty(studentDetails)) {
      createStudentDetailsStart({ bio });
    }
    else {
      updateStudentDetailsStart({ bio });
    }

    event.preventDefault();
  }
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onUploadCallback = () => {
    if(isObjectEmpty(studentDetails)) {
      createStudentDetailsStart({ hasImage: true });
    }
    else {
      updateStudentDetailsStart({ hasImage: true });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='d-flex flex-column m-default'>
        <ProfileImage hasImage={studentDetails.hasImage} onUploadCallback={onUploadCallback} />
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
          className='m-default mx-7 p-2'
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

const mapDispatchToProps = (dispatch) => ({
  updateStudentDetailsStart: (studentDetails) => 
    dispatch(updateStudentDetailsStart(studentDetails)),
  createStudentDetailsStart: (studentDetails) => 
    dispatch(createStudentDetailsStart(studentDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentPage));
