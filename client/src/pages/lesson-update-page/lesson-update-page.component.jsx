import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchInstructorLessonStart, updateInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { selectedLessonDetails } from '../../redux/instructor-lesson/instructor-lesson.selectors';

import * as ROUTES from './../../constants/routes';

const INITIAL_STATE = {
  chapterTitle: '',
  lessonTitle: '',
  lessonType: '',
}

const EMPTY_LESSON = {
  lessonTitle: '',
  lessonType: '',
}

const EMPTY_RESOURCE = {
  resourceType: '',
  resourceValue: '',
}

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const UpdateLessonPage = ({ history, lessonDetails, fetchInstructorLessonStart, updateInstructorLessonStart }) => {
  const { courseId, lessonId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...lessonDetails });
  const [fileType, setFileType] = useState(null);
  const { chapterTitle, lessons } = state;
  const baseURL = process.env.NODE_ENV === "production" ? 
    'https://us-central1-react-firebase-authentic-5bd64.cloudfunctions.net/api' 
  : 
    'http://localhost:5001/react-firebase-authentic-5bd64/us-central1/api';

  useEffect(() => {
    if(isObjectEmpty(lessonDetails)) {
      fetchInstructorLessonStart(lessonId);
    }
  }, [lessonId, lessonDetails, fetchInstructorLessonStart]);

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
    newLessons.push({ ...EMPTY_LESSON, lessonId });

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleRemoveLesson = (lessonId) => {
    let newLessons = [...lessons];
    newLessons = newLessons.filter((lesson) => lesson.lessonId !== lessonId);

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleResourceChange = (event, lessonId, resourceId) => {
    const { name, value } = event.target;
    const newLessons = [...lessons];
    const lessonIndex = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
    const newResources = lessons[lessonIndex].lessonResources;
    const resourceIndex = newResources.findIndex((resource) => resource.resourceId === resourceId);
    
    newLessons[lessonIndex].lessonResources[resourceIndex] = { ...newResources[resourceIndex], [name]: value };

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleAddResource = (lessonId) => {
    let newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
    let lessonResources = lessons[index].lessonResources || [];
    const resourceId = lessonResources.length > 0 ? lessonResources[lessonResources.length - 1].resourceId + 1 : 1; 
    
    lessonResources.push({ ...EMPTY_RESOURCE, resourceId });
    lessons[index].lessonResources = lessonResources;

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleRemoveResource = (lessonId, resourceId) => {
    let newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
    let lessonResources = lessons[index].lessonResources;

    lessonResources = lessonResources.filter((resource) => resource.resourceId !== resourceId);
    newLessons[index].lessonResources = lessonResources;

    setState(prevState => ({ ...prevState, lessons: newLessons }));
  }

  const handleSubmit = (event) => {
    updateInstructorLessonStart(lessonId, state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  const onSelectChange = (event) => {
    setFileType(event.target.value);
  }

  const onFileUpload = async (event, lessonId, resourceId) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);

    fetch(`${baseURL}/file-upload`, {
      method: 'POST',
      body: data,
    })
    .then((res) => res.json())
    .then(({ fileId, fileName }) => {
      const newLessons = [...lessons];
      const lessonIndex = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
      const newResources = lessons[lessonIndex].lessonResources;
      const resourceIndex = newResources.findIndex((resource) => resource.resourceId === resourceId);
      newResources[resourceIndex].files = newResources[resourceIndex].files || [];

      console.log(newResources[resourceIndex].files, newResources[resourceIndex])
      
      newLessons[lessonIndex].lessonResources[resourceIndex] = { ...newResources[resourceIndex], files: [...newResources[resourceIndex].files, {fileId, fileName}] };

      setState(prevState => ({ ...prevState, lessons: newLessons }));
    })
    .catch((error) => console.log('error: ', error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='chapterTitle' value={chapterTitle} onChange={handleChapterChange} />
      {
        lessons && 
        lessons.map((lesson, index) => (
          <div key={lesson.lessonId}>
            <input type='text' name='lessonTitle' value={lesson.lessonTitle} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
            <select name='lessonType' value={lesson.lessonType || ''} onChange={(e) => handleLessonChange(e, lesson.lessonId)}>
              <option defaultValue hidden>Select A Lesson Type</option>
              <option value='Text'>Text</option>
              <option value='Video'>Video</option>
            </select>
            {
              lesson.lessonType === 'Text' && lesson.lessonResources && (
                lesson.lessonResources.map((resource) => console.log(lesson.lessonResources) || (
                  <div key={resource.resourceId}>
                    <select name='resourceType' value={resource.resourceType || ''} onChange={(e) => handleResourceChange(e, lesson.lessonId, resource.resourceId)}>
                      <option defaultValue hidden>Select A Resource Type</option>
                      <option value='Text'>Text</option>
                      <option value='Document'>Document</option>
                      <option value='Audio'>Audio</option>
                      <option value='Image'>Image</option>
                    </select>
                    {
                      ['Document', 'Audio', 'Image'].includes(resource.resourceType) && (
                        <div>
                          <input type='file' name='file' onChange={(e) => onFileUpload(e, lesson.lessonId, resource.resourceId)} />
                          <ul>
                            {
                              resource.files && resource.files.map((file) => (
                                <li key={file.fileId}>{file.fileType} - {file.fileName} - {file.fileId}</li>
                              ))
                            }
                          </ul>
                        </div>
                      )
                    }
                    {
                      resource.resourceType === 'Text' && (
                        <textarea 
                          name='resourceValue' 
                          rows='11' 
                          cols='50' 
                          defaultValue={resource.resourceValue}
                          onChange={(e) => handleResourceChange(e, lesson.lessonId, resource.resourceId)} 
                          placeholder='Add Your Lesson Text...'
                        >
                        </textarea>
                      )
                    }
                    <input type='button' value='Remove Resource' onClick={() => handleRemoveResource(lesson.lessonId, resource.resourceId)} />
                  </div>
                ))
              )
            }
            {
              lesson.lessonType === 'Video' && (
                <input type='text' name='videoId' placeholder='Type Youtube Video ID' value={lesson.videoId || ''} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
              )

            }

            <input type='button' value='Remove Lesson' onClick={() => handleRemoveLesson(lesson.lessonId)} />
            <input type='button' value='Add Resource' onClick={() => handleAddResource(lesson.lessonId)} />
          </div>
        ))
      }

      <input type='button' value='Add Lesson' onClick={() => handleAddLesson()} />
      <input type="submit" value="Update Lesson Plan" />
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
 lessonDetails: selectedLessonDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonStart: (lessonId) =>
    dispatch(fetchInstructorLessonStart(lessonId)),
  updateInstructorLessonStart: (lessonId, lessonDetails) => 
    dispatch(updateInstructorLessonStart(lessonId, lessonDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateLessonPage));
