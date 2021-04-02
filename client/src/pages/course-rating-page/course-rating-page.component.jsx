import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CourseRating from './../../components/course-rating/course-rating.component';
import CustomLoader from './../../components/custom-loader/custom-loader.component';

import { fetchStudentCourseStart } from './../../redux/student-course/student-course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

const CourseRatingPage = ({ isSubLoading, fetchStudentCourseStart }) => {
  const isMounted = useRef(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!isMounted.current) {
      fetchStudentCourseStart(courseId);
      isMounted.current = true;
    }
  }, [courseId, isSubLoading, fetchStudentCourseStart])

  return isMounted.current && !isSubLoading ? (
    <CourseRating />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudentCourseStart: (courseId) => 
    dispatch(fetchStudentCourseStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseRatingPage);
