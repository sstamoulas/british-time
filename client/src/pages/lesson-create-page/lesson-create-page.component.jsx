import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { createInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import './lesson-create-page.styles.scss';

import * as ROUTES from './../../constants/routes';

const INITIAL_STATE = {
  chapterTitle: '',
  lessons: [],
}

const EMPTY_OBJ = {
  lessonTitle: '',
  lessonText: '',
  files: [],
  startDate: '',
  dueDate: '',
  isVisible: false,
}

const CreateLessonPage = ({ history, createInstructorLessonStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, courseId });
  const [fileType, setFileType] = useState(null)
  const { chapterTitle, lessons } = state;
  const baseURL = process.env.NODE_ENV === "production" ? 
    'https://us-central1-react-firebase-authentic-5bd64.cloudfunctions.net/api' 
  : 
    'http://localhost:5001/react-firebase-authentic-5bd64/us-central1/api';

  const handleChapterChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleLessonChange = (event, lessonId) => {
    const { name, value } = event.target;
    const newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
    newLessons[index] = { ...lessons[index], [name]: value };

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleAddLesson = () => {
    let newLessons = [...lessons];
    const lessonId = lessons.length > 0 ? lessons[lessons.length - 1].lessonId + 1 : 1;
    newLessons.push({ ...EMPTY_OBJ, lessonId });

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleRemoveLesson = (lessonId) => {
    let newLessons = [...lessons];
    newLessons = newLessons.filter((lesson) => lesson.lessonId !== lessonId);

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleSubmit = (event) => {
    createInstructorLessonStart(state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  const onSelectChange = (event) => {
    setFileType(event.target.value);
  }

  const onFileUpload = async (event, lessonId) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);

    fetch(`${baseURL}/file-upload`, {
      method: 'POST',
      body: data,
    })
    .then((res) => res.json())
    .then(({ fileId, fileName }) => {
      const newLessons = [...lessons];
      const index = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
      newLessons[index] = { ...lessons[index], files: [...state.files, {fileId, fileName, fileType}] };
      setState(prevState => ({ ...prevState, lessons: newLessons }));
    })
    .catch((error) => console.log('error: ', error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='chapterTitle' value={chapterTitle} onChange={handleChapterChange} />
      {
        lessons.map((lesson, index) => (
          <div key={lesson.lessonId}>
            <input type='text' name='lessonTitle' value={lesson.lessonTitle} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
            <input type='date' name='startDate' value={lesson.startDate} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
            <input type='date' name='dueDate' value={lesson.dueDate} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
            <input type='file' name='file' onChange={(e) => onFileUpload(e, lesson.lessonId)} />
            <select onChange={onSelectChange}>
              <option defaultValue hidden>Select A File Type</option>
              <option value='Document'>Document</option>
              <option value='Audio'>Audio</option>
              <option value='Image'>Image</option>
              <option value='Video'>Video</option>
            </select>
            <textarea 
              name='lessonText' 
              rows='11' 
              cols='50' 
              defaultValue={lesson.lessonText}
              onChange={(e) => handleLessonChange(e, lesson.lessonId)} 
              placeholder='Add Your Lesson Text...'
            >
            </textarea>
            <input type='button' value='Remove Lesson' onClick={() => handleRemoveLesson(lesson.lessonId)} />
          </div>
        ))
      }

      <input type='button' value='Add New Lesson' onClick={() => handleAddLesson()} />
      <input type="submit" value="Create Lesson Plan" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createInstructorLessonStart: (lessonDetails) => 
    dispatch(createInstructorLessonStart(lessonDetails)),
})

export default connect(null, mapDispatchToProps)(withRouter(CreateLessonPage));
