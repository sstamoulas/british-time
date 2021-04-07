import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../custom-loader/custom-loader.component';

import * as ROUTES from './../../constants/routes';
import { courses } from './../../constants/constants';

import { isLoading } from './../../redux/ui/ui.selectors';

import './admin-course-manager.styles.scss';
 
const AdminCourseManager = ({ isLoading }) => {
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

  return !isLoading ? (
    <Fragment>
      <Link to={ROUTES.CREATE_COURSE}>Create A Course</Link>
      <ul>
        { courses.length > 0 && 
          courses.sort(sortCourses).map((course) => <li key={course.id}><Link to={`course/${course.id}`}>{course.courseName}</Link></li>)
        }
      </ul>
    </Fragment>
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading,
});

export default connect(mapStateToProps)(AdminCourseManager);
