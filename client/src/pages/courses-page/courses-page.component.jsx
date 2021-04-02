import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Courses from './../../components/courses/courses.component';
import CustomLoader from './../../components/custom-loader/custom-loader.component';

import { fetchCoursesStart } from './../../redux/course/course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

const CoursesPage = ({ isSubLoading, fetchCoursesStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchCoursesStart();
      isMounted.current = true;
    }
  }, [isSubLoading, fetchCoursesStart]);

  return isMounted.current && !isSubLoading ? (
    <Courses />
  ) : (
    <CustomLoader message={'Loading'} />
  )
}

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoursesStart: () => dispatch(fetchCoursesStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);