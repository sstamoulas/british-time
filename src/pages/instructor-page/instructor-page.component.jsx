import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Image } from 'cloudinary-react';

import { createInstructorDetailsStart, updateInstructorDetailsStart } from '../../redux/instructor/instructor.actions';
import { instructorDetails } from '../../redux/instructor/instructor.selectors';
import { currentUser } from '../../redux/user/user.selectors';

const InstructorPage = ({ currentUser, instructorDetails, createInstructorDetailsStart, updateInstructorDetailsStart, error }) => {
  const [state, setState] = useState({ ...instructorDetails });
  const { bio, rating } = state;
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
