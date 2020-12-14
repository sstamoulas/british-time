import StudentActionTypes from './student.types';

const INITIAL_STATE = {
  'studentDetails': {},
};

const studentReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case StudentActionTypes.FETCH_STUDENT_DETAILS_START:
    case StudentActionTypes.CREATE_STUDENT_DETAILS_START:
    case StudentActionTypes.UPDATE_STUDENT_DETAILS_START:
      return {
        ...state,
        error: null,
      };
    case StudentActionTypes.FETCH_STUDENT_DETAILS_SUCCESS:
    case StudentActionTypes.CREATE_STUDENT_DETAILS_SUCCESS:
    case StudentActionTypes.UPDATE_STUDENT_DETAILS_SUCCESS:
      return {
        ...state,
        studentDetails: action.payload,
        error: null,
      };
    case StudentActionTypes.FETCH_STUDENT_DETAILS_FAILURE:
    case StudentActionTypes.CREATE_STUDENT_DETAILS_FAILURE:
    case StudentActionTypes.UPDATE_STUDENT_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default studentReducer;
