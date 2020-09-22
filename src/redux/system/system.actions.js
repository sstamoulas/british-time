import SystemActionTypes from './system.types';

export const fetchUsersStart = () => ({
  type: SystemActionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users) => ({
  type: SystemActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: SystemActionTypes.FETCH_USERS_FAILURE,
  payload: error,
});

export const updateUserRoleStart = (userId, role) => ({
  type: SystemActionTypes.UPDATE_USER_ROLE_START,
  payload: { userId, role },
});

export const updateUserRoleSuccess = (users) => ({
  type: SystemActionTypes.UPDATE_USER_ROLE_SUCCESS,
  payload: users,
});

export const updateUserRoleFailure = (error) => ({
  type: SystemActionTypes.UPDATE_USER_ROLE_FAILURE,
  payload: error,
});
