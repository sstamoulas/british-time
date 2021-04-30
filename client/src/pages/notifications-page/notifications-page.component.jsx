import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import Notifications from './../../components/notifications/notifications.component';

import { fetchInstructorCourseDetailsStart } from './../../redux/instructor-course/instructor-course.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

const NotificationsPage = ({ isSubLoading, fetchInstructorCourseDetailsStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchInstructorCourseDetailsStart();
      isMounted.current = true;
    }
  }, [isSubLoading, fetchInstructorCourseDetailsStart]);

  return isMounted.current && !isSubLoading ? (
    <Notifications />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInstructorCourseDetailsStart: () =>
    dispatch(fetchInstructorCourseDetailsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
