import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import Instructor from './../../components/instructor/instructor.component';

import { fetchInstructorDetailsStart, updateInstructorDetailsStart } from './../../redux/instructor/instructor.actions';
import { fetchInstructorCourseDetailsStart } from './../../redux/instructor-course/instructor-course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import './instructor-page.styles.scss';

const InstructorPage = ({ isSubLoading, fetchInstructorDetailsStart, fetchInstructorCourseDetailsStart, updateInstructorDetailsStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      batch(() => {
        fetchInstructorDetailsStart();
        fetchInstructorCourseDetailsStart();
      });

      isMounted.current = true;
    }
  }, [isSubLoading, fetchInstructorDetailsStart, fetchInstructorCourseDetailsStart]);

  const handleSubmit = (event, instructorDetails) => {
    let { bio, rating } = instructorDetails;
    bio = bio || '';
    rating = rating || 0;

    updateInstructorDetailsStart({ bio, rating });
    event.preventDefault();
  }

  const onUploadCallback = (event, instructorDetails) => {
    let { bio, rating } = instructorDetails;
    bio = bio || '';
    rating = rating || 0;

    updateInstructorDetailsStart({ bio, rating });
    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <Instructor handleSubmit={handleSubmit} onUploadCallback={onUploadCallback} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorCourseDetailsStart: () => dispatch(fetchInstructorCourseDetailsStart()),
  fetchInstructorDetailsStart: () => dispatch(fetchInstructorDetailsStart()),
  updateInstructorDetailsStart: (instructorDetails) => 
    dispatch(updateInstructorDetailsStart(instructorDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorPage);
