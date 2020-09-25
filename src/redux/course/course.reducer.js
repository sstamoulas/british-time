import CourseActionTypes from './course.types';

const INITIAL_STATE = {
  'courses': [],
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CourseActionTypes.UPDATE_COURSE_START:
    case CourseActionTypes.CREATE_COURSE_START:
      return {
        ...state,
        error: null,
      };
    case CourseActionTypes.UPDATE_COURSE_SUCCESS:
    case CourseActionTypes.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        error: null,
      };
    case CourseActionTypes.UPDATE_COURSE_FAILURE:
    case CourseActionTypes.CREATE_COURSE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default courseReducer;
