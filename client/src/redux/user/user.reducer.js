import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UserActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
      };
    case UserActionTypes.CHECK_USER_SESSION_START:
    case UserActionTypes.SIGN_UP_START:
    case UserActionTypes.SIGN_IN_START:
    case UserActionTypes.SIGN_OUT_START:
    case UserActionTypes.PASSWORD_RESET_START:
    case UserActionTypes.PASSWORD_RESET_SUCCESS:
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.PASSWORD_RESET_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
