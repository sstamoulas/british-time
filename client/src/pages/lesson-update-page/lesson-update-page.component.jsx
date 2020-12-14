import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchInstructorLessonStart, updateInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { selectedLessonDetails } from '../../redux/instructor-lesson/instructor-lesson.selectors';

import * as ROUTES from './../../constants/routes';

const INITIAL_STATE = {
  lessonTitle: '',
  lessonText: '',
  startDate: '',
  dueDate: '',
  isVisible: false,
}

const UpdateLessonPage = ({ history, lessonDetails, fetchInstructorLessonStart, updateInstructorLessonStart }) => {
  const { courseId, lessonId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...lessonDetails });
  const { lessonTitle, lessonText, startDate, dueDate, isVisible } = state;

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    if(isObjectEmpty(lessonDetails)) {
      fetchInstructorLessonStart(courseId, lessonId);
    }
  }, [courseId, lessonId, lessonDetails, fetchInstructorLessonStart]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    updateInstructorLessonStart(lessonId, state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='lessonTitle' value={lessonTitle} onChange={handleChange} />
      <input type='date' name='startDate' value={startDate} onChange={handleChange} />
      <input type='date' name='dueDate' value={dueDate} onChange={handleChange} />
      <textarea 
        name='lessonText' 
        rows='11' 
        cols='50' 
        defaultValue={lessonText}
        onChange={handleChange} 
        placeholder='Add Your Lesson Text...'
      >
      </textarea>

      <input type="submit" value="Create Lesson" />
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
 lessonDetails: selectedLessonDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonStart: (courseId, lessonId) =>
    dispatch(fetchInstructorLessonStart(courseId, lessonId)),
  updateInstructorLessonStart: (lessonId, lessonDetails) => 
    dispatch(updateInstructorLessonStart(lessonId, lessonDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateLessonPage));
