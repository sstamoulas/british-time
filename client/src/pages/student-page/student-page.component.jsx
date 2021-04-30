import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import Student from './../../components/student/student.component';

import { fetchStudentDetailsStart, updateStudentDetailsStart } from './../../redux/student/student.actions';
import { fetchStudentCoursesStart } from './../../redux/student-course/student-course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import './student-page.styles.scss';

const StudentPage = ({ isSubLoading, fetchStudentCoursesStart, fetchStudentDetailsStart, updateStudentDetailsStart }) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if(!isMounted.current) {
      batch(() => {
        fetchStudentDetailsStart();
        fetchStudentCoursesStart();
      });

      isMounted.current = true;
    }
  }, [isSubLoading, fetchStudentDetailsStart, fetchStudentCoursesStart]);

  const handleSubmit = (event, studentDetails) => {
    let { bio } = studentDetails;
    bio = bio || '';

    updateStudentDetailsStart({ bio });
    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <Student handleSubmit={handleSubmit} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
}

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudentDetailsStart: () => 
    dispatch(fetchStudentDetailsStart()),
  fetchStudentCoursesStart: () => 
    dispatch(fetchStudentCoursesStart()),
  updateStudentDetailsStart: (studentDetails) => 
    dispatch(updateStudentDetailsStart(studentDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
