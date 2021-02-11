import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { 
  fetchInstructorCourseDetailsByCourseIdStart, 
  updateInstructorCourseDetailsStart 
} from './../../redux/instructor-course/instructor-course.actions';
import { fetchInstructorLessonsStart } from './../../redux/instructor-lesson/instructor-lesson.actions';

import { selectedCourseDetails } from '../../redux/instructor-course/instructor-course.selectors';
import { instructorLessons } from '../../redux/instructor-lesson/instructor-lesson.selectors';

import './update-instructor-course.styles.scss';

import * as ROUTES from './../../constants/routes';

const INITIAL_STATE = {
  courseName: '',
}

const UpdateInstructorCourse = ({ history, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart, updateInstructorCourseDetailsStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...courseDetails });
  const { courseName } = state;

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    if(isObjectEmpty(courseDetails)) {
      fetchInstructorCourseDetailsByCourseIdStart(courseId);
      fetchInstructorLessonsStart(courseId);
    }
  }, [courseId, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart]);

  const handleChange = (event, dayOfWeek) => {
    const { name, value } = event.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    updateInstructorCourseDetailsStart(courseId, state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  const addLiveSession = () => {
    const data = new FormData();
    data.append('start_time', '2021-02-30T22:00:00Z');
    data.append('duration', 60);

    fetch(`https://api.zoom.us/v2/users/${'everestlogix@gmail.com'}/meetings`, {
      method: 'POST',
      body: data,
    })
    .then((res) => res.json())
    .then((result) => console.log('result', result))
    .catch((error) => console.log('error: ', error));

  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type='text' name='courseName' value={courseName} disabled />
        <input type="submit" value="Update Course" />
      </form>
      <div>
        <Link to={`/instructor/course/${courseId}/lesson/new`}>Add New Lesson</Link>
        <ul>
        {
          !isObjectEmpty(instructorLessons) && 
          instructorLessons.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((instructorLesson, index) => (
            <li key={instructorLesson.id}><Link to={`/instructor/course/${courseId}/lesson/${instructorLesson.id}`}>Section {index + 1}: {instructorLesson.chapterTitle}</Link></li>
          ))
        }
        </ul>
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
 courseDetails: selectedCourseDetails,
 instructorLessons: instructorLessons,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonsStart: (instructorCourseId) => 
    dispatch(fetchInstructorLessonsStart(instructorCourseId)),
  fetchInstructorCourseDetailsByCourseIdStart: (courseId) =>
    dispatch(fetchInstructorCourseDetailsByCourseIdStart(courseId)),
  updateInstructorCourseDetailsStart: (courseId, courseDetails) => 
    dispatch(updateInstructorCourseDetailsStart(courseId, courseDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateInstructorCourse));
