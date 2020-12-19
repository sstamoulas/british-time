import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';
import { Image } from 'cloudinary-react';

import CourseImage from './../../components/course-image/course-image.component';

import { updateCourseStart, fetchCourseByIdStart } from '../../redux/course/course.actions';
import { selectCurrentCourse } from '../../redux/course/course.selectors';
import * as ROUTES from './../../constants/routes';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const CourseUpdatePage = ({ history, currentCourse, fetchCourseByIdStart, updateCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...currentCourse });
  const { courseName } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    updateCourseStart(state);
    history.push(ROUTES.ADMIN);
    event.preventDefault();
  }

  const onUploadCallback = () => {
    updateCourseStart({...state, hasImage: true });
  }

  const onFileUpload = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);

    fetch('http://localhost:3000/file-upload', {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      // setState(prevState => ({ ...prevState, imageLoading: false }));
      console.log(response.json());
      // onUploadCallback();
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  const onFileDownload = (event) => {
    const fileName = '2014_YDS_ILKBAHAR_INGILIZCE.pdf';
    const fileId = '1-NR8vewLS2U4rxDLasC52IfJBmGf1jRx'

    fetch(`http://localhost:3000/file-download?fileName=${fileName}&fileId=${fileId}`, {
      method: 'GET',
    })
    .then((response) => {
      window.open(response.url)
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  const onFileDelete = (event) => {
    const fileId = '1-NR8vewLS2U4rxDLasC52IfJBmGf1jRx';

    fetch(`http://localhost:3000/file-delete/${fileId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      // setState(prevState => ({ ...prevState, imageLoading: false }));
      // onUploadCallback();
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if(isObjectEmpty(currentCourse)) {
      fetchCourseByIdStart(courseId);
    }
  }, [courseId, currentCourse, fetchCourseByIdStart]);

  return !isObjectEmpty(currentCourse) && (
    <div>
      <h1>Edit Course Titled '{courseName}' Page</h1>
      <form onSubmit={handleSubmit}>
        <CourseImage courseId={currentCourse.hasImage ? courseId : courseName} onUploadCallback={onUploadCallback} />
        <input
          type='file' 
          name='image' 
          onChange={onFileUpload} 
        />
        <a onClick={onFileDownload}>Click to download a file</a>
        <a onClick={onFileDelete}>Click to delete a file</a>
        <input type='text' name='courseName' value={courseName} onChange={handleChange} />
        <input type="submit" value="Update Course" />
      </form>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentCourse: selectCurrentCourse,
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStart: (courseDetails) => dispatch(updateCourseStart(courseDetails)),
  fetchCourseByIdStart: (courseId) => dispatch(fetchCourseByIdStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUpdatePage));
