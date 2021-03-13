import React, { Fragment, useState, useEffect } from 'react';
import { connect, batch } from 'react-redux';
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
  isVisible: false,
}

const UpdateInstructorCourse = ({ history, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart, updateInstructorCourseDetailsStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...courseDetails });
  const { courseName, isVisible } = state;

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    if(isObjectEmpty(courseDetails)) {
      batch(() => {
        fetchInstructorCourseDetailsByCourseIdStart(courseId);
        fetchInstructorLessonsStart(courseId);
      });
    }
  }, [courseId, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    console.log(name, checked)

    setState(prevState => ({ ...prevState, [name]: checked }));
  }

  const handleSubmit = (event) => {
    updateInstructorCourseDetailsStart(courseId, state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  const sortInstructorLessons = (a, b) => {
    if(a.createdAt.seconds > b.createdAt.seconds) {
      return 1;
    }
    else if(a.createdAt.seconds < b.createdAt.seconds) {
      return -1;
    }
    else {
      return 0;
    }
  }

  // const addLiveSession = () => {
  //   const data = new FormData();
  //   data.append('start_time', '2021-02-30T22:00:00Z');
  //   data.append('duration', 60);

  //   fetch(`https://api.zoom.us/v2/users/${'everestlogix@gmail.com'}/meetings`, {
  //     method: 'POST',
  //     body: data,
  //   })
  //   .then((res) => res.json())
  //   .then((result) => console.log('result', result))
  //   .catch((error) => console.log('error: ', error));

  // }

  instructorLessons.sort(sortInstructorLessons);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type='text' name='courseName' value={courseName} disabled />
        {
          courseDetails.isVisible ? (
            <div>Course is now visible and cannot be undone.</div>
          ) : (
            <div>
              <input type='checkbox' name='isVisible' onChange={handleCheckbox} checked={isVisible} />
              <label style={{ verticalAlign: 'top' }}>&nbsp;&nbsp;Is Course Visible?</label>
            </div>
          )
        }
        <input type="submit" value="Update Course" />
      </form>
      <div>
        <Link to={`/instructor/course/${courseId}/lesson/new`}>Add New Lesson</Link>
        <ul>
        {
          !isObjectEmpty(instructorLessons) && 
          instructorLessons.map((instructorLesson, index) => (
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
