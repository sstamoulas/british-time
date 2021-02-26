import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { createInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import './lesson-create-page.styles.scss';

import * as ROUTES from './../../constants/routes';

const INITIAL_STATE = {
  chapterTitle: '',
}

const EMPTY_LESSON = {
  lessonTitle: '',
  lessonType: '',
}

const EMPTY_RESOURCE = {
  resourceType: '',
  resourceValue: '',
}

const CreateLessonPage = ({ history, createInstructorLessonStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, courseId, lessons: [] });
  const [fileType, setFileType] = useState(null)
  const { chapterTitle, lessons } = state;
  const baseURL = process.env.NODE_ENV === "production" ? 
    `${process.env.BASE_URL}/api`
  : 
    `${process.env.LOCAL_HOST_URL}/api`;

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

  const handleRemoveLesson = async (lessonId) => {
    let newLessons = [...lessons];
    const resourcesToRemove = newLessons.filter((lesson) => lesson.lessonId === lessonId)[0].lessonResources;

    await resourcesToRemove.forEach((resource) => {
      if(resource.resourceType !== "Text") {
        handleRemoveResource(lessonId, resource.resourceId, true);
      }
    })

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

  const handleRemoveResource = async (lessonId, resourceId, removeAll = false) => {
    let newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
    let lessonResources = lessons[index].lessonResources;
    const currentResource = lessonResources.filter((resource) => resource.resourceId === resourceId)[0];
    const resourceType = currentResource.resourceType;

    if(resourceType === "Text") {
      lessonResources = lessonResources.filter((resource) => resource.resourceId !== resourceId);
      newLessons[index].lessonResources = lessonResources;

      setState(prevState => ({ ...prevState, lessons: newLessons }));
    }
    else {
      await fetch(`${baseURL}/file-delete/${currentResource.file.fileId}`, {
        method: 'DELETE',
      })
      .catch((error) => console.log('error: ', error));

      lessonResources = lessonResources.filter((resource) => resource.resourceId !== resourceId);
      newLessons[index].lessonResources = lessonResources;

      if(!removeAll) {
        setState(prevState => ({ ...prevState, lessons: newLessons }));
      }
    }
  }

  const handleSubmit = (event) => {
    createInstructorLessonStart(state);
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

      newLessons[lessonIndex].lessonResources[resourceIndex] = { ...newResources[resourceIndex], file: {fileId, fileName} };

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
              <option value='Content'>Content</option>
              <option value='Video'>Video</option>
            </select>
            {
              lesson.lessonType === 'Content' && lesson.lessonResources && (
                lesson.lessonResources.map((resource) => (
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
                          {
                            resource.file &&
                            <span key={resource.file.fileId}>{resource.file.fileType} - {resource.file.fileName} - {resource.file.fileId}</span>
                          }
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
            {
              lesson.lessonType === 'Content' && (
                <input type='button' value='Add Resource' onClick={() => handleAddResource(lesson.lessonId)} />
              )
            }
          </div>
        ))
      }

      <input type='button' value='Add Lesson' onClick={() => handleAddLesson()} />
      <input type="submit" value="Update Lesson Plan" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createInstructorLessonStart: (lessonDetails) => 
    dispatch(createInstructorLessonStart(lessonDetails)),
})

export default connect(null, mapDispatchToProps)(withRouter(CreateLessonPage));
