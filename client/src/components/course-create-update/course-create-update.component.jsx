import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CourseImage from './../../components/course-image/course-image.component';

import { selectCurrentCourse } from '../../redux/course/course.selectors';
 
const INITIAL_STATE = {
  imageExtension: '',
  courseName: '', 
  headline: '',
  level: '',
}

const CourseCreateUpdate = ({ isNew, currentCourse, handleSubmit, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { courseName, level, headline, imageExtension } = state;

  useEffect(() => {
    if(!isNew) {
      setState(prevState => ({ ...prevState, ...currentCourse }));
    }
  }, [isNew, currentCourse])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <div>
      <h1>{!isNew ? 'Update' : 'Create'} Course Page</h1>
      <form onSubmit={(e) => handleSubmit(e, state)}>
        <CourseImage imageExtension={imageExtension} onUploadCallback={(imageExtension) => onUploadCallback({ ...state, imageExtension })} />
        <select name='level' value={level} onChange={handleChange}>
          <option defaultValue hidden> 
            Select a Level 
          </option> 
          <option value="0">Beginner</option>
          <option value="1">Elementary</option>
          <option value="2">Pre-Intermediate</option>
          <option value="3">Intermediate</option>
          <option value="4">Upper-Intermediate</option>
          <option value="5">Advanced</option>
        </select>
        <input type='text' name='headline' value={headline || ''} onChange={handleChange} />
        <input type='text' name='courseName' value={courseName || ''} onChange={handleChange} />
        <input type="submit" value={`${!isNew ? 'Update' : 'Create'} Course`} />
      </form>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentCourse: selectCurrentCourse,
});

export default connect(mapStateToProps)(CourseCreateUpdate);
