import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Image } from 'cloudinary-react';

import StudentCourses from './../../components/student-courses/student-courses.component';

import { createStudentDetailsStart, updateStudentDetailsStart } from './../../redux/student/student.actions';

import { studentDetails } from './../../redux/student/student.selectors';
import { currentUser } from './../../redux/user/user.selectors';

const StudentPage = ({ 
    currentUser, 
    studentDetails, 
    createStudentDetailsStart, 
    updateStudentDetailsStart, 
    error 
  }) => {
  const [state, setState] = useState({ ...studentDetails });
  const { bio } = state;
  const isInvalid = bio === '';

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

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

  const onUpload = (event) => {
    console.dir(event.target.files[0]);

    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'wapzyikz');
    data.append('public_id', currentUser.id);

    fetch('https://api.cloudinary.com/v1_1/everest-logix/image/upload', {
      method: 'POST',
      body: data
    })
    .then((response) => {
      console.log(response.json());
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>Greetings {currentUser.userName}</h1>
      <p>The Student Page is accessible by only the Student in Question.</p>
      <form onSubmit={onSubmit}>
        <input 
          type='file' 
          name='image' 
          onChange={onUpload} 
        />
        <Image cloudName="everest-logix" publicId={`british-time/${currentUser.id}`} width="300" height="300" crop="scale" />
        <textarea 
          name='bio' 
          rows='11' 
          cols='50' 
          defaultValue={bio}
          onChange={onChange} 
          placeholder='Add Your Bio...'
        >
        </textarea>
        <button disabled={isInvalid} type="submit">
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
