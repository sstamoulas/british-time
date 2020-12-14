import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { createInstructorCourseDetailsStart } from './../../redux/instructor-course/instructor-course.actions';

import './create-instructor-course.styles.scss';

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

const CreateInstructorCourse = ({ courseDetails, createInstructorCourseDetailsStart }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, ...courseDetails });
  const { courseName, startDate, endDate, courseDays } = state;

  useEffect(() => {
    setState(prevState => ({ ...prevState, ...courseDetails }));
  }, [courseDetails]);

  const handleChange = (event, dayOfWeek) => {
    const { name, value, checked, type } = event.target;

    if(type === 'checkbox') {
      let newArr = [...courseDays];
      const index = courseDays.findIndex(courseDay => courseDay.name === value)
      newArr[index].isChecked = checked;

      setState(prevState => ({ ...prevState, courseDays: newArr }));
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
    createInstructorCourseDetailsStart(state);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='courseName' value={courseName} disabled />
      <input type='date' name='startDate' value={startDate} onChange={handleChange} />
      <input type='date' name='endDate' value={endDate} onChange={handleChange} />
      {
        courseDays.map((courseDay) => (
          <input 
            type='checkbox' 
            name='courseDays' 
            key={courseDay.name}
            value={courseDay.name} 
            onChange={handleChange} 
            checked={courseDay.isChecked}
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
      <input type="submit" value="Open Course" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createInstructorCourseDetailsStart: (courseDetails) => 
    dispatch(createInstructorCourseDetailsStart(courseDetails)),
})

export default connect(null, mapDispatchToProps)(CreateInstructorCourse);
