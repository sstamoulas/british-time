import SystemActionTypes from './system.types';

const INITIAL_STATE = {
  users: [],
};

const systemReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SystemActionTypes.UPDATE_USER_ROLE_START:
    case SystemActionTypes.FETCH_USERS_START:
      return {
        ...state,
        error: null,
      };
    case SystemActionTypes.UPDATE_USER_ROLE_SUCCESS:
    case SystemActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case SystemActionTypes.UPDATE_USER_ROLE_FAILURE:
    case SystemActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default systemReducer;
