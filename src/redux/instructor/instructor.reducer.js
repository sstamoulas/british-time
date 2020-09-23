import InstructorActionTypes from './instructor.types';

const INITIAL_STATE = {};

const instructorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case InstructorActionTypes.EDIT_COURSE_START:
    case InstructorActionTypes.CREATE_COURSE_START:
      return {
        ...state,
        error: null,
      };
    case InstructorActionTypes.EDIT_COURSE_SUCCESS:
    case InstructorActionTypes.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case InstructorActionTypes.EDIT_COURSE_FAILURE:
    case InstructorActionTypes.CREATE_COURSE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default instructorReducer;
