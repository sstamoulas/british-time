import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROUTES from './../../constants/routes';
import { createInstructorDetailsStart, updateInstructorDetailsStart } from '../../redux/instructor/instructor.actions';
import { instructorDetails } from '../../redux/instructor/instructor.selectors';
import { currentUser } from '../../redux/user/user.selectors';

const InstructorPage = ({ currentUser, instructorDetails, createInstructorDetailsStart, updateInstructorDetailsStart, error }) => {
  const [state, setState] = useState({ ...instructorDetails });
  const { bio, image } = state;
  const isInvalid = bio === '';

  const onSubmit = event => {
    if(instructorDetails === {}) {
      createInstructorDetailsStart({ bio, image });
    }
    else {
      updateInstructorDetailsStart({ bio, image });
    }

    event.preventDefault();
  }
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1>Greetings {currentUser.userName}</h1>
      <p>The Instructor Page is accessible by only the Instructor in Question.</p>
      <form onSubmit={onSubmit}>
        <input 
          type='file' 
          name='image' 
          onChange={onChange} 
        />
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
      <Link to={ROUTES.CREATE_COURSE}>Create A Course</Link>
      <h1>Your Courses</h1>
      <ul>
        {
          // currentUser.courses && currentUser.courses.map((course) => <li key={course.id}><Link to={`course/${course.id}`}>{course.courseName}</Link></li>)
        }
      </ul>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorDetails: instructorDetails,
});

const mapDispatchToProps = (dispatch) => ({
  updateInstructorDetailsStart: (instructorDetails) => 
    dispatch(updateInstructorDetailsStart(instructorDetails)),
  createInstructorDetailsStart: (instructorDetails) => 
    dispatch(createInstructorDetailsStart(instructorDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorPage);
