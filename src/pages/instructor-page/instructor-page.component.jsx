import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Image } from 'cloudinary-react';

import CreateInstructorCourse from './../../components/create-instructor-course/create-instructor-course.component';
import InstructorCourses from './../../components/instructor-courses/instructor-courses.component';

import { createInstructorDetailsStart, updateInstructorDetailsStart } from './../../redux/instructor/instructor.actions';


import { instructorDetails } from './../../redux/instructor/instructor.selectors';
import { selectCoursesForManaging } from './../../redux/course/course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

const INITIAL_STATE = {
  selectedCourseToStart: {},
}

const InstructorPage = ({ 
    currentUser, 
    instructorDetails, 
    availableCourses,
    createInstructorDetailsStart, 
    updateInstructorDetailsStart, 
    error 
  }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...instructorDetails });
  const { bio, rating, selectedCourseToStart } = state;
  const isInvalid = bio === '';

  const onSubmit = event => {
    if(instructorDetails === {}) {
      createInstructorDetailsStart({ bio, rating });
    }
    else {
      updateInstructorDetailsStart({ bio });
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

  const onSelectChange = (event) => {
    const { value } = event.target;
    const selectedIndex = availableCourses.map((course) => course.id).indexOf(value);
    setState(prevState => ({ ...prevState, selectedCourseToStart: availableCourses[selectedIndex] }));
  }

  return (
    <div>
      <h1>Greetings {currentUser.userName}</h1>
      <p>The Instructor Page is accessible by only the Instructor in Question.</p>
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

      <h1>Start A New Course</h1>
      <select onChange={onSelectChange}>
        <option>Select A Course</option>
        {
          availableCourses.map((course) => <option key={course.id} value={course.id}>{course.courseName}</option>)
        }
      </select>
      {
        selectedCourseToStart.courseName &&
        <CreateInstructorCourse courseDetails={selectedCourseToStart}/>
      }

      <InstructorCourses />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorDetails: instructorDetails,
  availableCourses: selectCoursesForManaging,
});

const mapDispatchToProps = (dispatch) => ({
  updateInstructorDetailsStart: (instructorDetails) => 
    dispatch(updateInstructorDetailsStart(instructorDetails)),
  createInstructorDetailsStart: (instructorDetails) => 
    dispatch(createInstructorDetailsStart(instructorDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InstructorPage));
