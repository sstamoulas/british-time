import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../custom-loader/custom-loader.component';

import * as ROLES from './../../constants/roles';

import { isLoading } from './../../redux/ui/ui.selectors';
import { updateUserStart } from '../../redux/system/system.actions';
import { selectUsersForManaging } from '../../redux/system/system.selectors';

import './admin-user-manager.styles.scss';
 
const AdminUserManager = ({ users, isLoading, updateUserStart }) => {
  const updateUser = ({ target }, user) => {
    updateUserStart(user.id, {[target.getAttribute('data')]: target.value});
  }

  return !isLoading ? (
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
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading,
  users: selectUsersForManaging,
});
 
const mapDispatchToProps = (dispatch) => ({
  updateUserStart: (userId, userDetails) => dispatch(updateUserStart(userId, userDetails)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserManager);
