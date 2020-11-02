import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { createInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import './lesson-create-page.styles.scss';

import * as ROUTES from './../../constants/routes';

const INITIAL_STATE = {
  lessonTitle: '',
  lessonText: '',
  startDate: '',
  dueDate: '',
  isVisible: false,
}

const CreateLessonPage = ({ history, createInstructorLessonStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, courseId });
  const { lessonTitle, lessonText, startDate, dueDate, isVisible } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    createInstructorLessonStart(state);
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

const mapDispatchToProps = (dispatch) => ({
  createInstructorLessonStart: (lessonDetails) => 
    dispatch(createInstructorLessonStart(lessonDetails)),
})

export default connect(null, mapDispatchToProps)(withRouter(CreateLessonPage));
