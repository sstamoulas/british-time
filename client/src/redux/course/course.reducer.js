import CourseActionTypes from './course.types';

const INITIAL_STATE = {
  'courses': [],
  'currentCourse': {},
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CourseActionTypes.FETCH_COURSES_START:
    case CourseActionTypes.FETCH_COURSE_BY_ID_START:
    case CourseActionTypes.UPDATE_COURSE_START:
    case CourseActionTypes.CREATE_COURSE_START:
    case CourseActionTypes.UPDATE_COURSE_SUCCESS:
    case CourseActionTypes.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case CourseActionTypes.FETCH_COURSE_BY_ID_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        error: null,
      };
    case CourseActionTypes.FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        currentCourse: {},
        error: null,
      };
    case CourseActionTypes.FETCH_COURSE_BY_ID_FAILURE:
    case CourseActionTypes.FETCH_COURSES_FAILURE:
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
