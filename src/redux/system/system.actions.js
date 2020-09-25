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

export const updateUserStart = (userId, userDetails) => ({
  type: SystemActionTypes.UPDATE_USER_START,
  payload: { userId, userDetails },
});

export const updateUserSuccess = (users) => ({
  type: SystemActionTypes.UPDATE_USER_SUCCESS,
  payload: users,
});

export const updateUserFailure = (error) => ({
  type: SystemActionTypes.UPDATE_USER_FAILURE,
  payload: error,
});
