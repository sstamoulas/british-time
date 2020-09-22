import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as ROLES from './../../constants/roles';
import { updateUserRoleStart } from '../../redux/system/system.actions';
import { selectUsersForManaging, selectUsersError } from '../../redux/system/system.selectors';
 
const AdminPage = ({ users, error, updateUserRoleStart }) => {
  const updateUser = ({ target }, user) => {
    updateUserRoleStart(user.id, target.value);
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>The Admin Page is accessible by every signed in user.</p>
      <div>
        <table>
          <thead>
            <tr>
              <th scope='col'>Email</th>
              <th scope='col'>User Name</th>
              <th scope='col'>Is Admin?</th>
              <th scope='col'>Is Instructor?</th>
              <th scope='col'>Is Student?</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map((user) => (
                <tr key={user.email}>
                  <th scope='row'>{user.email}</th>
                  <td>{user.userName}</td>
                  <td><input type='radio' value='ADMIN' name={`role-${user.id}`} defaultChecked={user.role === ROLES.ADMIN} onChange={(e) => updateUser(e, user)} /></td>
                  <td><input type='radio' value='INSTRUCTOR' name={`role-${user.id}`} defaultChecked={user.role === ROLES.INSTRUCTOR}  onChange={(e) => updateUser(e, user)} /></td>
                  <td><input type='radio' value='STUDENT' name={`role-${user.id}`} defaultChecked={user.role === ROLES.STUDENT}  onChange={(e) => updateUser(e, user)} /></td>
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
  error: selectUsersError,
});
 
const mapDispatchToProps = (dispatch) => ({
  updateUserRoleStart: (userId, role) => dispatch(updateUserRoleStart(userId, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
