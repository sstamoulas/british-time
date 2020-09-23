import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROUTES from './../../constants/routes';
import { currentUser } from '../../redux/user/user.selectors';
 
const InstructorPage = ({ currentUser, error }) => (
  <div>
    <h1>Instructor Page</h1>
    <p>The Instructor Page is accessible by every signed in user.</p>
    <Link to={ROUTES.CREATE_COURSE}>Create A Course</Link>
    <h1>Your Courses</h1>
    <ul>
      {
        currentUser.courses && currentUser.courses.map((course, index) => <li key={course.id}><Link to={`course/${course.id}`}>{course.courseName}</Link></li>)
      }
    </ul>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(InstructorPage);
