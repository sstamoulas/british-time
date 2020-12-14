import UserActionTypes from './user.types';

export const resetErrorMessage = () => ({
  type: UserActionTypes.RESET_ERROR_MESSAGE,
});

export const checkUserSessionStart = () => ({
  type: UserActionTypes.CHECK_USER_SESSION_START,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signInStart = (emailAndPassword) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const passwordResetStart = (email) => ({
  type: UserActionTypes.PASSWORD_RESET_START,
  payload: { email },
});

export const passwordResetSuccess = () => ({
  type: UserActionTypes.PASSWORD_RESET_SUCCESS,
});

export const passwordResetFailure = (error) => ({
  type: UserActionTypes.PASSWORD_RESET_FAILURE,
  payload: error,
});
