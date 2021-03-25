import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';

import { fetchInstructorLessonStart, updateInstructorLessonStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { selectedLessonDetails } from '../../redux/instructor-lesson/instructor-lesson.selectors';

import * as ROUTES from './../../constants/routes';

import './lesson-update-page.styles.scss';

const INITIAL_STATE = {
  chapterTitle: '',
  errors: {}
}

const EMPTY_LESSON = {
  lessonTitle: 'New Lesson',
  lessonType: '',
}

const EMPTY_RESOURCE = {
  resourceType: '',
  resourceValue: '',
}

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const LessonUpdatePage = ({ history, lessonDetails, fetchInstructorLessonStart, updateInstructorLessonStart }) => {
  const { lessonId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...lessonDetails });
  const { chapterTitle, lessons, errors } = state;
  const [player, setPlayer] = useState(undefined);
  const baseURL = process.env.NODE_ENV === "production" ? 
    process.env.REACT_APP_BASE_URL
  : 
    process.env.REACT_APP_LOCAL_HOST_URL;

  useEffect(() => {
    if(isObjectEmpty(lessonDetails)) {
      fetchInstructorLessonStart(lessonId);
    }

    const target = document.querySelectorAll('.active');
    if(target) {
      for(let i = 0; i < target.length; i++) {
        const panel = target[i].nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  });

  useEffect(() => {
    if(!player) {
      setPlayer(new YouTubeToHtml5({ withAudio: true }));
    }
    else {
      player.load();
    }
  }, [player])

  const handleAccordion = (event) => {
    const target = event.target;
    const panel = target.nextElementSibling;
    target.classList.toggle('active');

    panel.classList.toggle('hidden');

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }

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

    if(resourcesToRemove !== undefined) {
      await resourcesToRemove.forEach((resource) => {
        if(resource.resourceType !== "Text") {
          handleRemoveResource(lessonId, resource.resourceId, true);
        }
      })
    }

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

  const handleAddResource = (event, lessonId) => {
    let newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.lessonId === lessonId);
    let lessonResources = lessons[index].lessonResources || [];
    const resourceId = lessonResources.length > 0 ? lessonResources[lessonResources.length - 1].resourceId + 1 : 1; 

    lessonResources.push({ ...EMPTY_RESOURCE, resourceId });
    newLessons[index].lessonResources = lessonResources;

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
    else if(currentResource.file !== undefined) {
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
    else {
      lessonResources = lessonResources.filter((resource) => resource.resourceId !== resourceId);
      newLessons[index].lessonResources = lessonResources;

      if(!removeAll) {
        setState(prevState => ({ ...prevState, lessons: newLessons }));
      }
    }
  }

  const handleSubmit = (event) => {
    updateInstructorLessonStart(lessonId, state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  const bytesToMegaBytes = bytes => bytes / (1024*1024);

  const onFileUpload = async (event, lessonId, resourceId) => {
    const sizeInBytes = event.target.files[0].size;
    const sizeInMegaBytes = bytesToMegaBytes(sizeInBytes);

    if(sizeInMegaBytes <= 10) {
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

        setState(prevState => ({ ...prevState, lessons: newLessons, errors: {}}));
      })
      .catch((error) => console.log('error: ', error));
    }
    else {
      setState(prevState => ({ ...prevState, errors: { lessonId, resourceId }}));
    }
  }

  const previewResource = (fileId) => {
    window.open(`https://docs.google.com/uc?export=&id=${fileId}`, 'Preview', 'height=200, width=200');
  }

  const previewVideo = (fileId) => {
    window.open(`${process.env.NODE_ENV === "production" ? 
        process.env.REACT_APP_PRODUCTION_PUBLIC_URL 
      : 
        process.env.REACT_APP_DEVELOPMENT_PUBLIC_URL}/preview-video/${fileId}`, 
      'Preview', 
      'height=200, width=200'
    );
  }

  // const onVideoUpload = async (event, lessonId, resourceId) => {
  //   const data = new FormData();
  //   data.append('file', event.target.files[0]);

  //   fetch(`${baseURL}/video-upload`, {
  //     method: 'POST',
  //     body: data,
  //   })
  //   .then((res) => res.json())
  //   .then(({ videoId, fileName }) => {
  //     const newLessons = [...lessons];
  //     const lessonIndex = lessons.findIndex((lesson) => lesson.lessonId === lessonId);

  //       newLessons[lessonIndex] = { ...newLessons[lessonIndex], file: {videoId, fileName} };

  //     setState(prevState => ({ ...prevState, lessons: newLessons }));
  //   })
  //   .catch((error) => console.log('error: ', error));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <div className='f-basis'>
        <label className='form-label' >Section Title: </label>
        <input type='text' name='chapterTitle' className='form-control f-grow' value={chapterTitle} onChange={handleChapterChange} />
      </div>
      {
        lessons && 
        lessons.map((lesson, index) => (
          <div key={lesson.lessonId}>
            <div className="accordion" onClick={handleAccordion}>{lesson.lessonTitle}</div>
            <div className="accordion-panel hidden">
              <div className='f-basis'>
                <label className='form-label'>Lesson Title: </label>
                <input type='text' name='lessonTitle' className='form-control f-grow' value={lesson.lessonTitle} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
              </div>
              {
                !lesson.lessonType && (
                  <div className='f-basis'>
                    <select name='lessonType' className='form-control f-grow' value={lesson.lessonType || ''} onChange={(e) => handleLessonChange(e, lesson.lessonId)}>
                      <option defaultValue hidden>Select A Lesson Type</option>
                      <option value='Content'>Content</option>
                      <option value='Video'>Video</option>
                    </select>
                  </div>
                )
              }
              {
                lesson.lessonType && (
                  <div className='f-basis'>
                    <label className='form-label'>Lesson Type: </label>
                    <span className='f-grow'>{lesson.lessonType}</span>
                  </div>
                )
              }
              {
                lesson.lessonType === 'Content' && lesson.lessonResources && (
                  lesson.lessonResources.map((resource, index) => (
                    <Fragment key={resource.resourceId}>
                      {
                        !resource.resourceType && (
                          <div className='f-basis'>
                            <select name='resourceType' className='form-control f-grow' value={resource.resourceType || ''} onChange={(e) => handleResourceChange(e, lesson.lessonId, resource.resourceId)}>
                              <option defaultValue hidden>Select A Resource Type</option>
                              <option value='Text'>Text</option>
                              <option value='Document'>Document</option>
                              <option value='Audio'>Audio</option>
                              <option value='Image'>Image</option>
                            </select>
                          </div>
                        )
                      }
                      {
                        resource.resourceType && (
                          <div className='f-basis'>
                            <label className='form-label'>Add Your Lesson {resource.resourceType}: </label>
                          </div>
                        )
                      }
                      {
                        resource.resourceType && ['Document', 'Audio', 'Image'].includes(resource.resourceType) && resource.file === undefined && (
                          <div className='f-basis'>
                            <input type='text' name='fileName' className='form-control f-grow' value={resource.fileName || ''} onChange={(e) => handleResourceChange(e, lesson.lessonId, resource.resourceId)} />
                            <input type='file' name='file' className='form-control f-grow' onChange={(e) => onFileUpload(e, lesson.lessonId, resource.resourceId)} />
                            {
                              errors.lessonId === lesson.lessonId && errors.resourceId === resource.resourceId && (
                                <span style={{color: "red"}}>File Size Cannot Exceed 10MB.</span>
                              )
                            }
                          </div>
                        )
                      }
                      {
                        ['Document', 'Audio', 'Image'].includes(resource.resourceType) && resource.file !== undefined && (
                          <div className='f-basis'>
                            <input type='text' name='fileName' className='form-control f-grow' value={resource.fileName || ''} onChange={(e) => handleResourceChange(e, lesson.lessonId, resource.resourceId)} />
                            <div onClick={() => previewResource(resource.file.fileId)}>Preview</div>
                            <span key={resource.file.fileId} className='center'>{resource.resourceType} - {resource.file.fileName} - {resource.file.fileId}</span>
                          </div>
                        )
                      }
                      {
                        resource.resourceType && resource.resourceType === 'Text' && (
                          <div className='f-basis'>
                            <textarea 
                              name='resourceValue' 
                              rows='11' 
                              cols='50' 
                              className='form-control f-grow'
                              defaultValue={resource.resourceValue}
                              onChange={(e) => handleResourceChange(e, lesson.lessonId, resource.resourceId)} 
                              placeholder='Add Your Lesson Text...'
                            >
                            </textarea>
                          </div>
                        )
                      }
                      <div className='d-flex mt-2'>
                        <input type='button' className='btn btn-lg f-grow' value='Remove Resource' onClick={() => handleRemoveResource(lesson.lessonId, resource.resourceId)} />
                      </div>
                    </Fragment>
                  ))
                )
              }
              {
                lesson.lessonType === 'Content' && (
                  <div className='d-flex mt-2'>
                    <input type='button' className='btn btn-lg f-grow' value='Add Resource' onClick={(e) => handleAddResource(e, lesson.lessonId)} />
                  </div>
                )
              }
              {
                lesson.lessonType === 'Video' && (
                  <Fragment>
                    <div className='f-basis'>
                      <label className='form-label'>Add Your Lesson Video: </label>
                    </div>
                    <div className='f-basis'>
                      <input type='text' name='videoId' className='form-control f-grow' placeholder='Type Youtube Video ID' value={lesson.videoId || ''} onChange={(e) => handleLessonChange(e, lesson.lessonId)} />
                      {
                        lesson.videoId && (
                          <div onClick={() => previewVideo(lesson.videoId)}>Preview Video</div>
                        )
                      }
                    </div>
                  </Fragment>
                )
              }
              <div className='d-flex mt-2'>
                <input type='button' className='btn btn-lg f-grow' value='Remove Lesson' onClick={() => handleRemoveLesson(lesson.lessonId)} />
              </div>
            </div>
          </div>
        ))
      }

      <div className='d-flex mt-2'>
        <input type='button' className='btn btn-lg f-grow' value='Add Lesson' onClick={() => handleAddLesson()} />
        <input type="submit" className='btn btn-lg f-grow' value="Update Lesson Plan" />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LessonUpdatePage));
