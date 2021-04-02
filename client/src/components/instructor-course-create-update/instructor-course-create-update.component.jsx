import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectedCourseDetails } from '../../redux/instructor-course/instructor-course.selectors';
import { instructorLessons } from '../../redux/instructor-lesson/instructor-lesson.selectors';
import { selectCoursesForManaging } from './../../redux/course/course.selectors';

import './instructor-course-create-update.styles.scss';

const INITIAL_STATE = {
  courseName: '',
  totalStudents: 0,
  rating: 0,
  isVisible: false,
}

const InstructorCourseCreateUpdate = ({ isNew, courseDetails, instructorLessons, availableCourses, handleSubmit }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { courseName, isVisible } = state;

  useEffect(() => {
    if(!isNew) {
      setState(prevState => ({ ...prevState, ...courseDetails }));
    }
  }, [isNew, courseDetails]);

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    setState(prevState => ({ ...prevState, [name]: checked }));
  }

  const onSelectChange = (event) => {
    const { value } = event.target;
    const selectedIndex = availableCourses.map((course) => course.id).indexOf(value);
    setState(prevState => ({ 
      ...prevState, 
      courseName: availableCourses[selectedIndex].courseName, 
      id: availableCourses[selectedIndex].id
    }));
  }

  const sortCourses = (courseA, courseB) => {
    if (courseA.courseName < courseB.courseName) {
      return -1;
    }
    else if (courseA.courseName > courseB.courseName) {
      return 1;
    }
    else {
      return 0;
    }
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

  availableCourses.sort(sortCourses)
  instructorLessons.sort(sortInstructorLessons);

  return (
    <Fragment>
      <h1 className='d-flex justify-center'>{isNew ? 'Create' : 'Update'} A Course</h1>
      <div className='d-flex'>
        {        
          !isNew ? (
            <div className='course-selection'>{courseName}</div>
          ) : (
            <select className='course-selection' value={state.courseId} onChange={onSelectChange}>
              <option>Select A Course</option>
              {
                availableCourses.sort(sortCourses).map((course) => <option key={course.id} value={course.id}>{course.courseName}</option>)
              }
            </select>
          )
        }
      </div>
      <form className='course-selection' onSubmit={(e) => handleSubmit(e, state)}>
        {
          isVisible ? (
            <div>Course is now visible and cannot be undone.</div>
          ) : (
            <div>
              <input type='checkbox' name='isVisible' onChange={handleCheckbox} checked={isVisible} />
              <label style={{ verticalAlign: 'top' }}>&nbsp;&nbsp;Is Course Visible?</label>
            </div>
          )
        }
        <input type="submit" value={`${!isNew ? 'Update' : 'Create'} Course`} />
      </form>
    {      
      !isNew && (
        <div className='course-selection'>
          <Link to={`/instructor/course/${courseId}/lesson/new`}>Add New Lesson</Link>
          <ul>
          {
            instructorLessons.map((instructorLesson, index) => (
              <li key={instructorLesson.id}><Link to={`/instructor/course/${courseId}/lesson/${instructorLesson.id}`}>Section {index + 1}: {instructorLesson.chapterTitle}</Link></li>
            ))
          }
          </ul>
        </div>
      )
    }
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectedCourseDetails,
  instructorLessons: instructorLessons,
  availableCourses: selectCoursesForManaging,
});

export default connect(mapStateToProps)(InstructorCourseCreateUpdate);
