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
  startDate: '',
  endDate: '',
  isVisible: false,
  courseDays: [
    { name: 'Monday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Tuesday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Wednesday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Thursday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Friday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Saturday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Sunday', isChecked: false, startTime: '', endTime: '' },
  ],
}

const UpdateInstructorCourse = ({ history, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchInstructorCourseDetailsByCourseIdStart, updateInstructorCourseDetailsStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...courseDetails });
  const { courseName, startDate, endDate, isVisible, courseDays } = state;

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
    const { name, value, checked, type } = event.target;

    if(type === 'checkbox') {
      if(name === 'isVisible') {
        setState(prevState => ({ ...prevState, isVisible: checked }));
      }
      else {
        let newArr = [...courseDays];
        const index = courseDays.findIndex(courseDay => courseDay.name === value)
        newArr[index].isChecked = checked;

        setState(prevState => ({ ...prevState, courseDays: newArr }));
      }
    }
    else if(type === 'time') {
      let newArr = [...courseDays];
      const index = courseDays.findIndex(courseDay => courseDay.name === dayOfWeek)
      newArr[index][name] = value;

      setState(prevState => ({ ...prevState, courseDays: newArr }));
    }
    else {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
  }

  const handleSubmit = (event) => {
    updateInstructorCourseDetailsStart(courseId, state);
    history.push(ROUTES.INSTRUCTOR);
    event.preventDefault();
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type='text' name='courseName' value={courseName} disabled />
        <input type='date' name='startDate' value={startDate} onChange={handleChange} />
        <input type='date' name='endDate' value={endDate} onChange={handleChange} />
        <input type='checkbox' name='isVisible' value={isVisible} checked={isVisible} onChange={handleChange} />
        {
          courseDays.map((courseDay) => (
            <input
              type='checkbox'
              name='courseDays'
              key={courseDay.name}
              value={courseDay.name}
              checked={courseDay.isChecked}
              onChange={handleChange}
            />
          ))
        }
        {
          courseDays.map((courseDay) => (
            courseDay.isChecked &&
              <div key={courseDay.name}>
                <h1>{courseDay.name} Schedule</h1>
                <input type='time' name='startTime' value={courseDay.startTime} onChange={(e) => handleChange(e, courseDay.name)} />
                <input type='time' name='endTime' value={courseDay.endTime} onChange={(e) => handleChange(e, courseDay.name)} />
              </div>
          ))
        }
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
