import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import AdminUserManager from './../../components/admin-user-manager/admin-user-manager.component';
import AdminCourseManager from './../../components/admin-course-manager/admin-course-manager.component';

import { fetchCoursesStart } from './../../redux/course/course.actions';
import { fetchUsersStart } from './../../redux/system/system.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

const AdminPage = ({ isSubLoading, fetchCoursesStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      batch(() => {
        fetchUsersStart();
        fetchCoursesStart();
      });
      isMounted.current = true;
    }
  }, [isSubLoading, fetchCoursesStart]);

  return isMounted.current && !isSubLoading ? (
    <div className='admin-container'>
      <AdminCourseManager />
      <AdminUserManager />
    </div>
  ) : (
    <CustomLoader message={'Loading'} />
  )
}

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsersStart: () => dispatch(fetchUsersStart()),
  fetchCoursesStart: () => dispatch(fetchCoursesStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);