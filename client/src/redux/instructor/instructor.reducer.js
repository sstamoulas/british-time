import InstructorActionTypes from './instructor.types';

const INITIAL_STATE = {
  'instructorDetails': {},
};

const instructorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_START:
    case InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_START:
    case InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_START:
    case InstructorActionTypes.UPDATE_INSTRUCTOR_RATING_START:
    case InstructorActionTypes.UPDATE_INSTRUCTOR_RATING_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_SUCCESS:
    case InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_SUCCESS:
    case InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        instructorDetails: action.payload,
        error: null,
      };
    case InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_FAILURE:
    case InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_FAILURE:
    case InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_FAILURE:
    case InstructorActionTypes.UPDATE_INSTRUCTOR_RATING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default instructorReducer;
