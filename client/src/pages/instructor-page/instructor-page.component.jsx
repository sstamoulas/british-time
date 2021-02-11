import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Image } from 'cloudinary-react';

import Zoom from './../../components/zoom/zoom.component';
import CreateInstructorCourse from './../../components/create-instructor-course/create-instructor-course.component';
import InstructorCourses from './../../components/instructor-courses/instructor-courses.component';
import ProfileImage from './../../components/profile-image/profile-image.component';

import { createInstructorDetailsStart, updateInstructorDetailsStart } from './../../redux/instructor/instructor.actions';


import { instructorDetails } from './../../redux/instructor/instructor.selectors';
import { selectCoursesForManaging } from './../../redux/course/course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

const isObjectEmpty = (obj) => {
  return obj === null || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

const INITIAL_STATE = {
  selectedCourseToStart: {},
}

const hasLiveSession = true;

const InstructorPage = ({ 
    currentUser, 
    instructorDetails, 
    availableCourses,
    createInstructorDetailsStart, 
    updateInstructorDetailsStart, 
    error 
  }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...instructorDetails });
  const [isLiveSessionOpen, setIsLiveSessionOpen] = useState(false);
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

  const onUploadCallback = () => {
    if(isObjectEmpty(instructorDetails)) {
      createInstructorDetailsStart({ hasImage: true });
    }
    else {
      updateInstructorDetailsStart({ hasImage: true });
    }
  }

  const openLiveSession = () => {
    document.querySelector('#zmmtg-root').style.display = '';
    document.querySelector('#zmmtg-root').style.backgroundColor = 'black';
    document.querySelector('#root').style.display = 'none';
    setIsLiveSessionOpen(true);
  }

  return (
    <div>
      <h1>Greetings {currentUser.userName}</h1>
      <p>The Instructor Page is accessible by only the Instructor in Question.</p>
      {
        hasLiveSession && (
          <button
            className="launchButton"
            onClick={openLiveSession}
            style={{ backgroundColor: "red" }}
          >
            Launch Live Session{" "}
          </button>
        )
      }
      {
        isLiveSessionOpen && (
          <Zoom meetingNumber={'82267762341'} userName={'Stamatios Stamoulas'} userEmail={'tstamoulas@gmail.com'} passWord={'ZGRpZWZiNU1DUGhGelNQbEJlUUxiQT09'} role={1} />
        )
      }
      <form onSubmit={onSubmit} className='d-flex flex-column m-default'>
        <ProfileImage className='p-default cursor-pointer' hasImage={state.hasImage || false} publicId={currentUser.id} onUploadCallback={onUploadCallback} />
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
          className='m-default mx-7 p-2 cursor-pointer'
        >
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
