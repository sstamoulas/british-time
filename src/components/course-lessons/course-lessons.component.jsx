import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { fetchInstructorLessonsStart } from '../../redux/instructor-lesson/instructor-lesson.actions';

import { selectedCourseDetails } from '../../redux/student-course/student-course.selectors';
import { instructorLessons } from '../../redux/instructor-lesson/instructor-lesson.selectors';

import * as ROUTES from './../../constants/routes';

const isArrayEmpty = (obj) => {
  return obj.length === 0
}

const CourseLessons = ({ history, courseDetails, courseLessons, fetchInstructorLessonsStart }) => {
  const [state, setState] = useState({ ...courseLessons });

  useEffect(() => {
    if(isArrayEmpty(courseLessons)) {
      fetchInstructorLessonsStart(courseDetails.instructorCourseId);
    }
  }, [courseDetails, courseLessons, fetchInstructorLessonsStart])

  const handleSubmit = (event) => {
    history.push(ROUTES.STUDENT);
    event.preventDefault();
  }

  return !isArrayEmpty(courseLessons) && (
    <div>
      <h1>Course Lessons</h1>
      <div>
        {
          courseLessons.map((courseLesson) => <Link key={courseLesson.id} to={`/course/${courseDetails.instructorCourseId}/lesson/details/${courseLesson.id}`}>{courseLesson.lessonTitle}</Link>)
        }
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectedCourseDetails,
  courseLessons: instructorLessons,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorLessonsStart: (instructorCourseId) => 
    dispatch(fetchInstructorLessonsStart(instructorCourseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseLessons);
