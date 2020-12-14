import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Image } from 'cloudinary-react';

import StudentCourses from './../../components/student-courses/student-courses.component';

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
  const { bio, hasImage, imageLoading } = state;
  const isInvalid = bio === '' && !hasImage;

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    setState(prevState => ({ 
      ...prevState, 
      bio: studentDetails.bio, 
      hasImage: studentDetails.hasImage 
    }));
  }, [studentDetails])

  const onSubmit = event => {
    if(isObjectEmpty(studentDetails)) {
      setState(prevState => ({ ...prevState, hasImage: true }));
      createStudentDetailsStart({ bio, hasImage });
    }
    else {
      updateStudentDetailsStart({ bio });
    }

    event.preventDefault();
  }

  const onClick = event => {
    document.querySelector(".img-upload").click();
  }
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onUpload = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('public_id', currentUser.id);

    setState(prevState => ({ ...prevState, imageLoading: true }));

    fetch('http://localhost:3000/image-upload', {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      setState(prevState => ({ ...prevState, imageLoading: false }));
      console.log(response.json());
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='d-flex flex-column m-default'>
        <div className='d-flex justify-center my'>
        {     
          imageLoading ? 
            <span>Loading</span>
          :
            hasImage ?
              <Image 
                className='p-default'
                cloudName="everest-logix" 
                publicId={currentUser.id} 
                width="300" 
                height="300" 
                crop="scale" 
                onClick={onClick}
              />
            :
              <span className='person' onClick={onClick}></span>
        }
          <input 
            type='file' 
            name='image' 
            className='img-upload hide'
            onChange={onUpload} 
          />
        </div>
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
