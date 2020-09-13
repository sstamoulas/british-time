import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: true,
  error: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UserActionTypes.CHECK_USER_SESSION_SUCCESS:
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: null,
      };
    case UserActionTypes.RESET_ERROR_MESSAGE:
    case UserActionTypes.PASSWORD_RESET_SUCCESS:
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: null,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.PASSWORD_RESET_FAILURE:
    case UserActionTypes.CHECK_USER_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
