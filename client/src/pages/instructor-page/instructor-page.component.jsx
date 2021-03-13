import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Image } from 'cloudinary-react';

import CreateInstructorCourse from './../../components/create-instructor-course/create-instructor-course.component';
import InstructorCourses from './../../components/instructor-courses/instructor-courses.component';
import ProfileImage from './../../components/profile-image/profile-image.component';
import CountDownTimer from './../../components/count-down-timer/count-down-timer.component';
import LiveSessionButton from './../../components/live-session-button/live-session-button.component';


import { createInstructorDetailsStart, updateInstructorDetailsStart } from './../../redux/instructor/instructor.actions';

import { instructorDetails } from './../../redux/instructor/instructor.selectors';
import { selectCoursesForManaging } from './../../redux/course/course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import './instructor-page.styles.scss';

const isObjectEmpty = (obj) => {
  return obj === null || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

const INITIAL_STATE = {
  selectedCourseToStart: {},
}

const liveSessionDateTime = (new Date('Mar 06 2021 22:44:26')).getTime();

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

  useEffect(() => {
    if(!isObjectEmpty(instructorDetails)){
      setState(prevState => ({ ...prevState, ...instructorDetails }));
    }
  }, [instructorDetails])

  const onSubmit = event => {
    if(isObjectEmpty(instructorDetails)) {
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

  const onSelectChange = (event) => {
    const { value } = event.target;
    const selectedIndex = availableCourses.map((course) => course.id).indexOf(value);
    setState(prevState => ({ ...prevState, selectedCourseToStart: availableCourses[selectedIndex] }));
  }

  const onUploadCallback = (imageExtension) => {
    if(isObjectEmpty(instructorDetails)) {
      createInstructorDetailsStart({ imageExtension });
    }
    else {
      updateInstructorDetailsStart({ imageExtension });
    }
  }

  const sortCourses = (courseA, courseB) => {
    if (courseA.courseName < courseB.courseName) {
      return -1;
    }
    else if (courseA.courseName > courseB.courseName) {
      return 1;
    }
    else {
      return 0;
    }
  }

  return (
    <div>
      <h1>Greetings {currentUser.userName}</h1>
      <p>The Instructor Page is accessible by only the Instructor in Question.</p>
      <CountDownTimer startTime={liveSessionDateTime} text={''}>
        <LiveSessionButton />
      </CountDownTimer>
      <form onSubmit={onSubmit} className='d-flex flex-column m-default'>
        <ProfileImage className='p-default cursor-pointer' imageExtension={state.imageExtension} publicId={currentUser.id} onUploadCallback={onUploadCallback} />
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

      <h1 className='d-flex justify-center'>Start A New Course</h1>
      <div className='d-flex'>
        <select className='course-selection' onChange={onSelectChange}>
          <option>Select A Course</option>
          {
            availableCourses.sort(sortCourses).map((course) => <option key={course.id} value={course.id}>{course.courseName}</option>)
          }
        </select>
      </div>
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
