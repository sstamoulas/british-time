import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as ROLES from './../../constants/roles';
import * as ROUTES from './../../constants/routes';

import { updateUserStart } from '../../redux/system/system.actions';
import { selectUsersForManaging, selectSystemError } from '../../redux/system/system.selectors';
import { selectCoursesForManaging } from './../../redux/course/course.selectors';

import './admin-page.styles.scss';
 
const AdminPage = ({ users, error, courses, updateUserStart }) => {
  const updateUser = ({ target }, user) => {
    updateUserStart(user.id, {[target.getAttribute('data')]: target.value});
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>The Admin Page is accessible by every signed in user.</p>
      <div>
        <Link to={ROUTES.CREATE_COURSE}>Create A Course</Link>
        <ul>
          { courses.length && 
            courses.map((course) => <li key={course.id}><Link to={`course/${course.id}`}>{course.courseName}</Link></li>)
          }
        </ul>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>User Id</th>
              <th scope='col'>Email</th>
              <th scope='col'>User Name</th>
              <th scope='col'>Is Admin?</th>
              <th scope='col'>Is Instructor?</th>
              <th scope='col'>Is Student?</th>
              <th scope='col'>Payment</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map((user) => (
                <tr key={user.email}>
                  <th scope='row'>{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td><input type='radio' value='ADMIN' name={`role-${user.id}`} data='role' defaultChecked={user.role === ROLES.ADMIN} onChange={(e) => updateUser(e, user)} /></td>
                  <td><input type='radio' value='INSTRUCTOR' name={`role-${user.id}`} data='role' defaultChecked={user.role === ROLES.INSTRUCTOR}  onChange={(e) => updateUser(e, user)} /></td>
                  <td><input type='radio' value='STUDENT' name={`role-${user.id}`} data='role' defaultChecked={user.role === ROLES.STUDENT}  onChange={(e) => updateUser(e, user)} /></td>
                  <td><Link to={`/payment-history/${user.id}`}>Edit</Link></td>
                </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  users: selectUsersForManaging,
  courses: selectCoursesForManaging,
  error: selectSystemError,
});
 
const mapDispatchToProps = (dispatch) => ({
  updateUserStart: (userId, userDetails) => dispatch(updateUserStart(userId, userDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
